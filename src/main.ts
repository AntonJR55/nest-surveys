import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function start() {
    const PORT = process.env.PORT || 5000;

    const app = await NestFactory.create(AppModule);

    app.enableCors({
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
        allowedHeaders: "Content-Type, Authorization, X-Requested-With",
    });

    app.setGlobalPrefix("api");

    await app.listen(PORT, () =>
        console.log(`Server started on port = ${PORT}`)
    );
}

start();
