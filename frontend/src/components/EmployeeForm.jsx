import { useState } from "react";

import API from "../services/api";

function EmployeeForm({ fetchEmployees }) {

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      department: "",

      skills: "",

      performanceScore: "",

      experience: "",

      experienceType: "Years",
    });


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };


  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const employeeData = {

          ...formData,

          skills:
            formData.skills.split(","),

          performanceScore:
            Number(
              formData.performanceScore
            ),

          experience:

            formData.experienceType ===
            "Years"

              ? Number(
                  formData.experience
                )

              : Number(
                  formData.experience
                ) / 12,
        };


        await API.post(
          "/employees",
          employeeData
        );

        alert("Employee Added");


        fetchEmployees();


        setFormData({

          name: "",

          email: "",

          department: "",

          skills: "",

          performanceScore: "",

          experience: "",

          experienceType: "Years",
        });

      } catch (error) {

        alert(
          error.response?.data?.message
        );
      }
    };


  return (

    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 border border-slate-700 p-8 rounded-3xl shadow-lg mb-10"
    >

      <h2 className="text-3xl font-bold mb-6 text-cyan-400">
        Add Employee
      </h2>


      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Name"
          className="bg-slate-800 border border-slate-700 p-3 rounded-xl outline-none focus:border-cyan-400"
          onChange={handleChange}
        />


        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          className="bg-slate-800 border border-slate-700 p-3 rounded-xl outline-none focus:border-cyan-400"
          onChange={handleChange}
        />


        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="bg-slate-800 border border-slate-700 p-3 rounded-xl outline-none focus:border-cyan-400"
        >

          <option value="">
            Select Department
          </option>

          <option value="Development">
            Development
          </option>

          <option value="AI">
            AI
          </option>

          <option value="HR">
            HR
          </option>

          <option value="Marketing">
            Marketing
          </option>

        </select>


        <input
          type="text"
          name="skills"
          value={formData.skills}
          placeholder="Skills comma separated"
          className="bg-slate-800 border border-slate-700 p-3 rounded-xl outline-none focus:border-cyan-400"
          onChange={handleChange}
        />


        <input
          type="number"
          name="performanceScore"
          value={formData.performanceScore}
          placeholder="Performance Score"
          className="bg-slate-800 border border-slate-700 p-3 rounded-xl outline-none focus:border-cyan-400"
          onChange={handleChange}
        />


        <div className="flex gap-3">

          <input
            type="number"
            name="experience"
            value={formData.experience}
            placeholder="Experience"
            className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl outline-none focus:border-cyan-400"
            onChange={handleChange}
          />


          <select
            name="experienceType"
            value={formData.experienceType}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 p-3 rounded-xl outline-none focus:border-cyan-400"
          >

            <option value="Years">
              Years
            </option>

            <option value="Months">
              Months
            </option>

          </select>

        </div>

      </div>


      <button
        className="bg-cyan-500 hover:bg-cyan-600 transition text-black font-bold px-8 py-3 rounded-xl mt-6"
      >
        Add Employee
      </button>

    </form>
  )
}

export default EmployeeForm