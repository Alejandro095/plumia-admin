import type { APIRoute } from "astro";
import * as AuthServices from "../../../../../services/auth.service";
import * as UserRepository from "../../../../../repositories/user.repository";
import * as MallRepository from "../../../../../repositories/mall.repository";
import { extractFormParams } from "@plumia/utils/extract-params.utils";
import updateInformationSchema from "@plumia/schemas/upate-information.schema";
import type { UpdateInformation } from "@plumia/types/update-information.type";
import * as JWTService from "@plumia/services/jwt.service";
import * as AuthService from "@plumia/services/auth.service";


export const POST: APIRoute = async ({request, cookies, redirect}) => {
    try {
        let params = await extractFormParams(request, updateInformationSchema) as UpdateInformation;

        let auth = await AuthServices.get(cookies);

        if (!auth) {
            throw new Error("Unauthorized");
        }

        let mallid = await UserRepository.getMallId(auth.userId);

        if (!mallid) {
            throw new Error("Mall not found");
        }

        let user = await UserRepository.update(auth.userId, params.name, params.email);

        let mall = await MallRepository.update(mallid, params.mallName, params.mallCost);

        if (!user || !mall) {
            throw new Error("Error updating information");
        }

        let jwt = JWTService.sign({
            userId: user.id,
            email: user.email,
            name: user.name,
        });

        AuthService.authenticate(cookies, jwt);
    } finally {
        return redirect("/dashboard/information")
    }
}