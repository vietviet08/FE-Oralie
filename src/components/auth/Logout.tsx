"use client"
import federatedLogout from "@/utils/federatedLogout";
import {Button} from "@/components/ui/button";

export default function Logout() {
    return <Button onClick={() => federatedLogout()}>
        Sign out
    </Button>
}