import type { APIRoute } from "astro";
import * as AuthServices from "./../../../../services/auth.service";
import * as SpotsRepository from "./../../../../repositories/spots.repository";
import * as UserAdminRepository from "./../../../../repositories/user.repository";
import { extractFormParams } from "@plumia/utils/extract-params.utils";
import spotsSchema from "@plumia/schemas/spots.schema";
import type { CreateSchema } from "@plumia/types/create.schema";


export const POST: APIRoute = async ({request, cookies, redirect}) => {
    try {
        let params = await extractFormParams(request, spotsSchema) as CreateSchema;

        console.log(params);

        let auth = await AuthServices.get(cookies);

        if (!auth) {
            throw new Error("Unauthorized");
        }

        let mallid = await UserAdminRepository.getMallId(auth.userId);

        if (!mallid) {
            throw new Error("Mall not found");
        }

        await SpotsRepository.create(mallid, params.latitude, params.longitude);

    } finally {
        return redirect("/dashboard/spots")
    }
}