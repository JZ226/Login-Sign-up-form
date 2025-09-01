import { Link ,useNavigate } from "react-router-dom"; 
import validation from "./signupValidation";
import {useState} from "react";
import axios from "axios";

 function Signup() {
  const [values , setValues] = useState({
    username: "",
    password: "",
    email: "",
    image:""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  function handleINPUT(e){
        setValues(prev=>({...prev,[e.target.name] : e.target.value}));
    }
  function handleSUBMIT(e){
    e.preventDefault(); 
    const Error = validation(values);
    setErrors(Error);
    if( !Error.username && !Error.password && !Error.id && !Error.email){
      axios.post("http://localhost:3000/signup", values)
      .then(res=>{
        console.log(res);
        alert("You are Registered Successfully! Now Login....");
        navigate("/");
      })
      .catch(err=>{
        console.log(err);
        alert("Something gone wrong add the data correctly...");
      })
    }
  }

  return (
    <div className="py-12 sm:p-16 ">
    <div className="p-16 grid place-items-center gap-5 bg-slate-100 w-fit m-auto rounded-xl sm:w-fit">
      <h1 className=" font-bold text-2xl">Sign-Up</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSUBMIT}>
        <label>
          <p>Username:</p>
          <input type="text" name="username" placeholder="Type your username" className="outline-none shadow-md h-12 w-80  bg-slate-100" onChange={handleINPUT} />
          {errors.username && (<div className="text-red-500 text-center w-80 h-14" >{errors.username}</div>)}
        </label>
        <label className="gap-4">
         <p>Password:</p>
          <input type="password" name="password"  placeholder="Type your password" className="outline-none shadow-md h-12 w-80  bg-slate-100" onChange={handleINPUT} />
          {errors.password && (<div className="text-red-500 text-center w-80 h-14" >{errors.password}</div>)}
        </label>
         <label>
          <p>National ID:</p>
          <input type="number" name="id" placeholder="Type your ID" className="outline-none shadow-md h-12 w-80  bg-slate-100 " onChange={handleINPUT} />
          {errors.id && (<div className="text-red-500 text-center w-80 h-14" >{errors.id}</div>)}  
        </label>
         <label>
          <p>Email:</p>
          <input type="email" name="email" placeholder="Type your email" className="outline-none shadow-md h-12 w-80  bg-slate-100"  onChange={handleINPUT} />
        </label>
         {errors.email && (<div className="text-red-500 text-center w-80 h-14" >{errors.email}</div>)}
          <label>
          <p>Upload Profile Image:</p>
          <input type="image" name="image"  className="outline-none shadow-md h-12 w-80  bg-slate-100"  onChange={handleINPUT} />
        </label>
        <button  type="submit" className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  w-80 h-11 rounded-3xl text-slate-100 font-bold">SIGN-UP</button>
        </form>
        <p className=" mt-20 opacity-75">Or Log-In Using</p>
        <Link to='/'>LOGIN</Link>
    </div>
    </div>
  );
}
export default Signup;