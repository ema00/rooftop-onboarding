import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity} from "typeorm";
import { User } from "./User";
import { Category } from "./Category";


@Entity()
export class Post extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(type => User, user => user.posts)
    craftedBy: User;

    @ManyToOne(type => Category)
    category: Category;

}
