import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const HomePage = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    setTimeout(() => {
      axios.get('https://api.imgflip.com/get_memes')
        .then(response => {
          setMemes(response.data.data.memes);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    }, 1000);
  }, []);

  return (
    <div className={`p-10 text-center min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {loading ? (
        <div className="mt-6 text-xl font-semibold h-[50vh] flex items-center justify-center">Loading memes...</div>
      ) : (
        <>
          <h1 className="text-4xl font-bold">Welcome to MemeVerse</h1>
          <p className="mt-4">Explore trending memes and have fun!</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {memes.slice(0, 9).map(meme => (
              <motion.div 
                key={meme.id} 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="p-4 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/meme/${meme.id}`)} // Navigate on click
              >
                <img src={meme.url} alt={meme.name} className="w-full h-64 object-cover rounded-lg" />
                <p className="mt-2 font-semibold">{meme.name}</p>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
