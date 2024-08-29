const handleDeepLink = (deepLinkUrl, baseURL, mainWindow) => {
  const urlObj = new URL(deepLinkUrl);
  const packageId = urlObj.searchParams.get("packageId");

  const targetUrl = packageId
    ? `${baseURL}/package/receiving?packageId=${packageId}`
    : `${baseURL}/package/receiving`;
  mainWindow.loadURL(targetUrl);
};

module.exports = { handleDeepLink };
