import {

  BarChart,

  Bar,

  XAxis,

  YAxis,

  Tooltip,

  ResponsiveContainer,

  PieChart,

  Pie,

  Cell,

} from "recharts";


function Analytics({ employees }) {

  // TOTAL
  const totalEmployees =
    employees.length;


  // AVERAGE PERFORMANCE
  const averagePerformance =

    employees.length > 0

      ? (

          employees.reduce(

            (acc, emp) =>

              acc + emp.performanceScore,

            0

          ) / employees.length

        ).toFixed(1)

      : 0;


  // TOP PERFORMER
  const topEmployee =

    employees.length > 0

      ? employees.reduce(

          (prev, current) =>

            prev.performanceScore >
            current.performanceScore

              ? prev

              : current
        )

      : null;


  // BAR CHART DATA
  const performanceData =
    employees.map((emp) => ({

      name: emp.name,

      performance:
        emp.performanceScore,
    }));


  // DEPARTMENT COUNTS
  const departmentCounts = {};

  employees.forEach((emp) => {

    departmentCounts[
      emp.department
    ] =

      (departmentCounts[
        emp.department
      ] || 0) + 1;
  });


  const pieData =
    Object.keys(
      departmentCounts
    ).map((dept) => ({

      name: dept,

      value:
        departmentCounts[dept],
    }));


  const COLORS = [

    "#06b6d4",

    "#22c55e",

    "#eab308",

    "#ec4899",
  ];


  return (

    <div className="space-y-8">

      {/* TOP CARDS */}

      <div className="grid md:grid-cols-3 gap-6">

        {/* TOTAL */}

        <div className="bg-gradient-to-br from-cyan-500/20 to-slate-900 border border-cyan-500/30 p-8 rounded-3xl shadow-xl">

          <h2 className="text-slate-300 text-lg">
            Total Employees
          </h2>

          <p className="text-6xl font-bold mt-4 text-cyan-400">
            {totalEmployees}
          </p>

        </div>


        {/* AVG */}

        <div className="bg-gradient-to-br from-green-500/20 to-slate-900 border border-green-500/30 p-8 rounded-3xl shadow-xl">

          <h2 className="text-slate-300 text-lg">
            Average Performance
          </h2>

          <p className="text-6xl font-bold mt-4 text-green-400">
            {averagePerformance}
          </p>

        </div>


        {/* TOP */}

        <div className="bg-gradient-to-br from-yellow-500/20 to-slate-900 border border-yellow-500/30 p-8 rounded-3xl shadow-xl">

          <h2 className="text-slate-300 text-lg">
            Top Performer
          </h2>

          <p className="text-4xl font-bold mt-6 text-yellow-400">
            {topEmployee
              ? topEmployee.name
              : "No Employees"}
          </p>

        </div>

      </div>


      {/* CHARTS */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* BAR CHART */}

        <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl shadow-xl">

          <h2 className="text-2xl font-bold text-cyan-400 mb-6">
            Performance Analytics
          </h2>


          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart
              data={performanceData}
            >

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="performance"
                fill="#06b6d4"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>


        {/* PIE CHART */}

        <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl shadow-xl">

          <h2 className="text-2xl font-bold text-pink-400 mb-6">
            Department Distribution
          </h2>


          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >

                {pieData.map(
                  (entry, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                          COLORS.length
                        ]
                      }
                    />

                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  )
}

export default Analytics