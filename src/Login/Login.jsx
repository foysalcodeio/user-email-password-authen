import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import auth from "../firebase/firebase.config";
import { useRef, useState } from "react";

const Login = () => {
    const [loginError, setLoginError] = useState('');
    const [success, setSuccess] = useState(' ')

    //for forget password
    const emailRef = useRef(null)

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);


        //reset
        setLoginError(' ');
        setSuccess(' ');

        //validation
        if(password > 6){
            setLoginError('Your password atleast 6 character');
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setLoginError('1 Letter must be capital');
            return;
        }


        //add validation
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user);
                setSuccess('user login successfully');
            })
            .catch((error) => {
                console.error(error);
                setLoginError(error.message);
            })
    }

    const handleResetPassword = () => {
        const email = emailRef.current.value;
        if(!email){
            console.log('please provide a valid email', emailRef.current.value);
            return;
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            console.log('please write a valid email');
            return;
        }

        //send validation mail
        sendPasswordResetEmail(auth, email)
        .then(() =>{
            alert('please check your email')
        })
        .catch(error =>{
            console.log(error)
        })
    }


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    ref={emailRef}
                                    placeholder="email"
                                    className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <Link onClick={() => handleResetPassword()} href="#" className="label-text-alt link link-hover">Forgot password?</Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>

                        <p>New to this website? Please <Link to="/register">Register</Link></p>

                    </div>
                    <div className="p-2 ">
                        {
                            loginError && <p className="text-red-500 text-xl">{loginError}</p>
                        }
                        {
                            success &&  <p className="text-green-500 text-xl">{success}</p>
                        }

                    </div>
                </div>

            </div>

        </div>
    );
};

export default Login;