import type { Spot } from "@plumia/types/spot.type";
import client from "./sql";

export async function getSpotsByAdminId(adminId: number): Promise<Spot[]> {
    let {rows} = await client.sql`SELECT S.* FROM spots S INNER JOIN malls ON S.mallid = malls.id INNER JOIN admins a on malls.userid = a.id WHERE a.id = ${adminId} ORDER BY S.available DESC, S.id`;

    return (rows.length > 0 ? rows : []) as Spot[];
}

export async function deleteSpot(adminId: number, spotId: number): Promise<void> {
    await client.sql`DELETE FROM spots S WHERE S.id = ${spotId} AND s.mallid IN (SELECT M.id FROM malls M WHERE M.userid = ${adminId})`;
    return;
}

export async function create(mallId: number, latitude: number, longitude: number): Promise<void> {
    await client.sql`INSERT INTO spots (mallid, latitude, longitude) VALUES (${mallId}, ${latitude}, ${longitude})`;
    return;
}