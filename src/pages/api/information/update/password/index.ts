import type { APIRoute } from "astro";
import { extractFormParams } from "@plumia/utils/extract-params.utils";
import type { UpdatePassword } from "@plumia/types/update-password.type";
import updatePasswordSchema from "@plumia/schemas/update-password.schema";
import * as UserController from "@plumia/controllers/user.controller";
import * as AuthServices from "@plumia/services/auth.service";

export const POST: APIRoute = async ({request, cookies, redirect}) => {
    try {
        let params = await extractFormParams(request, updatePasswordSchema) as UpdatePassword;

        let auth = await AuthServices.get(cookies);

        if (!auth) {
            throw new Error("Unauthorized");
        }

        await UserController.updatePassword(auth.userId, params.password)
    } finally {
        return redirect("/dashboard/information")
    }
}