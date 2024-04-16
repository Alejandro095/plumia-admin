import { createPool } from "@vercel/postgres";

const pool = createPool({
  connectionString: import.meta.env.POSTGRES_URL,
});

export default pool;
