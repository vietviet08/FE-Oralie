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

type Props = {
    icon: ReactNode;
}

export function BrandDialog({icon}: Props) {

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={cn(buttonVariants(), 'text-xs md:text-sm')}> {icon} <span>Add New</span></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Brand</DialogTitle>
                    <DialogDescription>
                        Create new brand for your products here.
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
                    <Button type="submit">Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
