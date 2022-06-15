import { BaseData } from './BaseData';


export class RecipesDatabase extends BaseData {
  private static TABLE_NAME = "cook_recipes";

  public async createRecipe(
    id: string,
    title: string,
    description: string,
    creation_at: string,
    author_id: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          title,
          description,
          creation_at,
          author_id
        })
        .into(RecipesDatabase.TABLE_NAME);

      console.log("Receita criada com sucesso!🤩");
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async getRecipeById(id: string): Promise<any> {
    try {
      const result = await this.getConnection()
        .select("title", "description")
        .where({ id })
        .from(RecipesDatabase.TABLE_NAME);

      return result[0];
    } catch (error: any) {
      throw new Error(error);
    }
  }
}