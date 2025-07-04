import { prisma } from "config/client";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();
    if (countUser === 0) {
        await prisma.user.createMany({
            data: [
                {
                    username: "jinrang",
                    password: "123456",
                    accountType: "SYSTEM"
                },
                {
                    username: "kitae kim",
                    password: "123456",
                    accountType: "SYSTEM"
                }
            ]
        })
    }
    else if (countRole === 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description: "Admin thì full quyền"
                },
                {
                    name: "USER",
                    description: "User thông thường"
                }
            ]
        })
    }
    else {
        console.log(">>> ALREADY INIT DATA...")
    }
}

export default initDatabase;