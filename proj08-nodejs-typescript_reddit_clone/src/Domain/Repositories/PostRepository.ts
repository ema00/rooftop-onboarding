
import { EntityRepository, Repository } from "typeorm";
import Post from "../Entities/Post";


@EntityRepository(Post)
class PostRepository extends Repository<Post> {
}

export default PostRepository;
