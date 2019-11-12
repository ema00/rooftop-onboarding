import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import UserRoleType from "./UserRoleType";


@Entity()
class UserRole extends BaseEntity {

    @PrimaryGeneratedColumn()
    public readonly id: number;
    
    @Column("enum", { enum: UserRoleType, default: UserRoleType.GUEST, unique: true })
    public readonly type: UserRoleType;

    
    constructor(type: UserRoleType) {
        super();
        this.type = type;
    }


    public equals(other: UserRole): boolean {
        return this.type.valueOf() == other.type.valueOf();
    }

}

export default UserRole;
