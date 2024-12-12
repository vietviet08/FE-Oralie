'use client'

import {Button, buttonVariants} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import React, {ReactNode, useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {createCategory, getAllCategoriesNotId} from "@/services/CategoryService";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import {FileUploader} from "@/components/common/file-uploader";
import {Switch} from "@/components/ui/switch";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {CategoryGet} from "@/model/category/CategoryGet";

type Props = {
    icon: ReactNode;
    accessToken: string;
}

export function CategoryDialog({icon, accessToken}: Props) {

    const [isOpen, setIsOpen] = useState(false);

    const [file, setFile] = useState<File[]>([]);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [parentId, setParentId] = useState<number | undefined>(undefined);
    const [categoryList, setCategoryList] = useState<CategoryGet[]>([]);
    const [isChecked, setChecked] = useState(true);

    const router = useRouter()
    const {toast} = useToast();

    useEffect(() => {
        async function fetchListCategory() {
            const res = await getAllCategoriesNotId(1, true);
            if (res && res.status === 200) {
                setCategoryList(res.data);
            }
        }

        fetchListCategory();
    }, []);

    async function handleSubmit() {
        const slug = name.toLowerCase().replace(/ /g, '-');

        try {
            const res = await createCategory({
                name: name,
                description: description,
                image: file[0],
                slug: slug,
                isDeleted: !isChecked,
                parentId: parentId,
            }, accessToken);

            if (res && res.status === 200) {
                toast({
                    title: "Category Created",
                    description: "Category has been created successfully",
                    duration: 5000,
                });
            }
            if (res && res.status === 400) {
                toast({
                    variant: "destructive",
                    title: "Category Creation Failed",
                    description: "Name category already exists",
                    duration: 5000,
                });
            }
        } catch (e) {
            console.log(e)
            toast({
                variant: "destructive",
                title: "Category Creation Failed",
                description: "Category creation failed",
                duration: 5000,
            });
        } finally {
            setIsOpen(false);
            router.refresh();
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className={cn(buttonVariants(), 'text-xs md:text-sm')}> {icon} <span>Add New</span></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Category</DialogTitle>
                    <DialogDescription>
                        Create new category for your products here.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <FileUploader value={file}
                                  maxFiles={1}
                                  multiple={false}
                                  maxSize={4 * 1024 * 1024}
                                  onValueChange={setFile}/>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name"
                               value={name}
                               className="col-span-3"
                               onChange={(e) => {
                                   setName(e.target.value)
                               }}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="desciption" className="text-right">
                            Description
                        </Label>
                        <Input id="desciption"
                               value={description}
                               className="col-span-3"
                               onChange={(e) => {
                                   setDescription(e.target.value)
                               }}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="desciption" className="text-right">
                            Parent Category
                        </Label>
                        <Input id="desciption"
                               value={description}
                               className="col-span-3"
                               onChange={(e) => {
                                   setDescription(e.target.value)
                               }}
                        />
                        <Select>
                            <Select
                                onValueChange={(value) => setParentId(parseInt(value))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Options"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {categoryList.map(category => (
                                            <SelectItem key={category.id}
                                                        value={category.id!.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Select>
                    </div>
                </div>
                <DialogFooter className={"flex items-center justify-between"}>
                    <div className="flex items-center space-x-2">
                        <Switch id="button-checked" name={"Activate"} checked={isChecked} onCheckedChange={setChecked}/>
                        <Label htmlFor="button-checked">Activate</Label>
                    </div>
                    <Button type="button" onClick={handleSubmit}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

