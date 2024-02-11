import { ProvidersModule } from '@lib/providers/providers.module';
import { SharedModule } from '@lib/shared';
import { Module } from '@nestjs/common';
import { ApiModule } from './api';

@Module({
  imports: [
    SharedModule, // просто добавляем в импорты модуль
    ProvidersModule, ApiModule
  ],
})
export class AppModule {}
