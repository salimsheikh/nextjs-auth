//api/users/signup/route.ts
import { connectdb } from "@/dbConfig/dbConfig";
import User from "@/models/userModles";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {

    await connectdb();

    const response = NextResponse;

    // Simple email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try {

        //Deletes all documents in the User collection (use with caution)
        //This is potentially risky as it deletes all users; it's not typically part of a registration endpoint.
        await User.deleteMany({});

        const requestBody = await request.json();        

        const { username, email, password } = requestBody;        

        //Validation
        if (!username || !email || !password) {
            return response.json({ message: 'All fields are required.' }, { status: 400 })
        }

        // Validate email format
        if (!email || !emailRegex.test(email)) {
            return response.json({ message: 'Invalid email.' }, { status: 400 })
        }

        const user = await User.findOne({ username: username });
        
        if (user) {
            return response.json({ message: 'Username exists.' }, { status: 409 })
        }

        const email_user = await User.findOne({ email: email });

        if (email_user) {
            return response.json({ message: 'Email exists.' }, { status: 409 })
        }        

        const salt = await bcryptjs.genSalt(10);

        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username, email, password: hashedPassword
        });

        const savedUser = await newUser.save();       

        //Send Email Verification
        const email_result = await sendEmail({ email: email, emailType: 'VERIFY', userID: savedUser._id });

        return response.json({
            message: "User registered successfully.",
            success: true,           
        }, { status: 201 })


    } catch (error: any) {
        return response.json(
            { error: error.message, 'error type' : 'catch' },
            { status: 500 }
        )
    }
}