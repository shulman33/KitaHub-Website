import { config } from "dotenv";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { neon } from "@neondatabase/serverless";
import { getSession, getAccessToken } from "@auth0/nextjs-auth0";
import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { user } from "./schema";

config({ path: ".env.local" });

export async function dbAuth<T>(
  callback: (db: NeonHttpDatabase<typeof schema>) => Promise<T>
): Promise<T> {

  const session = await getSession();
  if (!session) {
    throw new Error("No session");
  }

  const db = drizzle(
    neon(process.env.DATABASE_AUTHENTICATED_URL!, {
      authToken: async () => {
        const accessToken = await getAccessToken();
        if (!accessToken.accessToken) {
          throw new Error("No access token");
        }
        return accessToken.accessToken;
      },
    }),
    { schema }
  );

  const { rows: authRows } = await db.execute(
    sql`SELECT auth.user_id() as auth_user_id;`
  );
  console.log("auth.user_id():", authRows);

  // const auth0Field = await db.select({ auth0UserId: user.auth0UserId }).from(user);
  


  return callback(db);
}

export const db = drizzle(process.env.DATABASE_URL!, { schema });
