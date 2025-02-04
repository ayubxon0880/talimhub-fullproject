import React, { useState, useEffect } from "react";
import "react-h5-audio-player/lib/styles.css";
import axios from "axios";
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router-dom';
import { API, LoadingSpinner} from "../env";

const MockCheck = () => {
  const degreeOptions = [
    { value: 'A1', label: 'A1' },
    { value: 'A2', label: 'A2' },
    { value: 'B1', label: 'B1' },
    { value: 'B2', label: 'B2' },
    { value: 'C1', label: 'C1' },
    { value: 'unknown', label: 'Tushunarsiz' }
  ];
  const { id } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mock, setMock] = useState(null);
  const [degree, setDegree] = useState(degreeOptions[0]);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

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
      // if (data.checked == false){
        setMock(data);
      // }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSpeaking();
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    axios.post(`${API}/mock/check`,{
      mockId:id,
      degree:degree.value,
      feedback
    }, {
      headers: {
        "Authorization":`Bearer ${localStorage.getItem("token")}`
      }
    }).then((response) => {
      navigate('/mocks');
      setLoading(false);
    }).catch((error) => {
      setError("Nimadir xato, qaytadan urinib ko'ring.");
      setLoading(false);
    })
    setLoading(false);
  };


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
              window.location.origin + `/full-mock/${mock.id}`
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
    
          {/* <div className="text-right mt-2 flex justify-end items-center">
            <div className="flex space-x-2">
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
          </div> */}

          <form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-left">Daraja</label>
              <Select
                isMulti={false}
                value={degree}
                onChange={(selectedOption) => setDegree(selectedOption)}
                options={degreeOptions}
                className="mt-2 w-40"
                classNamePrefix="select"
              />
            </div>
            <div className="flex flex-col">
            <label className="text-left">Feedback</label>
              <textarea
                type="text"
                name="feedback"
                onChange={e => setFeedback(e.target.value)}
                className="border rounded p-2"
                required
              />
            </div>
            {loading ? <LoadingSpinner/> : 
            <button
              type="button"
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={loading}
              onClick={handleSubmit}
            >
              Baholash
            </button>}
          </form>
        </div>
        )}

      </div>
    </div>
  );
};

export default MockCheck;
