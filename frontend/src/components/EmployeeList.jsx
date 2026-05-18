import { useEffect, useState } from "react";

import API from "../services/api";

function EmployeeList({

  employees,

  allEmployees,

  setFilteredEmployees,

  fetchEmployees,

}) {

  const [search, setSearch] =
    useState("");


  // LIVE SEARCH
  useEffect(() => {

    if (search.trim() === "") {

      setFilteredEmployees(
        allEmployees
      );

    } else {

      const filtered =
        allEmployees.filter(

          (emp) =>

            emp.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )

            ||

            emp.department
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )

            ||

            emp.email
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        );

      setFilteredEmployees(
        filtered
      );
    }

  }, [
    search,
    allEmployees,
    setFilteredEmployees
  ]);


  // DELETE EMPLOYEE
  const deleteEmployee =
    async (id) => {

      try {

        await API.delete(
          `/employees/${id}`
        );

        alert("Employee Deleted");

        fetchEmployees();

      } catch (error) {

        console.log(error);
      }
    };


  // UPDATE PERFORMANCE
  const updatePerformance =
    async (id, currentScore) => {

      const newScore = prompt(

        "Enter New Performance Score",

        currentScore
      );

      if (!newScore) return;

      try {

        await API.put(

          `/employees/${id}`,

          {
            performanceScore:
              Number(newScore),
          }
        );

        alert(
          "Performance Updated"
        );

        fetchEmployees();

      } catch (error) {

        console.log(error);
      }
    };


  return (

    <div className="space-y-8">

      {/* SEARCH */}

      <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl shadow-lg">

        <h2 className="text-3xl font-bold text-cyan-400 mb-5">
          Search Employees
        </h2>


        <input
          type="text"
          placeholder="Search by name, email or department..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl outline-none focus:border-cyan-400"
        />

      </div>


      {/* EMPLOYEE LIST */}

      <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl shadow-lg">

        <h2 className="text-3xl font-bold text-yellow-400 mb-6">
          Employee List
        </h2>


        <div className="grid md:grid-cols-2 gap-5">

          {employees.length > 0 ? (

            employees.map((emp) => (

              <div
                key={emp._id}
                className="bg-slate-800 border border-slate-700 p-6 rounded-2xl"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h3 className="text-2xl font-bold text-white">
                      {emp.name}
                    </h3>

                    <p className="text-slate-400 mt-1">
                      {emp.email}
                    </p>

                  </div>


                  <span className="bg-cyan-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                    {emp.department}
                  </span>

                </div>


                <div className="mt-5 space-y-2">

                  <p>

                    <span className="text-cyan-400 font-semibold">
                      Skills:
                    </span>

                    {" "}

                    {emp.skills.join(", ")}

                  </p>


                  <p>

                    <span className="text-green-400 font-semibold">
                      Performance:
                    </span>

                    {" "}

                    {emp.performanceScore}

                  </p>


                  <p>

                    <span className="text-yellow-400 font-semibold">
                      Experience:
                    </span>

                    {" "}

                    {Math.floor(
                      emp.experience
                    )} years

                    {" "}

                    {Math.round(
                      (emp.experience % 1) * 12
                    )} months

                  </p>

                </div>


                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() =>
                      updatePerformance(
                        emp._id,
                        emp.performanceScore
                      )
                    }
                    className="bg-cyan-500 hover:bg-cyan-600 transition text-black px-5 py-2 rounded-xl font-semibold"
                  >
                    Update
                  </button>


                  <button
                    onClick={() =>
                      deleteEmployee(emp._id)
                    }
                    className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-xl"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          ) : (

            <div className="text-slate-400 text-xl">
              No Employees Found
            </div>

          )}

        </div>

      </div>

    </div>
  )
}

export default EmployeeList