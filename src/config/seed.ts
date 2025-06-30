import { prisma } from "config/client";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
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
    } else {
        console.log(">>> ALREADY INIT DATA...")
    }
}

export default initDatabase;