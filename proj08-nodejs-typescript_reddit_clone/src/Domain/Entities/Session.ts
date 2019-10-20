import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";
import { OneToOne } from "typeorm";
import User from "./User";


@Entity()
class Session extends BaseEntity {

    private readonly NULL_TOKEN = "";


    private _user: User;

    private _token: string;


    public constructor(user: User, token: string) {
        super();
        this._user = user;
        this._token = token ? token : this.NULL_TOKEN;
    }


    @PrimaryColumn()
    @OneToOne(type => User)
    public get user(): User { return this._user; }

    @Column({ nullable: false, default: "" })
    public get token(): string { return this._token; }
    public set token(value: string) { this._token = value; }

    public isValid(): boolean {
        return this.token.valueOf() != this.NULL_TOKEN.valueOf();
    }

    public invalidateToken() {
        this.token = this.NULL_TOKEN;
    }

}

export default Session;
