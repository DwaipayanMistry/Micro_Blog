import { currentUser } from "@clerk/nextjs/server";
import UserSignin from "./user";
import Link from "next/link";
import { BellIcon, House, LogOutIcon, User } from "lucide-react";
import { Button } from "./button";

const DesktopComponent = async () => {
  const user = await currentUser();
  return (
    <>
      {!user ? (
        <div className="hidden lg:flex gap-5">
          <div className="flex justify-center items-center">
            <Link href={"/"}>
              <div className="flex justify-start w-full items-center ">
                <House></House>
                <span className="pl-1 ">House</span>
              </div>
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <Link
              href={"/notification"}
              className="flex items-start gap-3 justify-start"
            >
              <div className="flex gap-2">
                <BellIcon></BellIcon>
                <p className="">Notification</p>
              </div>
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <Link
              href={"/profile"}
              className="flex items-start gap-3 justify-start"
            >
              <User></User>
              <p className="">Profile</p>
            </Link>
          </div>
          <div className="flex justify-center items-center">
          <div className=" flex justify-center">
                    <Button className=" w-[95%] " variant={"default"}>
                      <LogOutIcon></LogOutIcon>
                      <p>Log Out</p>
                    </Button>
                  </div>
          </div>
        </div>
      ) : (
        <>
          <UserSignin></UserSignin>
        </>
      )}
    </>
  );
};
export default DesktopComponent;
