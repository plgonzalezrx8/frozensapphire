/**
 * BullMQ queue factory for background jobs.
 * Extend with named queues for media, imports, exports, and privacy tasks.
 */
import { Queue } from "bullmq";

const connection = {
  url: process.env.REDIS_URL,
};

/**
 * Creates a queue instance with shared Redis connection config.
 */
export function createQueue(name: string) {
  return new Queue(name, { connection });
}
