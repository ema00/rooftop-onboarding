import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import UserRoleType from "./UserRoleType";


@Entity()
class UserRole extends BaseEntity {

    @PrimaryGeneratedColumn()
    public readonly id: number;
    
    @Column({ type: "enum", enum: UserRoleType, default: UserRoleType.GUEST,
        unique: true, nullable: false })
    public readonly type: UserRoleType;


    constructor(type: UserRoleType) {
        super();
        this.type = type;
    }

}

export default UserRole;
