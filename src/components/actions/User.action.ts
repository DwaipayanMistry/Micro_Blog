"use server";

// TODO : Setup this with webhooks

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { error } from "console";
import exp from "constants";

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

export async function getUserId() {
    const { userId: clarkId } = await auth()
    if (!clarkId) return null;
    const user = await getProfileData(clarkId)
    if (!user) {
        throw new Error("User Not Found");
    }
    return user.id;
}
export async function UserAvatarImj(clarkId: string) {
    const image = await prisma.user.findUnique({
        where: { clarkId }, select: { image: true }
    });
    return image;
}

export async function getRandomUser() {
    try {

        const userId = await getUserId();
        if (!userId) {
            return [];
        };
        const randomUser = await prisma.user.findMany({
            where: {
                AND: [{
                    NOT: {
                        id: userId
                    }
                },
                {
                    NOT: {
                        followers: {
                            some: {
                                followerId: userId,
                            }
                        }
                    }
                }],
            },
            select: {
                id: true,
                name: true,
                userName: true,
                image: true,
                _count: {
                    select: {
                        followers: true,
                    }
                }
            },
            take: 3,
        });
        return randomUser;

    } catch (error) {
        console.log(`Error fetching random user: ${error}`);
        return []
    }
}