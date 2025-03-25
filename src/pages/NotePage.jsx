import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export default function NotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      const notes = JSON.parse(savedNotes);
      const foundNote = notes.find((n) => n.id === id);
      if (foundNote) {
        setNote(foundNote);
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  const handleDelete = () => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      const notes = JSON.parse(savedNotes);
      const updatedNotes = notes.filter((n) => n.id !== id);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }
    navigate('/');
  };

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Notes
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-5 w-5 mr-2" />
          Delete Note
        </button>
      </div>

      <div className={`${note.color} p-8 rounded-lg shadow-lg`}>
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{note.title}</h1>
          <span className="px-3 py-1 bg-white/30 rounded-full text-sm font-medium">
            {note.category}
          </span>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
        </div>

        <div className="mt-8 text-sm text-gray-600">
          Created on {format(new Date(note.createdAt), 'MMMM d, yyyy')}
        </div>
      </div>
    </div>
  );
}