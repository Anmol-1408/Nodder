
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";


const page = async() => {
  await requireAuth(); 
  const data = await caller.getUsers();
 
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
     {/* {JSON.stringify(data)}
     {data && (
     <Button onClick={() => authClient.signOut()}>Sign Out</Button>
     )} */}

     protected server page
     <div>
     {JSON.stringify(data)}
      </div>
      <LogoutButton />
      
    </div>
  );
}

export default page;