import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import Analytics from "../components/Analytics";
import AIRecommendation from "../components/AIRecommendation";

function Dashboard() {

  const navigate = useNavigate();

  const [employees, setEmployees] =
    useState([]);

  const [filteredEmployees,
    setFilteredEmployees] =
    useState([]);


  const fetchEmployees = async () => {

    try {

      const res = await API.get(
        "/employees"
      );

      setEmployees(res.data);

      setFilteredEmployees(res.data);

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {

    fetchEmployees();

  }, []);


  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };


  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-8">

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold tracking-wide">
            Employee AI Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            AI Powered Employee Analytics System
          </p>

        </div>


        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-xl font-semibold"
        >
          Logout
        </button>

      </div>


      <Analytics employees={employees} />

      <EmployeeForm fetchEmployees={fetchEmployees} />

      <EmployeeList
        employees={filteredEmployees}
        setFilteredEmployees={
          setFilteredEmployees
        }
        allEmployees={employees}
        fetchEmployees={fetchEmployees}
      />

      <AIRecommendation />

    </div>
  )
}

export default Dashboard