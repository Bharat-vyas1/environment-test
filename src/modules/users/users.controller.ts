import {
  Controller,
  Post,
  Body,
  Headers,
  Get,
  Req,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '../../decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @Headers('Accept-Language') acceptedLanguage: string,
  ) {
    return this.usersService.create(createUserDto, acceptedLanguage);
  }

  @Get()
  @HttpCode(200)
  getUserInfo(@Req() request: any) {
    const user = request.user;

    return { user };
  }
}
