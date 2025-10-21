import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search as SearchIcon, Filter, User, MapPin, Star, MessageCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('offered');
  const [results, setResults] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('skills');
  const [stats, setStats] = useState(null);

  const categories = [
    'Programming', 'Design', 'Music', 'Language', 'Sports', 
    'Cooking', 'Art', 'Business', 'Other'
  ];

  useEffect(() => {
    fetchStats();
    // Load initial results
    if (searchQuery || selectedCategory) {
      handleSearch();
    }
  }, [selectedCategory, selectedType]);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/skills/categories/stats');
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim() && !selectedCategory) {
      toast.warning('Please enter a search term or select a category');
      return;
    }

    setLoading(true);
    
    try {
      if (activeTab === 'skills') {
        // Search skills
        const params = {
          excludeOwner: 'true',
          type: selectedType
        };
        
        if (searchQuery.trim()) params.q = searchQuery;
        if (selectedCategory) params.category = selectedCategory;

        const response = await axios.get('/api/skills/search', { params });
        setResults(response.data.skills);
      } else {
        // Search users
        const params = {};
        if (searchQuery.trim()) params.q = searchQuery;
        if (selectedCategory) params.category = selectedCategory;

        const response = await axios.get('/api/users/search', { params });
        setUserResults(response.data.users);
      }
    } catch (error) {
      console.error('Error searching:', error);
      toast.error('Failed to search. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setResults([]);
    setUserResults([]);
  };

  const SkillCard = ({ skill }) => (
    <div className="card">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">{skill.name}</h3>
          <div className="flex items-center text-gray-600 text-sm mt-1">
            <User size={14} className="mr-1" />
            <span>{skill.owner.name}</span>
            {skill.owner.location && (
              <>
                <MapPin size={14} className="ml-3 mr-1" />
                <span>{skill.owner.location}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <Star size={14} className="text-yellow-500 mr-1" />
          <span className="text-sm">{skill.owner.rating?.toFixed(1) || '0.0'}</span>
        </div>
      </div>
      
      <div className="mb-3">
        <span className={`skill-tag ${skill.type}`}>{skill.category}</span>
        {skill.type === 'offered' && (
          <span className="skill-tag">{skill.level}</span>
        )}
        {skill.tags && skill.tags.map((tag, index) => (
          <span key={index} className="skill-tag text-xs">{tag}</span>
        ))}
      </div>
      
      {skill.description && (
        <p className="text-gray-600 text-sm mb-3">{skill.description}</p>
      )}
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Added {new Date(skill.createdAt).toLocaleDateString()}
        </span>
        <button 
          className="btn btn-primary btn-sm"
          onClick={() => window.location.href = `/users/${skill.owner._id}`}
        >
          <MessageCircle size={14} className="mr-1" />
          Contact
        </button>
      </div>
    </div>
  );

  const UserCard = ({ user }) => (
    <div className="card">
      <div className="flex items-start mb-3">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full mr-3"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
            <User size={20} className="text-gray-600" />
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{user.name}</h3>
          {user.location && (
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin size={14} className="mr-1" />
              <span>{user.location}</span>
            </div>
          )}
          <div className="flex items-center mt-1">
            <Star size={14} className="text-yellow-500 mr-1" />
            <span className="text-sm">{user.rating?.toFixed(1) || '0.0'}</span>
            <span className="text-gray-500 text-sm ml-1">({user.reviewCount || 0} reviews)</span>
          </div>
        </div>
      </div>
      
      {user.bio && (
        <p className="text-gray-600 text-sm mb-3">{user.bio}</p>
      )}
      
      <div className="mb-3">
        <div className="mb-2">
          <span className="text-sm font-semibold text-green-600">Skills Offered:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {user.skillsOffered.slice(0, 3).map((skill, index) => (
              <span key={index} className="skill-tag offered text-xs">
                {skill.name}
              </span>
            ))}
            {user.skillsOffered.length > 3 && (
              <span className="skill-tag text-xs">+{user.skillsOffered.length - 3} more</span>
            )}
          </div>
        </div>
        
        {user.skillsWanted.length > 0 && (
          <div>
            <span className="text-sm font-semibold text-purple-600">Wants to Learn:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {user.skillsWanted.slice(0, 3).map((skill, index) => (
                <span key={index} className="skill-tag wanted text-xs">
                  {skill.name}
                </span>
              ))}
              {user.skillsWanted.length > 3 && (
                <span className="skill-tag text-xs">+{user.skillsWanted.length - 3} more</span>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Member since {new Date(user.createdAt).toLocaleDateString()}
        </span>
        <button 
          className="btn btn-primary btn-sm"
          onClick={() => window.location.href = `/users/${user._id}`}
        >
          <MessageCircle size={14} className="mr-1" />
          Contact
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mt-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Discover Skills & People</h1>
        
        {/* Search Controls */}
        <div className="card">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="form-input pl-10"
                  placeholder="Search for skills, people, or keywords..."
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-select"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <button
                onClick={handleSearch}
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? <span className="loading"></span> : <SearchIcon size={16} />}
              </button>
              
              <button
                onClick={clearFilters}
                className="btn btn-outline"
              >
                Clear
              </button>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setActiveTab('skills')}
              className={`btn ${activeTab === 'skills' ? 'btn-primary' : 'btn-outline'}`}
            >
              Search Skills
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-outline'}`}
            >
              Search People
            </button>
          </div>
          
          {/* Skill Type Filter (only for skills tab) */}
          {activeTab === 'skills' && (
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedType('offered')}
                className={`btn ${selectedType === 'offered' ? 'btn-success' : 'btn-outline'}`}
              >
                Skills Offered
              </button>
              <button
                onClick={() => setSelectedType('wanted')}
                className={`btn ${selectedType === 'wanted' ? 'btn-secondary' : 'btn-outline'}`}
              >
                Skills Wanted
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Results */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="loading" style={{ width: '40px', height: '40px' }}></div>
            </div>
          ) : (
            <>
              {activeTab === 'skills' ? (
                <>
                  {results.length > 0 ? (
                    <>
                      <h2 className="text-xl font-semibold mb-4">
                        Found {results.length} {selectedType} skill{results.length !== 1 ? 's' : ''}
                      </h2>
                      <div className="grid gap-4">
                        {results.map((skill) => (
                          <SkillCard key={skill._id} skill={skill} />
                        ))}
                      </div>
                    </>
                  ) : (
                    (searchQuery || selectedCategory) && (
                      <div className="card text-center text-gray-500">
                        <p>No skills found. Try adjusting your search criteria.</p>
                      </div>
                    )
                  )}
                </>
              ) : (
                <>
                  {userResults.length > 0 ? (
                    <>
                      <h2 className="text-xl font-semibold mb-4">
                        Found {userResults.length} member{userResults.length !== 1 ? 's' : ''}
                      </h2>
                      <div className="grid gap-4">
                        {userResults.map((user) => (
                          <UserCard key={user._id} user={user} />
                        ))}
                      </div>
                    </>
                  ) : (
                    (searchQuery || selectedCategory) && (
                      <div className="card text-center text-gray-500">
                        <p>No users found. Try adjusting your search criteria.</p>
                      </div>
                    )
                  )}
                </>
              )}
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {stats && (
            <div className="card">
              <h3 className="font-semibold mb-4">Popular Categories</h3>
              <div className="space-y-3">
                {stats.slice(0, 8).map((stat) => (
                  <div 
                    key={stat._id} 
                    className="cursor-pointer hover:bg-gray-50 p-2 rounded"
                    onClick={() => {
                      setSelectedCategory(stat._id);
                      setSearchQuery('');
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{stat._id}</span>
                      <span className="text-xs text-gray-500">{stat.total}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {stat.offered} offered • {stat.wanted} wanted
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="card">
            <h3 className="font-semibold mb-4">Search Tips</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Use specific skill names for better results</li>
              <li>• Browse by category to discover new skills</li>
              <li>• Switch between "Skills" and "People" tabs</li>
              <li>• Filter by "Offered" or "Wanted" skills</li>
              <li>• Contact members to start learning exchanges</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;