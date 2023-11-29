import { useEffect, useState } from "react";
import { UserOutlined, MobileOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Controller, useForm } from "react-hook-form"
import { updateProfile } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import UploadPhoto from "../../../../../Hooks/UploadPhoto/UploadPhoto";
import auth from "../../../../../firebase.config";
import UpdateUser from "../../../../../Hooks/AddUser/UpdateUser";
const { Dragger } = Upload;

const UpdateProfile = ({ userData, refetch }) => {
    const [profileImg, setProfileImg] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loader, setLoader] = useState();
    const { mutate, isPending, isSuccess } = UpdateUser();

    useEffect(() => {
        if (isSuccess) {
            refetch();
        }
    })

    const beforeUpload = (file) => {
        setProfileImg(file)
        return false;
    };


    const props = {
        name: 'file',
        multiple: false,
        beforeUpload,
        onDrop(e) {
            setProfileImg(e.dataTransfer.files[0])
        },
    };

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = async (updateData) => {
        setLoader(true)

        if (profileImg) {
            UploadPhoto(profileImg)
                .then(({ data }) => {
                    const imgSource = data.data.display_url;
                    updateProfile(auth.currentUser, {
                        displayName: updateData.name,
                        photoURL: imgSource
                    })
                        .then(() => {
                            console.log(imgSource)
                            mutate({ ...updateData, photoURL: imgSource, email: userData.email })
                            toast.success('update successfully')
                            setProfileImg(null);
                            setLoader(false)
                        })

                })
                .catch(() => {
                    setLoader(false)
                    toast.error("Photo upload failed ! Try again.")
                })
        }
        else {
            mutate({ ...updateData, email: userData.email })
            updateProfile(auth.currentUser, {
                displayName: updateData.name,
            })
                .then(() => {
                    toast.success('update successfully')
                    setProfileImg(null);
                    setLoader(false)
                })
                .catch(() => {
                    toast.error('Something wents wrong')
                    setLoader(false)
                })
            setProfileImg(null);
        }

    }

    return (
        <div className="p-10 md:px-16 md:py-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">

                <div>
                    <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-900 ">New name <span className="text-red-500">*</span></label>

                    <Controller
                        name="name"
                        control={control}
                        defaultValue={userData.name}
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
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">New Password <span className="text-red-500">*</span></label>

                    <Controller
                        name="password"
                        control={control}
                        defaultValue={userData.password}
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
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">New Phone <span className="text-red-500">*</span></label>
                    <Controller
                        name="phone"
                        control={control}
                        defaultValue={userData.phone}
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
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Update profile photo</p>
                    </Dragger>
                </div>

                <button type="submit" className="btn btn-info w-full bg-blue-500 text-white hover:bg-blue-600">
                    Update Now
                    {
                        (isPending || loader) && <span className="loading loading-spinner"></span>
                    }
                </button>

            </form>
            <Toaster></Toaster>
        </div>
    );
};

export default UpdateProfile;