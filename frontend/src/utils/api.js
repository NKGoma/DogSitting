// Import mock API for GitHub Pages deployment (no backend needed!)
import {
  authAPI,
  userAPI,
  dogAPI,
  reviewAPI,
  searchAPI
} from './mockApi';

// Export all APIs
export { authAPI, userAPI, dogAPI, reviewAPI, searchAPI };

// For compatibility
export default {
  authAPI,
  userAPI,
  dogAPI,
  reviewAPI,
  searchAPI
};
