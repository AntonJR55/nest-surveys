import type { UserName, Password } from "../../users/users.type";

export class LoginDto {
    readonly userName: UserName;
    readonly password: Password;
}
