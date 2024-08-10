import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth"

const LOGIN = `/login` as const
const ROOT = '/' as const

const PUBLIC_ROUTES = [
    '/login',
    'api/auth/:path*'
] as const

export const middleware = async (request: NextRequest) => {
    const session = await auth()

    const isPublicRoute = PUBLIC_ROUTES.find((route) => request.nextUrl.pathname === route) || request.nextUrl.pathname === ROOT

    const isAuthecticated = !!session?.user

    if (!isAuthecticated && !isPublicRoute) {
        return NextResponse.redirect(new URL(LOGIN, request.url))
    }
}

export const config = {
    matcher: [`/dashboard`, `/dashboard/:path*`]
}