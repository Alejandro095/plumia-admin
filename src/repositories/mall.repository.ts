import type { UserAdminType } from "@plumia/types/admin.type";
import type { MallType } from "@plumia/types/mall.type";
import client from "./sql";

export const create = async (user: UserAdminType, name: string, cost: number): Promise<MallType | null> => {
    let {rows} = await client.sql`INSERT INTO malls (userid, name, cost) VALUES (${user.id}, ${name}, ${cost}) RETURNING *`;

    return rows[0] !== undefined ? rows[0] as MallType : null;
}