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
import React, {ReactNode, useState} from "react";
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

    async function fetchListCategory() {
        const res = await getAllCategoriesNotId(1, false);
        if (res) {
            setCategoryList(res);
        }
    }

    async function handleSubmit() {
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        try {
            const res = await createCategory({
                name: name,
                description: description,
                image: file[0],
                slug: slug,
                isDeleted: !isChecked,
                parentId: parentId !== 0 ? parentId : undefined,
            }, accessToken);

            if (res && res.status == 200) {
                toast({
                    title: "Category Created",
                    variant: "success",
                    description: "Category has been created successfully",
                    duration: 3000,
                });
            }

            setParentId(0);

        } catch (e) {
            console.log(e)
            toast({
                variant: "destructive",
                title: "Category Creation Failed",
                description: (e as unknown as {
                    response?: { data?: { errorMessage?: string } }
                }).response?.data?.errorMessage || "An unknown error occurred",
                duration: 3000,
            });
        } finally {
            setIsOpen(false);
            router.refresh();
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (open) fetchListCategory();
        }}>
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
                        <div className="flex w-full col-span-3  ">
                            <Select onValueChange={(value) => setParentId(parseInt(value))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Parent"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem key={0} value={"0"}>
                                            None
                                        </SelectItem>
                                        {categoryList && categoryList.map(category => (
                                            <SelectItem key={category.id} value={category.id!.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
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

