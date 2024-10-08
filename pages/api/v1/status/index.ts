import database from "@/infra/database";
import { NextApiRequest, NextApiResponse } from "next";

async function status(request: NextApiRequest, response: NextApiResponse) {
  const result_database_version = await database.query("SHOW server_version;");
  const database_version = result_database_version.rows[0].server_version;
  const result_max_connections = await database.query("SHOW max_connections;");
  const database_max_connections =
    result_max_connections.rows[0].max_connections;
  const result_opened_connections = await database.query({
    text: "SELECT count(*) FROM pg_stat_activity WHERE datname = $1;",
    values: [process.env.POSTGRES_DB],
  });
  const database_opened_connections = result_opened_connections.rows[0].count;
  response.status(200).json({
    updated_at: new Date(),
    dependencies: {
      database: {
        version: database_version,
        max_connections: database_max_connections,
        opened_connections: database_opened_connections,
      },
    },
  });
}
export default status;
