import { auth } from "@/auth";
import { NextResponse } from "next/server";

// 認証が不要なパス
const publicPaths = ["/sign-in", "/sign-up"];

export default auth((req) => {
  // 現在のパスを取得
  const isPublicPath = publicPaths.includes(req.nextUrl.pathname);

  // 認証状態を確認
  const isAuthed = !!req.auth;

  // 未認証で保護されたルートにアクセスした場合
  if (!isAuthed && !isPublicPath) {
    const signInUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // 認証済みでログインページにアクセスした場合
  if (isAuthed && isPublicPath) {
    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
});

export const config = {
  // 除外するパスを設定
  matcher: [
    /*
     * 以下を除外:
     * - api routes
     * - static files
     * - images
     * - favicon
     * - sitemap, robots
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
