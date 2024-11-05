import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getDataFromToken = (request: NextRequest) => {

    try {

        const jwt_secret = process.env.JWT_SECRET! as string;

        console.log("jwt_secret: ", jwt_secret);

        const token = request.cookies.get('token')?.value || '';

        console.log("token: ", token);

        const decodedToken:any = jwt.verify(token, jwt_secret);

        return decodedToken.id;
        
    } catch (error: any) {
        throw new Error(error.message);        
    }
}