import React, { useState, useContext } from 'react' 
import AuthLayOut from '../../components/layouts/AuthLayOut'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';
import GoogleLoginButton from './GoogleLoginButton'

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  //handle signup form submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";
    if(!fullName){
      setError("Please enter your full name");
      return; 
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email address")
      return;
    }
    if(!password){
      setError("Please enter a password");
      return;
    }
    setError("");
   
    //SignUp  API Call  
    try {
      
      //Upload image if present
      if (profilePic) {
          const imgUploadRes = await uploadImage(profilePic);
          profileImageUrl = imgUploadRes.imageUrl || "";
       }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
       profileImageUrl
      });
      
      const { token, user } = response.data;
      
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      } 
    
    } catch(error){
      
      if (error.response && error.response.data.message) {
         setError(error.response.data.message);
      } else{
        setError("Something went wrong please try again");
      }
    }
  };
  
  return (
    <AuthLayOut>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center"> 
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Enter your details here</p>
      
      <form onSubmit={handleSignUp}>

       <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            value={fullName}
            onChange={({target}) => setFullName(target.value)}
            label="Full Name"
            placeholder="John"
            type="text"
          />
          <Input
            value={email}
            onChange={({target}) => setEmail(target.value)}
            label="email Address"
            placeholder="Enter your email address"
            type="text"
          />
          <div className="col-span-2">
            <Input
                value={password}
                onChange={({target}) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 characters"
                type="password"
              />
          </div>           
        </div>
      
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
        <button type="submit" className="btn-primary bg-emerald-400 hover:bg-emrald-500 text-white w-full mt-4">
          SIGN UP
        </button>
        <div className="mt-4">
          <GoogleLoginButton
            buttonText="signup_with"
            onLoginSuccess={(user) => {
              updateUser(user);
              navigate("/dashboard");
            }}
          />
        </div>        
        <p className="text-[13px] text-slate-800 mt-3">
          Already have an account? 
          <Link className="font-medium text-emerald-400 underline ml-1" to="/login">Login</Link>
        </p>        
      </form>
     
      </div>
    </AuthLayOut>
  )
}

export default SignUp
