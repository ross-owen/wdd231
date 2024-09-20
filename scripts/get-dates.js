const copyrightYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

copyrightYear.innerHTML = `` + new Date().getFullYear();
lastModified.innerHTML = `Last Modification: ` + document.lastModified;
