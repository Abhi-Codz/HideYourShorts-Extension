function hideSidebarShorts() {

    document
        .querySelectorAll(
            "ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer"
        )
        .forEach(entry => {

            const text =
                entry.textContent?.trim().toLowerCase() || "";

            const shortsLink =
                entry.querySelector('a[href="/shorts/"]');

            if (
                text.includes("shorts") ||
                shortsLink
            ) {
                entry.style.display = "none";
            }

        });

}