import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateStudentDto } from "./dto/create-student.dto";
import { CreateEmployeeDto } from "./dto/create-employee.dto";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get("detailed")
    getAllUsersWithGroups() {
        return this.usersService.getAllUsersWithGroups();
    }

    @Get("teachers")
    getAllTeachers() {
        return this.usersService.getAllTeachers();
    }

    @Post("student")
    createStudent(@Body() dto: CreateStudentDto) {
        return this.usersService.createStudent(dto);
    }

    @Post("employee")
    createEmployee(@Body() dto: CreateEmployeeDto) {
        return this.usersService.createEmployee(dto);
    }
}
