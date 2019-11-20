/*
 *
 *  Air Horner
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
 
const version = "0.6.20";
const cacheName = `miapp-${version}`;
self.addEventListener('install', e => {
  console.log('sw install');
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `./`,
        `./index.html`,
        `./js/main.js`,
      ])
      //.then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  console.log('sw activate');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  console.log('sw fetch');
  let url = event.request.url;

  if(url.includes('.css')){
    console.log(url);
    console.log(event);
    // event.respondWith(fetch('https://code.getmdl.io/1.3.0/material.light_blue-amber.min.css'))
  }
  else
    event.respondWith(fetch(url));

});