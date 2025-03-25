import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X } from 'lucide-react';

const COLORS = [
  { value: 'bg-purple-100', label: 'Purple' },
  { value: 'bg-blue-100', label: 'Blue' },
  { value: 'bg-green-100', label: 'Green' },
  { value: 'bg-yellow-100', label: 'Yellow' },
  { value: 'bg-red-100', label: 'Red' },
];

const CATEGORIES = ['Personal', 'Work', 'Ideas', 'Tasks', 'General'];

export default function NewNotePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General',
    color: 'bg-purple-100',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedNotes = localStorage.getItem('notes');
    const notes = savedNotes ? JSON.parse(savedNotes) : [];

    const newNote = {
      ...formData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    notes.unshift(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Create New Note</h1>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <X className="h-5 w-5 mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              <Save className="h-5 w-5 mr-2" />
              Save Note
            </button>
          </div>
        </div>

        <div className={`p-6 rounded-lg ${formData.color}`}>
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note Color
              </label>
              <div className="flex space-x-4">
                {COLORS.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: value })}
                    className={`w-8 h-8 rounded-full ${value} ${
                      formData.color === value ? 'ring-2 ring-offset-2 ring-purple-500' : ''
                    }`}
                    title={label}
                  />
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                id="content"
                rows={8}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}