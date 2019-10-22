import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";
import { OneToOne } from "typeorm";
import User from "./User";


@Entity()
class Session extends BaseEntity {

    @PrimaryColumn()
    @OneToOne(type => User)
    readonly userId: number;

    @Column()
    readonly token: string;


    public constructor(userId: number, token: string) {
        super();
        this.userId = userId;
        this.token = token;
    }


    public toJson() {
        return { 
            session: {
                userId: this.userId,
                token: this.token,
            }
        }
    }

}

export default Session;
