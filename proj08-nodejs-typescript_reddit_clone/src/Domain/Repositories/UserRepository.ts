import { EntityRepository, Repository } from "typeorm";
import User from "../Entities/User";


@EntityRepository(User)
class UserRepository extends Repository<User> {
}

export default UserRepository;
