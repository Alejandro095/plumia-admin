import type { APIRoute } from "astro";
import * as AuthServices from "./../../../../../services/auth.service";
import * as SpotsRepository from "./../../../../../repositories/spots.repository";

export const POST: APIRoute = async ({params, cookies, redirect}) => {
    try {
        let spotId = params.id;

        let auth = await AuthServices.get(cookies);

        if (!auth) {
            throw new Error("Unauthorized");
        }

        await SpotsRepository.deleteSpot(auth.userId, Number(spotId ?? 0));

    } finally {
        return redirect("/dashboard/spots")
    }
}