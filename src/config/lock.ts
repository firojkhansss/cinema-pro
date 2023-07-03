import Redis from "ioredis";
import { promisify } from "util";

class Lock {
  private client: Redis;
  private getAsync: any;
  private setAsync: any;
  private delAsync: any;

  constructor() {
    this.client = new Redis();
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  async acquire(lockKey: string): Promise<boolean> {
    const result = await this.setAsync(lockKey, "locked", "NX", "EX", 10);
    return result === "OK";
  }

  async release(lockKey: string): Promise<boolean> {
    const result = await this.delAsync(lockKey);
    return result === 1;
  }
}

export { Lock };
