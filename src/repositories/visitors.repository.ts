import type { Visitor } from "@plumia/types/visitor.type";
import client from "./sql";

export async function getVisitorsByAdminId(adminId: number): Promise<Visitor[]> {
    let {rows} = await client.sql`SELECT CONCAT(U.name, ' ', U.lastname) AS username, CONCAT(Ve.name, ' - ', Ve.licenseplate) AS vehicle, v.spotid AS spotid, V.initialdate AS initialDate, V.finaldate AS finalDate, ROUND(EXTRACT(EPOCH FROM (COALESCE(V.finaldate, NOW()) - V.initialdate)) / 3600, 2) AS diff  FROM visits V INNER JOIN vehicles Ve ON V.vehicleid = Ve.id INNER JOIN users U ON Ve.userid = U.id INNER JOIN spots S ON V.spotid = S.id INNER JOIN malls M ON S.mallid = M.id INNER JOIN admins A ON M.userid = A.id WHERE (DATE(v.initialdate) = CURRENT_DATE OR DATE(v.finaldate) = CURRENT_DATE) AND A.id = ${adminId}`;

    return (rows.length > 0 ? rows : []) as Visitor[];
}