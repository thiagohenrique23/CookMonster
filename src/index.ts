import express from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { signup } from './endpoints/users/signup';
import { login } from './endpoints/users/login';
import { postRecipe } from './endpoints/recipes/postRecipe';
import { getFeed } from './endpoints/recipes/getFeed';
import getRecipeById from './endpoints/recipes/getRecipeById';

const app = express();
dotenv.config();
app.use(express.json());

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor está rodando em http://localhost:${address.port} 😎`);
  } else {
    console.error(`Error ⚠️`);
  }
});

app.post("/signup", signup);
app.post("/login", login)
app.post("/recipes", postRecipe)
app.get("/user/feed", getFeed)
app.get("/recipe/:id", getRecipeById);