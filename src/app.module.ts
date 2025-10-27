import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { DisciplinesModule } from "./disciplines/disciplines.module";
import { UsersModule } from "./users/users.module";
import { GroupsModule } from "./groups/groups.module";
import { QuestionsController } from './questions/questions.controller';
import { QuestionsService } from './questions/questions.service';
import { QuestionsModule } from './questions/questions.module';

@Module({
    controllers: [QuestionsController],
    providers: [QuestionsService],
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env",
        }),
        SequelizeModule.forRoot({
            dialect: "mssql",
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            autoLoadModels: true,
        }),
        DisciplinesModule,
        UsersModule,
        GroupsModule,
        QuestionsModule,
    ],
})
export class AppModule {}
