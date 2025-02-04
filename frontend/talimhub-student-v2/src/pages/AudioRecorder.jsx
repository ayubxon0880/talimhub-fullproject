import React, { useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import AudioPlayer from "react-h5-audio-player";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import "./audiorecorder.css";
import { API, token, LoadingSpinner } from '../env';

const AudioRecorder = () => {
  const partOptions = [
    { value: '1', label: 'Part 1' },
    { value: '2', label: 'Part 2' },
    // { value: '2', label: 'Part 3' },
  ];
  const [recordingStarted, setRecordingStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [countdown, setCountdown] = useState(null);
  const [selectedPart, setSelectedPart] = useState(partOptions[0]);
  const [topic, setTopic] = useState('');
  const [showPublishButton, setShowPublishButton] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    startRecording,
    stopRecording,
    mediaBlobUrl,
    status,
  } = useReactMediaRecorder({ audio: true });

  const handleRandomTopic = async () => {
    try {
      setLoading(true);
      console.log(token);
      const response = await axios.get(API+`/topic/random?part=${selectedPart.value}`,{
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data) {
        setTopic(response.data);
        setShowControls(false);
        startCountdown();
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching random topic:', error);
      setLoading(false);
    }
    setLoading(false);
  };

  const startCountdown = () => {
    let counter = selectedPart.value == 1 ? 5 : 60;
    setCountdown(counter);
    const countdownInterval = setInterval(() => {
      counter -= 1;
      setCountdown(counter);
      if (counter === 0) {
        clearInterval(countdownInterval);
        setCountdown(null);
        handleStartRecording();
      }
    }, 1000);
  };

  const handleStartRecording = () => {
    setRecordingStarted(true);
    startRecording();
    setTimer(0);
  };

  useEffect(() => {
    let interval;
    if (status === 'recording') {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);

      // Stop recording after 30 seconds
      setTimeout(() => {
        stopRecording();
        setRecordingStarted(false);
        setTimer(0);
        setShowPublishButton(true);
      }, selectedPart.value == 1 ? 60000 : 120000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [status]);

  const handlePublish = async () => {
    if (!mediaBlobUrl || !topic) {
      alert('No recording or topic available to publish.');
      return;
    }

    setLoading(true);

    try {
      const audioBlob = await fetch(mediaBlobUrl).then((res) => res.blob());
      const formData = new FormData();
      formData.append('audio', audioBlob);
      formData.append('part', selectedPart.value);
      formData.append('topic', topic.id);

      const response = await axios.post(API+'/speaking/save', formData, {
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data && response.data.id) {
        navigate(`/speaking/${response.data.id}`);
      }
    } catch (error) {
      console.error('Error publishing the recording:', error);
      setLoading(false);
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  function isValidURL(str) {
    const pattern = /^(https?:\/\/)?([a-z0-9]+(\.[a-z0-9]+)*(\.[a-z]{2,}))(:\d+)?(\/[^\s]*)?$/i;
    return pattern.test(str);
  }


  return (
    <div className="flex flex-col items-center mt-8">
      {showControls ? (
        <div className="flex flex-col items-center">
          <h1>Qaysi qism ?</h1>
          <Select
            isMulti={false}
            value={selectedPart}
            onChange={(selectedOption) => setSelectedPart(selectedOption)}
            options={partOptions}
            className="mt-2 w-40"
            classNamePrefix="select"
          />
          {loading ? <LoadingSpinner/> : <button 
            onClick={handleRandomTopic} 
            disabled={recordingStarted}
            className={`mt-2 p-2 bg-blue-500 text-white rounded ${recordingStarted ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Tasodifiy savolni olish.
          </button>}
          {
            selectedPart.value === '1'
          }
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {selectedPart.value == '1' & topic != null &&
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10'>
            <img src={isValidURL(topic.image1) ? `${API}/audio/${topic.image1}` : topic.image1} width={300} height={300}/>
            <img src={isValidURL(topic.image2) ? `${API}/audio/${topic.image2}` : topic.image2} width={300} height={300}/>
          </div>
          }
          
          <div className="container">
              <p className="text-lg font-semibold">Mavzu</p> 
              {
                topic 
                ?
                topic.topic.split('|').map((e) => {
                  return(
                    <p className="text-lg font-semibold">{e}</p> 
                  );
                })
                : "Loading..."
              }
          </div>
          {/* <p className="text-lg font-semibold">Mavuz: {topic.topic}</p> */}
          <button 
            onClick={handleRetry} 
            className="mt-2 p-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Qaytadan
          </button>
          <div className="mt-4">
            {countdown !== null && <p className="text-blue-500 font-bold">Boshlanadi : {countdown}</p>}
          </div>
          <div className="mt-2">
            {status === 'recording' && (
              <>
                <div className="sound-wave">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                {/* <div className="text-red-600 font-bold">Recording...</div> */}
              </>
            )}
          </div>
        </div>
      )}

      <p className="mt-4">{status === 'recording' ? `Yozib olish vaqti : ${timer}s` : ''}</p>

      {showPublishButton && (
        <>
        <div className="mt-2">
                  <AudioPlayer autoPlay src={mediaBlobUrl} onPlay={() => console.log('Playing audio')} />
                </div>
          {
            loading ? <><LoadingSpinner/> {selectedPart.value === 1 && <h1>Part 2 ni saqlash ozgina ko'proq vaqt talab qilishi mumkin. Sabr {":)"}</h1>} </> : <button 
          onClick={handlePublish} 
          className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Saqlab qolish
        </button>
          }
        </>
      )}
    </div>
  );
};

export default AudioRecorder;