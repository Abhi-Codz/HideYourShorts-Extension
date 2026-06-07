const DEFAULT_SETTINGS = {
    enabled: true,
    hideHomeShorts: true,
    hideSearchShorts: true,
    hideSidebarShorts: true
};

async function getSettings() {

    return await ext.storage.sync.get(
        DEFAULT_SETTINGS
    );
}