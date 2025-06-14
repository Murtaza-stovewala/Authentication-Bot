export interface UserProfile {
  name: string;
  mobileNumber: string;
}

const USER_KEY = 'authenticationBotUser';

export const saveUser = (user: UserProfile): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error("Error saving user to localStorage", error);
    }
  }
};

export const getUser = (): UserProfile | null => {
  if (typeof window !== 'undefined') {
    try {
      const user = localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error getting user from localStorage", error);
      return null;
    }
  }
  return null;
};

export const clearUser = (): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error("Error clearing user from localStorage", error);
    }
  }
};
