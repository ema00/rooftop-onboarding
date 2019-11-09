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
        
        if (!name) { throw new Error("Name of User cannot be empty."); }
        if (!dni || isNaN(dni)) { throw new Error("DNI not valid."); }
        if (!password) { throw new Error("Password cannot be empty."); }
        if (!email) { throw new Error("E-mail cannot be empty."); }

        console.log(name);

        const user: User = new User();
        user.name = name;
        user.dni = dni;
        user.pass = this.hashService.getStringHash(password);
        let userRole = await UserRole.findOne({ where: { type: role } });
        if (!userRole) { userRole = new UserRole(UserRoleType.ZEEPER); }
        user.addRole(userRole);
        user.email = email;
        user.pass = this.hashService.getStringHash(password);

        await user.save();
        return user;
    }

    public async findOne(id: number): Promise<User | undefined> {
        if (!id) { throw new Error("User id not valid."); }

        return await User.findOne(id);
    }

    public async update(id: number, dni: number, email: string): Promise<User | undefined> {
        if (dni && isNaN(dni)) { throw new Error("DNI not valid."); }

        const user = await this.findOne(id);        
        if (user) {
            if (dni) { user.dni = dni; }
            if (email) { user.email = email; }
            await user.save();
        }

        return user;
    }

}

export default UserServiceImpl;
