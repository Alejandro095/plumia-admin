import type { APIRoute } from "astro";
import * as AuthService from "@plumia/services/auth.service";
import validateErrors from "@plumia/utils/validate-errors.utils";

export const POST: APIRoute = async ({ cookies }) => {
    try {
        AuthService.remove(cookies);

        return new Response(JSON.stringify({ ok: true, message: "REDIRECT", data: "/" }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error: any) {
        return validateErrors(error);
    }
}
