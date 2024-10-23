export const getUpdateValue = <T, K extends keyof T>(prev: T, key: K, value: T[K]) => {
  return { ...prev, [key]: value };
};

export const getListItemById = <T extends { id: string }>(list: T[], id: string) => {
  return list.find(item => item.id === id);
};

export const removeItemByIndex = <T>(list: T[], index: number) => {
  return list.filter((_, i) => i !== index);
};
