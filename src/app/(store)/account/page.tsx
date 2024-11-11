"use client";

import Logout from "@/components/auth/Logout";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import federatedLogout from "@/utils/federatedLogout";
import { LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AccountPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState<string>("");

  const handleSectionClick = (section: string) => {
    setSelectedSection(section);
  };

  const links = [
    { name: "Profile", icon: <Icons.user /> },
    {
      name: "Cart",
      icon: <Icons.shoppingCart className="w-7 h-7" />,
      onClick: () => router.push("/store/cart"),
    },
    { name: "Orders", icon: <Icons.logs className="w-7 h-7" /> },
    { name: "Settings", icon: <Icons.settings className="w-7 h-7" /> },
    { name: "Password", icon: <Icons.key className="w-7 h-7" /> },
    {
      name: "Logout",
      icon: <LogOut className="w-7 h-7" />,
      onClick: federatedLogout,
    },
  ];

  const renderSectionContent = () => {
    switch (selectedSection) {
      case "Profile":
        return <div>Profile Content</div>;
      case "Orders":
        return <div>Orders Content</div>;
      case "Setting":
        return <div>Settings Content</div>;
      case "Password":
        return <div>Change Password Content</div>;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="mx-auto w-full sm:px-10 p-4 py-6 lg:py-8">
      <Head>
        <h2>Account Manage</h2>
      </Head>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 mr-0   md:mr-2 mt-0 p-4  rounded-lg shadow-md">
          <ul className="space-y-4">
            {links.map((link) => (
              <li
                key={link.name}
                onClick={
                  link.onClick
                    ? link.onClick
                    : () => handleSectionClick(link.name)
                }
                className="cursor-pointer"
              >
                <Button
                  variant={"ghost"}
                  className="hover:text-primaryred hover:bg-inherit"
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
