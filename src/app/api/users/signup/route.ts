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

        // Deletes all documents in the User collection (use with caution)
        // This is potentially risky as it deletes all users; it's not typically part of a registration endpoint.
        await User.deleteMany({});

        const requestBody = await request.json();

        console.log("Request Body", requestBody);

        const { username, email, password } = requestBody;

        console.log("username", username);
        console.log("email", email);
        console.log("password", password);

        //Validation
        if (!username || !email || !password) {
            return res.json({ message: 'All fields are required.' }, { status: 409 })
        }

        // Validate email format
        if (!email || !emailRegex.test(email)) {
            return res.json({ message: 'Invalid email.' }, { status: 400 })
        }

        const user = await User.findOne({ username: username });
        if (user) {
            return res.json({ message: 'Username exists.' }, { status: 400 })
        }

        const email_user = await User.findOne({ email: email });
        if (email_user) {
            return res.json({ message: 'Email exists.' }, { status: 400 })
        }        

        const salt = await bcryptjs.genSalt(10);

        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username, email, password: hashedPassword
        });

        const savedUser = await newUser.save();

        console.log("User Created");

        console.log(savedUser);

        console.log("User ID");

        console.log("User ID", savedUser._id);        

        console.log("Sending email");

        //Send Email Verification
        const email_result = await sendEmail({ email: email, emailType: 'VERIFY', userID: savedUser._id });

        console.log(email_result);

        return res.json({
            message: "User registered successfully.",
            success: true,           
        }, { status: 201 })


    } catch (error: any) {
        return res.json(
            { error: error.message, 'error type' : 'catch' },
            { status: 500 }
        )
    }
}