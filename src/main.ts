import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// import cookieParser from "cookie-parser";

async function start() {
    const PORT = process.env.PORT || 5000;

    const app = await NestFactory.create(AppModule);

    app.enableCors({
        // origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
        allowedHeaders: "Content-Type, Authorization, X-Requested-With",
    });
    // app.use(cookieParser());
    // app.setGlobalPrefix("api");

    await app.listen(PORT, () =>
        console.log(`Server started on port = ${PORT}`)
    );
}

start();
