// components/ReviewForm.tsx
"use client";

import { useState } from 'react';

export default function ReviewForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
    serviceType: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Review submitted successfully!');
        setFormData({ name: '', email: '', rating: 5, comment: '', serviceType: '' });
      }
    } catch (error) {
      alert('Error submitting review');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Write a Review</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full p-3 border rounded-lg"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full p-3 border rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Service Type</label>
        <select
          value={formData.serviceType}
          onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
          className="w-full p-3 border rounded-lg"
        >
          <option value="">Select Service</option>
          <option value="kitchen">Kitchen Design</option>
          <option value="bathroom">Bathroom Renovation</option>
          <option value="living">Living Room</option>
          <option value="bedroom">Bedroom</option>
          <option value="full-home">Full Home Design</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Rating *</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData({...formData, rating: star})}
              className={`text-2xl ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ⭐
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Comment</label>
        <textarea
          value={formData.comment}
          onChange={(e) => setFormData({...formData, comment: e.target.value})}
          rows={4}
          className="w-full p-3 border rounded-lg"
          placeholder="Tell us about your experience..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
      >
        Submit Review
      </button>
    </form>
  );
}
