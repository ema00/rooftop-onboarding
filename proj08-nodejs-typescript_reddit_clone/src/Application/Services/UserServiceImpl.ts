import { injectable, inject } from "inversify";
import TYPES from "../../types";
import HashService from "../Services/HashService";
import UserService from "./UserService";
import User from "../../Domain/Entities/User";
import UserRole from "../../Domain/Entities/UserRole";
import UserRoleType from "../../Domain/Entities/UserRoleType";


@injectable()
class UserServiceImpl implements UserService {

    private hashService: HashService;


    constructor(@inject(TYPES.HashService) hashService: HashService) {
        this.hashService = hashService;
    }


    public async create(
        name: string, dni: number, password: string, role: string, email: string): Promise<User> {
        
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

        const otherUserSameName = await User.findOne({ where: { name: name } });
		if (otherUserSameName) { throw new Error().message = "User name already exists."; }

        const user: User = new User();
        user.name = name;
        user.dni = dni;
        user.pass = this.hashService.getStringHash(password);
        const userRole = await this.roleFromRoleType(role);
        user.addRole(userRole);
        user.email = email;
        user.pass = this.hashService.getStringHash(password);

        await user.save();
        return user;
    }

    public async findOne(id: number): Promise<User | undefined> {
        if (!id) { throw new Error().message = "User id not valid."; }

        return await User.findOne(id);
    }

    public async update(id: number, dni: number, email: string): Promise<User | undefined> {
        if (dni && isNaN(dni)) { throw new Error().message = "DNI not valid."; }

        const user = await this.findOne(id);        
        if (user) {
            if (dni) { user.dni = dni; }
            if (email) { user.email = email; }
            await user.save();
        }

        return user;
    }

    // This one ensures User Roles exist in the database
    private async roleFromRoleType(role: string): Promise<UserRole> {
        let userRole = await UserRole.findOne({ where: { type: role } });
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
