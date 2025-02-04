import React, { useState, useEffect } from "react";
import "react-h5-audio-player/lib/styles.css";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { API, LoadingSpinner} from "../../env";

const SingleMock = () => {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mock, setMock] = useState(null);
  const [grade, setGrade] = useState(null);

  const fetchSpeaking = async () => {
    try {
      const response = await axios.get(
        `${API}/mock/${id}`, {
          headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      const data = response.data;
      // if (data.mock.checked == true){
        setMock(data.mock);
        setGrade(data.grade);
      // }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchSpeaking();
    setLoading(false);
  }, []);


  return (
    <div className="text-center mt-5">
      <div className="grid grid-cols-1 sm:ml-0 lg:ml-10 mt-10">
        <h1 className="text-red-600">{error}</h1>
        {mock === null ? <LoadingSpinner/> :(
          <div
          key={mock.id}
          className="w-full md:w-96 lg:w-2/3 xl:w-1/2 mx-auto my-4 border-b rounded border p-4 transition-all hover:shadow-lg"
        >
          <div className="text-gray-700 text-left">
      <a href={`#`} className="text-left font-semibold text-lg mb-2">
        Part 1, {mock.topic1}
      </a>
      </div>
      <div className="text-gray-700 text-left">
          <a href={`/user-detail/${mock.userId}`} className="text-sm">
            {mock.userFullName}
          </a>
      </div>
      <div>
      <audio controls>
              <source src={`${API}/audio/${mock.partTwoAudioUrl}`} type="audio/mp3" onLoad={MediaMetadata}/>
              Your browser does not support the audio element.
        </audio>
      </div>

      <div className="text-gray-700 text-left">
      <a href={`#`} className="text-left font-semibold text-lg mb-2">
        Part 2, {mock.topic2}
      </a>
      </div>
      <div className="text-gray-700 text-left">
          <a href={`/user-detail/${mock.userId}`} className="text-sm">
            {mock.userFullName}
          </a>
      </div>
      <div>
      <audio controls>
              <source src={`${API}/audio/${mock.partOneAudioUrl}`} type="audio/mp3" onLoad={MediaMetadata}/>
              Your browser does not support the audio element.
            </audio>
      </div>
      <div className="text-gray-700 text-left">
      <a href={`#`} className="text-left font-semibold text-lg mb-2">
        Part 3, {mock.topic3}
      </a>
      </div>
      <div className="text-gray-700 text-left">
          <a href={`/user-detail/${mock.userId}`} className="text-sm">
            {mock.userFullName}
          </a>
      </div>
      <div>
      <audio controls>
              <source src={`${API}/audio/${mock.partThreeAudioUrl}`} type="audio/mp3" onLoad={MediaMetadata}/>
              Your browser does not support the audio element.
            </audio>
      </div>
      <div className="text-right mt-2 flex justify-end items-center">
        <div className="flex space-x-2">
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(
              window.location.origin + `/mock-feedback/${mock.id}`
            )}&text=${encodeURIComponent(
              `Check out this Mock speaking`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-full bg-blue-500 text-white transition-colors hover:bg-blue-600"
          >
            Share 📤
          </a>
        </div>
      </div>
          {
            mock.checked && <form className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-left">Daraja : {grade.degree}</label>
              </div>
              <div className="flex flex-col">
              <label className="text-left">
                Feedback : {grade.feedback}
              </label>
              </div>
            </form>
          }

        </div>
        )}
      </div>
    </div>
  );
};

export default SingleMock;
