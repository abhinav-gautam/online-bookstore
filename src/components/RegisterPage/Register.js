/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../Helpers/LoadingSpinner';
import bcrypt from 'bcryptjs';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/userReducers';
import { encrypt } from '../Helpers/encryption';
import { setError } from '../../redux/errorSlice';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [userRegisterStatus, setUserRegisterStatus] = useState("");
    const { isAuth, user } = useSelector(state => state.user)
    const dispatch = useDispatch()


    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory()

    useEffect(() => {
        if (isAuth) {
            dispatch(setError(""))
            if (user.role === "user") {
                history.push(`/`)
            } else {
                history.push(`/admindashboard/${user.username}`)
            }
        }
    }, [isAuth]);


    // Function to handle register form submit
    const onRegisterFormSubmit = async (user) => {
        // Generating hash for password
        const normalPassword = user.password
        const hashPassword = bcrypt.hashSync(user.password, 7)
        user.password = hashPassword

        const normalUsername = user.username
        // Encrypting password
        user = encrypt(user)
        // Making post request to API
        setIsLoading(true)
        const { data } = await axios.post("http://localhost:4000/users/register", { user })
        if (data.status === "success") {
            setIsLoading(false)
            const loginUser = encrypt({ username: normalUsername, password: normalPassword })
            dispatch(userLogin({ user: loginUser }))
            // history.push("/")
        } else {
            setIsLoading(false)
            setUserRegisterStatus(data.message)
        }
    }


    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-11 col-sm-9 col-md-8 col-lg-6 col-xl-4 mx-auto">
                    <div className="card mx-auto shadow mb-5">
                        <div className="card-body">
                            <div className="h1 text-center">Register</div>
                            <form className="" onSubmit={handleSubmit(onRegisterFormSubmit)}>
                                {/* Name */}
                                <div className="form-floating  mt-4">
                                    <input
                                        type="text" className="form-control form-control-custom"
                                        name="name" id="name" placeholder="#"
                                        {...register("name", { required: true })}
                                    />
                                    <label htmlFor="name">Name</label>
                                    {errors.name?.type === "required" && <p className="alert alert-danger py-2 mt-2">Name is required</p>}
                                </div>
                                {/* Username */}
                                <div className="form-floating mt-4">
                                    <input
                                        type="text" className="form-control form-control-custom"
                                        name="username" id="username" placeholder="#"
                                        {...register("username", { required: true, minLength: 4 })}
                                    />
                                    <label htmlFor="username">Username</label>
                                    {errors.username?.type === "required" && <p className="alert alert-danger py-2 mt-2">Username is required</p>}
                                    {errors.username?.type === "minLength" && <p className="alert alert-danger py-2 mt-2">Username must be of 4 chars</p>}
                                    {userRegisterStatus && <p className="alert alert-danger py-2 mt-2">Username is already taken</p>}
                                </div>
                                {/* Email */}
                                <div className="form-floating mt-4">
                                    <input
                                        type="text" className="form-control form-control-custom" placeholder="#"
                                        {...register("email", { required: true })}
                                    />
                                    <label htmlFor="email">Email</label>
                                    {errors.email?.type === "required" && <p className="alert alert-danger py-2 mt-2">Email is required</p>}
                                </div>
                                {/* Password */}
                                <div className="form-floating mt-4">
                                    <input
                                        type="password" className="form-control form-control-custom"
                                        name="password" id="password" placeholder="#"
                                        {...register("password", { required: true })}
                                    />
                                    <label htmlFor="password">Password</label>
                                    {errors.password?.type === "required" && <p className="alert alert-danger py-2 mt-2">Password is required</p>}
                                </div>
                                <div className="mt-4 text-center">
                                    {
                                        isLoading &&
                                        <div className="mb-4">
                                            <LoadingSpinner message=" Registering..." />
                                        </div>
                                    }
                                    <button className="btn btn-danger mb-3">Register <FontAwesomeIcon icon={faUserPlus} /></button><br />
                                    <Link className="text-decoration-none" to="/login">Already a user? Login!</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
