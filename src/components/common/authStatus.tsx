import Logout from "@/components/auth/Logout";
import Login from "@/components/auth/Login";
import {authOptions} from "@/app/(auth)/api/auth/[...nextauth]/route";
import {getServerSession} from "next-auth";

export default async function AuthStatus() {
    const session = await getServerSession(authOptions);

    if (session) {
        return (
            <div className="my-3">
                Logged in as{" "}
                <span className=" text-yellow-500">
                    {session.user?.name || session.user?.email || "User"}
                </span>{" "}
                <Logout/>
            </div>
        );
    } else {
        return (
            <div className="my-3">
                <Login/>
            </div>
        );
    }
}
