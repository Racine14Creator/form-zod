import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { isAuthenticated, getPermissions } = getKindeServerSession();
  const isLoggenIn = await isAuthenticated();

  if (!isLoggenIn) {
    redirect("/");
  }

  const permission = await getPermissions();
  console.log(permission);

  return <h3>Dashboard</h3>;
}
