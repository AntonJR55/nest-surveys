import { Body, Controller, Get, Post } from "@nestjs/common";
import { DisciplinesService } from "./disciplines.service";
import { CreateDisciplineDto } from "./dto/create-discipline.dto";

@Controller("disciplines")
export class DisciplinesController {
    constructor(private disciplinesService: DisciplinesService) {}

    @Get("detailed")
    getAllDisciplinesWithGroupsAndTeachers() {
        return this.disciplinesService.getAllDisciplinesWithGroupsAndTeachers();
    }

    @Post()
    async createDiscipline(@Body() dto: CreateDisciplineDto) {
        return this.disciplinesService.createDiscipline(dto);
    }
}
