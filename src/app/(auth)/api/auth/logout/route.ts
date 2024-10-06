import { getIdToken } from "@/utils/sessionTokenAccessor";
import { authOptions } from "../[...nextauth]/route";
import { getServerSession } from "next-auth"

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session) {

    const idToken = await getIdToken();

    // this will log out the user on Keycloak side
    const endSessionUrl = process.env.END_SESSION_URL || '';
    const nextAuthUrl = process.env.NEXTAUTH_URL || '';
    var url = `${endSessionUrl}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(nextAuthUrl)}`;

    try {
      const resp = await fetch(url, { method: "GET" });
    } catch (err) {
      console.error(err);
      return new Response(null, { status: 500 });
    }
  }
  return new Response(null, { status: 200 });
}