import { PostModule } from '@lib/post';
import { Global, Module } from '@nestjs/common';

//даем доступ к этому модулю(пост фасаду) глобально
@Global()
@Module({
    imports: [PostModule],
    exports: [PostModule]
})
export class DomainsModule {}
