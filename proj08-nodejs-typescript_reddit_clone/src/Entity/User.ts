import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public pass: number;

    @Column()
    public name: string;

    @Column()
    public dni: number;
    
}

export default User;
