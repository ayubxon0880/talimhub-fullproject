import React from 'react';

const AudioPlayer = () => {
  // Audio fayllarning URL manzillari ro'yxati
  const audioFiles = [
    { id: 1, title: 'Song 1', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 2, title: 'Song 2', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 3, title: 'Song 3', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  ];

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl mb-4">Audio Player List</h2>
      {audioFiles.map((audio) => (
        <div key={audio.id} className="mb-4">
          <p className="mb-2">{audio.title}</p>
          <audio controls className="w-full">
            <source src={audio.src} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ))}
    </div>
  );
};

export default AudioPlayer;
