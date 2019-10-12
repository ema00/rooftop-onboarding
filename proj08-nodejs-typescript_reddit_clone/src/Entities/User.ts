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

    public setPass(pass: string) {
        this.pass = pass;
    }

    public getName() {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getDni() {
        return this.dni;
    }

    public setDni(dni: number) {
        this.dni = dni;
    }

}

export default User;
