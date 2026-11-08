import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>('DB_URI') ||
          configService.get<string>('MONGODB_URI'),
        retryAttempts: 1,
        serverSelectionTimeoutMS: 5000,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MongoModule {}