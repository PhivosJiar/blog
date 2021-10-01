export interface Postlist {
  updatedAt: Date;
  createdAt: Date;
  attributes: {
    title: string;
    message: string;
    objectId?: string;
    updatedAt?: Date;
    createdAt?: Date;
    user?: string;
    writer?: string;
    onwer?:string;
    commentLike?:boolean;
    commentMessage?:string[];
  }
}