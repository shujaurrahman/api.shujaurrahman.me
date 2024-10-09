// /api/public.js

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const { method, url } = req;

    // Set CORS headers to allow requests from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (method === 'OPTIONS') {
        return res.status(204).end(); // Respond with 204 No Content
    }

    // Handle GET requests
    if (method === 'GET') {
        switch (url) {
            case '/':
                return res.send('API is running.'); // Show API is running message
            case '/api/public/about':
                return getAboutData(req, res);
            case '/api/public/bookmarks':
                return sendFile(res, 'bookmarks.json');
            case '/api/public/colophon':
                return sendFile(res, 'colophon.json');
            case '/api/public/gallery':
                return sendFile(res, 'gallery.json');
            case '/api/public/hireme':
                return sendFile(res, 'hireme.json');
            case '/api/public/notes':
                return sendFile(res, 'notes.json');
            case '/api/public/now':
                return sendFile(res, 'now.json');
            case '/api/public/projects':
                return sendFile(res, 'projects.json');
            case '/api/public/social-media':
                return sendFile(res, 'social-media.json');
            case '/api/public/status':
                return sendFile(res, 'status.json');
            case '/api/public/story':
                return getStoryData(req, res);
            case '/api/public/support':
                return sendFile(res, 'support.json');
            case '/api/public/timeline':
                return sendFile(res, 'timeline.json');
            default:
                return res.status(404).json({ message: 'Not Found' });
        }
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
}

// Helper function to get About data
async function getAboutData(req, res) {
    try {
        const aboutData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/about.json')));
        // Update the image path correctly
        aboutData.profile.image = buildFullUrl(req, `profile/shuja.jpg`);
        return res.json(aboutData);
    } catch (error) {
        console.error('Error reading about data:', error); // Log the error for debugging
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Helper function to get Story data
async function getStoryData(req, res) {
    try {
        const storyData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/story.json')));
        storyData.forEach(story => {
            if (story.thumbUrl) {
                story.thumbUrl = buildFullUrl(req, story.thumbUrl); // Ensure this is correct
            }
            if (story.imageUrl) {
                story.imageUrl = buildFullUrl(req, story.imageUrl); // Ensure this is correct
            }
        });
        return res.json(storyData);
    } catch (error) {
        console.error('Error reading story data:', error); // Log the error for debugging
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Helper function to build full URL
function buildFullUrl(req, relativePath) {
    // Correctly construct the full URL
    const baseUrl = `${req.protocol}://${req.headers.host}/public`; // Ensure it's pointing to 'public'
    return `${baseUrl}/${relativePath}`;
}

// Helper function to send JSON files
function sendFile(res, fileName) {
    const filePath = path.join(process.cwd(), 'public', fileName); // Update the path to point to 'public'
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(`Error reading file ${fileName}:`, err); // Log the error for debugging
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
}
