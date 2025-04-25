import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { authRoutes, homeRoute, privateRoutes } from "./routes"

const { auth } = NextAuth(authConfig)
export default auth(async (req) => {
    const isLoggedIn = !!req.auth
    const { nextUrl } = req

    const isPrivateRoutes = privateRoutes.includes(nextUrl.pathname)
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname)
    const isHomeRoute = homeRoute.includes(nextUrl.pathname)

    if (isLoggedIn && isAuthRoutes || isLoggedIn && isHomeRoute) {
        return Response.redirect(new URL('/chat', req.url))
    }

    if (isAuthRoutes && !isLoggedIn) {
        return
    }

    if (!isLoggedIn && isPrivateRoutes || !isLoggedIn && isHomeRoute) {
        return Response.redirect(new URL('/login', req.url))
    }
})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}