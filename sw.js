const CACHE = "kvity-v5";
const FILES = ["./", "index.html", "data.js", "manifest.json", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png", "photos/01-spatyfilum-zelenyi.jpg", "photos/02-spatyfilum-strokatyi.jpg", "photos/03-zamiokulkas-1-z-oporoiu.jpg", "photos/04-asplenium.jpg", "photos/05-peperomiia-chervonyi-horshchyk.jpg", "photos/06-ripsalis.jpg", "photos/07-dratsena-marhinata-dytiacha.jpg", "photos/08-filodendron-a.jpg", "photos/09-peperomiia-velyka.jpg", "photos/10-filodendron-b.jpg", "photos/11-zamiokulkas-2-zhovti-lystky.jpg", "photos/12-dratsena-bez-lystia.jpg", "photos/13-orkhideia-falenopsys.jpg", "photos/14-dekoratyvna-kapusta.jpg", "photos/15-veres.jpg", "photos/16-mandevilia.jpg", "photos/17-behoniia.jpg", "photos/22-pennisetum.jpg", "photos/crop-hortenziia.jpg", "photos/crop-khosta.jpg", "photos/crop-miskantus.jpg", "photos/crop-tui.jpg", "photos/crop-zhorzhyny.jpg"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
// Мережа спершу (щоб отримувати оновлення), без мережі — з кешу.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(r => {
    const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r;
  }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
