import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    try {
        const token = request.cookies.get('token') 
    if (!token) {
        return NextResponse.redirect(new URL('/404', request.url))
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/check-admin?token=${token.value}`)
    const user = await response.json()
        if(user.isAdmin){
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/404', request.url))
    } catch (error) {
        console.log({error})
    }
}

export const config = {
    matcher: '/dashboard/:path*',
}
