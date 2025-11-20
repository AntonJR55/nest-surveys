import {
    Model,
    Table,
    Column,
    DataType,
    BelongsTo,
    HasMany,
    BelongsToMany,
} from "sequelize-typescript";
import type { Password, UserId, UserName } from "./users.type";
import type { RoleName } from "../roles/roles.type";
import { Role } from "../roles/roles.model";
import { TeacherDiscipline } from "../teacher-disciplines/teacher-disciplines.model";
import { Discipline } from "../disciplines/disciplines.model";
import { StudentGrade } from "../student-grades/student-grades.model";
import { GroupStudent } from "../group-students/group-students.model";

interface IUserAttrs {
    userId?: UserId;
    userName: UserName;
    password?: Password;
    roleNameEn: RoleName;
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
        type: DataType.STRING(50),
        allowNull: false,
        field: "UserName",
    })
    userName: UserName;

    @Column({
        type: DataType.STRING(100),
        allowNull: true,
        field: "Password",
    })
    password: Password;

    @Column({
        type: DataType.STRING(25),
        allowNull: false,
        field: "RoleNameEN",
    })
    roleNameEn: RoleName;

    @BelongsTo(() => Role, "roleNameEn")
    role: Role;

    @HasMany(() => GroupStudent, "studentId")
    groupStudents: GroupStudent[];

    @HasMany(() => StudentGrade, "studentId")
    studentGrades: StudentGrade[];

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
