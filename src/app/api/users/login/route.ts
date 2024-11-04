//api/users/login/route.ts
import { connectdb } from "@/dbConfig/dbConfig";
import User from "@/models/userModles";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";



export async function POST(request: NextRequest) {

    await connectdb();
    
    const res = NextResponse;
    
    try {

        const requestBody = await request.json();

        const { email, password } = requestBody;

        //Validation
        if (!email || !password) {
            return res.json({ message: 'All fields are required.' }, { status: 409 })
        }        

        const user = await User.findOne(email);

        if (user) {
            return res.json({ message: 'User exists.' }, { status: 400 })
        }

    } catch (error: any) {
        return res.json(
            { error: error.message },
            { status: 500 }
        )
    }
}