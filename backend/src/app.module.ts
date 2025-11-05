import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/modules/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './common/config/app.config';
import databaseConfig from './common/config/database.config';
import { AuthModule } from './auth/modules/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        databaseConfig,
      ],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUri'),
      }),
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule { }
