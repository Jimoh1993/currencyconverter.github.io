/**
* Programmer: Jimoh Abdulganiyu
* Year: 2018
* Version: 1.0
* ALC Version: ALC 3.0
* Purpose: Google Africa Scholarship
* Track: Mobile Web Specialist
* Project Name: Currency Converter
* Duration: #7DaysofCodeChallenge
* Code: JavaScript
*/

// registering service worker cache 
var appCacheName = 'wms-static-v2';
var appCacheAssets = [	
	  'https://jimoh1993.github.io/currencyconverter.github.io/',
	  'https://free.currencyconverterapi.com/api/v5/currencies',	 
	  'https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js'
	  'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css',
];


/* state installation goes below here*/
self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(appCacheName).then(function(cache){
			return cache.addAll(appCacheAssets);
			// git remote add origin https://github.com/Jimoh1993/Jimoh1993.github.io.git
		})
	);
});

/* state activate here */
self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys().then(function(cacheNames){
			return Promise.all(
				cacheNames.filter(function(cacheName){
					return cacheName.startsWith('wms-') && cacheName !== appCacheName;
				}).map(function(cacheName){
					return caches.delete(cacheName);
				})
			);
		})
	);
});

/*state fetch below*/
self.addEventListener('fetch', function(event){
	event.respondWith(
		caches.match(event.request).then(function(response){
			if(response){
				return response;
			}
			return fetch(event.request);
		})
	);
});

/*message*/
self.addEventListener('message', function(event){
	if(event.data.action == 'skipWaiting'){
		self.skipWaiting();
	}
});
