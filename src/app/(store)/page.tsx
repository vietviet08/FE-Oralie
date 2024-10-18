import {getToken} from "next-auth/jwt";
import {useSession} from "next-auth/react";

export default function Home() {
    // const {data: session, status} = useSession();
    // console.log(session);
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}
