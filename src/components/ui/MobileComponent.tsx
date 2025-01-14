"use client";

import { SignOutButton, useAuth } from "@clerk/nextjs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

import { AlignJustify, BellIcon, House, LogOutIcon, User } from "lucide-react";
import { Button } from "./button";
import UserSignin from "./user";

const MobileComponent = () => {
  const { isSignedIn } = useAuth();
  return (
    <>
      <div className="flex lg:hidden ">
        <Sheet>
          <SheetTrigger>
            <AlignJustify></AlignJustify>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <SheetHeader>
              <SheetTitle>
                <Link href={"/"}>
                  <div className="flex justify-start w-full items-center ">
                    <House size={30}></House>
                    <span className="pl-1 text-xl">House</span>
                  </div>
                </Link>
              </SheetTitle>
            </SheetHeader>
            {/* user and sign in, notification etc... */}
            {isSignedIn ? (
              <>
                {/* Notification */}
                <Link
                  href={"/notification"}
                  className="flex items-start gap-3 justify-start"
                >
                  <div className="flex gap-2">
                    <BellIcon></BellIcon>
                    <p className="text-xl">Notification</p>
                  </div>
                </Link>
                {/* Profile */}
                <Link
                  href={"/profile"}
                  className="flex items-start gap-3 justify-start"
                >
                  <User></User> <p className="text-xl">Profile</p>
                </Link>
                {/* Sign Out */}
                <SignOutButton>
                  <div className=" flex justify-center">
                    <Button className=" w-[95%] " variant={"default"}>
                      <LogOutIcon></LogOutIcon>
                      <p>Log Out</p>
                    </Button>
                  </div>
                </SignOutButton>
              </>
            ) : (
              <>
                <SheetHeader>
                  <SheetTitle>
                    <UserSignin></UserSignin>
                  </SheetTitle>
                </SheetHeader>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default MobileComponent;
