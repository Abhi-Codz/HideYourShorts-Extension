function hideSidebarShorts() {

    const links =
        document.querySelectorAll(
            'a[href="/shorts/"]'
        );

    console.log(
        "Shorts sidebar links found:",
        links.length
    );

    links.forEach(link => {

        console.log(
            "Found:",
            link
        );

        const container =
            link.closest(
                // "ytd-guide-entry-renderer"
                "ytd-guide-collapsible-section-entry-renderer"
            ) ||
            link.closest(
                "ytd-mini-guide-entry-renderer"
            );

        if (container) {
            container.style.display = "none";
        }

    });
}