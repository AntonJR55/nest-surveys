import { Length } from "class-validator";
import type { Password, UserName } from "../users.type";

export class CreatePasswordDto {
    readonly userName: UserName;

    @Length(5, 25, {
        message: "Пароль должен быть не меньше 5 и не больше 25 символов",
    })
    readonly password: Password;
}
