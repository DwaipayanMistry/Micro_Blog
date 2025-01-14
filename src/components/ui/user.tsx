import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./button";
import { LogIn, LogInIcon } from "lucide-react";

const UserSignin = () => {
    // const {isSignedIn} = useAuth()
    return (
      <>
        {/* to hold signin and signout */}
        <div className=" flex justify-center">
          <SignedOut>
            <SignInButton mode="modal">
              <div className="flex justify-center w-full">
                <Button className="w-[95%]" variant={"default"}>
                    <LogInIcon></LogInIcon>
                  <p>Sign in</p>
                </Button>
              </div>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </>
    );
  };
export default UserSignin