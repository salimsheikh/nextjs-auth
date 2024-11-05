import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getDataFromToken = (request: NextRequest) => {

    try {

        const jwt_secret = process.env.JWT_SECRET! as string;        

        const token = request.cookies.get('token')?.value || '';

        const decodedToken:any = jwt.verify(token, jwt_secret);

        return decodedToken.id;
        
    } catch (error: any) {
        throw new Error(error.message);
        
    }
}