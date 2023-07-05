import { Router } from "https://deno.land/x/oak@v12.5.0/router.ts";
import {
  addToQueue,
  getLatestFromQueue,
  getQueueItemAt,
  ingestMockData,
} from "./dao.ts";

const router = new Router({ prefix: "/api/v1/queue" });

// const validatorPostMiddleWare = (ctx: any, next: any) => {
//   if (!ctx.request.hasBody) {
//     ctx.response.status = 400;
//     ctx.response.body = "No body provided";
//     return;
//   }
//   next();
// };

// const validateMiddleWare = (ctx: any, next: any) => {
//   if (ctx.params.queue === undefined) {
//     ctx.response.status = 400;
//     ctx.response.body = "No queue provided";
//     return;
//   }
//   next();
// };

router.get("/:queue", async (ctx) => {
  await ingestMockData(ctx.params.queue);
  ctx.response.body = "queue is reset";
});
router.get("/:queue/latest", async (ctx) => {
  const result = await getLatestFromQueue(ctx.params.queue);
  ctx.response.body = result;
});

router.get("/:queue/:id", async (ctx) => {
  const result = await getQueueItemAt(ctx.params.queue, ctx.params.id);
  ctx.response.body = result;
});
router.post("/:queue", async (ctx) => {
  const body = await ctx.request.body().value;
  const result = await addToQueue(ctx.params.queue, body);
  ctx.response.body = result;
});

export { router as default };
