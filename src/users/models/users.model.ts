import {
    Model,
    Table,
    Column,
    DataType,
    BelongsTo,
    HasMany,
    BelongsToMany,
} from "sequelize-typescript";
import type { Password, UserId, UserName, RoleName } from "../../types/users";
import { Role } from "./roles.model";
import { TeacherDiscipline } from "./teacher-disciplines.model";
import { Discipline } from "../../disciplines/disciplines.model";

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

    @BelongsTo(() => Role, "roleName")
    role: Role;

    @HasMany(() => TeacherDiscipline, "teacherId")
    teacherDisciplines: TeacherDiscipline[];

    @BelongsToMany(
        () => Discipline,
        () => TeacherDiscipline,
        "teacherId",
        "disciplineId"
    )
    disciplines: Discipline[];
}
