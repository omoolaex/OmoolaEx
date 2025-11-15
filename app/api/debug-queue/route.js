// app/api/debug-queue/route.js
import { redis, QUEUE_KEY, PROCESSING_KEY, DEAD_LETTER_KEY } from "@/lib/queue";

export async function GET() {
  const queue = await redis.lrange(QUEUE_KEY, 0, -1);
  const processing = await redis.lrange(PROCESSING_KEY, 0, -1);
  const dead = await redis.lrange(DEAD_LETTER_KEY, 0, -1);

  return new Response(JSON.stringify({ queue, processing, dead }, null, 2), { status: 200 });
}
