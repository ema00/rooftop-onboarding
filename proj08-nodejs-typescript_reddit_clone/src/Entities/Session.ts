import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { OneToOne } from "typeorm";
import User from "./User";


@Entity()
class Session extends BaseEntity {

    private _id: number;

    private _user: User;

    private _token: string;


    public constructor(user: User, token: string) {
        super();
        this._user = user;
        this._token = token;
    }


    @PrimaryGeneratedColumn()
    public get id(): number { return this._id; }

    @OneToOne(type => User)
    public get user(): User { return this._user; }
    public set(value: User) { this._user = value; }

    @Column()
    public get token(): string { return this._token; }
    public set token(value: string) { this._token = value; }

}

export default Session;
