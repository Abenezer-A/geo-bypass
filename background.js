const proxyBase = "http://localhost:3000/proxy?url=";

const geoBlockedSites = [
  "*://*.example-geo.com/*",
  "*://*.blockednews.org/*"
];

browser.webRequest.onBeforeRequest.addListener(
  function(details) {
    const encodedUrl = encodeURIComponent(details.url);
    return { redirectUrl: proxyBase + encodedUrl };
  },
  { urls: geoBlockedSites },
  ["blocking"]
);