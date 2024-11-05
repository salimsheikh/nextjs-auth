//api/users/login/route.ts
import { connectdb } from "@/dbConfig/dbConfig";
import User from "@/models/userModles";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {

    await connectdb();
    
    const response = NextResponse;
    
    try {

        const requestBody = await request.json();

        const { email, password } = requestBody;

        //Validation
        if (!email || !password) {
            return response.json({ message: 'All fields are required.' }, { status: 409 })
        }        

        const user = await User.findOne(email);

        if(!user){
            return response.json({ message: 'User does not exists.' }, { status: 400 })
        }

        console.log("User exists");

        const validPassword = await bcryptjs.compare(password,user.password);

        if(!validPassword){
            return response.json({ message: 'Check your credentials.' }, { status: 400 })
        }
        
        const tokenData= {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const jwt_secret = process.env.JWT_SECRET! as string;

        var token = await jwt.sign(tokenData, jwt_secret, {expiresIn:'1d'});

        const finalResponse = response.json({
            'message' : "Logged in successfully.",
            'success': true,
        })

        finalResponse.cookies.set("token", token, {
            httpOnly: true
        });

        return finalResponse;

    } catch (error: any) {
        return response.json(
            { error: error.message },
            { status: 500 }
        )
    }
}