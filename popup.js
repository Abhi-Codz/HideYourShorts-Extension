const checkbox = document.getElementById("enabled");

chrome.storage.sync.get(
    { hideShorts: true },
    ({ hideShorts }) => {
        checkbox.checked = hideShorts;
    }
);

checkbox.addEventListener("change", async () => {
    await chrome.storage.sync.set({
        hideShorts: checkbox.checked
    });

    const tabs = await chrome.tabs.query({
        url: "*://www.youtube.com/*"
    });

    for (const tab of tabs) {
        chrome.tabs.reload(tab.id);
    }
});