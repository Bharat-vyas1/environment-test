import { Injectable, HttpStatus } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { Sessions } from '../sessions/entities/session.entity';
import { comparePassword } from '../../utilities/bcrypt.utility';
import { JwtService } from '@nestjs/jwt';
import { encrypt } from '../../utilities/crypto.utility';
import { Request } from 'express';
import { decrypt } from '../../utilities/crypto.utility';
import { v4 as uuidv4 } from 'uuid';
import { CustomException } from '../../utilities/custom-exception.utility';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

    @InjectRepository(Sessions)
    private sessionsRepository: Repository<Sessions>,

    private readonly jwtService: JwtService,
  ) {}

  async login(request: Request, loginDto: LoginDto) {
    const uniqueDeviceName = uuidv4();
    const user = await this.usersRepository.findOne({
      where: {
        phone: loginDto.phone,
      },
    });

    if (!user) {
      throw new CustomException(
        'user_with_this_phone_number_not_found',
        'phone',
        HttpStatus.NOT_FOUND,
      );
    }

    const passwordMatch = await comparePassword(
      loginDto.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new CustomException(
        'invalid_password',
        'password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = {
      id: user.id,
      device_name: uniqueDeviceName,
    };

    const accessToken = encrypt(this.jwtService.sign(payload));
    const refreshToken = encrypt(
      this.jwtService.sign(payload, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
      }),
    );

    await this.sessionsRepository.save({
      user_id: user.id,
      device_address: request.headers['user-agent'],
      device_name: uniqueDeviceName,
      token: refreshToken,
    });

    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      tokens: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    };
  }

  async getAccessToken(refreshToken: string) {
    let decryptedRefreshToken: string;

    if (!refreshToken) {
      throw new CustomException(
        'refresh_token_required',
        'refresh_token',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      decryptedRefreshToken = decrypt(refreshToken);

      const payload = await this.jwtService.verifyAsync(decryptedRefreshToken, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.usersRepository.findOne({
        where: {
          id: payload.id,
        },
      });

      if (!user) {
        throw new CustomException(
          'user_not_found',
          'refresh_token',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const session = await this.sessionsRepository.findOne({
        where: {
          device_name: payload.device_name,
          token: refreshToken,
        },
      });

      if (!session) {
        throw new CustomException(
          'session_not_found',
          'refresh_token',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const accessTokenPayload = {
        id: user.id,
      };
      const accessToken = encrypt(this.jwtService.sign(accessTokenPayload));

      return {
        access_token: accessToken,
      };
    } catch (err) {
      throw new CustomException(
        'token_expired',
        'refresh_token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
