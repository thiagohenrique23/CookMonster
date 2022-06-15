import { Request, Response } from 'express';
import moment from "moment";
import { BaseData } from '../../data/BaseData';
import { RecipesDatabase } from '../../data/RecipesDatabase';
import { Authenticator } from '../../services/Authenticator';
import { IdGenerator } from '../../services/IdGenerator';

export const postRecipe = async (req: Request, res: Response) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const today = moment();
    const creation_at = today.format("YYYY-MM-DD");

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    if (!title || !description || !creation_at) {
      throw new Error("Insert all required information");
    }

    const token = req.headers.authorization as string;

    const authenticator = new Authenticator();
    const author_id = authenticator.getData(token);

    const recipeDatabase = new RecipesDatabase();
    await recipeDatabase.createRecipe(
      title,
      description,
      creation_at,
      id,
      author_id.id
    );
    res.status(200).send({
      message: "Receita adicionada !🤩",
    });
  } catch (error: any) {
    res.status(400).send({
      message: error.sqlMessage || error.message,
    });
    res.status(401).send({
      message: "Unauthorized",
    });
  } finally {
    await BaseData.destroyConnection();
  }
};