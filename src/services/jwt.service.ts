import type { SignPayloadType } from "@plumia/types/sign-payload.type";

import jwt from "jsonwebtoken";

export const sign = (payload: SignPayloadType) => {
    return jwt.sign(payload, import.meta.env.AUTH_SECRET, {
        expiresIn: "5d",
    });
}

export const verify = (token: string) => {
    return jwt.verify(token, import.meta.env.AUTH_SECRET) as SignPayloadType;
}