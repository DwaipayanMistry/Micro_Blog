"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { toggleFollow } from "./actions/User.action";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";

function FollowButton({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleFollow = async () => {
    setIsLoading(true);
    try {
      await toggleFollow(userId);
      toast.success("User followed successfully");
    } catch (error) {
      toast.error("Error following the user");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      size={"sm"}
      variant={"secondary"}
      disabled={isLoading}
      className="w-20"
      onClick={handleFollow}
    >
      {isLoading ? (
        <Loader2Icon className="size-4 animate-spin"></Loader2Icon>
      ) : (
        "Follow"
      )}
    </Button>
  );
}

export default FollowButton;
