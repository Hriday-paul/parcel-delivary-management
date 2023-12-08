import { useContext, useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MailOutlined } from '@ant-design/icons';
import { Input, Spin } from 'antd';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from "react-hook-form"
import { authContxt } from "../../ContextHandler/Authonicate/Authonicate";
import toast, { Toaster } from "react-hot-toast";
import UpDateUser from "../../Hooks/AddUser/UpdateUser";

function Login() {
    const { loginUser, googleLogin } = useContext(authContxt)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [loader, setLoader] = useState(false);
    const { mutate, isPending, isSuccess } = UpDateUser();
    const {state} = useLocation();
    const navig = useNavigate();

    useEffect(()=>{
        if(isSuccess){
            toast.success('Login Successfully');
            state ? navig(`${state.from}`) : navig('/')
        }
    }, [isSuccess])

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (userData) => {
        setLoader(true);
        loginUser(userData.email, userData.password)
            .then(() => {
                reset()
                setLoader(false);
                state ? navig(`${state.from}`) : navig('/')
                toast.success("Login successfully");
            })
            .catch(() => {
                setLoader(false)
                Swal.fire({
                    title: 'error',
                    text: 'Enter valid Email or Password',
                    icon: 'error',
                    confirmButtonText: 'Go Back'
                })
            })
    }
    const handleGoogleSign = () => {
        setLoader(true);
        googleLogin()
            .then(({ user }) => {
                const { email, displayName, phoneNumber, photoURL } = user;
                const userData = { email, name: displayName, password: null, phone: phoneNumber, photoURL, userType: 'user' }
                setLoader(false)
                mutate(userData)
            })
            .catch(() => {
                setLoader(false)
                toast.error('Something wents wrong');
            })
    }



    return (
        <>
            <Spin tip="Loading..." spinning={loader || isPending} size="large">
                <Helmet>
                    <title>Delivered | login</title>
                </Helmet>
                <section className="bg-gray-50">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">

                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                    SignIn your account
                                </h1>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({ field }) => (
                                                <Input size="large" type="email" id="email" placeholder="name@gmail.com" prefix={<MailOutlined />} {...register('email')} {...field} />
                                            )}
                                            rules={{ required: 'email is required' }}
                                        />

                                        {errors.email?.type === "required" && (
                                            <p className="text-sm text-red-500 mt-2" role="alert">Email is required.</p>
                                        )}

                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                        <Controller
                                            name="password"
                                            control={control}
                                            render={({ field }) => (
                                                <Input.Password size="large" {...register('password')} type="password" id="password"
                                                    placeholder="password..."
                                                    visibilityToggle={{
                                                        visible: passwordVisible,
                                                        onVisibleChange: setPasswordVisible,
                                                    }}
                                                    {...field}
                                                />
                                            )}
                                            rules={{ required: 'password is required' }}
                                        />


                                        {errors.password?.type === "required" && (
                                            <p className="text-sm text-red-500 mt-2" role="alert">Password must required.</p>
                                        )}
                                    </div>


                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="terms" className="font-light text-gray-500">I accept the <a className="font-medium text-primary-600 hover:underline" href="#">Terms and Conditions</a></label>
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800">Sign In</button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Dont have an account? <Link to="/register" className="font-medium text-gray-800 hover:underline">Register now</Link>
                                    </p>

                                    <div className="group w-full flex justify-center items-center mt-5 h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 cursor-pointer" onClick={handleGoogleSign}>
                                        <div className="relative flex justify-between items-center space-x-7">
                                            <img src="https://tailus.io/sources/blocks/social/preview/images/google.svg" className="absolute left-0 w-4" alt="google logo" />
                                            <span className="text-base font-bold text-gray-700 transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Google</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <Toaster></Toaster>
                </section>
            </Spin>

        </>
    )
}

export default Login