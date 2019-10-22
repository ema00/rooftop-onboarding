import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";


@Entity()
class Session extends BaseEntity {

    @PrimaryColumn()
    readonly userId: number;

    @Column({ update: true })
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
