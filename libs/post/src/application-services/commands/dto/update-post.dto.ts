import { IPost } from "@lib/post/domain";
//  то есть у нас есть необязательные поля тайтл и ммессадж и обязательные id и authorId
export type UpdatePostDto = Partial<Pick<IPost, 'title'| 'message'>> & Pick<IPost, 'id'|'authorId'>