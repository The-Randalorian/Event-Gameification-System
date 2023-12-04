self.addEventListener("install", function(event) {
  event.waitUntil(preLoad());
});

var preLoad = function(){
  console.log("Installing web app");
  return caches.open("offline").then(function(cache) {
    console.log("caching index and important routes");
    return cache.addAll([
        "/assets/css/fontawesome-all.min.css",
        "/assets/css/noscript.css",
        "/assets/css/main.css",
        "/assets/css/images/overlay.png",
        "/assets/js/breakpoints.min.js",
        "/assets/js/browser.min.js",
        "/assets/js/html5-qrcode.min.js",
        "/assets/js/jquery.min.js",
        "/assets/js/jquery.scrollex.min.js",
        "/assets/js/jquery.scrolly.min.js",
        "/assets/js/main.js",
        "/assets/js/modal-camera.js",
        "/assets/js/util.js",
        "/assets/webfonts/fa-brands-400.eot",
        "/assets/webfonts/fa-brands-400.svg",
        "/assets/webfonts/fa-brands-400.ttf",
        "/assets/webfonts/fa-brands-400.woff",
        "/assets/webfonts/fa-brands-400.woff2",
        "/assets/webfonts/fa-regular-400.eot",
        "/assets/webfonts/fa-regular-400.svg",
        "/assets/webfonts/fa-regular-400.ttf",
        "/assets/webfonts/fa-regular-400.woff",
        "/assets/webfonts/fa-regular-400.woff2",
        "/assets/webfonts/fa-solid-900.eot",
        "/assets/webfonts/fa-solid-900.svg",
        "/assets/webfonts/fa-solid-900.ttf",
        "/assets/webfonts/fa-solid-900.woff",
        "/assets/webfonts/fa-solid-900.woff2",
        "/images/logo.png",
        "/images/phone-icon.png",
        "/images/pic01.jpg",
        "/images/pic02.jpg",
        "/images/pic03.jpg",
        "/images/pic04.jpg",
        "/images/pic05.jpg",
        "/images/pic06.jpg",
        "/offline.html"]);
  });
};

self.addEventListener("fetch", function(event) {
  event.respondWith(checkResponse(event.request).catch(function() {
    return returnFromCache(event.request);
  }));
  event.waitUntil(addToCache(event.request));
});

var checkResponse = function(request){
  return new Promise(function(fulfill, reject) {
    fetch(request).then(function(response){
      if(response.status !== 404) {
        fulfill(response);
      } else {
        reject();
      }
    }, reject);
  });
};

var addToCache = function(request){
  return caches.open("offline").then(function (cache) {
    return fetch(request).then(function (response) {
      console.log(response.url + " was cached");
      return cache.put(request, response);
    });
  });
};

var returnFromCache = function(request){
  return caches.open("offline").then(function (cache) {
    return cache.match(request).then(function (matching) {
     if(!matching || matching.status == 404) {
       return cache.match("offline.html");
     } else {
       return matching;
     }
    });
  });
};