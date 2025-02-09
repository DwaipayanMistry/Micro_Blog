"use server"
import { prisma } from "@/lib/prisma";
import { getUserId } from "./User.action";
import { revalidatePath } from "next/cache";

export async function createPost(content: string, image: string) {
    try {
        const userId = await getUserId();
        if (!userId) return;
        const post = await prisma.post.create({
            data: {
                content,
                image,
                authorId: userId,
            },
        });

        revalidatePath("/");

        return ({ success: true, post });
    } catch (error) {
        console.error(`Failed to create post: ${error}`)
        return { success: false, error: 'Failed to create post' };
    }
}

// export async function getPost() {
//     try {
//         const posts = await prisma.post.findMany({
//             orderBy:{
//                 createdAt:'desc',
//             },
//             include:{
//                 author:{
//                     select:{
//                         id: true,

//                     }
//                 }
//             }
//         })
//     } catch (error) {
//         console.error(`Failed to fetch the posts`);
//         throw new Error(`Failed to fetch the posts`);
//     }
// }