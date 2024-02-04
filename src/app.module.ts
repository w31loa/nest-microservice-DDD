import { ProvidersModule } from '@lib/providers/providers.module';
import { SharedModule } from '@lib/shared';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    SharedModule, // просто добавляем в импорты модуль
    ProvidersModule
  ],
})
export class AppModule {}
