import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { JoinTable, ManyToMany } from "typeorm";
import UserRole from "./UserRole";


@Entity()
class User extends BaseEntity {

    private _id: number;

    private _name: string;

    private _pass: string;

    private _roles: UserRole[];

    private _dni: number;

    private _blocked: boolean;

    private _email: string;
    

    @PrimaryGeneratedColumn()
    public get id(): number { return this._id; }
    public set id(value: number) { this._id = value; }

    @Column({ nullable: false })
    public get pass(): string { return this._pass; }
    public set pass(value: string) { this._pass = value; }

    @Column({ unique: true, nullable: false })
    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }

    @ManyToMany(type => UserRole)
    @JoinTable()
    public get roles(): UserRole[] { return this._roles; }
    public set roles(value: UserRole[]) { this._roles = value; }

    @Column()
    public get dni(): number { return this._dni; }
    public set dni(value: number) { this._dni = value; }

    @Column({ default: false, nullable: false })
    public get blocked(): boolean { return this._blocked; }
    public set blocked(value: boolean) { this._blocked = value; }

    @Column({ default: "", nullable: false })
    public get email(): string { return this._email; }
    public set email(value: string) { this._email = value; }

    public hasRole(role: UserRole): boolean {
        return !!this.roles && !!(this.roles.find((r: UserRole) => r.type === role.type));
    }

    public addRole(role: UserRole) {
        if (!this.hasRole(role)) {
            this.roles.push(role);
        }
    }

    public removeRole(role: UserRole) {
        if (this.hasRole(role)) {
            this.roles = this.roles.filter((u: UserRole) => u.type !== role.type);
        }
    }

}

export default User;
