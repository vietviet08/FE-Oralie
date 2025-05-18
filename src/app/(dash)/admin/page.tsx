import {auth} from "@/app/(auth)/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

export default async function Home() {
    const session = await auth();

    if (!session?.user) {
        return redirect('/');
    } else {
        redirect('/admin/overview');
    }
}
