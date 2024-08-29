export const convertToDeepLink = (serialNumber) => {
  return `electron-deliorder://open?packageId=${serialNumber}`;
};
