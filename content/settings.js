const DEFAULT_SETTINGS = {
    enabled: true,
    hideHomeShorts: true,
    hideSearchShorts: true,
    hideSidebarShorts: true
};

async function getSettings() {
    return await chrome.storage.sync.get(DEFAULT_SETTINGS);
}