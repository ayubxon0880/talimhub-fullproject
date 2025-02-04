import React, { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import axios from "axios";
import { API, LoadingSpinner } from "../env";

const Speaking = () => {
  const [speakings, setSpeakings] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [sorted, setSorted] = useState(true);

  const fetchSpeakings = async (page, pageSize, sorted) => {
    try {
      const response = await axios.get(
        `${API}/public/speakings?page=${page}&size=${pageSize}&sorted=${sorted}`, {
          headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      const data = response.data;
      setSpeakings(data.speakings);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSpeakings(page, pageSize, sorted);
  }, [page, pageSize, sorted]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSortChange = () => {
    setSorted(!sorted);
  };

  const handleLike = (speakingId) => {
    axios
      .delete(`${API}/admin/speaking/${speakingId}`, {
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => {
        console.log("Hello")
        setSpeakings(updatedSpeakings);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  return (
    <div className="text-center mt-5">
      <h1 className="text-2xl font-bold mb-4">Speaking List</h1>

      <div className="grid grid-cols-1 sm:ml-0 lg:ml-10 mt-10">
        {speakings.length === 0 ? <LoadingSpinner/> : speakings.map((speaking) => (
          <div
            key={speaking.id}
            // ""
            className="w-full md:w-96 lg:w-2/3 xl:w-1/2 mx-auto my-4 border-b rounded border p-4 transition-all hover:shadow-lg"
          >
            <h1 className="text-left font-semibold text-lg mb-2">
              {speaking.topic.topic.split("|").map((top) => {
                return <p>{top}</p>;
              })}
            </h1>
            <div>
              <AudioPlayer
                src={`${API}/audio/${speaking.audioUrl}`}
                onPlay={(e) => console.log("onPlay")}
              />
            </div>
            <div className="text-right mt-2 flex justify-between items-center">
              <div className="text-gray-700">
                <span className="text-sm">Likes: {speaking.likes}</span>
              </div>
              <button
                className={`px-4 py-2 rounded-full transition-colors ${
                  "bg-red-500"
                }`}
                onClick={() => handleLike(speaking.id)}
              >
                delete
              </button>
            </div>
          </div>
        ))}

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
    </div>
  );
};

export default Speaking;
