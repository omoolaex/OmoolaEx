// lib/queue.js
import { Redis } from "@upstash/redis";

// ✅ Redis client
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Redis keys
export const QUEUE_KEY = `${process.env.UPSTASH_QUEUE_PREFIX || "omoola"}:queue:tasks`;
export const PROCESSING_KEY = `${process.env.UPSTASH_QUEUE_PREFIX || "omoola"}:queue:processing`;
export const DEAD_LETTER_KEY = `${process.env.UPSTASH_REDIS_PREFIX || "omoola"}:dead_letter`;

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

  // Always store as JSON string
  await redis.rpush(QUEUE_KEY, JSON.stringify(job));
  console.log(`[queue] Enqueued job: ${job.id} (${type})`);
  return job;
}

// ---------- process batch ----------
export async function processBatch(workerFn, batchSize = DEFAULT_BATCH) {
  const processed = { success: 0, failed: 0, requeued: 0, dead: 0 };

  for (let i = 0; i < batchSize; i++) {
    // 1️⃣ Pop job
    const jobStr = await redis.lpop(QUEUE_KEY);
    if (!jobStr) break;

    // 2️⃣ Push to processing
    await redis.rpush(PROCESSING_KEY, jobStr);

    let job;
    try {
      // ✅ Safely parse string or use object directly
      job = typeof jobStr === "string" ? JSON.parse(jobStr) : jobStr;
    } catch (err) {
      console.error("❌ JSON parse failed for job:", jobStr, err);
      await redis.lrem(PROCESSING_KEY, 1, jobStr);
      processed.failed++;
      continue;
    }

    try {
      // 3️⃣ Execute job
      await workerFn(job);

      // 4️⃣ Success: remove from processing
      await redis.lrem(PROCESSING_KEY, 1, jobStr);
      console.log(`[queue] Job processed successfully: ${job.id}`);
      processed.success++;
    } catch (err) {
      console.error("⚠️ WORKER JOB ERROR:", job.type, err);
      job.attempts = (job.attempts || 0) + 1;

      // Remove from processing
      await redis.lrem(PROCESSING_KEY, 1, jobStr);

      if (job.attempts >= (job.maxAttempts || DEFAULT_MAX_ATTEMPTS)) {
        // Dead-letter
        await redis.lpush(DEAD_LETTER_KEY, JSON.stringify({
          ...job,
          failedAt: Date.now(),
          lastError: String(err.message || err),
        }));
        processed.dead++;
        console.warn(`[queue] Job moved to dead-letter: ${job.id}`);
      } else {
        // Requeue for retry
        await redis.rpush(QUEUE_KEY, JSON.stringify(job));
        processed.requeued++;
        console.warn(`[queue] Job requeued: ${job.id} (attempt ${job.attempts})`);
      }

      processed.failed++;
    }
  }

  return processed;
}
