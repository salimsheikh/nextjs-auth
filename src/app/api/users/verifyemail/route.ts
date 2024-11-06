//api/users/verifyemail/route.ts
import { connectdb } from "@/dbConfig/dbConfig";
import User from "@/models/userModles";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {

    await connectdb();

    const response = NextResponse;

    try {

        const jwt_secret = process.env.JWT_SECRET! as string;

        const requestBody = await request.json();

        console.log("Request Body", requestBody);

        const { token } = requestBody;

        console.log("Token", token);

        if (!token) {
            return response.json(
                { error: "Token value is empty" },
                { status: 400 }
            )
        }

        console.log(token);

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return response.json(
                { error: "Invalid token" },
                { status: 400 }
            )
        }

        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return response.json(
            { error: "Email varified successfully." },
            { status: 200 }
        );

    } catch (error: any) {
        return response.json(
            { error: error.message, 'error type': 'catch' },
            { status: 500 }
        )
    }
}