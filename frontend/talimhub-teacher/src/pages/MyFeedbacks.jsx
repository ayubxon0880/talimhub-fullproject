import React, { useState, useEffect } from "react";
import "react-h5-audio-player/lib/styles.css";
import axios from "axios";
import { API, LoadingSpinner, token } from "../env";

const MyFeedbacks = () => {
  const [grades, setGrades] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const fetchSpeakings = async (page, pageSize, sorted) => {
    try {
      const response = await axios.get(
        `${API}/teacher/checked-speakings?page=${page}&size=${pageSize}&sorted=true`, {
          headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      const data = response.data;
      setGrades(data.grades);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSpeakings(page, pageSize);
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="text-center mt-5">
      <h1 className="text-2xl font-bold mb-4">Speakings</h1>

{grades.length === 0 ? (
  <LoadingSpinner />
) : (
  grades.map((grade) => (
    <div
      key={grade.id}
      className="w-full md:w-96 lg:w-2/3 xl:w-1/2 mx-auto my-4 border-b rounded border p-4 transition-all hover:shadow-lg"
    >
      
      <div className="grid grid-cols-2">
        <div className="text-gray-700 text-left">
        <span className="text-left font-semibold text-lg mb-2">
          {grade.topic}
        </span>
        </div>

        <div className="text-gray-700 text-right">
        <span className="text-left font-semibold text-lg mb-2">
          daraja : {grade.degree}
        </span>
        </div>
      </div>

      <div className="text-gray-700 text-left">
          feedback :
          <span className="text-sm">
            {grade.feedback}
          </span>
      </div>
      <div className="text-gray-700 text-left">
          <span className="text-sm">
            {grade.userFullName}
          </span>
      </div>
      
      <div>
      <audio controls>
              <source src={`${API}/audio/${grade.audioUrl}`} type="audio/mp3" onLoad={MediaMetadata}/>
              Your browser does not support the audio element.
            </audio>
      </div>
    </div>
  ))
)}

        <div className="flex justify-center gap-4 mt-5">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 0}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Previous
          </button>
          <span>
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page + 1 >= totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
    </div>
  );
};

export default MyFeedbacks;