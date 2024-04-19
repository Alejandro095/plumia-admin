import type { AstroCookies, AstroGlobal } from "astro";

import * as JWTService from "./jwt.service";
import type { SignPayloadType } from "@plumia/types/sign-payload.type";

export const COOKIE_KEY = "auth";

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

export const deauthenticated = (cookies: AstroCookies) => {
    cookies.delete(COOKIE_KEY, {
        domain: "", // Add the domain property
        path: "/", // Add the path property
        httpOnly: true, // Add the httpOnly property
        sameSite: "strict", // Add the sameSite property
        secure: true // Add the secure property
    })

    return;
}

export const get = (cookies: AstroCookies): SignPayloadType => {
    let token = cookies.get(COOKIE_KEY);

    return JWTService.verify(token?.value ?? "");
}

export const isAuth = (astro: AstroGlobal): (SignPayloadType | null) => {
    try {
        return get(astro.cookies);
    } catch (error: any) {
        return null;
    }
}
