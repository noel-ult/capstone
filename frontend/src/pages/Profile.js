import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Save, User, MapPin, Star } from 'lucide-react';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    avatar: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        location: user.location || '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (formData.bio.length > 500) {
      newErrors.bio = 'Bio cannot be more than 500 characters';
    }
    
    if (formData.location.length > 100) {
      newErrors.location = 'Location cannot be more than 100 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const result = await updateProfile(formData);
      
      if (result.success) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error(result.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('An error occurred while updating profile');
    } finally {
      setLoading(false);
    }
  };

  const skillsOffered = user?.skillsOffered || [];
  const skillsWanted = user?.skillsWanted || [];

  return (
    <div className="container mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <User className="mr-2" />
              Profile Information
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.name && <span className="text-red-600 text-sm">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className={`form-textarea ${errors.bio ? 'border-red-500' : ''}`}
                  placeholder="Tell others about yourself, your interests, and what you're passionate about..."
                  rows="4"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {formData.bio.length}/500 characters
                </div>
                {errors.bio && <span className="text-red-600 text-sm">{errors.bio}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`form-input ${errors.location ? 'border-red-500' : ''}`}
                  placeholder="City, Country"
                />
                {errors.location && <span className="text-red-600 text-sm">{errors.location}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="avatar">Avatar URL (Optional)</label>
                <input
                  type="url"
                  id="avatar"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="https://example.com/your-avatar.jpg"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? (
                  <span className="flex items-center">
                    <span className="loading mr-2"></span>
                    Updating...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Save className="mr-2" size={16} />
                    Save Changes
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="text-center mb-4">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User size={32} className="text-gray-600" />
                </div>
              )}
              
              <h3 className="text-xl font-semibold">{user?.name}</h3>
              <p className="text-gray-600">{user?.email}</p>
              
              {user?.location && (
                <p className="text-gray-500 flex items-center justify-center mt-2">
                  <MapPin size={16} className="mr-1" />
                  {user.location}
                </p>
              )}
              
              <div className="flex items-center justify-center mt-2">
                <Star size={16} className="text-yellow-500 mr-1" />
                <span className="font-semibold">{user?.rating?.toFixed(1) || '0.0'}</span>
                <span className="text-gray-500 ml-1">({user?.reviewCount || 0} reviews)</span>
              </div>
            </div>

            {user?.bio && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">About</h4>
                <p className="text-gray-600 text-sm">{user.bio}</p>
              </div>
            )}

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Skills Offered ({skillsOffered.length})</h4>
              {skillsOffered.length === 0 ? (
                <p className="text-gray-500 text-sm">No skills offered yet</p>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {skillsOffered.slice(0, 5).map((skill, index) => (
                    <span key={index} className="skill-tag offered text-xs">
                      {skill.name}
                    </span>
                  ))}
                  {skillsOffered.length > 5 && (
                    <span className="skill-tag text-xs">+{skillsOffered.length - 5} more</span>
                  )}
                </div>
              )}
            </div>

            <div>
              <h4 className="font-semibold mb-2">Skills Wanted ({skillsWanted.length})</h4>
              {skillsWanted.length === 0 ? (
                <p className="text-gray-500 text-sm">No learning goals yet</p>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {skillsWanted.slice(0, 5).map((skill, index) => (
                    <span key={index} className="skill-tag wanted text-xs">
                      {skill.name}
                    </span>
                  ))}
                  {skillsWanted.length > 5 && (
                    <span className="skill-tag text-xs">+{skillsWanted.length - 5} more</span>
                  )}
                </div>
              )}
            </div>

            <div className="mt-4">
              <p className="text-gray-500 text-xs">
                Member since {new Date(user?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;