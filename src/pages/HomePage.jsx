import { useState, useEffect } from 'react';
import NoteCard from '../components/NoteCard';
import { Search } from 'lucide-react';

const INITIAL_NOTES = [
  {
    id: '1',
    title: 'Welcome to NotesHub!',
    content: 'This is your personal space for thoughts, ideas, and memories. Start creating your first note by clicking the "New Note" button above.',
    category: 'General',
    createdAt: new Date().toISOString(),
    color: 'bg-purple-100',
  },
  {
    id: '2',
    title: 'Meeting Notes - Project Kickoff',
    content: 'Discussed project timeline, key deliverables, and team responsibilities. Next steps: Set up development environment and create initial wireframes.',
    category: 'Work',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    color: 'bg-blue-100',
  },
];

export default function HomePage() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      setNotes(INITIAL_NOTES);
      localStorage.setItem('notes', JSON.stringify(INITIAL_NOTES));
    }
  }, []);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No notes found. Start by creating a new note!</p>
        </div>
      )}
    </div>
  );
}