import CreatePost from "@/components/ui/CreatePost";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function Home() {
  const user = await currentUser();
  // const posts = await
  return (
    <>
      <div className="grid grid-col-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-6">
          {user ? <CreatePost></CreatePost> : null}
          <div className="space-y-6">{/* {post} */}</div>
        </div>

        {/* Recommendation */}

        <div className="hidden lg:block lg:col-span-4 sticky top-20">
          who to follow
        </div>
      </div>
    </>
  );
}
