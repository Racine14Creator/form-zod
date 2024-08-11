import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";

export default async function Settings() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile of: {user?.given_name}</CardTitle>
        <CardDescription>Email: {user?.email}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className='flex flex-col md:flex-row md:justify-between'>
          <Image
            width={1000}
            height={1000}
            alt='Profile'
            className='my-5 w-[10rem] h-[10rem] rounded-full'
            src={`${user?.picture}`}
          />
        </div>
      </CardContent>
    </Card>
  );
}
