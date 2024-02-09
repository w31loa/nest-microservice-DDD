import { BadRequestException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdatePostCommand } from "./update-post.command";
import { PostAggregate } from "@lib/post/domain";
import { PostRepository } from "@lib/post/providers";

@CommandHandler(UpdatePostCommand)
export class UpdatePostCommandHandler implements ICommandHandler<UpdatePostCommand, PostAggregate>{
    

    private readonly logger = new Logger(UpdatePostCommandHandler.name)
    constructor(private readonly postRepository:PostRepository){}
    
    async execute({post}: UpdatePostCommand): Promise<PostAggregate> {
        const existPost = await this.postRepository.findOne(post.id).catch(err=>{
            this.logger.error(err)
            return null as PostAggregate
        })

        if(!existPost){
            throw new BadRequestException(`Post ny id ${post.id} now found!`)
        }

        Object.assign(existPost, post)

        const postAggrigate = PostAggregate.create(existPost)
        await this.postRepository.save(postAggrigate)
        return postAggrigate
    }

}