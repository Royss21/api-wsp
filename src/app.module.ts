import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './api/api.module';
import { AppService } from './app.service';
import { Config } from './core/config/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(Config.mongoose.url, {
      dbName: 'wsp-api',
    }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
