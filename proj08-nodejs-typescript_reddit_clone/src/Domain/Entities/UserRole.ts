import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import UserRoleType from "./UserRoleType";


@Entity()
class UserRole extends BaseEntity {

    @PrimaryGeneratedColumn()
    public readonly id: number;
    
    private _type: UserRoleType;


    constructor(type: UserRoleType) {
        super();
        this._type = type;
    }


    @Column({ type: "enum", enum: UserRoleType, default: UserRoleType.GUEST,
        unique: true, nullable: false })
    public get type(): UserRoleType { return this._type; }
    public set type(value: UserRoleType) { this._type = value; }

}

export default UserRole;
