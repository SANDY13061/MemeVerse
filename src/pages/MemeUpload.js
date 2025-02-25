import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext"; // Import Theme Context

const MemeUpload = () => {
  const { darkMode } = useTheme(); // Use theme context
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedMemes, setSavedMemes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load saved memes from localStorage
  useEffect(() => {
    const storedMemes = JSON.parse(localStorage.getItem("memes")) || [];
    setSavedMemes(storedMemes);
  }, []);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const generateAICaption = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.memegen.link/templates/success");
      const data = await response.json();
      setCaption(data.example_text || "Generated caption here!");
    } catch (error) {
      console.error("Error fetching AI caption:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveMemeToLocal = () => {
    if (!file || !caption) return alert("Please upload an image and enter a caption.");

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const memeData = { image: reader.result, caption };
      const updatedMemes = [memeData, ...savedMemes].slice(0, 5);

      localStorage.setItem("memes", JSON.stringify(updatedMemes));
      setSavedMemes(updatedMemes);
      setFile(null);
      setPreview(null);
      setCaption("");
      alert("Meme saved successfully!");
    };
  };

  // Navigate to the previous meme
  const prevMeme = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? savedMemes.length - 1 : prevIndex - 1));
  };

  // Navigate to the next meme
  const nextMeme = () => {
    setCurrentIndex((prevIndex) => (prevIndex === savedMemes.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className={`flex flex-col items-center min-h-screen p-4 transition-all duration-300 ${
      darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
    }`}>
      <div className={`w-full max-w-lg shadow-lg rounded-2xl p-6 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}>
        <h2 className="text-2xl font-semibold text-center">Upload Your Meme</h2>
        <label className="flex flex-col items-center cursor-pointer w-full mt-4">
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          <div className={`w-40 h-40 flex items-center justify-center rounded-lg border ${
            darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-200 border-gray-300"
          }`}>
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <span className="text-gray-500">Upload Image</span>
            )}
          </div>
        </label>
        <textarea
          value={caption}
          onChange={handleCaptionChange}
          placeholder="Add a funny caption"
          className={`border p-2 w-full mt-3 rounded-md ${
            darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"
          }`}
        />
        <div className="flex gap-4 mt-3">
          <button
            onClick={generateAICaption}
            className={`px-4 py-2 rounded-md ${
              darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
            } text-white transition`}
          >
            {loading ? "Generating..." : "AI Caption"}
          </button>
          <button
            onClick={saveMemeToLocal}
            className={`px-4 py-2 rounded-md ${
              darkMode ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"
            } text-white transition`}
          >
            Save Meme
          </button>
        </div>
      </div>

      {/* Display latest saved memes with navigation */}
      <div className="w-full max-w-lg mt-6">
        <h3 className="text-xl font-semibold text-center">Latest Memes</h3>
        {savedMemes.length > 0 ? (
          <div className="relative flex items-center justify-center mt-4">
            <button
              onClick={prevMeme}
              className={`absolute left-0 p-2 rounded-full shadow-md transition ${
                darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              ◀
            </button>
            <div className={`flex flex-col items-center border rounded-md p-4 shadow-md ${
              darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-300"
            }`}>
              <img src={savedMemes[currentIndex].image} alt="Saved Meme" className="w-64 h-64 object-cover rounded-md" />
              <p className="mt-2 text-center text-sm font-semibold">{savedMemes[currentIndex].caption}</p>
            </div>
            <button
              onClick={nextMeme}
              className={`absolute right-0 p-2 rounded-full shadow-md transition ${
                darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              ▶
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No uploaded memes.</p>
        )}
      </div>
    </div>
  );
};

export default MemeUpload;
