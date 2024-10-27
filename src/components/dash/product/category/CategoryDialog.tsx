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
import {ReactNode, useState} from "react";
import {cn} from "@/lib/utils";
import {createCategory} from "@/services/CategoryService";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";

type Props = {
    icon: ReactNode;
    accessToken: string;
}

export function CategoryDialog({icon, accessToken}: Props) {

    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const router = useRouter()
    const {toast} = useToast();


    async function handleSubmit() {
        const slug = name.toLowerCase().replace(/ /g, '-');

        try {
            const res = await createCategory({
                name: name,
                description: description,
                slug: slug,
                isDeleted: false
            }, accessToken);

            if (res && res.status === 201) {
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
        }finally {
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
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleSubmit}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

