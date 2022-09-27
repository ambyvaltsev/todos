import { RootState } from '../store';

export const loadFromStorage = (key: string) => {
  try {
    const saveData= localStorage.getItem(key);

    if (saveData === null) {
      return undefined;
    }

    return JSON.parse(saveData);
  } catch (error) {
    return undefined;
  }
};

export function saveToStorage (key: string, data: RootState) {
  const dataToBeSaved = JSON.stringify(data);
  localStorage.setItem(key, dataToBeSaved);
};

export const removeFromStorage = (key: string) => {
  localStorage.removeItem(key);
};
