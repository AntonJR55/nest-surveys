import { Body, Controller, Post } from "@nestjs/common";
import { CreatePasswordDto } from "../users/dto/create-password.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/password")
    createPassword(@Body() dto: CreatePasswordDto) {
        return this.authService.createPassword(dto);
    }

    @Post("/login")
    async login(@Body() dto: LoginDto) {
        const res = await this.authService.login(dto);

        return res;
    }
}
