import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import debounce from 'lodash.debounce';

const MemeExplorer = () => {
  const [memes, setMemes] = useState([]);
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('Trending');
  const [sortBy, setSortBy] = useState('likes');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setTimeout(() => {
      axios.get('https://api.imgflip.com/get_memes')
        .then(response => {
          if (isMounted) {
            setMemes(response.data.data.memes.map(meme => ({
              ...meme,
              likes: Math.floor(Math.random() * 1000),
              comments: Math.floor(Math.random() * 500),
              date: new Date(Date.now() - Math.random() * 1e10).toISOString()
            })));
            setFilteredMemes(response.data.data.memes);
            setLoading(false);
          }
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    }, 1000);
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    let filtered = memes;
    if (category === 'Trending') {
      filtered = memes.filter(meme => meme.box_count > 2);
    } else if (category === 'New') {
      filtered = memes.slice(0, 10);
    } else if (category === 'Classic') {
      filtered = memes.filter(meme => meme.box_count === 2);
    } else if (category === 'Random') {
      filtered = [...memes].sort(() => Math.random() - 0.5).slice(0, 10);
    }
    setFilteredMemes(filtered);
  }, [category, memes]);

  useEffect(() => {
    let sorted = [...filteredMemes];
    if (sortBy === 'likes') {
      sorted.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === 'date') {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'comments') {
      sorted.sort((a, b) => b.comments - a.comments);
    }
    setFilteredMemes(sorted);
  }, [sortBy]);

  const handleSearch = useCallback(debounce((query) => {
    if (!query) {
      setFilteredMemes(memes);
      return;
    }
    setFilteredMemes(memes.filter(meme => meme.name.toLowerCase().includes(query.toLowerCase())));
  }, 300), [memes]);

  useEffect(() => {
    if(searchQuery){
    handleSearch(searchQuery);}
  }, [searchQuery, handleSearch]);

  const categories = ['Trending', 'New', 'Classic', 'Random'];

  return (
    <div className={`p-10 text-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-4xl font-bold">Meme Explorer</h1>
      {loading ? (
        <div className="mt-6 text-xl font-semibold h-[50vh] flex items-center justify-center">Loading memes...</div>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <input 
              type="text" 
              placeholder="Search memes..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="p-3 border border-gray-400 rounded-lg shadow-md focus:ring focus:ring-blue-300"
            />
            <select onChange={(e) => setSortBy(e.target.value)} className="p-3 border border-gray-400 rounded-lg shadow-md focus:ring focus:ring-blue-300">
              <option value="likes">Sort by Likes</option>
              <option value="date">Sort by Date</option>
              <option value="comments">Sort by Comments</option>
            </select>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setCategory(cat)}
                className={`px-6 py-3 rounded-lg shadow-md transition duration-300 ${category === cat ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {filteredMemes.slice(0, page * 9).map(meme => (
              <motion.div 
                key={meme.id} 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="p-4 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <img src={meme.url} alt={meme.name} className="w-full h-64 object-cover rounded-lg" />
                <p className="mt-2 font-semibold">{meme.name}</p>
                <p className="text-sm text-gray-500">Likes: {meme.likes} | Comments: {meme.comments}</p>
              </motion.div>
            ))}
          </div>
          <button onClick={() => setPage(page + 1)} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">Load More</button>
        </>
      )}
    </div>
  );
};

export default MemeExplorer;
