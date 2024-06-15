let docTitle = document.title;

window.addEventListener("blur", () => {
    document.title = "Hova mentél?";
});

window.addEventListener("focus", () => {
    document.title = docTitle;
});
