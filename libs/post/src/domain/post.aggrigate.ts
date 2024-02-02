import {randomStringGenerator} from '@nestjs/common/utils/random-string-generator.util'
import { IPost } from "./post.interface";
import { AggregateRoot } from '@nestjs/cqrs';
import { PostSerices } from './services';
import { IsBoolean, IsNotEmpty, IsString, IsUUID, validateSync,  } from 'class-validator';
import { Exclude } from 'class-transformer';

export class PostAggregate extends PostSerices implements IPost {
    @IsUUID()
    id: string = randomStringGenerator();

    @IsString() 
    @IsNotEmpty() 
    title: string;

    @IsString() 
    @IsNotEmpty() 
    message: string;

    @IsUUID()
    authrorId: string;

    @IsBoolean()
    @Exclude() // поле иссключено и не будет возвращаться 
    published = false;

    @IsString()
    createdAt = new Date().toISOString() ;

    @IsString() 
    updatedAt = new Date().toISOString() ;


    private constructor() {
        super() // вызываем контруктор класса от которого наследуемся т.е. AggregateRoot
    }

    static create(post : Partial<IPost>){  // Partial значит что все поля не обязательные
        const _post = new PostAggregate()
        // _post.setNotPublished() // из за того что мы наследуемся от сервисов нам доступны все функции оттуда внутри класса

        Object.assign(_post, post) //записывает переданный пост а новый пост(если id не передан то он заполняется автоматически)
        _post.updatedAt = post?.id ? new Date().toISOString() : _post.updatedAt
        const errors = validateSync(_post, { whitelist: true})
        if(!!errors.length){
            throw new Error("Post not valid") 
        }
        return _post
    }


    setPublushed(){
        this.published = true
    }
}