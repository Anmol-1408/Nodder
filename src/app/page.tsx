import { Button } from "@/components/ui/button";
import { caller } from "@/trpc/server";

const page = async () => {
  const user = await caller.getUsers();
  console.log("User from DB:", user);
  return (
    <div className="text-red-500">
      {JSON.stringify(user)}
      <Button variant="outline">Click Me</Button>
    </div>
  );
}

export default page;