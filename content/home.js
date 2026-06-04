function hideHomeShorts() {

    const reels = document.querySelectorAll(
        "ytd-reel-shelf-renderer"
    );

    reels.forEach(el => {
        el.style.display = "none";
    });

    document
        .querySelectorAll("ytd-rich-shelf-renderer")
        .forEach(el => {

            const text =
                el.textContent?.toLowerCase() || "";

            if (text.includes("shorts")) {
                el.style.display = "none";
            }

        });
}