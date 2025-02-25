import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext"; // Import Theme Context

const UserProfile = () => {
  const { darkMode } = useTheme(); // Use theme context
  const [user, setUser] = useState({
    name: "",
    bio: "",
    email: "",
    location: "",
    website: "",
    social: "",
    profilePic: "",
  });
  const [uploadedMemes, setUploadedMemes] = useState([]);
  const [likedMemes, setLikedMemes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // Load profile data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user_profile")) || {
      name: "Anonymous",
      bio: "No bio yet.",
      email: "",
      location: "",
      website: "",
      social: "",
      profilePic: "https://via.placeholder.com/150",
    };
    setUser(storedUser);

    const storedUploadedMemes = JSON.parse(localStorage.getItem("memes")) || [];
    setUploadedMemes(storedUploadedMemes);

    const storedLikedMemes =
      JSON.parse(localStorage.getItem("liked_memes")) || [];
    setLikedMemes(storedLikedMemes);
  }, []);

  // Handle input changes for user details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Handle profile image upload
  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUser((prevUser) => ({ ...prevUser, profilePic: reader.result }));
    };
  };

  // Save profile updates to localStorage
  const handleProfileUpdate = () => {
    localStorage.setItem("user_profile", JSON.stringify(user));
    setIsEditing(false);
  };

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-5 gap-6 p-6 min-h-screen transition-all duration-300 ${
      darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
    }`}>
    
      {/* Profile Section */}
      <div className={`col-span-1 lg:col-span-2 shadow-lg rounded-xl p-6 text-center flex flex-col items-center transition-all h-auto max-h-[500px] overflow-hidden ${
  darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
}`}>

        <h2 className="text-3xl font-bold">User Profile</h2>

        {/* Profile Picture */}
        <div className="mt-4">
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-44 h-44 rounded-full border-4 shadow-lg transition-all"
          />
          {isEditing && (
            <label className="block mt-3 cursor-pointer text-lg font-medium transition-all ${
              darkMode ? 'text-blue-400' : 'text-blue-500'
            }">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageUpload}
                className="hidden"
              />
              Upload Profile Picture
            </label>
          )}
        </div>

        {/* User Details */}
        <div className="mt-5 w-full px-4 lg:px-6">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className={`border p-3 mt-2 w-full rounded-lg text-xl font-semibold transition-all ${
                  darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"
                }`}
              />
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleInputChange}
                placeholder="Your Bio"
                className={`border p-3 mt-2 w-full rounded-lg text-lg font-medium transition-all ${
                  darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"
                }`}
                rows="2"
              />
            </>
          ) : (
            <>
              <h3 className="text-2xl font-bold mt-3">{user.name}</h3>
              <p className="text-gray-500 text-md mt-2">📧 {user.email || "No email provided"}</p>
              <p className="text-gray-500 text-md">📍 {user.location || "No location set"}</p>
            </>
          )}
        </div>

        {/* Edit and Save Button */}
        <div className="mt-6">
          {isEditing ? (
            <button
              onClick={handleProfileUpdate}
              className={`px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition ${
                darkMode ? "bg-green-700 text-white hover:bg-green-600" : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              Save Profile
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className={`px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition ${
                darkMode ? "bg-blue-700 text-white hover:bg-blue-600" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Uploaded & Liked Memes Section */}
      <div className="col-span-1 lg:col-span-3 space-y-6 ">
        {/* Uploaded Memes */}
        <div className={`shadow-lg rounded-lg p-6 text-center transition ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}>
          <h3 className="text-xl font-bold">Uploaded Memes</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
            {uploadedMemes.length ? (
              uploadedMemes.map((meme, index) => (
                <img
                  key={index}
                  src={meme.image}
                  alt="Uploaded Meme"
                  className="w-full h-36 object-cover rounded-md border"
                />
              ))
            ) : (
              <p className="text-gray-500 text-lg">No uploaded memes.</p>
            )}
          </div>
        </div>

        {/* Liked Memes */}
        <div className={`shadow-lg rounded-lg p-6 text-center transition ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}>
          <h3 className="text-xl font-bold">Liked Memes</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 ">
            {likedMemes.length ? (
              likedMemes.map((meme, index) => (
                <img
                  key={index}
                  src={meme.image}
                  alt="Liked Meme"
                  className="w-full h-36 object-cover rounded-md border"
                />
              ))
            ) : (
              <p className="text-gray-500 text-lg ">No liked memes.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
