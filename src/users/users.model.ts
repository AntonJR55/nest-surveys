import { Model, Table, Column, DataType } from "sequelize-typescript";
import type { Password, RoleName, UserId, UserName } from "../types/users";

interface IUserAttrs {
    userId: UserId;
    userName: UserName;
    password: Password;
    roleName: RoleName;
}

@Table({ tableName: "Users", timestamps: false })
export class User extends Model<User, IUserAttrs> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "UserID",
    })
    userId: UserId;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "UserName",
    })
    userName: UserName;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "Password",
    })
    password: Password;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "RoleName",
    })
    roleName: RoleName;
}
