import { useState } from "react";

import API from "../services/api";

function AIRecommendation() {

  const [loading, setLoading] =
    useState(false);

  const [recommendation,
    setRecommendation] =
    useState("");


  const getAIRecommendation =
    async () => {

      try {

        setLoading(true);

        const res = await API.post(
          "/ai/recommend"
        );

        setRecommendation(
          res.data.recommendation
        );

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);
      }
    };


  return (

    <div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl shadow-lg">

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">

        <h2 className="text-3xl font-bold text-cyan-400">
          AI Recommendation
        </h2>


        <button
          onClick={getAIRecommendation}
          className="bg-cyan-500 hover:bg-cyan-600 transition text-black font-bold px-6 py-3 rounded-xl"
        >
          Generate AI Report
        </button>

      </div>


      {loading ? (

        <div className="text-center py-10">

          <p className="text-xl text-cyan-400 animate-pulse">
            Generating AI Insights...
          </p>

        </div>

      ) : (

        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">

          <pre className="whitespace-pre-wrap text-slate-300 leading-7">
            {recommendation}
          </pre>

        </div>

      )}

    </div>
  )
}

export default AIRecommendation