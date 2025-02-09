"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createPost } from "../actions/Post.action";
import { Card, CardContent } from "./card";
import { Avatar, AvatarImage } from "./avatar";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { UserAvatarImj } from "../actions/User.action";


const CreatePost = () => {
  const [avatarImage, setAvatarImage] = useState("");
  const { user } = useUser();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const profileData = await UserAvatarImj(user.id);
        setAvatarImage(profileData?.image || "/images/A2.webp");
      }
    };
    fetchUserProfile();
  }, [user]);

  const handleSubmit = async () => {
    if (!content.trim() && !imageUrl) return;
    setIsPosting(true);
    try {
      const result = await createPost(content, imageUrl);
      if (result?.success) {
        //  reset the form
        setContent("");
        setImageUrl("");
        setShowImageUpload(false);
        toast.success("Post created successfully");
      }
    } catch (error) {
      console.error(`Failed to create post, error: ${error}`);
      toast.error(`Failed to create posts`);
    } finally {
      setIsPosting(false);
    }
  };
  return (
    <>
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className=" flex space-x-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={avatarImage}></AvatarImage>
                <AvatarFallback>DM</AvatarFallback>
              </Avatar>
              <Textarea
                placeholder="Let your thought flow..."
                className="min-h-28 resize-none border-none focus-visible:ring-0 pt-1 text-base"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isPosting}
              ></Textarea>
            </div>
            {/* TODO: Image uploader */}
            {/* {(showImageUpload || imageUrl)} */}

            <div className="flex items-center justify-between border-t pt-4">
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant={"ghost"}
                  size={"sm"}
                  className="text-muted-foreground hover:text-primary"
                  onClick={() => {
                    setShowImageUpload(!showImageUpload);
                  }}
                  disabled={isPosting}
                >
                  <ImageIcon className="size-4 mr-2"></ImageIcon>Photo
                </Button>
              </div>
              <Button
                className="flex items-center"
                onClick={handleSubmit}
                disabled={(!content.trim() && !imageUrl) || isPosting}
              >
                {isPosting ? (
                  <div className="flex">
                    <Loader2Icon className="size-4 mr-2 animate-ping"></Loader2Icon>
                    <span className="animate-pulse">Posting</span>
                  </div>
                ) : (
                  <div className="flex">
                    <SendIcon className="size-4 mr-2"></SendIcon>
                    Post
                  </div>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
     
    </>
  );
};
export default CreatePost;
