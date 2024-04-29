"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const compression = require("compression");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    app.useGlobalFilters();
    app.setGlobalPrefix('api', {
        exclude: [
            { path: '', method: common_1.RequestMethod.GET },
            { path: 'health', method: common_1.RequestMethod.GET },
        ],
    });
    app.use(compression());
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map