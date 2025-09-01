import { Link , useNavigate } from "react-router-dom"; 
import validation from "./loginValidation"
import { useState } from "react";
import axios from "axios"

 function Login() {
  const [values , setValues] = useState({
    username: "",
    password: ""
  })
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function handleINPUT(e){
       setValues(prev=>({...prev,[e.target.name] : [e.target.value]}));
  }
  function handleSUBMIT(e){
    e.preventDefault();
     const Error = validation(values)
    setErrors(Error);
    if( !Error.username && !Error.password){
      axios.post("http://localhost:3000/", values)
      .then(res=>{
        console.log(res);
        if(res.data.message==="Login successful")
          navigate("/home");
      })
      .catch(err=>{
        console.log(err);
       alert("Enter a correct username or password. If no sign up then first do sign up...");
      })
    }
  }

  return (
    <div className="py-12 sm:p-16">
    <div className="p-16 grid place-items-center gap-5 bg-slate-100 w-fit m-auto rounded-xl sm:p-16">
      <h1 className=" font-bold text-2xl">Login</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSUBMIT}>
        <label>
          <p>Username:</p>
          <input type="text" name="username" placeholder="Type your username" className="outline-none shadow-md h-12 w-80  bg-slate-100" onChange={handleINPUT} />
          {errors.username && (
          <div className="text-red-500 text-center  w-80 h-14">{errors.username}</div>
           )}
        </label>
        <br />
        <label className="gap-4">
         <p>Password:</p>
          <input type="password" name="password"  placeholder="Type your password" className="outline-none shadow-md h-12 w-80  bg-slate-100" onChange={handleINPUT} />
          {errors.password && (
           <div className="text-red-500 text-center w-80 h-16">{errors.password}</div>
              )}
          <p className=" pl-48">forget Password?</p>
        </label>
        <button type="Submit" className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  w-80 h-11 rounded-3xl text-slate-100 font-bold">LOGIN</button>
        </form>
        <p className=" mt-20 opacity-75">Or Sign Up Using</p>
        <Link to='/signup'>SIGN UP</Link>
    </div>
    </div>
  );
}
export default Login;