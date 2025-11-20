import { DisciplineName } from "../disciplines.type";
import { UserId } from "../../users/users.type";
import { GroupCode } from "../../groups/groups.type";

export class CreateDisciplineDto {
    readonly disciplineName: DisciplineName;
    readonly teachersIds: UserId[];
    readonly groupsCodes: GroupCode[];
}
