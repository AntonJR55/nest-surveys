import {
    Model,
    Table,
    Column,
    DataType,
    BelongsTo,
} from "sequelize-typescript";
import type { GroupStudentId } from "./group-students.type";
import type { GroupCode } from "../groups/groups.type";
import type { UserId } from "../users/users.type";
import { Group } from "../groups/groups.model";
import { User } from "../users/users.model";

interface IGroupStudentAttrs {
    groupStudentId?: GroupStudentId;
    groupCode: GroupCode;
    studentId: UserId;
}

@Table({ tableName: "GroupStudents", timestamps: false })
export class GroupStudent extends Model<GroupStudent, IGroupStudentAttrs> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "GroupStudentID",
    })
    groupStudentId: GroupStudentId;

    @Column({
        type: DataType.CHAR(5),
        allowNull: false,
        field: "GroupCode",
    })
    groupCode: GroupCode;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "StudentID",
    })
    studentId: UserId;

    @BelongsTo(() => Group, "groupCode")
    group: Group;

    @BelongsTo(() => User, "studentId")
    student: User;
}
