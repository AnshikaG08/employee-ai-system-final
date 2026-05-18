import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/auth/signup",
        formData
      );

      alert("Signup Successful");

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message
      );
    }
  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-slate-950">

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900/80 backdrop-blur-lg border border-slate-700 p-10 rounded-3xl shadow-2xl w-[400px]"
      >

        <h1 className="text-4xl font-bold text-center mb-2 text-white">
          Create Account
        </h1>

        <p className="text-slate-400 text-center mb-8">
          Signup to continue
        </p>


        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl mb-4 outline-none focus:border-cyan-400"
          onChange={handleChange}
        />


        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl mb-4 outline-none focus:border-cyan-400"
          onChange={handleChange}
        />


        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl mb-6 outline-none focus:border-cyan-400"
          onChange={handleChange}
        />


        <button
          className="bg-cyan-500 hover:bg-cyan-600 transition text-black font-bold w-full py-3 rounded-xl"
        >
          Signup
        </button>


        <p className="mt-6 text-center text-slate-400">

          Already have an account?

          <span
            className="text-cyan-400 cursor-pointer ml-2"
            onClick={() => navigate("/")}
          >
            Login
          </span>

        </p>

      </form>

    </div>
  )
}

export default Signup