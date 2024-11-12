import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Logo from "../icons/logo";
import Image from "next/image";
import { ModeToggle } from "../ui/theme-mode";
import AuthStatus from "@/components/common/authStatus";
import { Button } from "@medusajs/ui";
import { Icons } from "../icons";
import { Input } from "../ui/input";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function Header() {
  return (
    <header className="flex shadow-md py-2 sm:px-32 px-6 bg-primaryred font-sans min-h-[70px] tracking-wide relative z-50 w-full">
      <div className="flex  items-center justify-between  w-full">
        <a href="/">
          <Image
            src="/images/oralie.png"
            width={120}
            height={120}
            alt="logo"
            className="w-14 h-14"
          />
        </a>
        <div className="rounded-2xl sm:bg-primaryred1 hidden sm:block">
          <Button variant="transparent">
            <Icons.alignJustify className="w-7 h-7 text-white mr-2" />
            <p className="hidden sm:block text-white">Menu</p>
          </Button>
        </div>
        <div className="relative w-2/5">
          <Input
            placeholder="Input the product need to find"
            className="text-gray bg-white placeholder:text-gray placeholder:text-base rounded-2xl border-0 pr-10 text-ellipsis"
          />
          <Icons.search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-primaryred " />
        </div>

        <div className="flex items-center space-x-5">
          <Link
            href="/account"
            className="rounded-3xl  bg-inherit sm:bg-primaryred1  text-white "
          >
            <Button variant="transparent">
              <Icons.circleUser className="mr-1 font-light w-7 h-7" />
              <p className="hidden sm:block">Account</p>
            </Button>
          </Link>

          <Link href={"/cart"}>
            <span className="relative">
              <Icons.shoppingCart className="w-7 h-7 text-white" />
              <span className="absolute left-auto -ml-1 top-0 rounded-full bg-white px-1 py-0 text-xs  text-primaryred">
                0
              </span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
