import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";


enum UserRoleType {
    ADMIN = "admin",
    ZEEPER = "zeeper",
    GUEST = "guest",
}


@Entity()
class UserRole extends BaseEntity {

    @PrimaryGeneratedColumn()
    public readonly id: number;
    
    private _type: UserRoleType;


    @Column({ type: "enum", enum: UserRoleType, default: UserRoleType.GUEST,
        unique: true, nullable: false })
    public get type(): UserRoleType { return this._type; }
    public set type(value: UserRoleType) { this._type = value; }

}

export default UserRole;
