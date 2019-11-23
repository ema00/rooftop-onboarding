import { Entity, PrimaryColumn, Column } from "typeorm";


@Entity()
class Session {

    @PrimaryColumn()
    readonly userId: number;

    @Column({ update: true })
    readonly token: string;


    public constructor(userId: number, token: string) {
        this.userId = userId;
        this.token = token;
    }


    public equals(other: Session): boolean {
        return this.userId == other.userId && this.token.valueOf() == other.token.valueOf();
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
