import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API , LoadingSpinner } from '../env';

const Likes = ({ userId }) => {
  const [likes, setLikes] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [limit, setLimit] = useState(5); // Number of items per page
  const [offset, setOffset] = useState(0); // Pagination offset
  const [loading, setLoading] = useState(false); // Pagination offset

  // Fetch user likes from the backend

  useEffect(() => {
    // setLoading(true);
    //     axios.get(`${API}/user/my-likes?limit=${limit}&offset=${offset}`, {
    //     headers:{
    //         "Authorization":`Bearer ${localStorage.getItem("token")}`
    //     }
    // }).then((response) => {
    //     setLikes(response.data.likes);
    //     setTotalLikes(response.data.totalLikes);
    //     setLoading(false);
    // }).catch((error) => {
    //     console.log(error)
    //     setLoading(false);
    // })
    // setLoading(false);
  }, [offset, limit]);

  // Handle pagination
  const handleNext = () => {
    if (offset + limit < totalLikes) {
      setOffset(offset + limit);
    }
  };

  const handlePrevious = () => {
    if (offset > 0) {
      setOffset(offset - limit);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Sizga like bosganlar</h2>
      <div className="space-y-4">
        {loading ? <LoadingSpinner/> : likes.map((like, index) => (
          <div
            key={index}
            className="p-4 bg-gray-100 rounded-md shadow-sm flex items-center space-x-4"
          >
            <div>
              <p>Foydalanuvchi : {like.userFirstname} {like.userLastname}</p>
              <p className="text-gray-600">{new Date(like.likePressedDate).toLocaleDateString()} da </p>
              <p className="font-semibold">Mavzu: {like.topic}</p>
              <p className="font-semibold">ga like bosdi</p>
              <button
                onClick={() => window.location.href = `/my-speaking/${like.speaking_id}`}
                className="mt-2 text-blue-500 hover:underline"
              >
                View Speaking
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={offset === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={offset + limit >= totalLikes}
        >
          Next
        </button>
      </div>

      <p className="mt-4 text-center text-gray-700">
        Total Likes: {totalLikes}
      </p>
    </div>
  );
};

export default Likes;
