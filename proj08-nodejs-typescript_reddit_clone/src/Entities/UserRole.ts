import { Entity, BaseEntity, Column, ManyToMany } from "typeorm";
import User from "../Entities/User";


enum Role {
    ADMIN = "admin",
    ZEEPER = "zeeper",
    GUEST = "guest",
}


@Entity()
class UserRole extends BaseEntity {
    
    @Column({ type: "enum", enum: Role, default: Role.GUEST, nullable: false })
    private role: Role;

    @ManyToMany(type => User, user => user.getRoles)
    private users: User[];


    public getRole(): Role {
        return this.role;
    }

    public setRole(role: Role) {
        this.role = role;
    }

    public getUsers(): User[] {
        return this.users;
    }

    public setUsers(users: User[]) {
        this.users = users;
    }

}

export default UserRole;
