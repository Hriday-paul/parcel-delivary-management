import { useContext } from "react";
import { Link, useLocation } from "react-router-dom"
import Swal from 'sweetalert2'
import { useState } from "react";
import { UserOutlined, MailOutlined, MobileOutlined } from '@ant-design/icons';
import { Input, Spin, Select } from 'antd';
import { Helmet } from "react-helmet-async";
import { authContxt } from "../../ContextHandler/Authonicate/Authonicate";
import { Controller, useForm } from "react-hook-form"
import { updateProfile } from "firebase/auth";
import AddUser from "../../Hooks/AddUser/AddUser";
import toast, { Toaster } from 'react-hot-toast';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import UploadPhoto from "../../Hooks/UploadPhoto/UploadPhoto";
const { Dragger } = Upload;


function Register() {
    const { creatUser } = useContext(authContxt);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { mutate, isPending } = AddUser();
    const [loader, setLoader] = useState(false);
    const [profileImg, setProfileImg] = useState(null);

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const beforeUpload = (file) => {
        // Display file information without uploading
        setProfileImg(file)
        return false;
    };


    const props = {
        name: 'file',
        multiple: true,
        beforeUpload,
        // No 'action' prop to prevent actual upload to a server
        onDrop(e) {
            setProfileImg(e.dataTransfer.files[0])
        },
    };


    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();


    const onSubmit = async (userData) => {
        setLoader(true);
        if (profileImg) {
            UploadPhoto(profileImg)
                .then(({ data }) => {
                    const imgSource = data.data.display_url;
                    creatUser(userData.email, userData.password)
                        .then(({ user }) => {
                            updateProfile(user, {
                                displayName: userData.name,
                                photoURL: imgSource
                            })
                            setLoader(false)
                            mutate({ ...userData, photoURL: imgSource });
                            setProfileImg(null);
                            reset();
                        })
                        .catch(() => {
                            setLoader(false)
                            Swal.fire({
                                title: "error",
                                text: "Email already exist",
                                icon: 'error',
                                confirmButtonText: 'Go Back'
                            })
                        })
                })
                .catch(()=>{
                    setLoader(false)
                    toast.error("Phot upload failed ! Try again.")
                })
        }

        else {
            creatUser(userData.email, userData.password)
                .then(({ user }) => {
                    updateProfile(user, { displayName: userData.name, photoURL: null })
                    setLoader(false)
                    mutate({ ...userData, photoURL: null });
                    reset();
                })
                .catch(() => {
                    setLoader(false)
                    Swal.fire({
                        title: "error",
                        text: "Email already exist",
                        icon: 'error',
                        confirmButtonText: 'Go Back'
                    })
                })
        }
    }


    return (
        <div>
            <Spin tip="Loading..." spinning={isPending || loader} size="large">
                <Helmet>
                    <title>Deliverd | register</title>
                </Helmet>
                <section className="bg-gray-50">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">

                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                    Create an account
                                </h1>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" action="#">

                                    <div>
                                        <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-900 ">User name <span className="text-red-500">*</span></label>

                                        <Controller
                                            name="name"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    size="large"
                                                    type="text"
                                                    id="userName"
                                                    placeholder="user name..."
                                                    prefix={<UserOutlined />}
                                                    {...field}
                                                // {...register("name", { required: 'Name is required' })}
                                                />
                                            )}

                                        />
                                        {errors.name?.type === "required" && (
                                            <p className="text-sm text-red-500 mt-2" role="alert">Name is required.</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email <span className="text-red-500">*</span></label>
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
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password <span className="text-red-500">*</span></label>

                                        <Controller
                                            name="password"
                                            control={control}
                                            render={({ field }) => (
                                                <Input.Password size="large" {...register('password', {
                                                    minLength: 6,
                                                    pattern: /(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/
                                                })} type="password" id="password"
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

                                        {errors.password?.type === "minLength" && (
                                            <p className="text-sm text-red-500 mt-2" role="alert">Password must be use minimum 6 character</p>
                                        )}
                                        {errors.password?.type === "pattern" && (
                                            <p className="text-sm text-red-500 mt-2" role="alert">Password required minimum 1 capital, 1 number and 1 special character</p>
                                        )}

                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone <span className="text-red-500">*</span></label>
                                        <Controller
                                            name="phone"
                                            control={control}
                                            render={({ field }) => (
                                                <Input size="large" type="number" name="phone" id="phone" placeholder="+880..." {...register("phone", { required: "Phone number is required", minLength: 11 })} {...field} prefix={<MobileOutlined />} />
                                            )}
                                            rules={{ required: 'phone is required' }}
                                        />

                                        {errors.phone?.type === "required" && (
                                            <p className="text-sm text-red-500 mt-2" role="alert">Phone number is required</p>
                                        )}
                                        {errors.phone?.type === "minLength" && (
                                            <p className="text-sm text-red-500 mt-2" role="alert">Enter valid Phone number</p>
                                        )}

                                    </div>
                                    <div>
                                        <label htmlFor="userType" className="block mb-2 text-sm font-medium text-gray-900">User Type <span className="text-red-500">*</span></label>
                                        <Controller
                                            name="userType"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    className="w-full h-10"
                                                    showSearch
                                                    placeholder="Select a person"
                                                    optionFilterProp="children"
                                                    filterOption={filterOption}
                                                    {...register("userType", { required: "User type is required" })}
                                                    {...field}
                                                    options={[
                                                        {
                                                            value: 'user',
                                                            label: 'User',
                                                        },
                                                        {
                                                            value: 'deliveryMan',
                                                            label: 'Delivery Man',
                                                        }
                                                    ]}
                                                />
                                            )}
                                            rules={{ required: 'email is required' }}
                                        />
                                        {errors.userType?.type === "required" && (
                                            <p className="text-sm text-red-500 mt-2" role="alert">User type is required</p>
                                        )}

                                    </div>

                                    <div>
                                        <Dragger {...props}>
                                            <p className="ant-upload-drag-icon">
                                                <InboxOutlined />
                                            </p>
                                            <p className="ant-upload-text">Click or drag your profile photo(optioanal)</p>
                                        </Dragger>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="terms" className="font-light text-gray-500">I accept the <a className="font-medium text-primary-600 hover:underline" href="#">Terms and Conditions</a></label>
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>

                                    <p className="text-sm font-light text-gray-700">
                                        Already have an account? <Link to="/login" className="font-medium text-gray-800 hover:underline">Login here</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </Spin>
            <Toaster />
        </div>

    )
}

export default Register