import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API, LoadingSpinner } from "../env";

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API}/user/detail/${id}`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        });
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <LoadingSpinner/>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Foydalanuvchi malumotlari</h2>
      <div className="space-y-2">
        <p><span className="font-semibold">Ism :</span> {user.firstName}</p>
        <p><span className="font-semibold">Familiya:</span> {user.lastName}</p>
        <p><span className="font-semibold">Umumiy likelar:</span> {user.totalLikeCount}</p>
        <br></br>
        <a
          className="px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          href={`/user-speaking/${user.userId}`}
        >
          Umumiy speakinglar: {user.totalSpeakingCount}
        </a>
        {user.image && (
          <div>
            <img
              src={user.image}
              alt="User"
              className="w-32 h-32 rounded-full object-cover mt-4"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetail;
