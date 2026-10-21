import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate, Link } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/UserContext'
import GoogleLoginButton from './GoogleLoginButton'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("please enter your password");
      return;
    }
    setError("");
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-sm mx-auto lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center px-4">

        <div className="mb-9">
          <span className="inline-block w-8 h-1 bg-emerald-400 rounded-full mb-4" />
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h3>
          <p className="text-sm text-slate-500 mt-2">Log in to keep track of your money</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="Enter your email address"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />

          {error && (
            <p className="flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm py-3 tracking-wide transition-colors duration-150 active:scale-[0.99]"
          >
            LOG IN
          </button>

          <div className="flex items-center gap-3 py-1">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="text-[11px] uppercase tracking-wide text-slate-400">or</span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <GoogleLoginButton
            onLoginSuccess={(user) => {
              updateUser(user);
              navigate("/dashboard");
            }}
          />

          <p className="text-[13px] text-slate-600 text-center pt-3">
            Don't have an account?{" "}
            <Link className="font-semibold text-emerald-600 hover:text-emerald-700 underline underline-offset-2" to="/signup">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login;