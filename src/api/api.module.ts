import { Module } from '@nestjs/common';
import { InstanceModule } from './instance/instance.module';

@Module({
  imports: [InstanceModule]
})
export class ApiModule {}
