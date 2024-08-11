"use server";

import HeroSection from "@/components/features/Hero";
import Testimonial from "@/components/features/Testimonial";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggenIn = await isAuthenticated();

  if (isLoggenIn) {
    redirect("/dashboard");
  }
  return (
    <>
      <HeroSection />
      <Testimonial />
    </>
  );
}
