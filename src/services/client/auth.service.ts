import { prisma } from "config/client"
import { ACCOUNT_TYPE } from "config/constant";
import { comparePassword, hashPassword } from "services/user.service";

const isEmailExist = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { username: email }
    })

    if (user) {
        return true;
    }
    return false;
}

const registerNewUser = async (fullName: string, email: string, password: string) => {
    const newPassword = await hashPassword(password);

    const userRole = await prisma.role.findUnique({
        where: { name: "USER" }
    })
    if (userRole) {
        await prisma.user.create({
            data: {
                fullName: fullName,
                username: email,
                password: newPassword,
                accountType: ACCOUNT_TYPE.SYSTEM,
                roleId: userRole.id
            },
        });
    } else {
        throw new Error("User Role không tồn tại")
    }
}

const getUserWithRoleById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id: +id },
        include: {
            role: true
        },
        omit: {
            password: true
        }
    });
    return user;
}

const getUserSumCart = async (id: string) => {
    const user = await prisma.cart.findUnique({
        where: { userId: +id }
    });

    return user?.sum ?? 0;
}

export { isEmailExist, registerNewUser, getUserWithRoleById, getUserSumCart }