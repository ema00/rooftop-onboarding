import { injectable } from "inversify";
import { Connection } from "typeorm";
import User from "../../Domain/Entities/User";
import UserRole from "../../Domain/ValueObjects/UserRole";
import Post from "../../Domain/Entities/Post";
import Session from "../../Domain/Entities/Session";


@injectable()
class ConnectionProvider {

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
    }


    public getConnection() {
        return this.connection;
    }

    public async connect() {
        await this.connection.connect();
    }

}

export default ConnectionProvider;
