import { Client } from "pg";

async function query(query: any) {
  const client = await getDatabaseClient();
  try {
    return await client.query(query);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  } finally {
    await client.end();
  }
}
const database_config = {
  port: Number(process.env.POSTGRES_PORT),
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
};
async function getDatabaseClient() {
  const client = new Client(database_config);
  await client.connect();
  return client;
}

const database = { getDatabaseClient, query };

export default database;
