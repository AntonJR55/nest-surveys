import {
    Model,
    Table,
    Column,
    DataType,
    BelongsToMany,
} from "sequelize-typescript";

interface IQuestionAttrs {}

@Table({ tableName: "Questions", timestamps: false })
export class Question extends Model<Question, IQuestionAttrs> {}
