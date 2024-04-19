import type { AstroCookies, AstroGlobal } from "astro";

import * as JWTService from "./jwt.service";
import type { SignPayloadType } from "@plumia/types/sign-payload.type";

const COOKIE_KEY = "auth";

export const authenticate = async (cookies: AstroCookies, token: string) => {
    cookies.set(COOKIE_KEY, token, {
        maxAge: 60 * 60 * 24 * 4, // 4 days
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        domain: "", // Add the domain property
        expires: new Date(), // Add the expires property
        encode: (value: string) => value // Add the encode property
    });

    return;
}

export const get = (cookies: AstroCookies): SignPayloadType => {
    let token = cookies.get(COOKIE_KEY);

    return JWTService.verify(token?.value ?? "");
}

export const remove = (cookies: AstroCookies) => {
    cookies.delete(COOKIE_KEY)

    return;
}

export const isAuth = (astro: AstroGlobal): (SignPayloadType | null) => {
    try {
        return get(astro.cookies);
    } catch (error: any) {
        return null;
    }
}
