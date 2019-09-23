import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity} from "typeorm";


@Entity()
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

}
