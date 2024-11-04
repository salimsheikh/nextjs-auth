import User from '@/models/userModles';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userID }: any) => {
    try {

        console.log("Sending email init");

        console.log("email: " , email);
        console.log("emailType: " , emailType);
        console.log("userID: " , userID);
        console.log("userID: " , userID.toString());
        

        const hashedToken = await bcryptjs.hash(userID.toString(), 10);
        const tokenExpiry = Date.now() + 360000;
        const verify_url = `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`;
        let message_body = '';
        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userID,
                { verifyToken: hashedToken, verifyTokenExpiry: tokenExpiry }
            )
            

            message_body = `<p>Click <a href="${verify_url}">here</a> to verify your email or copy and past the link below in your browser. <br>${verify_url}</p>`;

        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userID,
                { forgotPasswrodToken: hashedToken, forgotPasswrodTokenExpiry: tokenExpiry }
            )

            message_body = `<p>Click <a href="${verify_url}">here</a> to reset your password or copy and past the link below in your browser. <br>${verify_url}</p>`;
        }

        

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: process.env.EMAIL_SMTP,
            port: 2525,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });       

        const mail_option = {
            from: 'salimsheikh4u2000@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? 'Verify your email' : "Reset your password.",
            html: message_body, // html body
        }

        const mail_response = await transport.sendMail(mail_option);

        return mail_response;


    } catch (error: any) {
        throw new Error(error.message)
    }
}