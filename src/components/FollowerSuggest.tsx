import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { getRandomUser } from "./actions/User.action";
import Link from "next/link";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import FollowButton from "./FollowButton";

export default async function FollowerSuggest() {
  const users = await getRandomUser();
  if (users.length === 0) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggestion</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user, index) => (
            <div key={index} className="flex gap-2 item-center justify-between">
              <div className=" flex  flex-col  ">
                <Link href={`/profile/${user.userName}`}>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        className="size-10 rounded-full"
                        src={user.image ?? "/avatar.png"}
                      ></AvatarImage>
                    </Avatar>
                    <div className="font-medium cursor-pointer text-[15px]">
                      {user.name}
                    </div>
                  </div>
                </Link>
                <p className="text-muted-foreground pl-12 text-sm">{`@${user.userName}`}</p>
                <p className="text-muted-foreground pl-12 text-sm">{`${user._count.followers} followers`}</p>
              </div>
              <FollowButton userId={user.id}></FollowButton>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
