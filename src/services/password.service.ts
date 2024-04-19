import { createHash } from 'crypto';

export const hash = async (password: string) => {
    return createHash('sha512').update(password).digest('hex');
};

export const compare = async (password: string, hash: string) => {
    const hashedPassword = createHash('sha512').update(password).digest('hex');

    if (hashedPassword !== hash) {
        throw new Error('Invalid credentials');
    }
};