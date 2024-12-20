import React, { useState, useEffect } from 'react';

interface LaundryItemFormProps {
  onSave: (item: { name: string; description: string; price: number }) => void;
  initialData?: {
    id: number;
    name: string;
    description: string;
    price: number;
  }; // Untuk edit
}

const LaundryItemForm: React.FC<LaundryItemFormProps> = ({
  onSave,
  initialData,
}) => {
  const [name, setName] = useState<string>(initialData?.name || '');
  const [price, setPrice] = useState<number>(initialData?.price || 0);
  const [description, setDescription] = useState<string>(
    initialData?.description || '',
  );

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
      setDescription(initialData.description);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, price, description });
    setName(''); // Reset form
    setPrice(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-700"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-700"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-700"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        {initialData ? 'Save Changes' : 'Add Item'}
      </button>
    </form>
  );
};

export default LaundryItemForm;
