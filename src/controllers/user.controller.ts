import * as UserRepository from "@plumia/repositories/user.repository";
import * as PasswordService from "@plumia/services/password.service";
import type { UserAdminType } from "@plumia/types/admin.type";
import type { CreateUserType } from "@plumia/types/create-user.type";

export const create = async (newUser: CreateUserType): Promise<UserAdminType> => {
    let emailExists = await UserRepository.checkIfEmailExists(newUser.email);

    if (emailExists) {
        throw new Error("Email already exists");
    }

    let hashedPassword = await PasswordService.hash(newUser.password);

    let user = await UserRepository.create(newUser.name, newUser.email, hashedPassword);

    if (!user || !user.id) {
        throw new Error("Failed to create user");
    }

    return user;
};

export const updatePassword = async (userId: number, password: string): Promise<UserAdminType> => {
    let hashedPassword = await PasswordService.hash(password);

    let user = await UserRepository.updatePassword(userId, hashedPassword);

    if (!user || !user.id) {
        throw new Error("Failed to update password");
    }

    return user;
};

export const findByEmail = async (email: string): Promise<UserAdminType> => {
    let user = await UserRepository.findByEmail(email);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}