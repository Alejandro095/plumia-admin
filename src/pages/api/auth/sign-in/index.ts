import signInSchema from "@plumia/schemas/sign-in.schema";
import type { APIRoute } from "astro";
import { extractBodyParams } from "./../../../../utils/extract-params.utils";
import * as UserController from "@plumia/controllers/user.controller";
import * as JWTService from "@plumia/services/jwt.service";
import * as AuthService from "@plumia/services/auth.service";
import * as PasswordService from "@plumia/services/password.service";
import type { SignInType } from "@plumia/types/sign-in.type";
import validateErrors from "@plumia/utils/validate-errors.utils";

export const POST: APIRoute = async ({ request, cookies }) => {
    try {
        let params = await extractBodyParams(request, signInSchema) as SignInType;

        let user = await UserController.findByEmail(params.email);

        await PasswordService.compare(params.password, user.password);

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
