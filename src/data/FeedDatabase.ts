import { BaseData } from "./BaseData";

export class FeedDatabase extends BaseData {
  public async getFeed(userId: string): Promise<any> {
    try {
      const result = await this.getConnection().raw(`
    SELECT cook_recipes.id, title, description, creation_at, cook_users.id, cook_users.name
    From cook_recipes
    JOIN cook_users
    ON cook_recipes.author_id = cook_users.id;
     `);
      return result[0];
    } catch (error: any) {
      throw new Error(error);
    }
  }
}