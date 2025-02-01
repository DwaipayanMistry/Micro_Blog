import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { getProfileData } from "./actions/User.action";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Prisma } from "@prisma/client";
import { Separator } from "./ui/separator";
import { use } from "react";
import { LinkIcon, MapPinIcon } from "lucide-react";

interface User {
  _count: {
    posts: number;
    followers: number;
    following: number;
  };
  name: string | null;
  id: string;
  email: string;
  userName: string;
  clarkId: string;
  bio: string | null;
  image: string | null;
  version: string | null;
  location: string | null;
  website: string | null;
}

const SideBar = async () => {
  const authUser = await currentUser();
  if (!authUser) {
    return <UnSignedInSideBar></UnSignedInSideBar>;
  }
  const user = await getProfileData(authUser.id);

  if (!user) {
    return null;
  }

  return <SignedIn user={user}></SignedIn>;
};

const SignedIn = ({ user }: { user: User }) => {
  return (
    <div className="sticky top-20">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            {/* Profile and user */}
            <Link
              className="flex flex-col items-center justify-center"
              href={`/profile/${user.userName}`}
            >
              <Avatar className="w-20 h-20 border-2">
                <AvatarImage src={user.image || "/avatar.png"}></AvatarImage>
              </Avatar>

              <div className="mt-4 space-y-1">
                <h3 className="font-semibold hover:underline">{user.name}</h3>
                <p className="text-sm text-muted-foreground hover:underline">{user.userName}</p>
              </div>
            </Link>

            {user.bio && (
              <p className="mt-3 text-sm text-muted-foreground">{user.bio}</p>
            )}

            <div className="w-full">
              <Separator className="my-4"></Separator>
              <div>
                {/* follower and following */}
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{user._count.followers}</p>
                    <p className="text-xs text-muted-foreground">Following</p>
                  </div>
                  <Separator orientation="vertical"></Separator>
                  <div>
                    <p className="font-medium">{user._count.followers}</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                </div>
              </div>
              <Separator className="my-4"></Separator>
            </div>
            <div className="w-full space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPinIcon className="w-4 h-4 mr-2"></MapPinIcon>
                {user.location || "No location"}
              </div>
            </div>

            <div className="w-full space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <LinkIcon className="w-4 h-4 mr-2"></LinkIcon>
                {user.website ? (
                  <a
                    href={`${user.website}`}
                    className="hover:underline truncate"
                    target="_blank"
                  >
                    {user.website}
                  </a>
                ) : (
                  "Not Provided"
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const UnSignedInSideBar = () => {
  return (
    <>
      <div className="sticky top-20">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Welcome!!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground mb-4">
              Login to connect.
            </p>
            <SignInButton mode="modal">
              <Button className="w-full mb-1">
                {/* <LogInIcon></LogInIcon> */}
                Log In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="w-full">Sign Up</Button>
            </SignUpButton>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SideBar;
