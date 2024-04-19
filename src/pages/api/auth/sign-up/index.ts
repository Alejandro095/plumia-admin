import type { APIRoute } from "astro";
import { extractBodyParams } from "./../../../../utils/extract-params.utils";
import type { CreateUserType } from "@plumia/types/create-user.type";
import * as UserController from "@plumia/controllers/user.controller";
import * as MallRepository from "@plumia/repositories/mall.repository";
import signUpSchema from "@plumia/schemas/sign-up.schema";
import * as JWTService from "@plumia/services/jwt.service";
import * as AuthService from "@plumia/services/auth.service";
import validateErrors from "@plumia/utils/validate-errors.utils";

export const POST: APIRoute = async ({ request, cookies }) => {
    try {
        let params = await extractBodyParams(request, signUpSchema) as CreateUserType;

        let user = await UserController.create(params);

        MallRepository.create(user, params.mallName, params.mallCost);

        let jwt = JWTService.sign({
            userId: user.id,
            email: user.email,
            name: user.name,
        });

        AuthService.authenticate(cookies, jwt);

        return new Response(JSON.stringify({ ok: true, message: "REDIRECT", data: "/dashboard" }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error: any) {
        return validateErrors(error);
    }
}
