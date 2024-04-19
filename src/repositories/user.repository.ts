import type { UserAdminType } from "@plumia/types/admin.type";
import client from "./sql";

export const checkIfEmailExists = async (email: string): Promise<Boolean> => {
    let { rowCount } = await client.sql`SELECT * FROM admins WHERE email = ${email}`;

    return rowCount !== 0;
};

export const create = async (name: string, email: string, password: string): Promise<UserAdminType | null> => {
    let {rows} = await client.sql`INSERT INTO admins (name, email, password, roleid) VALUES (${name}, ${email}, ${password}, 1) RETURNING *`;

    return rows[0] !== undefined ? rows[0] as UserAdminType : null;
}

export const findByEmail = async (email: string): Promise<UserAdminType | null> => {
    let {rows} = await client.sql`SELECT * FROM admins WHERE email = ${email}`;

    return rows[0] !== undefined ? rows[0] as UserAdminType : null;
}

export const getMallId = async (userId: number): Promise<number | null> => {
    let {rows} = await client.sql`SELECT id FROM malls WHERE userid = ${userId}`;

    return (rows[0] !== undefined && rows[0].id !== undefined) ? rows[0].id : null;
}

export const get = async(userId: number): Promise<UserAdminType | null> => {
    let {rows} = await client.sql`SELECT * FROM admins WHERE id = ${userId}`;

    return rows[0] !== undefined ? rows[0] as UserAdminType : null;
}

export const updatePassword = async (userId: number, password: string): Promise<UserAdminType | null> => {
    let {rows} = await client.sql`UPDATE admins SET password = ${password} WHERE id = ${userId} RETURNING *`;

    return rows[0] !== undefined ? rows[0] as UserAdminType : null;
}

export const update = async (userId: number, name: string, email: string): Promise<UserAdminType | null> => {
    let {rows} = await client.sql`UPDATE admins SET name = ${name}, email = ${email} WHERE id = ${userId} RETURNING *`;

    return rows[0] !== undefined ? rows[0] as UserAdminType : null;
};