import { prisma } from "config/client";

const handleGetAllUser = async () => {
    return await prisma.user.findMany();
}

const handleGetUserById = async (id: number) => {
    return await prisma.user.findUnique({
        where: { id }
    });
}

const handleUpdateUserById = async (id: number, fullName: string, address: string, phone: string) => {
    return await prisma.user.update({
        where: { id },
        data: {
            fullName, address, phone
        }
    });
}

const handleDeleteUserById = async (id: number) => {
    return await prisma.user.delete({
        where: { id }
    });
}

export { handleGetAllUser, handleGetUserById, handleUpdateUserById, handleDeleteUserById }