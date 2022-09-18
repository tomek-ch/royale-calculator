if (
  localStorage.isDarkMode ||
  (!("isDarkMode" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  console.log("is dark theme");
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}
