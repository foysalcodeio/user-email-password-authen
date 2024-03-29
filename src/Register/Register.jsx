import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";


const Register = () => {
    const [registerError, setRegisterError] = useState(' ');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name, email, password, accepted);

        //reset error
        setRegisterError('');
        //success message reset
        setSuccess('');


        //validation
        if(password.length < 6){
            setRegisterError('password should be at least 6 character or longer');
            return; // ae function por sa ar agabe na / caracter kom hole pore ar agabe na / mane konsole e error print ar hobe na
            // client side e validation kore falsi
        }
        else if(!/[A-Z]/.test(password)){
            setRegisterError('your password atleast 1 character capital letter')
            return;
        }
        else if(!accepted){
            setRegisterError('please accept term and condition!!');
            return;
        }


        // create user
        createUserWithEmailAndPassword(auth, email, password)
        .then( (result) => {
            console.log(result.user);
            setSuccess('User Created Succussfully.');

            //update profile
            // we are add manually 
            updateProfile((result.user),{
                displayName: name,
                photoURL: "https://example.com/jane-q-user/profile.jpg"
            }).then(()=>{
                console.log('profile updated')
            }).catch(()=>{

            })
            
            // send verification
            sendEmailVerification(result.user)
            .then(() => {
                alert('please verify your account');
            })
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

                <input className="mb-4 text-white p-4 w-3/4" type="text" name="name" placeholder="your name" id="" required />
                <br />
                <input className="mb-4 text-white p-4 w-3/4" type="email" name="email" placeholder="foysal@yahoo.com" id="" required />
                <br />

                <div className="flex flex-row items-center">
                <input 
                className="text-white p-4 w-3/4"
                type={showPassword ? "text" : "password"}
                name="password" 
                placeholder="foysal#123" id="" />                
                    <span className="ml-5"
                        onClick={ () => setShowPassword(!showPassword)}> 
                            {showPassword ? <FaEye className="text-3xl" /> : <FaEyeSlash className="text-3xl" />}
                    </span>
                </div>
                <br />
                
                <input type="checkbox" name="terms" id="terms" />
                <label className="ml-2" htmlFor="terms">Accept term & Condition</label>

                <div className="flex">
                    <input className="btn text-white mt-5 mb-4 p-4" type="submit" value="Register" />
                </div>
                <p>Registration done ? Please <Link to="/login">Login</Link></p>

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


