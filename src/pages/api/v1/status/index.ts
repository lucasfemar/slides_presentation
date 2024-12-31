import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

async function status(request: NextApiRequest, response: NextApiResponse) {
  const updatedAt = new Date().toISOString(); //Retorna a data no padrão ISO8601
  const databaseVersionResult: any = await prisma.$queryRaw(
    Prisma.sql`SHOW server_version;`,
  );
  const databaseVersionValue = databaseVersionResult[0].server_version;
  const databaseMaxConnectionsResult: any =
    await prisma.$queryRaw(Prisma.sql`SHOW max_connections;`);
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult[0].max_connections;
  const databaseName = process.env.POSTGRES_DB;
  const query: any = Prisma.sql`SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;`;
  query.values = [databaseName];
  const databaseOpenedConnectionsResult: any = await prisma.$queryRaw(query);
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult[0].count;
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
