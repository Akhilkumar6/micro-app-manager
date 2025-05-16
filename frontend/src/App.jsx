// frontend/src/App.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://micro-app-manager.onrender.com';

function App() {
  const [apps, setApps] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', code: '' });

  const fetchApps = async () => {
    const res = await axios.get(`${BASE_URL}/apps`);
    setApps(res.data);
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${BASE_URL}/apps`, form);
    setForm({ name: '', description: '', code: '' });
    fetchApps();
  };

  const handleDeploy = async (id) => {
    await axios.put(`${BASE_URL}/apps/${id}/deploy`);
    fetchApps();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/apps/${id}`);
    fetchApps();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Micro App Manager</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input type="text" placeholder="App Name" className="w-full border p-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="text" placeholder="Description" className="w-full border p-2" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <textarea placeholder="Code Snippet" className="w-full border p-2" rows="4" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })}></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add App</button>
      </form>

      <div className="space-y-4">
        {apps.map(app => (
          <div key={app._id} className="p-4 border rounded">
            <h2 className="text-xl font-bold">{app.name}</h2>
            <p>{app.description}</p>
            <pre className="bg-gray-100 p-2">{app.code}</pre>
            <p>Status: <strong>{app.status}</strong></p>
            <button onClick={() => handleDeploy(app._id)} className="bg-green-500 text-white px-3 py-1 mr-2">Deploy</button>
            <button onClick={() => handleDelete(app._id)} className="bg-red-500 text-white px-3 py-1">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
