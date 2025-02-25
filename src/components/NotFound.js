import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="p-10 text-center">
      <h2 className="text-3xl font-bold text-red-500">404 - Page Not Found</h2>
      <p className="mt-4">Oops! Looks like you got lost in meme space. Here's a meme for you:</p>
      <img 
        src="https://i.imgflip.com/30b1gx.jpg" 
        alt="Meme Not Found" 
        className="w-64 h-auto mx-auto mt-4 rounded-lg shadow-lg" 
      />
      <p className="mt-4">
        Click <Link to="/" className="text-blue-500 underline">here</Link> to go back home.
      </p>
    </div>
  );
};

export default NotFound;