import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './api/api.module';
import { envs } from './core/config';

@Module({
  imports: [
    MongooseModule.forRoot(envs.mongo_instance_url, {
      dbName: envs.mongo_instance_dbname,
      connectionName: envs.mongo_instance_dbname,
    }),
    MongooseModule.forRoot(envs.mongo_url, {
      dbName: envs.mongo_dbname,
      connectionName: envs.mongo_dbname,
    }),
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
