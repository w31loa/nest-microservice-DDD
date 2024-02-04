import { Module } from '@nestjs/common';
import { AllExceptionsFilter } from './filters';
import { APP_FILTER } from '@nestjs/core';

@Module({ //подключение фильтра после чего подключаем его в апп модуль и он будет работать глобально по всему приложению
  providers: [{
    provide: APP_FILTER, //константа неста для подключения фильтра ошибок
    useClass: AllExceptionsFilter
  }],
  exports: [],
})
export class SharedModule {}
