/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { userLogin } from '../../redux/userReducers';
import LoadingSpinner from '../Helpers/LoadingSpinner';
import "./loginStyles.css";
import { encrypt } from '../Helpers/encryption';
// import { setError } from '../redux/errorSlice';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { isUserLoading, isAuth, userErrors, user } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const history = useHistory()

    // Function to handle login form submit
    const onLoginFormSubmit = (user) => {
        user = encrypt(user)
        dispatch(userLogin({ user }))
    }

    useEffect(() => {
        if (isAuth) {
            // dispatch(setError(""))
            if (user.role === "user") {
                history.push(`/`)
            } else {
                history.push(`/admindashboard/profile`)
            }
        }
    }, [isAuth]);

    return (
        <div className="container">
            <div className="row text-center mt-5">
                <div className="col-11 col-sm-9 col-md-8 col-lg-6 col-xl-4 mx-auto">
                    <div className="card mx-auto shadow mb-5">
                        <div className="card-body">
                            <div className="h1">Login</div>
                            <form className="" onSubmit={handleSubmit(onLoginFormSubmit)}>

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
                                </div>

                                {/* Password */}
                                <div className="form-floating mt-4 mb-4">
                                    <input
                                        type="password" className="form-control form-control-custom"
                                        name="password" id="password" placeholder="#"
                                        {...register("password", { required: true })}
                                    />
                                    <label htmlFor="password">Password</label>
                                    {errors.password?.type === "required" && <p className="alert alert-danger py-2 mt-2">Password is required</p>}
                                </div>

                                {/* Loading Spinner */}
                                {isUserLoading &&
                                    <LoadingSpinner message=" Logging in..." />
                                }
                                {userErrors && <p className="alert alert-danger py-2 mt-2">{userErrors}</p>}
                                <div className="mt-4">
                                    <button className="btn btn-danger me-3 mb-3" >Login <FontAwesomeIcon icon={faSignInAlt} /></button><br />
                                    <Link className="text-decoration-none" to="/register">New User? Register!</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
