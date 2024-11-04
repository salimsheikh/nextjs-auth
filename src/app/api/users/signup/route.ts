//api/users/signup/route.ts
import { connectdb } from "@/dbConfig/dbConfig";
import User from "@/models/userModles";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";

await connectdb();

export async function POST(request: NextRequest) {

    const res = NextResponse;

    // Simple email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try {

        const requestBody = await request.json();

        const { username, email, password } = requestBody;

        //Validation
        if (!username || !email || !password) {
            return res.json({ message: 'All fields are required.' }, { status: 409 })
        }

        // Validate email format
        if (!email || !emailRegex.test(email)) {
            return res.json({ message: 'Invalid email.' }, { status: 400 })
        }

        const user = await User.findOne(email);
        if (user) {
            return res.json({ message: 'User exists.' }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10);

        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username, email, password: hashedPassword
        });

        const savedUser = await newUser.save();

        console.log(savedUser);

        //Send Email Verification
        await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id });

        return res.json({
            message: "User registered successfully.",
            success: true,
            savedUser
        }, { status: 201 })


    } catch (error: any) {
        return res.json(
            { error: error.message },
            { status: 500 }
        )
    }
}