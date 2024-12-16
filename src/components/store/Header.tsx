"use client";

import * as React from "react";
import Link from "next/link";

import {cn} from "@/lib/utils";
import {
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import {Button} from "@medusajs/ui";
import {Icons} from "../icons";
import {Input} from "../ui/input";
import Menu from "./home/sologan/menu";
import {useEffect, useRef, useState} from "react";
import {getCart} from "@/services/CartService";
import {useSession} from "next-auth/react";
import {CartResponse} from "@/model/cart/CartResponse";
import {Product} from "@/model/product/Product";
import {getListProduct} from "@/services/ProductService";
import SearchFrame from "@/components/common/search-frame/search-frame";

export function Header() {
    const {data: session} = useSession();
    const token = session?.access_token as string;

    const [cartItemCount, setCartItemCount] = useState<number>(0);

    const [openMenu, setOpenMenu] = React.useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const [searchData, setSearchData] = useState<Product[]>([]);
    const [showSearchFrame, setShowSearchFrame] = useState(false);

    const menuRef = React.useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setOpenMenu(false);
        }
    };

    useEffect(() => {
        async function fetchCart() {
            try {
                const res: CartResponse = await getCart(token);
                if (res) {
                    setCartItemCount(res.quantity);
                    console.log("cart in header " + res);
                }
            } catch (error) {
                console.error("Failed to fetch cart:", error);
            }
        }

        fetchCart();
    }, [token]);

    useEffect(() => {

        if (openMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [token, openMenu]);

    async function openSearchFrame(keyword: string) {
        if (keyword.length > 0) {
            console.log(keyword);
            const results = await getListProduct(0, 10, "name", "asc", keyword, "");
            setSearchData(results.data);
            setShowSearchFrame(true);
        } else {
            setShowSearchFrame(false);
        }
    }

    return (
        <header
            className=" z-50 fixed flex shadow-md py-2 md:px-32 px-6 mb-14 bg-gradient-to-b from-primaryred1 to-primaryred font-sans min-h-[70px] tracking-wide w-full">
            {openMenu && (
                <>
                    <div className="fixed top-[72px] inset-0 bg-black opacity-40 z-0"></div>

                    <div
                        ref={menuRef}
                        className="absolute top-20 left-32 bg-white rounded-xl shadow-xl w-[16%] mr-5 h-[364px] z-0"
                    >
                        <Menu/>
                    </div>
                </>
            )}

            <div className="flex items-center justify-between w-full">
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
                    <Button variant="transparent" onClick={() => setOpenMenu(!openMenu)}>
                        <Icons.alignJustify className="w-7 h-7 text-white mr-2"/>
                        <p className="hidden sm:block text-white">Menu</p>
                    </Button>
                </div>

                <div className="relative lg:w-2/5 sm:w-3/5">
                    <Input
                        ref={inputRef}
                        onBlur={() => {
                            setShowSearchFrame(false)
                        }}
                        onInput={(e) => {
                            openSearchFrame((e.target as HTMLInputElement).value);
                        }}
                        placeholder="Input the product need to find"
                        className="text-gray font-[14px] outline-none bg-white placeholder:text-gray placeholder:text-base rounded-2xl border-0 pr-10 text-ellipsis focus:outline-none focus:ring-0 focus:border-0 "
                    />

                    {
                        inputRef.current?.value && (
                            <Button
                                variant="danger"
                                className="absolute right-12 top-1/2 transform -translate-y-1/2  flex justify-center items-center w-5 h-5 bg-gray-300 rounded-full p-0 m-0"
                                onClick={() => {
                                    if (inputRef.current) {
                                        inputRef.current.value = "";
                                        setShowSearchFrame(false);
                                    }
                                }}
                            >
                                <Icons.close

                                    className="absolute top-1/2 transform -translate-y-1/2  w-3 h-3 text-primaryred "/>
                            </Button>
                        )}

                    <Button
                        variant="danger"
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 size-10"
                    >
                        <Icons.search
                            className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 text-primaryred "/>
                    </Button>

                    {showSearchFrame && (
                        <div
                            className="absolute mt-1 left-0"

                        >
                            <SearchFrame data={searchData}/>
                        </div>
                    )}
                </div>


                <div className="flex items-center space-x-5">
                    <Link
                        href="/"
                        className="hidden lg:block rounded-3xl bg-inherit text-white "
                    >
                        <Button variant="transparent">
                            <Icons.phoneCall className="mr-2 font-light w-7 h-7"/>
                            <div className="hidden sm:flex text-xs flex-col justify-center items-start">
                                <p>Hotline</p>
                                <p className="">1800 0000</p>
                            </div>
                        </Button>
                    </Link>

                    <Link
                        href="/account"
                        className="rounded-3xl  bg-inherit sm:bg-primaryred1  text-white "
                    >
                        <Button variant="transparent">
                            <Icons.circleUser className="mr-1 font-light w-7 h-7"/>
                            <p className="hidden sm:block text-xs">{session ? session.user.name : "Login"}</p>
                        </Button>
                    </Link>

                    <Link href={"/cart"}>
            <span className="relative">
              <Icons.shoppingCart className="w-7 h-7 text-white"/>
              <span className="absolute left-auto -ml-1 top-0 rounded-full bg-white px-1 py-0 text-xs  text-primaryred">
                 {cartItemCount}
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
>(({className, title, children, ...props}, ref) => {
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
