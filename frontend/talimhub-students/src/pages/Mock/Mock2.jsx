import React, { useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import ".././audiorecorder.css";

const Mock2 = ({ setSpeakingForm, topic }) => {
  const [timer, setTimer] = useState(0);
  const [countdown, setCountdown] = useState(60);
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
    }, 1000 * 120);
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

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex flex-col items-center">
        <p className="text-lg font-semibold">PART TWO</p>
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

export default Mock2;
