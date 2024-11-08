//api/users/profile/route.ts
import { connectdb } from "@/dbConfig/dbConfig";
import User from "@/models/userModles";
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(request: NextRequest) {

    await connectdb();

    const response = NextResponse;

    try {

        console.log("---------------1-----------------");

        console.log("Request: ", request);

        const userId = await getDataFromToken(request);

        if (!userId) {
            return response.json({ message: "User id not found." }, { status: 400 });
        }

        console.log("---------------2-----------------");

        console.log("User ID: ", userId);

        const user = await User.findOne({ _id: userId }).select("-password");

        console.log(user);

        if (!user) {
            return response.json({ message: "Token not found." }, { status: 400 });
        }

        return response.json({
            message: "User found.",
            success: true,
            data: user
        }, { status: 200 });

    } catch (error: any) {
        return response.json(
            { error: error.message },
            { status: 500 }
        )
    }
}