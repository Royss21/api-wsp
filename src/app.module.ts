import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './api/api.module';
import { envs } from './config';

@Module({
  imports: [
    MongooseModule.forRoot(envs.mongo_url, {
      dbName: envs.mongo_dbname
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'),
    // }),
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
