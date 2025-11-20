import { Module } from "@nestjs/common";
import { GroupsService } from "./groups.service";
import { GroupsController } from "./groups.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Group } from "./groups.model";

@Module({
    providers: [GroupsService],
    controllers: [GroupsController],
    imports: [SequelizeModule.forFeature([Group])],
})
export class GroupsModule {}
