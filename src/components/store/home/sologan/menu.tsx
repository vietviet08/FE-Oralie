import React from "react";
import Image from "next/image";

interface MenuItem {
    title: string;
    href: string;
    imgSrc?: string;
    subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
    {
        title: "Laptop Mới",
        href: "#",
        imgSrc:
            "https://ttcenter.com.vn/uploads/category/laptop-moi-1679912930.png",
        subItems: [
            {
                title: "Hãng sản xuất",
                href: "#",
                subItems: [
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                ],
            },
            {
                title: "Hãng sản xuất",
                href: "#",
                subItems: [
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                ],
            },
            {
                title: "Hãng sản xuất",
                href: "#",
                subItems: [
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                ],
            },
            {
                title: "Hãng sản xuất",
                href: "#",
                subItems: [
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                ],
            },
            {
                title: "Hãng sản xuất",
                href: "#",
                subItems: [
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                ],
            },
            {
                title: "Hãng sản xuất",
                href: "#",
                subItems: [
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                ],
            },
        ],
    },
    {
        title: "Laptop Mới",
        href: "#",
        imgSrc:
            "https://ttcenter.com.vn/uploads/category/laptop-moi-1679912930.png",
        subItems: [
            {
                title: "Hãng sản xuất",
                href: "#",
                subItems: [
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                ],
            },
            {
                title: "Hãng sản xuất",
                href: "#",
                subItems: [
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "Dell",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                ],
            },
            {
                title: "Hãng sản xuất",
                href: "#",
                subItems: [
                    {
                        title: "HP",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "HP",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "HP",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "HP",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                ],
            },
            {
                title: "Hãng sản xuất",
                href: "#",
                subItems: [
                    {
                        title: "HP",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "HP",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "HP",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                    {
                        title: "HP",
                        href: "#",
                        imgSrc:
                            "https://ttcenter.com.vn/uploads/product_menu/dell-1679907775.png",
                    },
                ],
            },
        ],
    },
];

const MenuItemComponent: React.FC<{ item: MenuItem }> = ({item}) => (
    <li className="relative group ml-2">
        <a
            className="flex justify-between items-center space-x-2 mt-2 text-gray-700 hover:text-primaryred"
            href={item.href}
            title={item.title}
        >
            <div className="flex items-center mx-3 rounded-lg hover:bg-gray-100 w-full">
                {item.imgSrc && (
                    <Image
                        width={32}
                        height={32}
                        className="w-8 h-8"
                        src={item.imgSrc}
                        alt={item.title}
                        title={item.title}
                    />
                )}
                <span className="text-sm font-medium">{item.title}</span>
            </div>
        </a>

        <div className="absolute left-full top-0 ml-2 h-full w-2 group-hover:block hidden"></div>

        {item.subItems && (
            <ul className="hidden group-hover:flex flex-wrap absolute left-[98%] ml-2 top-0 w-[328%] bg-white shadow-lg rounded-lg z-50">
                {item.subItems.map((subItem, index) => (
                    <li key={index} className="p-2">
                        <a
                            className="block text-gray-700 hover:text-blue-500"
                            href={subItem.href}
                            title={subItem.title}
                        >
                            {subItem.title}
                        </a>
                        {subItem.subItems && (
                            <ul className="space-y-2 mt-2">
                                {subItem.subItems.map((subSubItem, subIndex) => (
                                    <li key={subIndex}>
                                        <a
                                            className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"
                                            href={subSubItem.href}
                                            title={subSubItem.title}
                                        >
                                            {subSubItem.imgSrc && (
                                                <Image
                                                    width={56}
                                                    height={24}
                                                    className="w-14 h-6 object-cover"
                                                    src={subSubItem.imgSrc}
                                                    alt={subSubItem.title}
                                                    title={subSubItem.title}
                                                />
                                            )}
                                            <span>{subSubItem.title}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        )}
    </li>
);

const Menu: React.FC = () => (
    <div className="box_menu_home ">
        <nav className="menu_nav">
            <ul className="menu_list space-y-4">
                {menuItems.map((item, index) => (
                    <MenuItemComponent key={index} item={item}/>
                ))}
            </ul>
        </nav>
    </div>
);

export default Menu;
