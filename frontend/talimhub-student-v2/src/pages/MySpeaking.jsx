import React, { useState, useEffect } from "react";
import "react-h5-audio-player/lib/styles.css";
import axios from "axios";
import { API, LoadingSpinner, token } from "../env";
import { useParams } from "react-router-dom";

const Speaking = () => {
  const {id} = useParams();
  const [speakings, setSpeakings] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const fetchSpeakings = async (page, pageSize, sorted) => {
    try {
      const response = await axios.get(
        `${API}/speaking/my-speakings?userId=${id}&page=${page}&size=${pageSize}&sorted=true`, {
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
    fetchSpeakings(page, pageSize);
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLike = (speakingId) => {
    axios
      .post(`${API}/speaking/like?speakingId=${speakingId}`, {}, {
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => {
        const updatedSpeakings = speakings.map((speaking) =>
          speaking.id === speakingId
            ? { ...speaking, liked: true, likes: speaking.likes + 1 }
            : speaking
        );
        setSpeakings(updatedSpeakings);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <div className="text-center mt-5">
      <h1 className="text-2xl font-bold mb-4">Speakinglar</h1>

{speakings.length === 0 ? (
  <LoadingSpinner />
) : (
  speakings.map((speaking) => (
    <div
      key={speaking.id}
      className="w-full md:w-96 lg:w-2/3 xl:w-1/2 mx-auto my-4 border-b rounded border p-4 transition-all hover:shadow-lg"
    >
      
      <div className="text-gray-700 text-left">
      <a href={`/speaking/${speaking.id}`} className="text-left font-semibold text-lg mb-2">
        Part {speaking.speakingType}, {speaking.topic.topic}
      </a>
      </div>
      <div className="text-gray-700 text-left">
          <a href={`/user-detail/${speaking.userDTOSpeaking.id}`} className="text-sm">
            {speaking.userDTOSpeaking.fullName}, Likes: {speaking.likes}
          </a>
      </div>
      
      <div>
      <audio controls>
              <source src={`${API}/audio/${speaking.audioUrl}`} type="audio/mp3" onLoad={MediaMetadata}/>
              Your browser does not support the audio element.
            </audio>
      </div>

      <div className="text-right mt-2 flex justify-end items-center">
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-full transition-colors ${
              speaking.liked ? "bg-yellow-400" : "bg-red-500"
            }`}
            onClick={() => handleLike(speaking.id)}
          >
            {speaking.liked ? "Liked ❤️" : "Like 👍"}
          </button>
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(
              window.location.origin + `/speaking/${speaking.id}`
            )}&text=${encodeURIComponent(
              `Check out this speaking: Part ${speaking.speakingType}, Topic: ${speaking.topic.topic}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-full bg-blue-500 text-white transition-colors hover:bg-blue-600"
          >
            Share 📤
          </a>
        </div>
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

export default Speaking;