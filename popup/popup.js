const enabled =
    document.getElementById("enabled");

const home =
    document.getElementById("home");

const search =
    document.getElementById("search");

const sidebar =
    document.getElementById("sidebar");

async function loadSettings() {

    const settings =
        await chrome.storage.sync.get({
            enabled: true,
            hideHomeShorts: true,
            hideSearchShorts: true,
            hideSidebarShorts: true
        });

    enabled.checked =
        settings.enabled;

    home.checked =
        settings.hideHomeShorts;

    search.checked =
        settings.hideSearchShorts;

    sidebar.checked =
        settings.hideSidebarShorts;

}

async function saveSettings() {

    await chrome.storage.sync.set({
        enabled: enabled.checked,
        hideHomeShorts: home.checked,
        hideSearchShorts: search.checked,
        hideSidebarShorts: sidebar.checked
    });

    const tabs =
        await chrome.tabs.query({
            url: "*://www.youtube.com/*"
        });

    for (const tab of tabs) {

        chrome.tabs.sendMessage(
            tab.id,
            {
                type: "settingsUpdated"
            }
        );

    }

}

[
    enabled,
    home,
    search,
    sidebar
].forEach(input => {

    input.addEventListener(
        "change",
        saveSettings
    );

});

loadSettings();