import { Entity, BaseEntity } from "typeorm";
import { PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import User from "./User";


@Entity()
class Post extends BaseEntity {

    @PrimaryGeneratedColumn()
    public readonly id: number;

    @CreateDateColumn()
    public readonly createDate: string;

    @UpdateDateColumn()
    public updateDate: string;

    @Column({ unique: true })
    public readonly title: string;

    @Column()
    public content: string;

    @ManyToOne(type => User, user => user.posts)
    public readonly user: User;


    constructor(title: string, content: string, user: User) {
        super();
        this.title = title;
        this.content = content;
        this.user = user;
    }


    public toJson() {
        return {
            post: {
                id: this.id,
                title: this.title,
                content: this.content,
                createDate: this.createDate,
                updateDate: this.updateDate,
                user: this.user.toJson().user,
            }
        }
    }

}

export default Post;