export type user = {
  id: string
  name: string
  email: string
  password: string
}

export type recipe = {
  id: string
  title: string
  description: string
  createdAt: string
  authorId: string
}


export const userTableName = "cook_users"
export const recipeTableName = "cook_recipes"