import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Plus, Edit, Trash2, BookOpen, Target } from 'lucide-react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserSkills();
    fetchStats();
  }, []);

  const fetchUserSkills = async () => {
    try {
      const response = await axios.get('/api/skills/my');
      setSkills(response.data.skills);
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/skills/categories/stats');
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const deleteSkill = async (skillId) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await axios.delete(`/api/skills/${skillId}`);
        setSkills(skills.filter(skill => skill._id !== skillId));
        toast.success('Skill deleted successfully');
      } catch (error) {
        console.error('Error deleting skill:', error);
        toast.error('Failed to delete skill');
      }
    }
  };

  const skillsOffered = skills.filter(skill => skill.type === 'offered');
  const skillsWanted = skills.filter(skill => skill.type === 'wanted');

  if (loading) {
    return (
      <div className="container mt-6">
        <div className="flex justify-center">
          <div className="loading" style={{ width: '40px', height: '40px' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Manage your skills and discover new learning opportunities.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card text-center">
          <h3 className="text-lg font-semibold text-blue-600">Skills Offered</h3>
          <p className="text-2xl font-bold">{skillsOffered.length}</p>
        </div>
        <div className="card text-center">
          <h3 className="text-lg font-semibold text-green-600">Skills Wanted</h3>
          <p className="text-2xl font-bold">{skillsWanted.length}</p>
        </div>
        <div className="card text-center">
          <h3 className="text-lg font-semibold text-purple-600">Profile Rating</h3>
          <p className="text-2xl font-bold">{user?.rating?.toFixed(1) || '0.0'} ⭐</p>
        </div>
      </div>

      {/* Skills Offered Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <BookOpen className="mr-2" size={20} />
            Skills I Offer
          </h2>
          <a href="/skills/add?type=offered" className="btn btn-primary">
            <Plus size={16} className="mr-1" />
            Add Skill
          </a>
        </div>
        
        {skillsOffered.length === 0 ? (
          <div className="card text-center text-gray-500">
            <p>No skills offered yet. Add your first skill to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillsOffered.map((skill) => (
              <div key={skill._id} className="card">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{skill.name}</h3>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => window.location.href = `/skills/edit/${skill._id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => deleteSkill(skill._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="mb-2">
                  <span className="skill-tag offered">{skill.category}</span>
                  <span className="skill-tag">{skill.level}</span>
                </div>
                {skill.description && (
                  <p className="text-gray-600 text-sm">{skill.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Skills Wanted Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Target className="mr-2" size={20} />
            Skills I Want to Learn
          </h2>
          <a href="/skills/add?type=wanted" className="btn btn-secondary">
            <Plus size={16} className="mr-1" />
            Add Skill
          </a>
        </div>
        
        {skillsWanted.length === 0 ? (
          <div className="card text-center text-gray-500">
            <p>No learning goals yet. Add skills you want to learn!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillsWanted.map((skill) => (
              <div key={skill._id} className="card">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{skill.name}</h3>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => window.location.href = `/skills/edit/${skill._id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => deleteSkill(skill._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="mb-2">
                  <span className="skill-tag wanted">{skill.category}</span>
                </div>
                {skill.description && (
                  <p className="text-gray-600 text-sm">{skill.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Community Stats */}
      {stats && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Community Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.slice(0, 6).map((stat) => (
              <div key={stat._id} className="text-center p-4 bg-gray-50 rounded">
                <h3 className="font-semibold text-gray-700">{stat._id}</h3>
                <p className="text-sm text-gray-600">
                  {stat.offered} offered • {stat.wanted} wanted
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;