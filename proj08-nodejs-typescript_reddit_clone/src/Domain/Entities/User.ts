import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { JoinTable, OneToMany, ManyToMany } from "typeorm";
import UserRole from "../ValueObjects/UserRole";
import UserRoleType from "../ValueObjects/UserRoleType";
import Post from "./Post";


@Entity()
class User {

    @PrimaryGeneratedColumn()
    public readonly id: number;

    @ManyToMany(type => UserRole, { eager: true, nullable: false, cascade: ["insert"] })
    @JoinTable()
    public roles: UserRole[];

    @OneToMany(type => Post, post => post.user)
    public posts: Post[];

    private _name: string;

    private _pass: string;

    private _dni: number;

    private _blocked: boolean;

    private _email: string;
    

    @Column({ nullable: false })
    public get pass(): string { return this._pass; }
    public set pass(value: string) { this._pass = value; }

    @Column({ unique: true, nullable: false })
    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }
    
    @Column()
    public get dni(): number { return this._dni; }
    public set dni(value: number) { this._dni = value; }

    @Column({ default: false, nullable: false })
    public get blocked(): boolean { return this._blocked; }
    public set blocked(value: boolean) { this._blocked = value; }

    @Column({ default: "", nullable: false })
    public get email(): string { return this._email; }
    public set email(value: string) { this._email = value; }


    public canPost(): boolean {
        return this.hasRoleType(UserRoleType.ADMIN) || this.hasRoleType(UserRoleType.ZEEPER);
    }

    public canComment(): boolean {
        return this.hasRoleType(UserRoleType.ADMIN) || this.hasRoleType(UserRoleType.ZEEPER);
    }

    public canReadComments(): boolean {
        return this.hasRoleType(UserRoleType.ADMIN) || this.hasRoleType(UserRoleType.ZEEPER);
    }
    
    public hasRole(role: UserRole): boolean {
        return !!this.roles && !!(this.roles.find((r: UserRole) => role.equals(r)));
    }

    public hasRoleType(roleType: UserRoleType): boolean {
        return !!this.roles && !!(this.roles.find((r: UserRole) => r.type.valueOf() == roleType));
    }

    public addRole(role: UserRole) {
        if (!this.roles) {
            this.roles = [];
        }
        if (!this.hasRole(role)) {
            this.roles.push(role);
        }
    }

    public removeRole(role: UserRole) {
        if (!this.roles) { return; }
        if (this.hasRole(role)) {
            this.roles = this.roles.filter((u: UserRole) => u.type !== role.type);
        }
    }

    public toJson() {
        return { 
            user: {
                id: this.id,
                name: this._name,
                roles: this.roles,
                dni: this._dni,
                email: this._email,
            }
        }
    }

}

export default User;
