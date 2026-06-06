const DEFAULT_SETTINGS = {
    enabled: true,
    hideHomeShorts: true,
    hideSearchShorts: true,
    hideSidebarShorts: true
};

async function loadSettings() {

    const settings =
        await chrome.storage.sync.get(
            DEFAULT_SETTINGS
        );

    updateToggle(
        "enabled",
        settings.enabled
    );

    updateToggle(
        "hideHomeShorts",
        settings.hideHomeShorts
    );

    updateToggle(
        "hideSearchShorts",
        settings.hideSearchShorts
    );

    updateToggle(
        "hideSidebarShorts",
        settings.hideSidebarShorts
    );

    updateStatus(settings.enabled);
}

function updateToggle(setting, value) {

    const toggle =
        document.querySelector(
            `[data-setting="${setting}"]`
        );

    const onBtn =
        toggle.querySelector(".on");

    const offBtn =
        toggle.querySelector(".off");

    if (value) {

        onBtn.classList.add("active");
        offBtn.classList.remove("active");

    } else {

        offBtn.classList.add("active");
        onBtn.classList.remove("active");

    }
}

function updateStatus(enabled) {

    const text =
        document.getElementById(
            "statusText"
        );

    const dot =
        document.getElementById(
            "statusDot"
        );

    if (enabled) {

        text.textContent =
            "Status: Positive";

        dot.classList.remove(
            "negative"
        );

        dot.classList.add(
            "positive"
        );

    } else {

        text.textContent =
            "Status: Negative";

        dot.classList.remove(
            "positive"
        );

        dot.classList.add(
            "negative"
        );

    }
}

async function saveSetting(
    key,
    value
) {

    await chrome.storage.sync.set({
        [key]: value
    });

    if (key === "enabled") {
        updateStatus(value);
    }

    const tabs =
        await chrome.tabs.query({
            url: "*://*.youtube.com/*"
        });

    for (const tab of tabs) {

        try {

            await chrome.tabs.sendMessage(
                tab.id,
                {
                    type: "settingsUpdated"
                }
            );

        } catch (err) {

            console.debug(
                "Tab not ready:",
                tab.id
            );

        }

    }
}

document
    .querySelectorAll(".toggle-box")
    .forEach(toggle => {

        const setting =
            toggle.dataset.setting;

        const onBtn =
            toggle.querySelector(".on");

        const offBtn =
            toggle.querySelector(".off");

        onBtn.addEventListener(
            "click",
            async () => {

                updateToggle(
                    setting,
                    true
                );

                await saveSetting(
                    setting,
                    true
                );

            }
        );

        offBtn.addEventListener(
            "click",
            async () => {

                updateToggle(
                    setting,
                    false
                );

                await saveSetting(
                    setting,
                    false
                );

            }
        );

    });

loadSettings();