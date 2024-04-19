import { ZodError } from "zod";

export default function validateErrors(error: any) {
    if (error instanceof ZodError) {
        return new Response(JSON.stringify({ ok: false, message: error.errors[0].message, data: error.errors }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } else {
        return new Response(JSON.stringify({ ok: false, message: error.message }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}