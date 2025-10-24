import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { DisciplinesService } from './disciplines/disciplines.service';
import { DisciplinesController } from './disciplines/disciplines.controller';
import { DisciplinesModule } from './disciplines/disciplines.module';
import { UsersModule } from './users/users.module';

@Module({
    controllers: [DisciplinesController],
    providers: [DisciplinesService],
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
    ],
})
export class AppModule {}
