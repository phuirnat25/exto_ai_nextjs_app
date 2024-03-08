import { NextResponse } from "next/server";
import { withMiddlewareAuthRequired, getSession } from "@auth0/nextjs-auth0/edge";
import { jwtDecode } from "jwt-decode";

export default withMiddlewareAuthRequired(async (req) => {
  const res = NextResponse.next();

  const user = await getSession(req, res);

  if (!user) {
    return NextResponse.redirect("/api/auth/login");
  }

  const userPermissionData = jwtDecode(user.accessToken)
  

  console.log('User AccessToken:', user.accessToken)
  console.log('User PermissionData:', userPermissionData)
  console.log('User id:', userPermissionData.sub)
  console.log('User PermissionData.Permisson:', userPermissionData.permissions)
  console.log('user [accessTokenScope]:', user.accessTokenScope)

  return res;
});

export const config = {
  matcher: "/extoai",
};