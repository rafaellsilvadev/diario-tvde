/* Guarda os ficheiros do app para funcionar sem internet.
 * Ao mudar algum ficheiro, aumente a versão para os aparelhos receberem a atualização. */
const VERSAO = "diario-tvde-v1";
const FICHEIROS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icons/icon-180.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSAO).then((c) => c.addAll(FICHEIROS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((nomes) => Promise.all(nomes.filter((n) => n !== VERSAO).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);

  // Páginas: tenta a versão mais recente e usa a guardada quando não há rede
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request)
        .then((r) => { caches.open(VERSAO).then((c) => c.put("index.html", r.clone())); return r; })
        .catch(() => caches.match("index.html"))
    );
    return;
  }

  // Restantes ficheiros e tipos de letra: usa o guardado e atualiza em segundo plano
  const mesmoSite = url.origin === self.location.origin;
  const fontes = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (!mesmoSite && !fontes) return;
  e.respondWith(
    caches.match(e.request).then((guardado) => {
      const rede = fetch(e.request).then((r) => {
        if (r && (r.ok || r.type === "opaque")) {
          const copia = r.clone();
          caches.open(VERSAO).then((c) => c.put(e.request, copia));
        }
        return r;
      }).catch(() => guardado);
      return guardado || rede;
    })
  );
});
