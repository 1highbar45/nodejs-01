import { prisma } from "config/client";

const getDashboardInfo = async () => {
    const countUser = await prisma.user.count();
    const countProduct = await prisma.product.count();
    const countOrder = await prisma.order.count();

    return {
        countUser, countProduct, countOrder
    }
}

const getProductById = async (id: number) => {
    return await prisma.product.findUnique({
        where: { id }
    });
}

export {
    getDashboardInfo
}