import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { OneToOne } from "typeorm";
import User from "./User";


@Entity()
class Session extends BaseEntity {

    private _id: number;

    private _userId: number;

    private _token: string;


    public constructor(userId: number, token: string) {
        super();
        this._userId = userId;
        this._token = token;
    }


    @PrimaryGeneratedColumn()
    public get id(): number { return this._id; }
    public set id(value: number) { this._id = value; }

    @OneToOne(type => User)
    public get userId(): number { return this._userId; }

    @Column({ nullable: false })
    public get token(): string { return this._token; }
    public set token(value: string) { this._token = value; }

}

export default Session;
