import { useState } from 'react';

const UserForm = ({
  user = null,
  onSave,
}: {
  user: any;
  onSave: () => void;
}) => {
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState(user?.role || 'worker');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { username, email, role };
    try {
      const requestOptions: RequestInit = {
        method: user ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      };

      const url = user ? `/api/users/${user.id}` : '/api/users';
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error('Failed to save user');
      }

      onSave(); // Callback to update the parent component
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="worker">Worker</option>
        <option value="outletAdmin">Outlet Admin</option>
        <option value="driver">Driver</option>
      </select>
      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
