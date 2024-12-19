"use client";

import {Icons} from "@/components/icons";
import {Button} from "@/components/ui/button";
import federatedLogout from "@/utils/federatedLogout";
import {LogOut} from "lucide-react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import ProfileUserStore from "@/components/store/account/profile";

const SideBarAccountStore: React.FC<{ children?: React.ReactNode }> = ({children}) => {
    const {data: session} = useSession();
    const router = useRouter();
    const [selectedSection, setSelectedSection] = useState<string>("");

    const handleSectionClick = (section: string) => {
        setSelectedSection(section);
    };

    const [expires, setExpires] = useState<string>("");

    useEffect(() => {
        if (session) {
            setExpires(session.expires);
            const timer = setTimeout(() => {
                setExpires(session.expires);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [session]);

    const links = [
        {
            name: "Profile",
            icon: <Icons.user/>,
            onClick: () => router.push("/account"),
        },
        {
            name: "Cart",
            icon: <Icons.shoppingCart className="w-7 h-7"/>,
            onClick: () => router.push("/cart"),
        },
        {
            name: "Orders",
            icon: <Icons.logs className="w-7 h-7"/>,
            onClick: () => router.push("/account/orders"),
        },
        {
            name: "Settings",
            icon: <Icons.settings className="w-7 h-7"/>
        },
        {
            name: "Password",
            icon: <Icons.key className="w-7 h-7"/>,
            onClick: () => router.push("/account/password"),
        },
        {
            name: "Access Token",
            icon: <Icons.braces className="w-7 h-7"/>,
            onClick: () => router.push("/account/token"),
        },
        {
            name: "Logout",
            icon: <LogOut className="w-7 h-7"/>,
            onClick: federatedLogout,
        },
    ];

    return (
        <div className="sm:px-32 px-6 py-6 mt-12">
            <h2 className="text-2xl font-semibold text-primaryred py-4">Account Manage</h2>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/4 mr-0 md:mr-2 mt-0 p-4 rounded-lg shadow">
                    <ul className="space-y-4">
                        {links.map((link) => (
                            <li
                                key={link.name}
                                onClick={() => {
                                    link.onClick?.();
                                    handleSectionClick(link.name);
                                }}
                                    className={`cursor-pointer ${
                                    selectedSection === link.name
                                    ? "bg-gray-200 rounded-lg shadow-sm"
                                    : ""
                                }`}
                                    >
                                    <Button
                                    variant={"ghost"}
                                    className="hover:text-primaryred hover:bg-gray-100 w-full flex items-center justify-start py-2"
                                    >
                                {link.icon} <p className="text-base">{link.name}</p>
                            </Button>
                            </li>
                            ))}
                    </ul>
                </div>
                <div className="w-full md:w-3/4 ml-0 md:ml-2 mt-4 md:mt-0 p-4 rounded-lg shadow">
                    {children ? children : <ProfileUserStore/>}
                </div>
            </div>
        </div>
    );
};

export default SideBarAccountStore;
