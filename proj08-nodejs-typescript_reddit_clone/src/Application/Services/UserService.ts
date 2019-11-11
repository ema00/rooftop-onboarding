import User from "../../Domain/Entities/User";


interface UserService {

    create(
        name: string, dni: number, password: string, role: string, email: string
    ): Promise<User>;

    findOne(id: number): Promise<User | undefined>;

    update(id: number, dni: number, email: string): Promise<User | undefined>;

}

export default UserService;
