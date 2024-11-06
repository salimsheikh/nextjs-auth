// components/VerifyEmailForm.tsx
'use client'
import CustomNotify from '@/helpers/CustomNotify';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function VerifyEmail() {

  const [token, setToken] = useState('');
  const [varified, setVrarifid] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true)

  const verifyUserEmail = async () => {
    try {

      console.log("token:-", token);

      const res = await axios.post("/api/users/verifyemail",{token});
      setError(false);
      setVrarifid(true);
      setLoading(false);
      console.log(res);

    } catch (error: any) {
      setError(true);
      setLoading(false);
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];

    console.log(urlToken);
    setToken(urlToken || "");    
  }, []);

  useEffect(() => {
    if(token.length > 0){
      verifyUserEmail();
    }
  },[token]);


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Verify Email</h2>

        {loading && <p className="mt-4 text-center alert alert-primary">Please Wait.</p>}
        
        {varified && 
        <>
          <p className="mt-4 text-center text-green-800 bg-green-300 border p-4 border-green-500 rounded">Email varified successfully.</p>
          <p className='mt-4 text-center'><Link href="/login">Login</Link></p>
        </>
        }      

        {error && <>
          <p className="mt-4 text-center text-[#721c24] bg-[#f8d7da] border p-4 border-[#f5c6cb] rounded">Email verification failed due to a missing, incorrect, or expired token.</p>
          {/* <p className='mt-4 text-center'><Link className='text-center' href="/request-password-reset">Verify Again</Link></p> */}
        </>}
        
      </div>
    </div>
  );
}
