// Mock API that works without a backend - stores everything in localStorage

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get data from localStorage
const getFromStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Helper to save data to localStorage
const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Initialize storage with demo data if empty
const initializeStorage = () => {
  if (!getFromStorage('users')) {
    saveToStorage('users', []);
  }
  if (!getFromStorage('dogs')) {
    saveToStorage('dogs', []);
  }
  if (!getFromStorage('reviews')) {
    saveToStorage('reviews', []);
  }
};

initializeStorage();

// Generate ID
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

// Mock Auth API
export const authAPI = {
  register: async (data) => {
    await delay(500);
    const users = getFromStorage('users') || [];

    // Check if user exists
    if (users.find(u => u.email === data.email)) {
      throw new Error('Benutzer existiert bereits');
    }

    const newUser = {
      _id: generateId(),
      ...data,
      profilbild: '',
      verfuegbareTage: [],
      platzverfuegbarkeit: 'mittel',
      nurKleineHunde: false,
      erfahrung: 'keine',
      beschreibung: '',
      durchschnittsBewertung: 0,
      anzahlBewertungen: 0,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveToStorage('users', users);

    const token = 'mock_token_' + newUser._id;
    return { data: { ...newUser, token } };
  },

  login: async (data) => {
    await delay(500);
    const users = getFromStorage('users') || [];
    const user = users.find(u => u.email === data.email && u.password === data.password);

    if (!user) {
      throw new Error('Ungültige E-Mail oder Passwort');
    }

    const token = 'mock_token_' + user._id;
    return { data: { ...user, token } };
  },

  getMe: async () => {
    await delay(300);
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    const userId = token.replace('mock_token_', '');
    const users = getFromStorage('users') || [];
    const user = users.find(u => u._id === userId);

    if (!user) throw new Error('User not found');
    return { data: user };
  }
};

// Mock User API
export const userAPI = {
  updateProfile: async (data) => {
    await delay(500);
    const token = localStorage.getItem('token');
    const userId = token.replace('mock_token_', '');
    const users = getFromStorage('users') || [];

    const userIndex = users.findIndex(u => u._id === userId);
    if (userIndex === -1) throw new Error('User not found');

    users[userIndex] = { ...users[userIndex], ...data };
    saveToStorage('users', users);

    return { data: users[userIndex] };
  },

  uploadProfilePhoto: async (formData) => {
    await delay(500);
    // Mock photo upload - in real version would handle file
    const token = localStorage.getItem('token');
    const userId = token.replace('mock_token_', '');
    const users = getFromStorage('users') || [];

    const userIndex = users.findIndex(u => u._id === userId);
    if (userIndex === -1) throw new Error('User not found');

    // Generate mock photo URL
    const photoUrl = '/uploads/profiles/profile-' + Date.now() + '.jpg';
    users[userIndex].profilbild = photoUrl;
    saveToStorage('users', users);

    return { data: { profilbild: photoUrl } };
  },

  getUserProfile: async (id) => {
    await delay(300);
    const users = getFromStorage('users') || [];
    const user = users.find(u => u._id === id);

    if (!user) throw new Error('User not found');

    const dogs = getFromStorage('dogs') || [];
    const userDogs = dogs.filter(d => d.besitzer === id);

    return { data: { ...user, hunde: userDogs } };
  },

  getUsers: async () => {
    await delay(300);
    const users = getFromStorage('users') || [];
    return { data: users };
  }
};

// Mock Dog API
export const dogAPI = {
  createDog: async (data) => {
    await delay(500);
    const token = localStorage.getItem('token');
    const userId = token.replace('mock_token_', '');
    const dogs = getFromStorage('dogs') || [];

    const newDog = {
      _id: generateId(),
      besitzer: userId,
      ...data,
      foto: '',
      createdAt: new Date().toISOString()
    };

    dogs.push(newDog);
    saveToStorage('dogs', dogs);

    return { data: newDog };
  },

  getMyDogs: async () => {
    await delay(300);
    const token = localStorage.getItem('token');
    const userId = token.replace('mock_token_', '');
    const dogs = getFromStorage('dogs') || [];

    return { data: dogs.filter(d => d.besitzer === userId) };
  },

  getDog: async (id) => {
    await delay(300);
    const dogs = getFromStorage('dogs') || [];
    const dog = dogs.find(d => d._id === id);

    if (!dog) throw new Error('Dog not found');
    return { data: dog };
  },

  updateDog: async (id, data) => {
    await delay(500);
    const dogs = getFromStorage('dogs') || [];
    const dogIndex = dogs.findIndex(d => d._id === id);

    if (dogIndex === -1) throw new Error('Dog not found');

    dogs[dogIndex] = { ...dogs[dogIndex], ...data };
    saveToStorage('dogs', dogs);

    return { data: dogs[dogIndex] };
  },

  deleteDog: async (id) => {
    await delay(500);
    const dogs = getFromStorage('dogs') || [];
    const filteredDogs = dogs.filter(d => d._id !== id);

    saveToStorage('dogs', filteredDogs);
    return { data: { message: 'Hund gelöscht' } };
  },

  uploadDogPhoto: async (id, formData) => {
    await delay(500);
    const dogs = getFromStorage('dogs') || [];
    const dogIndex = dogs.findIndex(d => d._id === id);

    if (dogIndex === -1) throw new Error('Dog not found');

    const photoUrl = '/uploads/dogs/dog-' + Date.now() + '.jpg';
    dogs[dogIndex].foto = photoUrl;
    saveToStorage('dogs', dogs);

    return { data: { foto: photoUrl } };
  }
};

// Mock Review API
export const reviewAPI = {
  createReview: async (data) => {
    await delay(500);
    const token = localStorage.getItem('token');
    const userId = token.replace('mock_token_', '');
    const reviews = getFromStorage('reviews') || [];

    const newReview = {
      _id: generateId(),
      bewerter: userId,
      ...data,
      createdAt: new Date().toISOString()
    };

    reviews.push(newReview);
    saveToStorage('reviews', reviews);

    // Update user rating
    const users = getFromStorage('users') || [];
    const userReviews = reviews.filter(r => r.bewerteter === data.bewerteter);
    const avgRating = userReviews.reduce((sum, r) => sum + r.bewertung, 0) / userReviews.length;

    const userIndex = users.findIndex(u => u._id === data.bewerteter);
    if (userIndex !== -1) {
      users[userIndex].durchschnittsBewertung = Math.round(avgRating * 10) / 10;
      users[userIndex].anzahlBewertungen = userReviews.length;
      saveToStorage('users', users);
    }

    return { data: newReview };
  },

  getUserReviews: async (userId) => {
    await delay(300);
    const reviews = getFromStorage('reviews') || [];
    return { data: reviews.filter(r => r.bewerteter === userId) };
  },

  getMyReviews: async () => {
    await delay(300);
    const token = localStorage.getItem('token');
    const userId = token.replace('mock_token_', '');
    const reviews = getFromStorage('reviews') || [];

    return { data: reviews.filter(r => r.bewerter === userId) };
  },

  updateReview: async (id, data) => {
    await delay(500);
    const reviews = getFromStorage('reviews') || [];
    const reviewIndex = reviews.findIndex(r => r._id === id);

    if (reviewIndex === -1) throw new Error('Review not found');

    reviews[reviewIndex] = { ...reviews[reviewIndex], ...data };
    saveToStorage('reviews', reviews);

    return { data: reviews[reviewIndex] };
  },

  deleteReview: async (id) => {
    await delay(500);
    const reviews = getFromStorage('reviews') || [];
    const filteredReviews = reviews.filter(r => r._id !== id);

    saveToStorage('reviews', filteredReviews);
    return { data: { message: 'Review deleted' } };
  }
};

// Mock Search API with distance calculation
const calculateDistance = (plz1, plz2) => {
  const zone1 = parseInt(plz1.substring(0, 2));
  const zone2 = parseInt(plz2.substring(0, 2));
  const zoneDiff = Math.abs(zone1 - zone2);
  return zoneDiff * 50;
};

export const searchAPI = {
  searchSitters: async (params) => {
    await delay(500);
    const users = getFromStorage('users') || [];

    let sitters = users.filter(u =>
      u.rolle === 'hundesitter' || u.rolle === 'beides'
    );

    // Filter by availability
    if (params.verfuegbarerTag) {
      sitters = sitters.filter(s =>
        s.verfuegbareTage && s.verfuegbareTage.includes(params.verfuegbarerTag)
      );
    }

    // Filter by experience
    if (params.erfahrung) {
      sitters = sitters.filter(s => s.erfahrung === params.erfahrung);
    }

    // Filter by dog size
    if (params.hundegroesse) {
      if (params.hundegroesse === 'klein') {
        sitters = sitters.filter(s =>
          ['klein', 'mittel', 'gross'].includes(s.platzverfuegbarkeit)
        );
      } else if (params.hundegroesse === 'mittel') {
        sitters = sitters.filter(s =>
          ['mittel', 'gross'].includes(s.platzverfuegbarkeit) && !s.nurKleineHunde
        );
      } else if (params.hundegroesse === 'gross') {
        sitters = sitters.filter(s =>
          s.platzverfuegbarkeit === 'gross' && !s.nurKleineHunde
        );
      }
    }

    // Filter by distance
    if (params.postleitzahl && params.maxEntfernung) {
      sitters = sitters.filter(s => {
        const distance = calculateDistance(params.postleitzahl, s.postleitzahl);
        return distance <= parseInt(params.maxEntfernung);
      });

      sitters = sitters.map(s => ({
        ...s,
        entfernung: calculateDistance(params.postleitzahl, s.postleitzahl)
      }));

      sitters.sort((a, b) => a.entfernung - b.entfernung);
    }

    return { data: sitters };
  },

  searchOwners: async (params) => {
    await delay(500);
    const users = getFromStorage('users') || [];
    const dogs = getFromStorage('dogs') || [];

    let owners = users.filter(u =>
      u.rolle === 'hundebesitzer' || u.rolle === 'beides'
    );

    // Add dogs to owners
    owners = owners.map(owner => ({
      ...owner,
      hunde: dogs.filter(d => d.besitzer === owner._id)
    }));

    // Filter by dog size
    if (params.hundegroesse) {
      owners = owners.filter(owner =>
        owner.hunde.some(dog => dog.groesse === params.hundegroesse)
      );
    }

    // Filter by distance
    if (params.postleitzahl && params.maxEntfernung) {
      owners = owners.filter(o => {
        const distance = calculateDistance(params.postleitzahl, o.postleitzahl);
        return distance <= parseInt(params.maxEntfernung);
      });

      owners = owners.map(o => ({
        ...o,
        entfernung: calculateDistance(params.postleitzahl, o.postleitzahl)
      }));

      owners.sort((a, b) => a.entfernung - b.entfernung);
    }

    return { data: owners };
  },

  searchDogs: async (params) => {
    await delay(500);
    const dogs = getFromStorage('dogs') || [];
    const users = getFromStorage('users') || [];

    let filteredDogs = [...dogs];

    if (params.groesse) {
      filteredDogs = filteredDogs.filter(d => d.groesse === params.groesse);
    }

    if (params.rasse) {
      filteredDogs = filteredDogs.filter(d =>
        d.rasse.toLowerCase().includes(params.rasse.toLowerCase())
      );
    }

    if (params.charaktereigenschaft) {
      filteredDogs = filteredDogs.filter(d =>
        d.charaktereigenschaften && d.charaktereigenschaften.includes(params.charaktereigenschaft)
      );
    }

    // Add owner info
    filteredDogs = filteredDogs.map(dog => ({
      ...dog,
      besitzer: users.find(u => u._id === dog.besitzer)
    }));

    return { data: filteredDogs };
  }
};
