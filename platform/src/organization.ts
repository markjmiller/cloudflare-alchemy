import { DurableObject } from "cloudflare:workers";
import { User, UserProperties, Users } from "../types/app";

export class Organization extends DurableObject<Env> {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
  }

  async getUsers(): Promise<Users> {
    return Array.from(await this.ctx.storage.list()).map((x) => x[1] as User);
  }

  async createUser(properties: UserProperties): Promise<User> {
    const user: User = {
      id: crypto.randomUUID().replace(/-/g, ""),
      ...properties,
    };
    await this.ctx.storage.put(user.id, user);
    return user;
  }

  async getUserById(id: string): Promise<User | undefined> {
    return await this.ctx.storage.get(id);
  }

  async updateUserById(
    id: string,
    propsToUpdate: UserProperties,
  ): Promise<User | undefined> {
    const user = await this.getUserById(id);
    if (!user) {
      return;
    }
    const mergedUser = { ...propsToUpdate, ...user };
    await this.ctx.storage.put(id, mergedUser);
    return user;
  }

  async deleteUserById(id: string): Promise<boolean> {
    const user = await this.getUserById(id);
    if (!user) {
      return false;
    }
    await this.ctx.storage.delete(id);
    return true;
  }
}
