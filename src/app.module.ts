import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './api/api.module';
import { envs } from './core/config';

@Module({
  imports: [
    MongooseModule.forRoot(envs.mongodb_url, {
      dbName: envs.mongodb_bdname,
    }),
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
