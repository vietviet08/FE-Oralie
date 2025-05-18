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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const [searchData, setSearchData] = useState<Product[]>([]);
    const [showSearchFrame, setShowSearchFrame] = useState(false);

    const menuRef = React.useRef<HTMLDivElement>(null);
    const mobileMenuRef = React.useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setOpenMenu(false);
        }
        if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
            setMobileMenuOpen(false);
        }
    };

    const closeSearchFrame = () => {
        setShowSearchFrame(false);
    };

    useEffect(() => {
        async function fetchCart() {
            try {
                const res: CartResponse = await getCart(token);
                if (res) {
                    setCartItemCount(res.quantity);
                }
            } catch (error) {
                console.error("Failed to fetch cart:", error);
            }
        }

        fetchCart();
    }, [token]);

    useEffect(() => {
        if (openMenu || mobileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [token, openMenu, mobileMenuOpen]);

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
        <header className="z-50 fixed shadow-md py-2 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-32 mb-14 bg-gradient-to-b from-primaryred1 to-primaryred font-sans min-h-[70px] tracking-wide w-full">
            {openMenu && (
                <>
                    <div className="fixed top-[72px] inset-0 bg-black opacity-40 z-0"></div>
                    <div
                        ref={menuRef}
                        className="absolute top-20 left-4 sm:left-6 md:left-10 lg:left-16 xl:left-32 bg-white rounded-xl shadow-xl w-64 sm:w-72 md:w-80 lg:w-1/5 mr-5 h-[364px] z-0"
                    >
                        <Menu/>
                    </div>
                </>
            )}

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 top-[70px] bg-black bg-opacity-50 z-50">
                    <div 
                        ref={mobileMenuRef} 
                        className="bg-white w-4/5 max-w-sm h-screen overflow-y-auto shadow-lg transition-transform duration-300 ease-in-out"
                    >
                        <div className="p-4 border-b">
                            {session ? (
                                <div className="flex items-center gap-3 py-2">
                                    <Icons.circleUser className="text-primaryred w-8 h-8" />
                                    <div className="flex flex-col">
                                        <span className="font-medium">{session?.user?.name || "User"}</span>
                                        <Link href="/account" className="text-xs text-blue-600">
                                            View Profile
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <Link href="/account" className="block py-2 text-primaryred font-medium">
                                    Login / Register
                                </Link>
                            )}
                        </div>
                        <nav className="p-4">
                            <Link href="/" className="block py-2 border-b">
                                Home
                            </Link>
                            <Link href="/products" className="block py-2 border-b">
                                Products
                            </Link>
                            <Link href="/cart" className="block py-2 border-b">
                                Cart ({cartItemCount})
                            </Link>
                            <Link href="/account/orders" className="block py-2 border-b">
                                My Orders
                            </Link>
                            <div className="py-2 border-b">
                                <a href="tel:9090000" className="flex items-center gap-2">
                                    <Icons.phoneCall className="text-primaryred w-5 h-5" />
                                    <span>Contact Us: 9090 0000</span>
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                    <button 
                        className="lg:hidden text-white p-1"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <Icons.alignJustify className="w-6 h-6" />
                    </button>
                    <a href="/" className="flex items-center">
                        <Image
                            src="/images/oralie.png"
                            width={120}
                            height={120}
                            alt="logo"
                            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14"
                        />
                        <span className="hidden sm:inline-block text-white font-semibold ml-2 text-lg">Oralie</span>
                    </a>
                </div>

                <div className="hidden lg:block rounded-2xl bg-primaryred1">
                    <Button variant="transparent" onClick={() => setOpenMenu(!openMenu)}>
                        <Icons.alignJustify className="w-6 h-6 text-white mr-2"/>
                        <p className="text-white">Menu</p>
                    </Button>
                </div>

                <div className="relative w-1/2 md:w-2/5 lg:w-2/5">
                    <Input
                        ref={inputRef}
                        onInput={(e) => {
                            openSearchFrame((e.target as HTMLInputElement).value);
                        }}
                        placeholder="Search products"
                        className="text-gray text-xs sm:text-sm outline-none bg-white placeholder:text-gray rounded-2xl border-0 pr-10 text-ellipsis focus:outline-none focus:ring-0 focus:border-0 h-9 sm:h-10"
                    />

                    {
                        inputRef.current?.value && (
                            <Button
                                variant="danger"
                                className="absolute right-10 sm:right-12 top-1/2 transform -translate-y-1/2 flex justify-center items-center w-5 h-5 bg-gray-300 rounded-full p-0 m-0"
                                onClick={() => {
                                    if (inputRef.current) {
                                        inputRef.current.value = "";
                                        setShowSearchFrame(false);
                                    }
                                }}
                            >
                                <Icons.close className="w-3 h-3 text-primaryred"/>
                            </Button>
                        )}

                    <Button
                        variant="danger"
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 size-8 sm:size-10"
                    >
                        <Icons.search className="w-5 h-5 sm:w-6 sm:h-6 text-primaryred"/>
                    </Button>

                    {showSearchFrame && (
                        <div className="absolute mt-1 left-0 w-full">
                            <SearchFrame data={searchData} closeSearchFrame={closeSearchFrame}/>
                        </div>
                    )}
                </div>

                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-5">
                    <Link
                        href="/"
                        className="hidden lg:block rounded-3xl bg-inherit text-white"
                    >
                        <Button variant="transparent">
                            <Icons.phoneCall className="mr-2 font-light w-6 h-6 sm:w-7 sm:h-7"/>
                            <div className="hidden sm:flex text-xs flex-col justify-center items-start">
                                <p>Contact us</p>
                                <p className="">9090 0000</p>
                            </div>
                        </Button>
                    </Link>

                    <Link
                        href="/account"
                        className="hidden sm:block rounded-3xl bg-inherit sm:bg-primaryred1 text-white"
                    >
                        <Button variant="transparent">
                            <Icons.circleUser className="mr-1 font-light w-6 h-6 sm:w-7 sm:h-7"/>
                            <p className="hidden sm:block text-xs">{session?.user?.name || "Login"}</p>
                        </Button>
                    </Link>

                    <Link href={"/cart"} className="flex items-center">
                        <span className="relative">
                          <Icons.shoppingCart className="w-6 h-6 sm:w-7 sm:h-7 text-white"/>
                          <span className="absolute -top-1 -right-1 rounded-full bg-white px-1 py-0 text-xs text-primaryred min-w-[16px] text-center">
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
