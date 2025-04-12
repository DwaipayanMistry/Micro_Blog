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

export async function getPost() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        userName: true,

                    }
                },
                comments: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                                userName: true,
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                },
                like: {
                    select: {
                        id: true,
                        userId: true,
                    },
                },
                _count: {
                    select: {
                        comments: true,
                        like: true,
                    }
                }
            },
        });
        return posts;
    } catch (error) {
        console.error(`Failed to fetch the posts`);
        throw new Error(`Failed to fetch the posts`);
    }
}

export async function toggleLike(postId: string) {

    try {
        const userId = await getUserId();
        if (!userId) return;
        // Check if the post is already liked by the user
        const existingLike = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId,
                },
            },
        });

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            select: {
                authorId: true,
            },
        });

        if (!post) {
            throw new Error("Post not found");
        }

        if (existingLike) {
            // If like exists, it removes it,
            await prisma.like.delete({
                where: {
                    userId_postId: {
                        userId,
                        postId,
                    },
                },
            });
        } else {
            // Creates the like if it doesn't exists
            await prisma.$transaction([

                prisma.like.create({
                    data: {
                        userId,
                        postId,
                    },
                }),
                ...(post.authorId !== userId ? [
                    prisma.notification.create({
                        data: {
                            type: "LIKE",
                            userId: post.authorId,    //recipients (author of the posts) id
                            creatorId: userId,       //user who liked the post
                            postId,
                        }
                    })
                ] : [])
            ])
        }

        revalidatePath('/');
        return ({ success: true });
    } catch (error) {
        console.error(`Failed to toggle like: ${error}`);
        return ({ success: false, error: "Failed to toggle like" });
    }
}

export async function createComment(postId: string, content: string) {

    try {
        const userId = await getUserId();
        if (!userId) return;
        if (!content) throw new Error("Content is required");

        const post = await prisma.post.findUnique({
            where: { id: postId },
            select: { authorId: true },
        });

        if (!post) throw new Error("Post not found");

        // Create comment and notification in a transaction
        const [comment] = await prisma.$transaction(async (trx) => {
            // Create comment
            const newComment = await trx.comment.create({
                data: {
                    content,
                    authorId: userId,
                    postId,
                },
            });
            // Create notification if commenting on someone else's post
            if (post.authorId !== userId) {
                await trx.notification.create({
                    data: {
                        type: 'COMMENT',
                        userId: post.authorId,
                        creatorId: userId,
                        postId,
                        commentId: newComment.id,
                    },
                });
            }
            return [newComment]
        })
        revalidatePath('/');
    } catch (error) {
        console.error(`Failed to create the comment: ${error}`);
        return ({ success: false, error: "Failed to create comment" });
    }
}
export async function deletePost(postId: string) {
    try {
        const userId = await getUserId();

        const post = await prisma.post.findUnique({
            where: { id: postId, },
            select: { authorId: true },
        });

        if (!post) throw new Error("Post not found");
        if (post.authorId !== userId) throw new Error("Unauthorized: Deletion permission not available");
        await prisma.post.delete({
            where: { id: postId },
        });

        revalidatePath("/");
        return ({ success: true });

    } catch (error) {
        console.error("Failed to delete post: ", error);
        return ({ success: false, error: "Failed to delete the post" });
    }
}