// registering service worker cache 
var appCacheName = 'wms-static-v2';
var appCacheAssets = [	
	  'https://jimoh1993.github.io/currencyconverter.github.io/',
	  'https://jimoh1993.github.io/currencyconverter.github.io/index.html',
	  'https://jimoh1993.github.io/currencyconverter.github.io/js/app.js',
	  'https://jimoh1993.github.io/currencyconverter.github.io/css/app.css',
	  'https://jimoh1993.github.io/currencyconverter.github.io/img/icon.png', 
	  'https://jimoh1993.github.io/currencyconverter.github.io/img/background-image.jpg',
	  'https://free.currencyconverterapi.com/api/v5/currencies',	 
	  'https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js',
	  'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css',
	  'https://fonts.googleapis.com/icon?family=Material+Icons'
	
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
