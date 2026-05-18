const axios = require("axios");

const Employee = require(
  "../models/Employee"
);

const getRecommendation =
  async (req, res) => {

    try {

      const employees =
        await Employee.find();


      const employeeData =
        employees.map((emp) => ({

          name: emp.name,

          department:
            emp.department,

          skills: emp.skills,

          performanceScore:
            emp.performanceScore,

          experience:
            emp.experience,
        }));


      const prompt = `

You are an HR AI assistant.

Analyze the employee data and provide:

1. Promotion Recommendations

2. Training Suggestions

3. Improvement Feedback

4. Employee Ranking from best to worst

For each employee explain:

- strengths

- weaknesses

- missing skills

- promotion eligibility

Employee Data:

${JSON.stringify(
  employeeData,
  null,
  2
)}
`;


      const response =
        await axios.post(

          "https://openrouter.ai/api/v1/chat/completions",

          {

            model:
              "openai/gpt-3.5-turbo",

            messages: [

              {
                role: "user",

                content: prompt,
              },
            ],
          },

          {

            headers: {

              Authorization:
                `Bearer ${process.env.OPENROUTER_API_KEY}`,

              "Content-Type":
                "application/json",
            },
          }
        );


      res.json({

        recommendation:
          response.data.choices[0]
            .message.content,
      });

    } catch (error) {

      console.log(
        error.response?.data ||
        error.message
      );

      res.status(500).json({
        message:
          "AI recommendation failed",
      });
    }
  };

module.exports = {
  getRecommendation,
};