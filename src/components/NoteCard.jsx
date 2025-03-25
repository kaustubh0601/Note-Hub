import { format } from 'date-fns';
import { Link } from 'react-router-dom';



export default function NoteCard({ note }) {
  return (
    <Link
      to={`/note/${note.id}`}
      className={`block p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow ${note.color} cursor-pointer`}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{note.title}</h3>
        <span className="px-2 py-1 bg-white/30 rounded text-sm">{note.category}</span>
      </div>
      <p className="text-gray-700 mb-4 line-clamp-3">{note.content}</p>
      <div className="text-sm text-gray-600">
        {format(new Date(note.createdAt), 'MMM d, yyyy')}
      </div>
    </Link>
  );
}