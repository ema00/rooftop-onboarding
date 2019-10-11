import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
class User extends BaseEntity {


    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private pass: string;

    @Column()
    private name: string;

    @Column()
    private dni: number;
    

    public getId() {
        return this.id;
    }

    public getPass() {
        return this.pass;
    }

    public setPass(id: number) {
        this.id = id;
    }

    public getName() {
        return this.name;
    }

    public setName(id: number) {
        this.id = id;
    }

    public getDni() {
        return this.dni;
    }

    public setDni(id: number) {
        this.id = id;
    }

}

export default User;
