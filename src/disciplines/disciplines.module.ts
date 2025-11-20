import { Module } from "@nestjs/common";
import { DisciplinesService } from "./disciplines.service";
import { DisciplinesController } from "./disciplines.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Discipline } from "./disciplines.model";
import { TeacherDiscipline } from "../teacher-disciplines/teacher-disciplines.model";
import { GroupDiscipline } from "../group-disciplines/group-disciplines.model";

@Module({
    providers: [DisciplinesService],
    controllers: [DisciplinesController],
    imports: [
        SequelizeModule.forFeature([
            Discipline,
            TeacherDiscipline,
            GroupDiscipline,
        ]),
    ],
})
export class DisciplinesModule {}
