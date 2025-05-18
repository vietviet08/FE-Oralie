"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";
import {getAllCategoriesNotId, getAllCategoryNotParent, getCategoryByName} from "@/services/CategoryService";
import {CategoryGet} from "@/model/category/CategoryGet";
import {getAllBrand} from "@/services/BrandService";
import {Brand} from "@/model/brand/Brand";

interface MenuItem {
    title: string;
    href: string;
    imgSrc?: string;
    subItems?: MenuItem[];
}

const urlCategory = "/products?category=";
const urlBrand = "/products?category=&brand=";

const Menu: React.FC = () => {
    const [menu, setMenu] = useState<MenuItem[]>([]);
    const [brandMenu, setBrandMenu] = useState<MenuItem[]>([]);
    const [menuNameHover, setMenuNameHover] = useState<string>("");

    useEffect(() => {
        async function fetchCategoriesNotParent() {
            try {
                const response = await getAllCategoryNotParent();
                if (response) {
                    const menuData = response.map((item: CategoryGet) => ({
                        title: item.name,
                        href: `${urlCategory + item.slug}`,
                        imgSrc: item.image,
                        subItems: [],
                    }));
                    setMenu(menuData);
                }
            } catch (error) {
                console.error("Error fetching categories not parent:", error);
            }
        }

        fetchCategoriesNotParent();

        async function fetchBrands() {
            try {
                const response = await getAllBrand();
                if (response) {
                    const brandData = response.map((item: Brand) => ({
                        title: item.name,
                        href: `${urlBrand + item.slug}`,
                        imgSrc: item.image,
                        subItems: [],
                    }));
                    setBrandMenu(brandData);
                }
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        }

        fetchBrands();
    }, []);

    useEffect(() => {
        async function fetchCategories() {
            if (!menuNameHover) return;

            try {
                const parentCategory = await getCategoryByName(menuNameHover);
                if (parentCategory) {
                    const response = await getAllCategoriesNotId(parentCategory.id, true);
                    if (response) {
                        const subItems = response
                            .filter((item: CategoryGet) => item.parentId === parentCategory.id)
                            .map((item: CategoryGet) => {
                                const subCategories = response.filter(
                                    (subItem: CategoryGet) => subItem.parentId === item.id
                                );

                                return {
                                    title: item.name,
                                    href: `${urlCategory + item.slug}`,
                                    imgSrc: item.image,
                                    subItems: subCategories.map((subItem: CategoryGet) => ({
                                        title: subItem.name,
                                        href: `${urlCategory + subItem.slug}`,
                                        imgSrc: subItem.image,
                                    })),
                                };
                            });

                        setMenu((prevMenu) =>
                            prevMenu.map((menuItem) =>
                                menuItem.title === parentCategory.name
                                    ? {...menuItem, subItems}
                                    : menuItem
                            )
                        );
                    }
                }
            } catch (error) {
                console.error("Error fetching sub-categories:", error);
            }
        }

        fetchCategories();
    }, [menuNameHover]);


    return (
        <div className="box_menu_home relative ">
            <nav className="menu_nav">
                <ul className="menu_list flex flex-col gap-0 ">
                    {menu.map((item, index) => (
                        <MenuItemComponent key={index} item={item} brandMenu={brandMenu}
                                           onMouseEnter={() => setMenuNameHover(item.title)}/>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

const MenuItemComponent: React.FC<{ item: MenuItem; brandMenu: MenuItem[], onMouseEnter: () => void }> = ({
                                                                                                              item,
                                                                                                              brandMenu,
                                                                                                              onMouseEnter
                                                                                                          }) => (
    <li className="group p-0 m-0" onMouseEnter={onMouseEnter}>
        <a
            className="flex justify-between items-center space-x-2 text-gray-700 hover:text-primaryred"
            href={item.href}
            title={item.title}
        >
            <div className="flex items-center pl-4 py-2 hover:bg-gray-100 w-full ">
                {item.imgSrc && (
                    <Image
                        width={24}
                        height={24}
                        className="w-6 h-6 mr-2"
                        src={item.imgSrc}
                        alt={item.title}
                        title={item.title}
                    />
                )}
                <span className="text-sm font-medium">{item.title}</span>
            </div>
        </a>

        <div className="absolute left-full top-0 h-full w-32 z-20 group-hover:block hidden"></div>

        {item.subItems && (
            <ul className="hidden group-hover:flex flex-wrap rounded-xl absolute left-[98%] ml-3 top-0 w-[315%] bg-white shadow-lg z-50">
                {item.title === "Laptop" && (
                    <li className="p-2 mx-2">
                        <a
                            className="block text-sm font-bold text-primaryred"
                            href={`${urlBrand}`}
                            title={"Brand"}
                        >
                            Brand
                        </a>
                        {brandMenu && (
                            <ul className="text-sm space-y-2 mt-2">
                                {brandMenu.map((subSubItem, subIndex) => (
                                    <li key={subIndex} className="">
                                        <a
                                            className="flex items-center h-8 space-x-2 text-gray-700 hover:text-blue-500"
                                            href={subSubItem.href}
                                            title={subSubItem.title}
                                        >
                                            {subSubItem.imgSrc && (
                                                <Image
                                                    width={58}
                                                    height={18}
                                                    src={subSubItem.imgSrc}
                                                    alt={subSubItem.title}
                                                    title={subSubItem.title}
                                                    className="h-full object-contain"
                                                />
                                            )}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                )}
                {item.subItems.map((subItem, index) => (
                    <li key={index} className="p-2 mx-2">
                        <a
                            className="block text-sm font-bold text-primaryred"
                            href={subItem.href}
                            title={subItem.title}
                        >
                            {subItem.title}
                        </a>
                        {subItem.subItems && (
                            <ul className="text-sm space-y-2 mt-2">
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

export default Menu;
