import { Length } from "class-validator";
import type { RoleName } from "../../roles/roles.type";
import type { UserName } from "../users.type";

export class CreateStaffDto {
    @Length(5, 20, {
        message:
            "Имя пользователя должно быть не меньше 5 и не больше 20 символов",
    })
    readonly userName: UserName;

    readonly roleNameEn: RoleName;
}
