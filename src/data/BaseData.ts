import knex, { Knex } from "knex";

export abstract class BaseData {

  private static connection: Knex | null = null;

  protected getConnection(): Knex {
    if (!BaseData.connection) {
      BaseData.connection = knex({
        client: "mysql",
        connection: {
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT || "3306"),
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
        },
      });
    }
    return BaseData.connection;
  }

  public static async destroyConnection(): Promise<void> {
    if (BaseData.connection) {
      await BaseData.connection.destroy();
      BaseData.connection = null;
    }
  }
}

export function raw(arg0: string) {
  throw new Error('Function not implemented.');
}
