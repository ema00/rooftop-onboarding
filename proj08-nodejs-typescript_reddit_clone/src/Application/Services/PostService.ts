import Post from "../../Domain/Entities/Post";


interface PostService {

	create(userId: number, title: string, content: string): Promise<Post>;

    count(
        userId: number | undefined,
        title: string | undefined,
        content: string | undefined
    ): Promise<number>;

    find(
        userId: number | undefined,
        title: string | undefined,
        content: string | undefined,
        size: number | undefined,
        page: number | undefined
    ): Promise<Post[]>;

    findOne(id: number): Promise<Post | undefined>;
    
    maxPageSize(): number;

}

export default PostService;
