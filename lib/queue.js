// lib/queue.js
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// ✅ SINGLE PREFIX (VERY IMPORTANT)
const PREFIX = process.env.UPSTASH_QUEUE_PREFIX || "omoola";

// Redis keys
export const QUEUE_KEY = `${PREFIX}:queue:tasks`;
export const PROCESSING_KEY = `${PREFIX}:queue:processing`;
export const DEAD_LETTER_KEY = `${PREFIX}:queue:dead_letter`;

const DEFAULT_BATCH = parseInt(process.env.QUEUE_BATCH_SIZE || "10", 10);
const DEFAULT_MAX_ATTEMPTS = parseInt(process.env.QUEUE_MAX_ATTEMPTS || "5", 10);

// ---------- enqueue ----------
export async function enqueueJob(type, payload = {}, options = {}) {
  const job = {
    id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    type,
    payload,
    attempts: 0,
    maxAttempts: options.maxAttempts || DEFAULT_MAX_ATTEMPTS,
    createdAt: Date.now(),
  };

  await redis.rpush(QUEUE_KEY, JSON.stringify(job));
  console.log(`[queue] Enqueued job: ${job.id} (${type})`);
  return job;
}

// ---------- process batch ----------
export async function processBatch(workerFn, batchSize = DEFAULT_BATCH) {
  const processed = { success: 0, failed: 0, requeued: 0, dead: 0 };

  for (let i = 0; i < batchSize; i++) {
    const jobStr = await redis.lpop(QUEUE_KEY);
    if (!jobStr) break;

    await redis.rpush(PROCESSING_KEY, jobStr);

    let job;
    try {
      job = JSON.parse(jobStr);
    } catch (err) {
      await redis.lrem(PROCESSING_KEY, 1, jobStr);
      processed.failed++;
      continue;
    }

    try {
      await workerFn(job);
      await redis.lrem(PROCESSING_KEY, 1, jobStr);
      processed.success++;
    } catch (err) {
      job.attempts += 1;
      await redis.lrem(PROCESSING_KEY, 1, jobStr);

      if (job.attempts >= job.maxAttempts) {
        await redis.lpush(DEAD_LETTER_KEY, JSON.stringify({
          ...job,
          failedAt: Date.now(),
          lastError: err.message || String(err),
        }));
        processed.dead++;
      } else {
        await redis.rpush(QUEUE_KEY, JSON.stringify(job));
        processed.requeued++;
      }

      processed.failed++;
    }
  }

  return processed;
}
