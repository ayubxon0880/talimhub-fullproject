import React, { useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import ".././audiorecorder.css";
import { API } from '../../env';

const Mock3 = ({ setSpeakingForm, topic }) => {
  const [timer, setTimer] = useState(0);
  const [countdown, setCountdown] = useState(30);
  const [audioUrl, setAudioUrl] = useState(null); // Store the audio URL here

  const {
    startRecording,
    stopRecording,
    mediaBlobUrl,
    status,
  } = useReactMediaRecorder({
    audio: true,
    onStop: (blobUrl) => {
      setAudioUrl(blobUrl); // Set the blob URL after recording stops
      handlePublish(blobUrl); // Trigger publishing after stopping
    }
  });

  useEffect(() => {
    if (countdown > 0) {
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdownInterval);
    } else if (countdown === 0) {
      handleStartRecording();
    }
  }, [countdown]);

  const handleStartRecording = () => {
    startRecording();
    setTimer(0);

    const recordingInterval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    setTimeout(() => {
      stopRecording();
      clearInterval(recordingInterval);
      setTimer(0);
    }, 1000 * 30);
  };

  const handlePublish = async (blobUrl) => {
    if (!blobUrl || !topic) {
      alert('No recording or topic available to publish.');
      return;
    }

    try {
      const audioBlob = await fetch(blobUrl).then((res) => res.blob());
      setSpeakingForm({'audio':audioBlob,'part':0,'topic':topic.id});
    } catch (error) {
      console.error('Error publishing the recording:', error);
    }
  };

  function isValidURL(str) {
    const pattern = /^(https?:\/\/)?([a-z0-9]+(\.[a-z0-9]+)*(\.[a-z]{2,}))(:\d+)?(\/[^\s]*)?$/i;
    return pattern.test(str);
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex flex-col items-center">
        <p className="text-lg font-semibold">PART THREE</p>
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-10'>
          <img src={isValidURL(topic.image1) ? `${API}/audio/${topic.image1}` : topic.image1} width={300} height={300}/>
        </div>
        <div className="container">
        <p className="text-lg font-semibold">Mavzu</p> 
            {
              topic 
              ?
              topic.name.split('|').map((e) => {
                return(
                  <p className="text-lg font-semibold">{e}</p> 
                );
              })
              : "Loading..."
            }
        </div>
        <div className="mt-4">
          {countdown > 0 && <p className="text-blue-500 font-bold">Boshlanadi : {countdown}</p>}
        </div>
        <div className="mt-2">
          {status === 'recording' && (
            <div className="sound-wave">
              {[...Array(16)].map((_, index) => (
                <div key={index}></div>
              ))}
            </div>
          )}
        </div>
      </div>
      <p className="mt-4">{status === 'recording' ? `Yozib olish vaqti : ${timer}s` : ''}</p>
    </div>
  );
};

export default Mock3;
