
import React from "react";
import { ModeToggle } from "./ThemeToggle";
import MobileComponent from "./MobileComponent";
import Link from "next/link";
import DesktopComponent from "./DesktopComponent";

export default async function NavBar() {
 
  return (
    <nav className="flex justify-between items-center p-1 border-b-2">
      <Link href='/'>
        <div className="pl-2 text-[24px]">Micro Blog</div>
      </Link>
      {/* <User></User> */}
      <div className="flex gap-5 px-2">
        <ModeToggle></ModeToggle>
        <div className="flex flex-col justify-center">
          {/* big screen> */}
          <DesktopComponent></DesktopComponent>
          <MobileComponent></MobileComponent>
        </div>
      </div>
    </nav>
  );
}
