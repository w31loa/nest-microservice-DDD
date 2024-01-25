import {randomStringGenerator} from '@nestjs/common/utils/random-string-generator.util'
import { IPost } from "./post.interface";
import { AggregateRoot } from '@nestjs/cqrs';

export class PostAggregate extends AggregateRoot implements IPost {
    id: string = randomStringGenerator();
    title: string;
    message: string;
    authrorId: string;
    published = false;
    createdAt = new Date().toISOString() ;
    updatedAt = new Date().toISOString() ;


    private constructor() {
        super() // вызываем контруктор класса от которого наследуемся т.е. AggregateRoot
    }

    static create(post : Partial<IPost>){  // Partial значит что все поля не обязательные
        const _post = new PostAggregate()
        Object.assign(_post, post) //записывает переданный пост а новый пост(если id не передан то он заполняется автоматически)
        return _post
    }
}