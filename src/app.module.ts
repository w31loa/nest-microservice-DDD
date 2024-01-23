import { ProvidersModule } from '@lib/providers/providers.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ProvidersModule
  ],
})
export class AppModule {}
