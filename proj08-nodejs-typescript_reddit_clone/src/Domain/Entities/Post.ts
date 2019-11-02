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

    @Column()
    public readonly title: string;

    @Column()
    public content: string;

    @ManyToOne(type => User, user => user.posts)
    public readonly user: User;

}

export default Post;