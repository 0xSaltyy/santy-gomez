import { createServerClient } from "@supabase/ssr";
import type { CookieMethodsServer } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";
import { supabaseCookieOptions } from "@/lib/supabase/cookies";

function redirectWithSupabaseCookies(request: NextRequest, response: NextResponse, pathname: string, search = "") {
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = pathname;
  redirectUrl.search = search;

  const redirectResponse = NextResponse.redirect(redirectUrl);
  response.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
  });

  return redirectResponse;
}

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next({
      request
    });
  }

  let response = NextResponse.next({
    request
  });
  const cookieMethods: CookieMethodsServer = {
    getAll() {
      return request.cookies.getAll();
    },
    setAll(cookiesToSet) {
      cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
      response = NextResponse.next({
        request
      });
      cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
    }
  };

  const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookieOptions: supabaseCookieOptions,
    cookies: cookieMethods
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname.startsWith("/login");

  if (isAdminRoute) {
    if (!user) {
      return redirectWithSupabaseCookies(request, response, "/login", `?next=${encodeURIComponent(pathname)}`);
    }

    const { data: adminUser } = await supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();

    if (!adminUser) {
      return redirectWithSupabaseCookies(request, response, "/");
    }
  }

  if (isLoginRoute && user) {
    const { data: adminUser } = await supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();

    if (adminUser) {
      return redirectWithSupabaseCookies(request, response, "/admin");
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/login"]
};
