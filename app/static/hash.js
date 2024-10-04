const hashUrl = location.hash.replace(/^#/, "");

if (hashUrl) {
  document.location = "?open=" + hashUrl;
}
