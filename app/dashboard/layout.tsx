"use client";

import Link from "next/link";
import {
  Bell,
  Home,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import Header from "@/components/features/Header";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
type navLinks = {
  id: number;
  name: string;
  href: string;
  icon: ReactNode;
  badge: number;
  requireAuth: boolean;
};

export const navLinks = [
  { id: 1, name: "Dashboard", href: "/dashboard", icon: Home },
  {
    id: 2,
    name: "Auth",
    href: "/dashboard/Auth",
    icon: ShoppingCart,
    badge: 12,
    requireAuth: false,
  },
  {
    id: 2,
    name: "Users",
    href: "/dashboard/users",
    icon: ShoppingCart,
    badge: 12,
    requireAuth: true,
  },
  {
    id: 3,
    name: "Settings",
    href: "/dashboard/settings",
    icon: Package,
    requireAuth: true,
  },
];
export default function LayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const activeLink =
    "/dashboard" + (pathname.split("/")[2] ? "/" + pathname.split("/")[2] : "");
  const { isAuthenticated } = useKindeBrowserClient();
  return (
    <>
      <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
        <div className='hidden border-r bg-muted/40 md:block'>
          <div className='flex h-full max-h-screen flex-col gap-2'>
            <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
              <Link href='/' className='flex items-center gap-2 font-semibold'>
                <Package2 className='h-6 w-6' />
                <span className=''>Racine14 Creator</span>
              </Link>
              <Button variant='outline' size='icon' className='ml-auto h-8 w-8'>
                <Bell className='h-4 w-4' />
                <span className='sr-only'>Toggle notifications</span>
              </Button>
            </div>
            <div className='flex-1'>
              <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
                {navLinks.map(
                  ({ id, href, name, icon: Icon, badge, requireAuth }) => {
                    if (requireAuth && !isAuthenticated) {
                      return null;
                    }
                    return (
                      <Link
                        className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl text-muted-foreground px-3 py-2 ${
                          activeLink === href && "bg-muted text-primary"
                        } text-foreground hover:text-foreground`}
                        href={href}
                        key={id}
                      >
                        <Icon className='h-4 w-4' />
                        {name}
                      </Link>
                    );
                  }
                )}
              </nav>
            </div>
            <div className='mt-auto p-4'>
              <Card x-chunk='dashboard-02-chunk-0'>
                <CardHeader className='p-2 pt-0 md:p-4'>
                  <CardTitle>Upgrade to Pro</CardTitle>
                  <CardDescription>
                    Unlock all features and get unlimited access to our support
                    team.
                  </CardDescription>
                </CardHeader>
                <CardContent className='p-2 pt-0 md:p-4 md:pt-0'>
                  <Button size='sm' className='w-full'>
                    Upgrade
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <Header />
          <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
