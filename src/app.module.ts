import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './api/api.module';
import { Config } from './core/config/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(Config.mongoose.url, {
      dbName: 'wsp-api',
    }),
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
