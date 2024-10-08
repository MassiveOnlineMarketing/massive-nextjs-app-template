'use server';

import { headers } from "next/headers";
import { auth } from "@/app/_modules/auth/_nextAuth";
import { redirect } from "next/navigation";

type PageType = "private" | "admin";

async function getSession() {
  return await auth();
}

function getReferer() {
  const headersList = headers();
  return headersList.get("referer") || headersList.get("x-current-path") || '/';
}

function redirectToLogin(route?: string) {
  const encodedCallbackUrl = route ? encodeURIComponent(route) : '';
  return redirect(`/auth/login${encodedCallbackUrl ? `?callbackUrl=${encodedCallbackUrl}` : ''}`);
}

export async function isAllowedToViewPage(pageType: PageType) {
  const route = getReferer();
  console.log('route', route);
  console.log('path', headers().get('x-current-path'));

  const session = await getSession();
  const isLoggedIn = !!session?.user;

  if (!session?.user) {
    return redirectToLogin(route);
  }

  if (pageType === "private") {
    if (!isLoggedIn) {
      return redirectToLogin(route);
    }
  }

  if (pageType === "admin") {
    if (session?.user?.role !== "ADMIN") {
      return { session, notAllowedPage: <div>No admin</div> };
    }
  }

  return { user: session.user, session, notAllowedPage: undefined };
}