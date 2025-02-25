import { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [topMemes, setTopMemes] = useState([]);
  const [userRankings, setUserRankings] = useState([]);

  useEffect(() => {
    const storedLikedMemes = JSON.parse(localStorage.getItem('liked_memes')) || [];
    const storedUsers = JSON.parse(localStorage.getItem('user_profiles')) || [];

    const memeLikesMap = {};
    storedLikedMemes.forEach((meme) => {
      memeLikesMap[meme] = (memeLikesMap[meme] || 0) + 1;
    });

    const sortedMemes = Object.entries(memeLikesMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([meme, likes]) => ({ meme, likes }));

    setTopMemes(sortedMemes);

    const userEngagementMap = {};
    storedUsers.forEach((user) => {
      userEngagementMap[user.name] = (userEngagementMap[user.name] || 0) + user.uploadedMemes.length + user.likedMemes.length;
    });

    const sortedUsers = Object.entries(userEngagementMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([user, engagement]) => ({ user, engagement }));

    setUserRankings(sortedUsers);
  }, []);

  return (
    <div className="p-10 text-center">
      <h2 className="text-3xl font-bold">Leaderboard</h2>
      <div className="mt-6">
        <h3 className="text-xl font-bold">Top 10 Most Liked Memes</h3>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {topMemes.length ? topMemes.map((meme, index) => (
            <div key={index} className="border p-2 rounded">
              <img src={meme.meme} alt="Top Meme" className="w-32 h-auto rounded" />
              <p className="font-bold">👍 {meme.likes} Likes</p>
            </div>
          )) : <p>No top memes yet.</p>}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-bold">Top Users Based on Engagement</h3>
        <ul className="mt-2">
          {userRankings.length ? userRankings.map((user, index) => (
            <li key={index} className="border p-2 my-2 font-bold">{index + 1}. {user.user} - {user.engagement} Points</li>
          )) : <p>No user rankings yet.</p>}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;
