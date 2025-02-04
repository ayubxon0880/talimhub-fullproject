import axios from "axios";
import { useEffect, useState } from "react";
import { API, LoadingSpinner } from "../env";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ firstname: "", lastname: "", oldPassword: "", password: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/user/me`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(res.data);
        setFormData({ firstname: res.data.firstname, lastname: res.data.lastname, oldPassword: "", password: "" });
      } catch (error) {
        setError(error.response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (formData.firstname === user.firstname && formData.lastname === user.lastname && formData.oldPassword === "" && formData.password === "") {
      return;
    }
    setLoading(true);
    axios
      .put(`${API}/user/update`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        setLoading(false);

        if (res.status === 200) {
          alert("Ism, familiya o'zgardi");
        } else if (res.status === 201) {
          alert("Ism, familiya va parol o'zgardi");
        }
      })
      .catch((error) => {
        setError(error.response.data);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      {loading ? (
        <LoadingSpinner />
      ) : user && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
          {/* <a href="/likes" className="text-blue-500 hover:text-blue-700 font-medium mb-4 inline-block">
            My Likes
          </a> */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <img
                src={"https://avatar.iran.liara.run/public"}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-left">Ism</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                className="border rounded p-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-left">Familiya</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                className="border rounded p-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-left">Eski Parol</label>
              <input
                type="text"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleInputChange}
                className="border rounded p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-left">Yangi parol</label>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="border rounded p-2"
              />
            </div>
            <p className="text-gray-600 mt-4">{user.role.name}</p>
            <p className="text-gray-600">{user.phone}</p>
            {user.email && <p className="text-gray-500">{user.email}</p>}

            <button
              type="submit"
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              {loading ? "Yangilanmoqda..." : "Yangilash"}
            </button>
          </form>
        </div>
      )}
      {error && (
        <p className="text-red-500 mt-4">
          Error: {error.message || "Unable to update user data."}
        </p>
      )}
    </div>
  );
};

export default Profile;
