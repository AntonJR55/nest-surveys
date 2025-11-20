import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Group } from "./groups.model";
import { GroupCode } from "./groups.type";

@Injectable()
export class GroupsService {
    constructor(@InjectModel(Group) private groupRepository: typeof Group) {}

    async getAllGroups() {
        return await this.groupRepository.findAll();
    }

    async createGroup(groupCode: GroupCode) {
        try {
            await this.groupRepository.create({ groupCode });

            return {
                status: "success",
                message: "Группа успешно создана",
            };
        } catch (error) {
            throw error;
        }
    }
}
