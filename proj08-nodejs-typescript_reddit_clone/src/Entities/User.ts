import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public pass: string;

    @Column()
    public name: string;

    @Column()
    public dni: number;
    
}

export default User;
