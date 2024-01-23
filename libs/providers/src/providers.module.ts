import { Module } from '@nestjs/common';
import { TypeofModule } from './typeorm/typeorm.module';

@Module({

  imports: [TypeofModule]
})
export class ProvidersModule {}
