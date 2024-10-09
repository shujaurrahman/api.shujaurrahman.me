# Shujaurrahman-API

## Overview

The Shujaurrahman API serves as the backend data source for the portfolio website [shujaurrahman.me](https://shujaurrahman.me). It provides endpoints to fetch various content, such as profiles, projects, social media links, and images used throughout the site. The API is designed to be lightweight, easy to use, and adaptable for future enhancements, including a dashboard for content management.

### Why This API?

- **Separation of Concerns:** By having a dedicated API, the frontend can remain focused on presentation while the backend handles data management.
- **Dynamic Content:** Easily manage and update content without modifying the frontend code.
- **Scalability:** The API can be extended with new endpoints and features as needed.
- **Future Enhancements:** Plans to integrate a dashboard for real-time content updates, deletions, and additions.

## Endpoints

The following endpoints are available in the API:

### 1. `/api/content/about`

**Method:** GET

**Description:** Fetches profile information, sections about the user, and contact details.

**Response:**
```json
{
    "profile": {
        "image": "URL to profile image",
        "name": "Shuja Ur Rahman",
        "description": "User description..."
    },
    "sections": [ /* Array of sections */ ],
    "contact": {
        "email": "user email",
        "github": "URL to GitHub profile"
    }
}
```

### 2. `/api/content/bookmarks`

**Method:** GET

**Description:** Fetches bookmarks data for the user.

### 3. `/api/content/colophon`

**Method:** GET

**Description:** Provides information about the website's design and development credits.


### 4. `/api/content/gallery`

**Method:** GET

**Description:** Fetches image links for the gallery section.


### 5. `/api/content/hireme`

**Method:** GET

**Description:** Provides hiring information for the user.


### 6. `/api/content/notes`

**Method:** GET

**Description:** Fetches notes or blog post data.



### 7. `/api/content/now`

**Method:** GET

**Description:** Provides information about what the user is currently working on.



### 8. `/api/content/projects`

**Method:** GET

**Description:** Fetches project information and links.



### 9. `/api/content/social-media`

**Method:** GET

**Description:** Provides links to the user's social media profiles.


### 10. `/api/content/status`

**Method:** GET

**Description:** Fetches current status updates for the user.



### 11. `/api/content/story`

**Method:** GET

**Description:** Fetches stories with thumbnails and images.


### 12. `/api/content/support`

**Method:** GET

**Description:** Provides information on how users can support the creator.



### 13. `/api/content/timeline`

**Method:** GET

**Description:** Fetches timeline or history data for the user.


## Static Content Fetching

The API serves static content by linking to media files hosted at the following base URL:

`https://host/content/`

When fetching content, the frontend retrieves relative paths from the JSON responses and constructs the full URL dynamically, eliminating the need for hardcoded URLs in the JSON files.

### Example of Dynamic URL Construction

For instance, the JSON response for the `about` section may contain a relative path for the profile image:

```json
{
    "profile": {
        "image": "profile/shuja.jpg"
    }
}
```

In the frontend, this path is combined with the base URL to construct the full URL:

```javascript
const baseUrl = "https://host/content/";
const imageUrl = baseUrl + data.profile.image; // Results in full image URL
```

## Future Enhancements

Future plans include developing a dashboard for managing content through a user-friendly interface. This will allow for real-time updates, deletions, and additions of data to the JSON files, making the API even more dynamic and easier to maintain.

## Installation

To run the API locally:

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the server:
    ```bash
    node server.js
    ```
4. Access the API at `http://localhost:3000/api/content/<endpoint>`
git