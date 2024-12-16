"use client";

import {Icons} from "@/components/icons";
import {Button} from "@/components/ui/button";
import federatedLogout from "@/utils/federatedLogout";
import {LogOut} from "lucide-react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";

const AccountPage: React.FC = () => {
    const {data: session} = useSession();
    const router = useRouter();
    const [selectedSection, setSelectedSection] = useState<string>("");

    const handleSectionClick = (section: string) => {
        setSelectedSection(section);
    };

    const [exprise, setExprise] = useState<string>("");

    useEffect(() => {
        if (session) {
            setExprise(session.expires);
            const timer = setTimeout(() => {
                setExprise(session.expires);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [session]);

    const links = [
        {name: "Profile", icon: <Icons.user/>},
        {
            name: "Cart",
            icon: <Icons.shoppingCart className="w-7 h-7"/>,
            onClick: () => router.push("/cart"),
        },
        {name: "Orders", icon: <Icons.logs className="w-7 h-7"/>},
        {name: "Settings", icon: <Icons.settings className="w-7 h-7"/>},
        {name: "Password", icon: <Icons.key className="w-7 h-7"/>},
        {
            name: "Logout",
            icon: <LogOut className="w-7 h-7"/>,
            onClick: federatedLogout,
        },
    ];

    const renderSectionContent = () => {
        switch (selectedSection) {
            case "Profile":
                return (
                    <div className="flex flex-col items-center">
                        <span className="text-sm">{session?.user?.email} </span>
                        <span className="text-lg font-bold">
              {session?.user?.name || "User"}
            </span>
                        <span className="text-sm">{session?.user?.email}</span>
                        <span className="text-sm">{exprise}</span>
                    </div>
                );
            case "Orders":
                return <div>Orders Content</div>;
            case "Setting":
                return <div>Settings Content</div>;
            case "Password":
                return <div>Change Password Content</div>;
            default:
                return (
                    <div className="flex flex-col items-center">
            <span className="text-lg font-bold">
              {session?.user?.name || "User"}
            </span>
                        <span className="text-sm">{session?.user?.email}</span>
                        <span className="text-sm break-words w-3/5 h-full">
              {session?.access_token}
            </span>
                        <span className="text-sm">{exprise}</span>
                    </div>
                );
        }
    };

    return (
        <div className="sm:px-32 px-6 py-6 mt-24">
            <h2 className="text-2xl text-primaryred py-4">Account Manage</h2>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/4 mr-0 md:mr-2 mt-0 p-4 rounded-lg shadow-md">
                    <ul className="space-y-4">
                        {links.map((link) => (
                            <li
                                key={link.name}
                                onClick={
                                    link.onClick
                                        ? link.onClick
                                        : () => handleSectionClick(link.name)
                                }
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
                <div className="w-full md:w-3/4 ml-0 md:ml-2 mt-4 md:mt-0 p-4 rounded-lg shadow-md">
                    {renderSectionContent()}
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
