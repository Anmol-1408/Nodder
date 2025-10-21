import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";

const page = async () => {
  const user = await prisma.user.findMany();
  console.log("User from DB:", user);
  return (
    <div className="text-red-500">
      {JSON.stringify(user)}
      <Button variant="outline">Click Me</Button>
    </div>
  );
}

export default page;