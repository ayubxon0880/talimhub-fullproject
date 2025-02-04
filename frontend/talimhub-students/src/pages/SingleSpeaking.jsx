import React, { useState, useEffect } from "react";
import "react-h5-audio-player/lib/styles.css";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { API, LoadingSpinner} from "../env";

const SingleSpeaking = () => {
  const { id } = useParams();
  const [speaking, setSpeaking] = useState(null);
  const [grade, setGrade] = useState(null);
  const [liked, setLiked] = useState(false);

  const fetchSpeaking = async () => {
    try {
      const response = await axios.get(
        `${API}/grade/${id}`, {
          headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      const data = response.data;
      setSpeaking(data.speaking);
      setGrade(data.grade);
      setLiked(data.speaking.liked);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSpeaking();
  }, []);

  const handleLike = (speakingId) => {
    axios
      .post(`${API}/speaking/like?speakingId=${speakingId}`, {}, {
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => {
        setLiked(true);
        console.log("like")
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <div className="text-center mt-5">
      <h1 className="text-2xl font-bold mb-4">Speaking</h1>

      <div className="grid grid-cols-1 sm:ml-0 lg:ml-10 mt-10">
        {speaking === null ? <LoadingSpinner/> :(
          <div
          key={speaking.id}
          className="w-full md:w-96 lg:w-2/3 xl:w-1/2 mx-auto my-4 border-b rounded border p-4 transition-all hover:shadow-lg"
        >
          
          <div className="text-gray-700 text-left">
          <span className="text-left font-semibold text-lg mb-2">
            Part {speaking.speakingType}, 
            {
              speaking.topic.topic.split('|').map((e) => {
                return(
                  <p className="text-lg font-semibold">{e}</p> 
                );
              })
            }
          </span>
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
        )}
        {grade !== null  && (
          <div className="w-full md:w-96 lg:w-2/3 xl:w-1/2 mx-auto my-4 border-b rounded border p-1 transition-all hover:shadow-lg">
          <div className="text-gray-700 text-left">
          <span className="text-left font-semibold text-lg mb-2">
            Daraja : {grade.degree}
          </span>
          </div>
          <div className="text-gray-700 text-left">
              Mulohaza : {grade.feedback}
          </div>
          <div className="text-left">
            <span><a href={`/teacher/${grade.supervisorId}`} className="text-blue-500 border">{grade.supervisorFullName}</a> tomonidan {grade.checkedAt.split("T")[0]} da tekshirildi.</span>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default SingleSpeaking;