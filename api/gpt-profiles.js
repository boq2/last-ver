// API endpoint for GPT profiles management
// This runs as a Vercel serverless function

import fs from 'fs';
import path from 'path';

// Path to the database file
const dbPath = path.join(process.cwd(), 'data', 'gpt-profiles-db.json');

// Initialize database if it doesn't exist
function initializeDB() {
  const defaultData = {
    profiles: [],
    lastId: 0,
    version: "1.0.0",
    lastUpdated: new Date().toISOString()
  };

  // Ensure data directory exists
  const dataDir = path.dirname(dbPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Create database file if it doesn't exist
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(defaultData, null, 2));
  }

  return defaultData;
}

// Read database
function readDB() {
  try {
    if (!fs.existsSync(dbPath)) {
      return initializeDB();
    }
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return initializeDB();
  }
}

// Write database
function writeDB(data) {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(dbPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing database:', error);
    return false;
  }
}

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const db = readDB();

    switch (req.method) {
      case 'GET':
        // Get all active profiles
        const activeProfiles = db.profiles.filter(profile => profile.isActive);
        res.status(200).json({
          success: true,
          profiles: activeProfiles,
          stats: {
            total: db.profiles.length,
            active: activeProfiles.length,
            deleted: db.profiles.length - activeProfiles.length,
            lastUpdated: db.lastUpdated,
            version: db.version
          }
        });
        break;

      case 'POST':
        // Add new profile
        const newProfileData = req.body;
        const newId = db.lastId + 1;
        
        const newProfile = {
          id: newId,
          name: newProfileData.name || 'New GPT',
          photo: newProfileData.photo || '/gpt-profiles/default-avatar.svg',
          description: newProfileData.description || 'A new GPT assistant',
          specialties: newProfileData.specialties || [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true
        };

        db.profiles.push(newProfile);
        db.lastId = newId;

        if (writeDB(db)) {
          res.status(201).json({
            success: true,
            profile: newProfile,
            message: 'Profile created successfully'
          });
        } else {
          res.status(500).json({
            success: false,
            message: 'Failed to save profile'
          });
        }
        break;

      case 'PUT':
        // Update existing profile
        const { id, ...updateData } = req.body;
        const profileIndex = db.profiles.findIndex(p => p.id === id);

        if (profileIndex === -1) {
          res.status(404).json({
            success: false,
            message: 'Profile not found'
          });
          break;
        }

        db.profiles[profileIndex] = {
          ...db.profiles[profileIndex],
          ...updateData,
          id: id,
          updatedAt: new Date().toISOString()
        };

        if (writeDB(db)) {
          res.status(200).json({
            success: true,
            profile: db.profiles[profileIndex],
            message: 'Profile updated successfully'
          });
        } else {
          res.status(500).json({
            success: false,
            message: 'Failed to update profile'
          });
        }
        break;

      case 'DELETE':
        // Delete profile (soft delete)
        const deleteId = parseInt(req.query.id);
        const deleteIndex = db.profiles.findIndex(p => p.id === deleteId);

        if (deleteIndex === -1) {
          res.status(404).json({
            success: false,
            message: 'Profile not found'
          });
          break;
        }

        db.profiles[deleteIndex].isActive = false;
        db.profiles[deleteIndex].updatedAt = new Date().toISOString();

        if (writeDB(db)) {
          res.status(200).json({
            success: true,
            message: 'Profile deleted successfully'
          });
        } else {
          res.status(500).json({
            success: false,
            message: 'Failed to delete profile'
          });
        }
        break;

      default:
        res.status(405).json({
          success: false,
          message: 'Method not allowed'
        });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}