import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateStudentDto } from "./dto/create-student.dto";
import { CreateStaffDto } from "./dto/create-staff.dto";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post("student")
    createStudent(@Body() dto: CreateStudentDto) {
        return this.usersService.createStudent(dto);
    }

    @Post("staff")
    createStaff(@Body() dto: CreateStaffDto) {
        return this.usersService.createStaff(dto);
    }

    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }
}
