import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useState } from "react";

const Register = () => {
    const [registerError, setRegisterError] = useState(' ')

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(email, password);


        //reset error
        setRegisterError(' ');

        
        createUserWithEmailAndPassword(auth, email, password)
        .then( (result) => {
            console.log(result.user);
        } )
        .catch( (error) => {
        
            console.error(error)
            setRegisterError(error.message)
        })
    }
    return (
        <div className="border">
            <div className="mx-auto md:w-1/2">
            <h2 className="text-3xl text-black mt-5 mb-5">Please Register</h2>
            <form onSubmit={handleRegister} >
                <input className="mb-4 text-white p-4 w-3/4" type="email" name="email" placeholder="foysal@yahoo.com" id="" />
                <br />
                <input className="text-white p-4 w-3/4" type="password" name="password" placeholder="foysal#123" id="" />
                <br />
                <input className="btn text-white mt-5 mb-4 p-4" type="submit" value="Register" />
            </form>
            {
                registerError && <p className="text-red-500">{registerError}</p>
            }
            </div>
        </div>
    );
};

export default Register;