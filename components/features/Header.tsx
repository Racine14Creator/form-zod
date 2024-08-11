"use client";

import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import {
  Badge,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import Home from "@/app/page";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import UserInfo from "./UserInfo";

type navLinks = {
  id: number;
  name: string;
  href: string;
  icon: ReactNode;
  badge: number;
};

export const navLinks = [
  { id: 1, name: "Dashboard", href: "/dashboard", icon: Home },
  {
    id: 2,
    name: "Users",
    href: "/dashboard/users",
    icon: ShoppingCart,
    badge: 12,
  },
  { id: 3, name: "Personnels", href: "/dashboard/personnels", icon: Package },
  {
    id: 4,
    name: "Enfants",
    href: "/dashboard/students",
    icon: Users,
    badge: 7,
  },
  { id: 5, name: "Paramettres", href: "/dashboard/settings", icon: LineChart },
];

export default function Header() {
  const pathname = usePathname();
  const activeLink =
    "/dashboard" + (pathname.split("/")[2] ? "/" + pathname.split("/")[2] : "");
  return (
    <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='flex flex-col'>
          <nav className='grid gap-2 text-lg font-medium'>
            <Link
              href='#'
              className='flex items-center gap-2 text-lg font-semibold'
            >
              <Package2 className='h-6 w-6' />
              <span className='sr-only'>Racine14 Creator</span>
            </Link>
            {navLinks.map(({ id, href, name, icon: Icon, badge }) => (
              <Link
                key={id}
                href={href}
                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl text-muted-foreground px-3 py-2 ${
                  activeLink === href && "bg-muted text-primary"
                } text-foreground hover:text-foreground`}
              >
                <Icon className='h-5 w-5' />
                {name}
                {badge && (
                  <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
                    {badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
          <div className='mt-auto'>
            <Card>
              <CardHeader>
                <CardTitle>Racine14 C.</CardTitle>
                <CardDescription>Everyday Do new thing</CardDescription>
              </CardHeader>
              <CardContent>
                <Button size='sm' className='w-full'>
                  Work more
                </Button>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
      <div className='w-full flex-1'>
        <form>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search products...'
              className='w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3'
            />
          </div>
        </form>
      </div>
      <UserInfo />
    </header>
  );
}
