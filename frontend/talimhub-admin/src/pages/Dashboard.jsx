import axios from "axios";
import { useEffect, useState } from "react";
import { API, LoadingSpinner } from "../env";

const Dashboard = () => {
  const [rating, setRating] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/public/users-rating`)
      .then((res) => {
        setRating(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response ? error.response.data.message : "Error fetching data");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center mt-10 px-4">

      {/* Loading State */}
      {loading && <LoadingSpinner />}

      {/* Error State */}
      {error && (
        <p className="text-red-500 mt-4">
          Xatolik yuz berdi: {error}
        </p>
      )}

      {/* Ratings List */}
      {!loading && !error && (
        <div className="mt-16 w-full max-w-3xl">
          <h2 className="text-2xl font-semibold mb-6 text-center">Foydalanuvchilar reytingi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rating.length === 0 ? (
              <p className="text-center col-span-full text-gray-500">Hozircha hech kim reytingga kiritilmagan.</p>
            ) : (
              rating.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
                >
                  <div>
                    <p className="text-xl font-bold text-gray-800">{index + 1}. {item.fullName}</p>
                    <p className="text-gray-600">{item.allLikes} likes</p>
                  </div>
                  <div className="bg-blue-500 text-white px-4 py-1 rounded-full">
                    #{index + 1}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
