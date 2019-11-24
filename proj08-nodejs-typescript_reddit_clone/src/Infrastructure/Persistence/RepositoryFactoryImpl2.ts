import { injectable, inject } from "inversify";
import TYPES from "../../types";
import { Connection } from "typeorm";
import ConnectionProvider from "../Persistence/ConnectionProvider";
import RepositoryFactory from "../../Domain/Repositories/RepositoryFactory";
import UserRepository from "../../Domain/Repositories/UserRepository";
import UserRoleRepository from "../../Domain/Repositories/UserRoleRepository";
import PostRepository from "../../Domain/Repositories/PostRepository";
import SessionRepository from "../../Domain/Repositories/SessionRepository";


@injectable()
class RepositoryFactoryImpl2 implements RepositoryFactory {

    private connectionProvider: ConnectionProvider;
    private connection: Connection;


    constructor(@inject(TYPES.ConnectionProvider) connectionProvider: ConnectionProvider) {
       this.connectionProvider = connectionProvider;
       this.connection = this.connectionProvider.getConnection();
    }


    public getUserRepository() {
        return this.connection.getCustomRepository(UserRepository);
    }

    public getUserRoleRepository() {
        return this.connection.getCustomRepository(UserRoleRepository);
    }

    public getPostRepository() {
        return this.connection.getCustomRepository(PostRepository);
    }

    public getSessionRepository() {
        return this.connection.getCustomRepository(SessionRepository);
    }

    public async connect() {
        try {
            this.connection.connect();
        }
        catch (error) {
            throw new Error().message = error.message;
        }
    }

}

export default RepositoryFactoryImpl2;
