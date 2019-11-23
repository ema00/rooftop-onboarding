import { injectable, inject } from "inversify";
import TYPES from "../../types";
import RepositoryFactory from "../../Infrastructure/Database/RepositoryFactoryImpl";
import HashService from "../Services/HashService";
import UserService from "./UserService";
import User from "../../Domain/Entities/User";
import UserRole from "../../Domain/ValueObjects/UserRole";
import UserRoleType from "../../Domain/ValueObjects/UserRoleType";


@injectable()
class UserServiceImpl implements UserService {

    private readonly hashService: HashService;
    private readonly repositoryFactory: RepositoryFactory;


    constructor(
        @inject(TYPES.RepositoryFactory) repositoryFactory: RepositoryFactory,
        @inject(TYPES.HashService) hashService: HashService
    ) {
        this.repositoryFactory = repositoryFactory;
        this.hashService = hashService;
    }


    public async create(
        name: string, dni: number, password: string, role: string, email: string
    ): Promise<User> {    
        if (!name) { throw new Error().message = "Name of User cannot be empty."; }
        if (!dni || isNaN(dni)) { throw new Error().message = "DNI not valid."; }
        if (!password) { throw new Error().message = "Password cannot be empty."; }
        if (!email) { throw new Error().message = "E-mail cannot be empty."; }
        if (role &&
            role.valueOf() !== UserRoleType.GUEST &&
            role.valueOf() !== UserRoleType.ZEEPER &&
            role.valueOf() !== UserRoleType.ADMIN
        ) {
            throw new Error().message = "User role not valid.";
        }

        const userRepository = this.repositoryFactory.getUserRepository();
        const otherUserSameName = await userRepository.findOne({ where: { name: name } });
		if (otherUserSameName) { throw new Error().message = "User name already exists."; }

        const user: User = new User();
        user.name = name;
        user.dni = dni;
        user.email = email;
        user.pass = this.hashService.getStringHash(password);
        const userRole = await this.roleFromRoleType(role);
        user.addRole(userRole);

        return userRepository.save(user);
    }

    public async findOne(id: number): Promise<User | undefined> {
        if (!id) { throw new Error().message = "User id not valid."; }

        const userRepository = this.repositoryFactory.getUserRepository();
        return userRepository.findOne({ where: { id: id } });
    }

    public async update(id: number, dni: number, email: string): Promise<User | undefined> {
        if (dni && isNaN(dni)) { throw new Error().message = "DNI not valid."; }

        const userRepository = this.repositoryFactory.getUserRepository();
        const user = await userRepository.findOne({ where: { id: id } });
        if (user) {
            if (dni) { user.dni = dni; }
            if (email) { user.email = email; }
            userRepository.save(user);
        }

        return user;
    }

    // This one ensures User Roles exist in the database
    private async roleFromRoleType(role: string): Promise<UserRole> {
        const userRoleRepository = this.repositoryFactory.getUserRoleRepository();
        let userRole = await userRoleRepository.findOne({ where: { type: role } });
        if (!userRole) {
            switch (role) {
                case UserRoleType.ADMIN:
                    userRole = new UserRole(UserRoleType.ADMIN);
                case UserRoleType.ZEEPER:
                    userRole = new UserRole(UserRoleType.ZEEPER);
                default:
                    userRole = new UserRole(UserRoleType.GUEST);
            }
        }
        return userRole;
    };

}

export default UserServiceImpl;
