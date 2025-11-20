import { Body, Controller, Get, Post } from "@nestjs/common";
import { GroupsService } from "./groups.service";
import type { GroupCode } from "./groups.type";

@Controller("groups")
export class GroupsController {
    constructor(private groupsService: GroupsService) {}

    @Get()
    getAllGroups() {
        return this.groupsService.getAllGroups();
    }

    @Post()
    async createGroup(@Body("groupCode") groupCode: GroupCode) {
        return await this.groupsService.createGroup(groupCode);
    }
}
