import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPostQuery } from "./get-post.query";
import { PostAggregate } from "@lib/post/domain";
import { PostRepository } from "@lib/post/providers";
import { Logger, BadRequestException } from "@nestjs/common";
import { SetPublishedCommandHandler } from "../../commands/set-published/set-published.command-handler";

@QueryHandler(GetPostQuery)
export class GetPostQueryHandler implements IQueryHandler<GetPostQuery, PostAggregate>{

    private readonly logger = new Logger(SetPublishedCommandHandler.name)

    constructor(private readonly postRepository:PostRepository){}

    async execute({id}: GetPostQuery): Promise<PostAggregate | null> {
        const existPost = await this.postRepository.findOne(id).catch(err=>{
            this.logger.error(err)
            return null as PostAggregate
        })


        return existPost
    }

}