import { injectable, postConstruct } from "inversify";
import { Connection } from "typeorm";
import RepositoryFactory from "../../Domain/Repositories/RepositoryFactory";
import UserRepository from "../../Domain/Repositories/UserRepository";
import UserRoleRepository from "../../Domain/Repositories/UserRoleRepository";
import PostRepository from "../../Domain/Repositories/PostRepository";
import SessionRepository from "../../Domain/Repositories/SessionRepository";
import User from "../../Domain/Entities/User";
import UserRole from "../../Domain/ValueObjects/UserRole";
import Post from "../../Domain/Entities/Post";
import Session from "../../Domain/Entities/Session";


@injectable()
class RepositoryFactoryImpl implements RepositoryFactory {

    private connection: Connection;


    constructor() {
       this.connection = new Connection({
            type: "mysql",
            host: process.env.DATABASE_HOST,
            port: 3306,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DB,
            synchronize: true,
            logging: true,
            entities: [User, UserRole, Post, Session]
        });
        //this.connectIfNotConnected();
    }


    public getUserRepository() {
        this.connectIfNotConnected();
        return this.connection.getCustomRepository(UserRepository);
    }

    public getUserRoleRepository() {
        this.connectIfNotConnected();
        return this.connection.getCustomRepository(UserRoleRepository);
    }

    public getPostRepository() {
        this.connectIfNotConnected();
        return this.connection.getCustomRepository(PostRepository);
    }

    public getSessionRepository() {
        this.connectIfNotConnected();
        return this.connection.getCustomRepository(SessionRepository);
    }
    
    private connectIfNotConnected(): void {
        if (this.connection.isConnected) { return; }
        try {
            this.connection.connect();
        }
        catch (error) {
            throw new Error().message = error.message;
        }
    }

    @postConstruct()
    public async connect() {
        try {
            this.connection.connect();
        }
        catch (error) {
            throw new Error().message = error.message;
        }
    }

}

export default RepositoryFactoryImpl;
