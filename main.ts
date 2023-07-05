import { Application } from "https://deno.land/x/oak@v12.5.0/application.ts";
import queueRouter from "./src/queue_router.ts";

const app = new Application();

app.use(queueRouter.routes());
app.use(queueRouter.allowedMethods());
await app.listen({ port: 8000 });
