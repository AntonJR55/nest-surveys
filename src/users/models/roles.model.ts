import { Model, Table, Column, DataType } from "sequelize-typescript";
import type { RoleName } from "../../types/users";

interface IRoleAttrs {
    roleName: RoleName;
}

@Table({ tableName: "Roles", timestamps: false })
export class Role extends Model<Role, IRoleAttrs> {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
        field: "RoleName",
    })
    roleName: RoleName;
}
