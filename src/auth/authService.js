const USER_KEY = 'portfolio_auth_users';
const SESSION_KEY = 'portfolio_auth_session';

const hashValue = (value) => {
  try {
    return btoa(value.split('').reverse().join(''));
  } catch {
    return value;
  }
};

const DEFAULT_ADMIN = {
  id: 'admin-default',
  role: 'admin',
  fullName: 'Er.Laxman Dhakal',
  email: 'admin@laxmandhakal.com',
  phone: '+977-9800000000',
  passwordHash: hashValue('Admin123'),
  avatar: '/logo.png',
  joined: new Date().toISOString(),
  preferences: {
    theme: 'system',
    sidebarCollapsed: false,
  }
};

const loadUsers = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(USER_KEY) || '[]');
    if (!Array.isArray(stored) || stored.length === 0) {
      localStorage.setItem(USER_KEY, JSON.stringify([DEFAULT_ADMIN]));
      return [DEFAULT_ADMIN];
    }
    return stored;
  } catch {
    localStorage.setItem(USER_KEY, JSON.stringify([DEFAULT_ADMIN]));
    return [DEFAULT_ADMIN];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(USER_KEY, JSON.stringify(users));
};

const saveSession = (user, remember) => {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(SESSION_KEY, JSON.stringify({ email: user.email, role: user.role }));
};

const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
};

const getSession = () => {
  const stored = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

const getCurrentUser = () => {
  const session = getSession();
  if (!session) return null;
  return loadUsers().find((user) => user.email === session.email) || null;
};

const authService = {
  login(email, password, remember) {
    const users = loadUsers();
    const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return { success: false, message: 'Invalid email or password.' };
    }
    const passwordHash = hashValue(password);
    if (user.passwordHash !== passwordHash) {
      return { success: false, message: 'Invalid email or password.' };
    }
    saveSession(user, remember);
    return { success: true, user: { ...user, passwordHash: undefined } };
  },

  register({ fullName, email, phone, password }) {
    const users = loadUsers();
    const existing = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, message: 'An account with this email already exists.' };
    }
    const newUser = {
      id: Date.now().toString(),
      role: 'admin',
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      passwordHash: hashValue(password),
      avatar: '/ld.png',
      joined: new Date().toISOString(),
      preferences: {
        theme: 'system',
        sidebarCollapsed: false,
      }
    };
    users.push(newUser);
    saveUsers(users);
    saveSession(newUser, true);
    return { success: true, user: { ...newUser, passwordHash: undefined } };
  },

  updateProfile({ fullName, email, phone }) {
    const users = loadUsers();
    const activeSession = getSession();
    if (!activeSession) {
      return { success: false, message: 'No active session found.' };
    }

    const index = users.findIndex((item) => item.email.toLowerCase() === activeSession.email.toLowerCase());
    if (index === -1) {
      return { success: false, message: 'Unable to update this profile.' };
    }

    const normalizedEmail = String(email || '').trim().toLowerCase();
    const duplicate = users.some((item, itemIndex) => itemIndex !== index && item.email.toLowerCase() === normalizedEmail);
    if (duplicate) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    users[index] = {
      ...users[index],
      fullName: String(fullName || '').trim(),
      email: normalizedEmail,
      phone: String(phone || '').trim(),
    };

    saveUsers(users);
    saveSession(users[index], true);
    return { success: true, user: { ...users[index], passwordHash: undefined } };
  },

  logout() {
    clearSession();
    return { success: true };
  },

  forgotPassword(email) {
    const users = loadUsers();
    const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return { success: true, message: 'If an account exists with this email, a password reset link has been sent.' };
    }
    return { success: true, message: 'If an account exists with this email, a password reset link has been sent.' };
  },

  resetPassword(email, password) {
    const users = loadUsers();
    const index = users.findIndex((item) => item.email.toLowerCase() === email.toLowerCase());
    if (index === -1) {
      return { success: false, message: 'Unable to reset password for this account.' };
    }
    users[index].passwordHash = hashValue(password);
    saveUsers(users);
    return { success: true, message: 'Password reset successfully.' };
  },

  isAuthenticated() {
    return Boolean(getCurrentUser());
  },

  currentUser() {
    const user = getCurrentUser();
    if (!user) return null;
    const { passwordHash, ...rest } = user;
    return rest;
  }
};

export default authService;
