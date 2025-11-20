import * as bcrypt from "bcryptjs";
import {
    ConflictException,
    Injectable,
    NotFoundException,
    PreconditionFailedException,
    UnauthorizedException,
} from "@nestjs/common";
import { CreatePasswordDto } from "../users/dto/create-password.dto";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async createPassword(dto: CreatePasswordDto) {
        const user = await this.usersService.getUserByUserName(dto.userName);
        if (!user) {
            throw new NotFoundException("Пользователь не найден");
        }

        const userJson = user.toJSON();
        if (userJson.password !== null) {
            throw new ConflictException("Пароль для пользователя уже создан");
        }

        const hashPassword = await bcrypt.hash(dto.password, 10);

        await this.usersService.createPassword(dto.userName, hashPassword);

        return {
            message: "Пароль успешно создан",
        };
    }

    async login(dto: LoginDto) {
        const userJson = await this.validateLoginCredentials(dto);
        const { password, ...userWithoutPassword } = userJson;

        let userData: any;

        if (userJson.roleNameEn === "student") {
            userData =
                await this.usersService.getStudentData(userWithoutPassword);
        } else if (userJson.roleNameEn === "teacher") {
            userData =
                await this.usersService.getTeacherData(userWithoutPassword);
        } else if (userJson.roleNameEn === "admin") {
            return {
                status: "success",
                userData: userWithoutPassword,
            };
        }

        return userData;
    }

    private async validateLoginCredentials(dto: LoginDto) {
        const user = await this.usersService.getUserByUserName(dto.userName);
        if (!user) {
            throw new UnauthorizedException(
                "Неверное имя пользователя или пароль"
            );
        }

        const userJson = user.toJSON();
        if (userJson.password === null) {
            throw new PreconditionFailedException(
                "Пароль для пользователя не создан"
            );
        }

        const passwordEquals = await bcrypt.compare(
            dto.password,
            userJson.password
        );
        if (!passwordEquals) {
            throw new UnauthorizedException(
                "Неверное имя пользователя или пароль"
            );
        }

        return userJson;
    }
}
