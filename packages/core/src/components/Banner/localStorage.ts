const storage = new Map();

const localStorage = {
  getItem(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (err) {
      let localItem;
      return (localItem = storage.get(key)) !== null && localItem !== undefined
        ? localItem
        : null;
    }
  },
  removeItem(key) {
    try {
      window.localStorage.removeItem(key), storage.delete(key);
    } catch (err) {}
  },
  setItem(key, value) {
    try {
      window.localStorage.setItem(key, value), storage.set(key, value);
    } catch (err) {}
  },
};

export default localStorage;
