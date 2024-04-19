import type { APIRoute } from "astro";
import * as AuthService from "@plumia/services/auth.service";
import validateErrors from "@plumia/utils/validate-errors.utils";

export const POST: APIRoute = async ({ cookies, redirect }) => {
    try {
        AuthService.deauthenticated(cookies);

        return redirect("/auth/sign-in");
    } catch (error: any) {
        return validateErrors(error);
    }
}
