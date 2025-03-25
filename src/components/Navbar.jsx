import { BookText, PlusCircle, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-white text-purple-600' : 'text-gray-600 hover:bg-white/50';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookText className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">NotesHub</span>
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/')}`}
            >
              <Home className="h-5 w-5 mr-1" />
              Home
            </Link>
            
            <Link
              to="/new"
              className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/new')}`}
            >
              <PlusCircle className="h-5 w-5 mr-1" />
              New Note
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}