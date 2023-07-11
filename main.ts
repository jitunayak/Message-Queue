import { Application } from "https://deno.land/x/oak@v12.5.0/application.ts";
import queueRouter from "./src/queue_router.ts";
const PORT = Deno.env.get("PORT") as unknown as number || 8000;
const app = new Application();

app.use(queueRouter.routes());
app.use(queueRouter.allowedMethods());

console.log(`Server is running on port ${PORT} 🔥`);
await app.listen({ port: PORT });
