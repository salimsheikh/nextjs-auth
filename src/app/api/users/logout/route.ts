//api/users/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

    const response = NextResponse;
    
    try {

        const finalResponse = response.json({
            'message' : "Logout successfully.",
            'success': true,
        })

        finalResponse.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });

        return finalResponse;

    } catch (error: any) {
        return response.json(
            { error: error.message },
            { status: 500 }
        )
    }
}