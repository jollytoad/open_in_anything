function followHash() {
  const hashUrl = location.hash.replace(/^#/, "");

  if (hashUrl) {
    document.location = "?open=" + hashUrl;
  }
}

followHash();

addEventListener("hashchange", followHash);
