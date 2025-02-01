"use server";

// TODO : Setup this with webhooks

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function syncUser() {
    try {
        const { userId } = await auth();
        const user = await currentUser();
        if (!userId || !user) {
            return;
        }
        // checks if the user exist's
        const existingUser = await prisma.user.findUnique({
            where: { clarkId: userId },
        });
        if (existingUser) return;

        // create a profile
        const createUser = await prisma.user.create({
            data: {
                clarkId: userId,
                name: `${user.firstName || ""} ${user.lastName}`,
                userName: `${user.emailAddresses[0].emailAddress.split("@")[0]}`,
                email: user.emailAddresses[0].emailAddress,

                image: user.imageUrl,
            },
        });
        return createUser;
    } catch (error) {
        // error
        console.error(`error in syncUser --> ${error}`)
    }
}

export async function getProfileData(clarkId: string) {
    return prisma.user.findUnique({
        where: { clarkId },
        include: {
            _count: {
                select: {
                    followers: true,
                    following: true,
                    posts: true,
                }
            }
        }
    })
} 