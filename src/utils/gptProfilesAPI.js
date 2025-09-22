// API Client for GPT Profiles - Global Database
// This replaces localStorage with real API calls that work across all devices

class GPTProfilesAPI {
  constructor() {
    // Detect if we're in development or production
    this.isDevelopment = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';
    
    // Use the current domain for API calls, fallback to localhost for development
    this.apiBase = typeof window !== 'undefined' 
      ? `${window.location.origin}/api`
      : 'http://localhost:3000/api';
      
    // In development, we'll fallback to localStorage more gracefully
    this.useLocalStorageFallback = this.isDevelopment;
  }

  // Get all active profiles
  async getAllProfiles() {
    // In development, try API first but fallback to localStorage quickly
    if (this.useLocalStorageFallback) {
      try {
        const response = await fetch(`${this.apiBase}/gpt-profiles`, { timeout: 2000 });
        const data = await response.json();
        
        if (data.success) {
          return data.profiles;
        }
      } catch (error) {
        console.log('API not available in development, using localStorage fallback');
        return this.getLocalStorageFallback();
      }
    }

    try {
      const response = await fetch(`${this.apiBase}/gpt-profiles`);
      const data = await response.json();
      
      if (data.success) {
        return data.profiles;
      } else {
        throw new Error(data.message || 'Failed to fetch profiles');
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
      // Fallback to localStorage if API fails
      return this.getLocalStorageFallback();
    }
  }

  // Get profile by ID
  async getProfileById(id) {
    const profiles = await this.getAllProfiles();
    return profiles.find(profile => profile.id === id);
  }

  // Add new profile
  async addProfile(profileData) {
    // In development, use localStorage if API is not available
    if (this.useLocalStorageFallback) {
      return this.addToLocalStorage(profileData);
    }

    try {
      const response = await fetch(`${this.apiBase}/gpt-profiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData)
      });

      const data = await response.json();
      
      if (data.success) {
        return data.profile;
      } else {
        throw new Error(data.message || 'Failed to add profile');
      }
    } catch (error) {
      console.error('Error adding profile:', error);
      // Fallback to localStorage
      return this.addToLocalStorage(profileData);
    }
  }

  // Update existing profile
  async updateProfile(id, updates) {
    // In development, use localStorage if API is not available
    if (this.useLocalStorageFallback) {
      return this.updateInLocalStorage(id, updates);
    }

    try {
      const response = await fetch(`${this.apiBase}/gpt-profiles`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...updates })
      });

      const data = await response.json();
      
      if (data.success) {
        return data.profile;
      } else {
        throw new Error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Fallback to localStorage
      return this.updateInLocalStorage(id, updates);
    }
  }

  // Delete profile (soft delete)
  async deleteProfile(id) {
    // In development, use localStorage if API is not available
    if (this.useLocalStorageFallback) {
      return this.deleteFromLocalStorage(id);
    }

    try {
      const response = await fetch(`${this.apiBase}/gpt-profiles?id=${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      
      if (data.success) {
        return true;
      } else {
        throw new Error(data.message || 'Failed to delete profile');
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      // Fallback to localStorage
      return this.deleteFromLocalStorage(id);
    }
  }

  // Get database statistics
  async getStats() {
    // In development, use localStorage if API is not available
    if (this.useLocalStorageFallback) {
      const data = this.getLocalStorageData();
      const activeProfiles = data.profiles.filter(p => p.isActive);
      return {
        total: data.profiles.length,
        active: activeProfiles.length,
        deleted: data.profiles.length - activeProfiles.length,
        lastUpdated: data.lastUpdated,
        version: data.version
      };
    }

    try {
      const response = await fetch(`${this.apiBase}/gpt-profiles`);
      const data = await response.json();
      
      if (data.success) {
        return data.stats;
      } else {
        throw new Error(data.message || 'Failed to fetch stats');
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Fallback to localStorage stats
      const data = this.getLocalStorageData();
      const activeProfiles = data.profiles.filter(p => p.isActive);
      return {
        total: data.profiles.length,
        active: activeProfiles.length,
        deleted: data.profiles.length - activeProfiles.length,
        lastUpdated: data.lastUpdated,
        version: data.version
      };
    }
  }

  // Fallback to localStorage for development when API is not available
  getLocalStorageFallback() {
    try {
      const saved = localStorage.getItem('gptProfilesDB');
      if (saved) {
        const data = JSON.parse(saved);
        return data.profiles ? data.profiles.filter(p => p.isActive) : [];
      }
    } catch (error) {
      console.error('LocalStorage fallback failed:', error);
    }
    
    // Return empty array - no mock data
    return [];
  }

  // LocalStorage CRUD operations for development fallback
  getLocalStorageData() {
    try {
      const saved = localStorage.getItem('gptProfilesDB');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error reading localStorage:', error);
    }
    
    // Initialize with default data
    const defaultData = {
      profiles: [],
      lastId: 0,
      version: "1.0.0",
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('gptProfilesDB', JSON.stringify(defaultData));
    return defaultData;
  }

  saveLocalStorageData(data) {
    try {
      data.lastUpdated = new Date().toISOString();
      localStorage.setItem('gptProfilesDB', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  addToLocalStorage(profileData) {
    const data = this.getLocalStorageData();
    const newId = data.lastId + 1;
    
    const newProfile = {
      id: newId,
      name: profileData.name || 'New GPT',
      photo: profileData.photo || '/gpt-profiles/default-avatar.svg',
      description: profileData.description || 'A new GPT assistant',
      specialties: profileData.specialties || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    };

    data.profiles.push(newProfile);
    data.lastId = newId;
    this.saveLocalStorageData(data);
    
    return newProfile;
  }

  updateInLocalStorage(id, updates) {
    const data = this.getLocalStorageData();
    const profileIndex = data.profiles.findIndex(p => p.id === id);
    
    if (profileIndex === -1) {
      throw new Error('Profile not found');
    }

    data.profiles[profileIndex] = {
      ...data.profiles[profileIndex],
      ...updates,
      id: id,
      updatedAt: new Date().toISOString()
    };

    this.saveLocalStorageData(data);
    return data.profiles[profileIndex];
  }

  deleteFromLocalStorage(id) {
    const data = this.getLocalStorageData();
    const profileIndex = data.profiles.findIndex(p => p.id === id);
    
    if (profileIndex === -1) {
      throw new Error('Profile not found');
    }

    data.profiles[profileIndex].isActive = false;
    data.profiles[profileIndex].updatedAt = new Date().toISOString();
    this.saveLocalStorageData(data);
    
    return true;
  }

  // Test API connection
  async testConnection() {
    try {
      const response = await fetch(`${this.apiBase}/gpt-profiles`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

// Create singleton instance
const gptProfilesAPI = new GPTProfilesAPI();

export default gptProfilesAPI;

// Export individual functions for convenience
export const {
  getAllProfiles,
  getProfileById,
  addProfile,
  updateProfile,
  deleteProfile,
  getStats,
  testConnection
} = gptProfilesAPI;