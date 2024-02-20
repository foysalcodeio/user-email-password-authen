import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useState } from "react";

const Register = () => {
    const [registerError, setRegisterError] = useState(' ');
    const [success, setSuccess] = useState('');

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(email, password);

        //reset error
        setRegisterError('');
        //success message reset
        setSuccess('');


        if(password.length < 6){
            setRegisterError('password should be at least 6 character or longer');
            return; // ae function por sa ar agabe na / caracter kom hole pore ar agabe na / mane konsole e error print ar hobe na
            // client side e validation kore falsi
            
        }

        

        createUserWithEmailAndPassword(auth, email, password)
        .then( (result) => {
            console.log(result.user);
            setSuccess('user created successfully');
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
                <input className="mb-4 text-white p-4 w-3/4" type="email" name="email" placeholder="foysal@yahoo.com" id="" required />
                <br />
                <input className="text-white p-4 w-3/4" type="password" name="password" placeholder="foysal#123" id="" />
                <br />
                <input className="btn text-white mt-5 mb-4 p-4" type="submit" value="Register" />
            </form>
            {
                registerError && <p className="text-red-500">{registerError}</p>
            }
            {
                success && <p className="text-green-700">{success}</p>
            }
            </div>
        </div>
    );
};

export default Register;