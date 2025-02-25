import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MemeDetails = () => {
  const { id } = useParams();
  const [meme, setMeme] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchMemeDetails = async () => {
      try {
        const response = await fetch('https://api.imgflip.com/get_memes');
        const data = await response.json();

        if (data.success) {
          const foundMeme = data.data.memes.find(m => m.id === id);
          setMeme(foundMeme || null);
        } else {
          setMeme(null);
        }
      } catch (error) {
        console.error('Error fetching meme data:', error);
        setMeme(null);
      }
    };

    fetchMemeDetails();

    setLikes(Number(localStorage.getItem(`meme_likes_${id}`)) || 0);
    setLiked(localStorage.getItem(`meme_liked_${id}`) === 'true');
    setComments(JSON.parse(localStorage.getItem(`meme_comments_${id}`)) || []);
  }, [id]);

  const handleLike = () => {
    if (!liked) {
      const updatedLikes = likes + 1;
      setLikes(updatedLikes);
      setLiked(true);
      localStorage.setItem(`meme_likes_${id}`, updatedLikes);
      localStorage.setItem(`meme_liked_${id}`, 'true');
    }
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      localStorage.setItem(`meme_comments_${id}`, JSON.stringify(updatedComments));
      setNewComment('');
    }
  };

  if (!meme) return <p className="text-red-500 text-center mt-5">Meme not found! 😢</p>;

  return (
    <div className="p-10 text-center">
      <h2 className="text-3xl font-bold">{meme.name}</h2>
      <div className="flex justify-center mt-4">
        <img src={meme.url} alt={meme.name} className="w-96 h-auto rounded-lg shadow-lg" />
      </div>
      <div className="mt-4">
        <motion.button 
          onClick={handleLike} 
          whileTap={{ scale: 1.2 }}
          className={`px-4 py-2 rounded ${liked ? 'bg-gray-500' : 'bg-blue-500'} text-white`}
          disabled={liked}
        >
          👍 {likes}
        </motion.button>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-bold">Comments</h3>
        <ul className="mt-2">
          {comments.map((comment, index) => (
            <li key={index} className="border p-2 my-2">{comment}</li>
          ))}
        </ul>
        <input 
          type="text" 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)} 
          placeholder="Add a comment..." 
          className="border p-2 mt-4 w-full"
        />
        <button onClick={handleCommentSubmit} className="bg-green-500 text-white px-4 py-2 rounded mt-2">
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default MemeDetails;
