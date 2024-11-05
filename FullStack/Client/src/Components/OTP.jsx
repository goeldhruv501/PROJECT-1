import React, { useState } from "react";
import { useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
 

const EmailVerification = () => {
const navigate = useNavigate ()
    const { email } = useParams()
    const { id } = useParams()
    const [code, setCode] = useState(new Array(4).fill(""));

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;
        // ? == Ternary Operator (If/Else)
        setCode([...code.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus on the next input field
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Add the logic to verify the code
    //     console.log("Verification Code: ", code.join(""));
    // };

    const handleSubmit = async (e) => {
        e.preventDefault()
        let value = code.join(""); 
         try {
            const url = `http://localhost:5000/verifyOTP/${id}`

            const User = await axios.post(url, {_id:id,OtpVerification:value})

            if (User.status === false) window.alert('invalid data')

            else {
                navigate('/Login')
            }
        }
        catch (error) {
            console.log(error.response) 
            window.alert(error.response.data.msg)
         }
         
    }


    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your email {email}</p>
                        </div>
                    </div>

                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col space-y-16">
                                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                    {code.map((data, index) => (
                                        <div key={index} className="w-16 h-16">
                                            <input
                                                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                                type="text"
                                                name="code"
                                                maxLength="1"
                                                value={data}
                                                onChange={(e) => handleChange(e.target, index)}
                                                onFocus={(e) => e.target.select()}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <button
                                            type="submit"
                                            className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                                        >
                                            Verify Account
                                        </button>
                                    </div>

                                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Didn't receive code?</p>
                                        <a
                                            className="flex flex-row items-center text-blue-600"
                                            href="#"
                                        >
                                            Resend
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailVerification;

