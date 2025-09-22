// GPT Profiles Database Management
// This module handles CRUD operations for GPT profiles

import gptProfilesData from '../data/gptProfiles.json';

class GPTProfilesDB {
  constructor() {
    this.data = { ...gptProfilesData };
    this.localStorageKey = 'gptProfilesDB';
    this.loadFromLocalStorage();
  }

  // Load data from localStorage if available (for persistence in production)
  loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem(this.localStorageKey);
      if (stored) {
        this.data = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load GPT profiles from localStorage:', error);
      // Fallback to JSON data
      this.data = { ...gptProfilesData };
    }
  }

  // Save data to localStorage
  saveToLocalStorage() {
    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.data));
    } catch (error) {
      console.error('Failed to save GPT profiles to localStorage:', error);
    }
  }

  // Get all active profiles
  getAllProfiles() {
    return this.data.profiles.filter(profile => profile.isActive);
  }

  // Get profile by ID
  getProfileById(id) {
    return this.data.profiles.find(profile => profile.id === id && profile.isActive);
  }

  // Add new profile
  addProfile(profileData) {
    const newId = this.data.lastId + 1;
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

    this.data.profiles.push(newProfile);
    this.data.lastId = newId;
    this.data.lastUpdated = new Date().toISOString();
    this.saveToLocalStorage();

    return newProfile;
  }

  // Update existing profile
  updateProfile(id, updates) {
    const profileIndex = this.data.profiles.findIndex(profile => profile.id === id);
    
    if (profileIndex === -1) {
      throw new Error('Profile not found');
    }

    // Update profile with new data
    this.data.profiles[profileIndex] = {
      ...this.data.profiles[profileIndex],
      ...updates,
      id: id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };

    this.data.lastUpdated = new Date().toISOString();
    this.saveToLocalStorage();

    return this.data.profiles[profileIndex];
  }

  // Delete profile (soft delete - set isActive to false)
  deleteProfile(id) {
    const profileIndex = this.data.profiles.findIndex(profile => profile.id === id);
    
    if (profileIndex === -1) {
      throw new Error('Profile not found');
    }

    this.data.profiles[profileIndex].isActive = false;
    this.data.profiles[profileIndex].updatedAt = new Date().toISOString();
    this.data.lastUpdated = new Date().toISOString();
    this.saveToLocalStorage();

    return true;
  }

  // Permanently delete profile (hard delete)
  permanentlyDeleteProfile(id) {
    const profileIndex = this.data.profiles.findIndex(profile => profile.id === id);
    
    if (profileIndex === -1) {
      throw new Error('Profile not found');
    }

    this.data.profiles.splice(profileIndex, 1);
    this.data.lastUpdated = new Date().toISOString();
    this.saveToLocalStorage();

    return true;
  }

  // Restore deleted profile
  restoreProfile(id) {
    const profileIndex = this.data.profiles.findIndex(profile => profile.id === id);
    
    if (profileIndex === -1) {
      throw new Error('Profile not found');
    }

    this.data.profiles[profileIndex].isActive = true;
    this.data.profiles[profileIndex].updatedAt = new Date().toISOString();
    this.data.lastUpdated = new Date().toISOString();
    this.saveToLocalStorage();

    return this.data.profiles[profileIndex];
  }

  // Get database statistics
  getStats() {
    const totalProfiles = this.data.profiles.length;
    const activeProfiles = this.data.profiles.filter(p => p.isActive).length;
    const deletedProfiles = totalProfiles - activeProfiles;

    return {
      total: totalProfiles,
      active: activeProfiles,
      deleted: deletedProfiles,
      lastUpdated: this.data.lastUpdated,
      version: this.data.version
    };
  }

  // Reset database to initial state
  reset() {
    this.data = { ...gptProfilesData };
    this.saveToLocalStorage();
  }

  // Export all data (for backup)
  exportData() {
    return JSON.stringify(this.data, null, 2);
  }

  // Import data (for restore)
  importData(jsonData) {
    try {
      const importedData = JSON.parse(jsonData);
      
      // Validate structure
      if (!importedData.profiles || !Array.isArray(importedData.profiles)) {
        throw new Error('Invalid data structure');
      }

      this.data = importedData;
      this.saveToLocalStorage();
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }
}

// Create singleton instance
const gptProfilesDB = new GPTProfilesDB();

export default gptProfilesDB;

// Export individual functions for convenience
export const {
  getAllProfiles,
  getProfileById,
  addProfile,
  updateProfile,
  deleteProfile,
  permanentlyDeleteProfile,
  restoreProfile,
  getStats,
  reset,
  exportData,
  importData
} = gptProfilesDB;