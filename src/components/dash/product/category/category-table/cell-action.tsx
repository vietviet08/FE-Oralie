"use client";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {CircleCheck, Edit, MoreHorizontal, Trash} from "lucide-react";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {AlertModal} from "@/components/dash/modal/alert-modal";
import {Category} from "@/model/category/Category";
import {
    deleteCategory,
    updateCategory,
    updateAvailableCategory, getAllCategoriesNotId,
} from "@/services/CategoryService";
import {useToast} from "@/hooks/use-toast";
import {useSession} from "next-auth/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {FileUploader} from "@/components/common/file-uploader";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Switch} from "@/components/ui/switch";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {CategoryGet} from "@/model/category/CategoryGet";

interface CellActionProps {
    data: Category;
}

export const CellAction: React.FC<CellActionProps> = ({data}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [file, setFile] = useState<File[]>([]);
    const [name, setName] = useState<string>(data.name);
    const [description, setDescription] = useState<string>(data.description);
    const [parentId, setParentId] = useState<number>(data.parentId ?? 0);
    const [categoryList, setCategoryList] = useState<CategoryGet[]>([]);
    const [isChecked, setChecked] = useState(!data.isDeleted);

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [isTemporaryDelete, setIsTemporaryDelete] = useState(false);

    const router = useRouter();
    const {toast} = useToast();
    const {data: session} = useSession();

    useEffect(() => {
        async function fetchListCategory() {

            const res = await getAllCategoriesNotId(data.id!, true);
            if (res) {
                setCategoryList(res);
            }
        }

        fetchListCategory();
    }, [data.id]);

    const onConfirm = async () => {
        const token = session?.access_token as string;

        try {
            let res;
            if (isTemporaryDelete) {
                res = await updateAvailableCategory(data.id as number, token);
            } else {
                res = await deleteCategory(data.id as number, token);
            }

            if (res && res.status === 200) {
                toast({
                    variant: "success",
                    title: "Category deleted",
                    description: "Category has been deleted successfully",
                    duration: 5000,
                });
            }
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Category cant be deleted",
                description: "Category cant be deleted, please try again",
                duration: 5000,
            });
        } finally {
            setOpen(false);
            setLoading(false);
            router.refresh();
        }
    };

    const handleUpdate = () => {
        setIsDialogOpen(true);
    };

    const handleSubmit = async () => {
        const accessToken = session?.access_token as string;
        const slug = name.toLowerCase().replace(/ /g, "-");
        try {
            const res = await updateCategory(
                data.id as number,
                {
                    name: name,
                    description: description,
                    image: file[0],
                    slug: slug,
                    isDeleted: !isChecked,
                    parentId: parentId == 0 ? undefined : parentId,
                },
                accessToken
            );

            if (res && res.status === 200) {
                toast({
                    variant: "success",
                    title: "Category Updated",
                    description: "Category has been updated successfully",
                    duration: 3000,
                });
            }
            // if (res && res.status === 400) {
            //     toast({
            //         variant: "destructive",
            //         title: "Category Update Failed",
            //         description: "Name category already exists",
            //         duration: 3000,
            //     });
            // }
        } catch (e) {
            console.log(e);
            toast({
                variant: "destructive",
                title: "Category Update Failed",
                description: (e as unknown as {
                    response?: { data?: { errorMessage?: string } }
                }).response?.data?.errorMessage || "An unknown error occurred",
                duration: 3000,
            });
        } finally {
            setIsDialogOpen(false);
            router.refresh();
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={loading}
            />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={handleUpdate}>
                        <Edit className="mr-2 h-4 w-4"/> Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            setOpen(true);
                            setIsTemporaryDelete(true);
                        }}
                    >
                        {!data.isDeleted ? (
                            <>
                                <Trash className="mr-2 h-4 w-4 text-yellow-500"/> Deactivate
                            </>
                        ) : (
                            <>
                                <CircleCheck className="mr-2 h-4 w-4 text-green-500"/> Activate
                            </>
                        )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            setOpen(true);
                            setIsTemporaryDelete(false);
                        }}
                    >
                        <Trash className="mr-2 h-4 w-4 text-red-500"/> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/*update*/}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update Category</DialogTitle>
                        <DialogDescription>
                            Update category for your products here.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <FileUploader
                            value={file}
                            maxFiles={1}
                            multiple={false}
                            maxSize={4 * 1024 * 1024}
                            onValueChange={setFile}
                        />
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                className="col-span-3"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="desciption" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="desciption"
                                value={description}
                                className="col-span-3"
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="desciption" className="text-right">
                                Parent Category
                            </Label>
                            <div className="flex w-full col-span-3  ">
                                <Select
                                    value={parentId.toString() ?? ""}
                                    onValueChange={(value) => setParentId(parseInt(value))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Parent"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
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
                            <Switch
                                id="button-checked"
                                name={"Activate"}
                                checked={isChecked}
                                onCheckedChange={setChecked}
                            />
                            <Label htmlFor="button-checked">Activate</Label>
                        </div>
                        <Button type="button" onClick={handleSubmit}>
                            Update
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
