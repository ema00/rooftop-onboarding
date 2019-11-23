import { EntityRepository, Repository } from "typeorm";
import UserRole from "../ValueObjects/UserRole";


@EntityRepository(UserRole)
class UserRoleRepository extends Repository<UserRole> {
}

export default UserRoleRepository;
