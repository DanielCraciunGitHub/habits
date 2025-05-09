import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import { reset, seed } from "drizzle-seed";

import * as schema from "./schema";

config({ path: ".env.development" });

const localdb = drizzle({
  connection: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});

async function main() {
  console.log("🌱 Seeding the database...");

  await reset(localdb, schema);
  await seed(localdb, schema);

  console.log("✅ Seeding complete!");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
