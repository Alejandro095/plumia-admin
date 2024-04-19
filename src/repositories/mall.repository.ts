import type { UserAdminType } from "@plumia/types/admin.type";
import type { MallType } from "@plumia/types/mall.type";
import client from "./sql";

export const create = async (user: UserAdminType, name: string, cost: number): Promise<MallType | null> => {
    let {rows} = await client.sql`INSERT INTO malls (userid, name, cost) VALUES (${user.id}, ${name}, ${cost}) RETURNING *`;

    return rows[0] !== undefined ? rows[0] as MallType : null;
}

export const get = async(userId: number): Promise<MallType | null> => {
    let {rows} = await client.sql`SELECT * FROM malls WHERE userid = ${userId}`;

    return rows[0] !== undefined ? rows[0] as MallType : null;
}

export const update = async (mallId: number, name: string, cost: number): Promise<MallType | null> => {
    let {rows} = await client.sql`UPDATE malls SET name = ${name}, cost = ${cost} WHERE id = ${mallId} RETURNING *`;

    return rows[0] !== undefined ? rows[0] as MallType : null;
}