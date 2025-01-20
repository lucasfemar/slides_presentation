import retry from "async-retry";
import prisma from "lib/prisma";
import { exec } from "node:child_process"; // Função do node que executa scripts pelo código

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      if (response.status !== 200) {
        throw Error();
      }
    }
  }
}

async function clearTable(table: string) {
  await prisma.$queryRawUnsafe(`TRUNCATE TABLE ${table};`);
}

const orchestrator = {
  waitForAllServices,
  clearTable,
};
export default orchestrator;
