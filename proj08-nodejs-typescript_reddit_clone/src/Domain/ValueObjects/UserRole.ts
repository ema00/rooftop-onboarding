import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import UserRoleType from "./UserRoleType";


@Entity()
class UserRole {

    @PrimaryGeneratedColumn()
    public readonly id: number;
    
    @Column("enum", { enum: UserRoleType, default: UserRoleType.GUEST, unique: true })
    public readonly type: UserRoleType;

    
    constructor(type: UserRoleType) {
        this.type = type;
    }


    public equals(other: UserRole): boolean {
        return this.type.valueOf() == other.type.valueOf();
    }

}

export default UserRole;
