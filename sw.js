/* Plant Parent service worker: offline shell + care reminders */
const CACHE='pp-shell-v2';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];

self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);if(u.origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp)).catch(()=>{});return res})
    .catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))));
});

/* tiny IndexedDB key-value store shared with the page */
const idb=()=>new Promise((res,rej)=>{const q=indexedDB.open('pp',1);q.onupgradeneeded=()=>q.result.createObjectStore('kv');q.onsuccess=()=>res(q.result);q.onerror=()=>rej(q.error)});
const get=async k=>{try{const d=await idb();return await new Promise(r=>{const q=d.transaction('kv').objectStore('kv').get(k);q.onsuccess=()=>r(q.result);q.onerror=()=>r(undefined)})}catch(e){return undefined}};
const set=async(k,v)=>{try{const d=await idb();await new Promise(r=>{const x=d.transaction('kv','readwrite');x.objectStore('kv').put(v,k);x.oncomplete=()=>r();x.onerror=()=>r()})}catch(e){}};
const dayNum=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*60000)/864e5);

function dueTasks(snap,day){
  const o=[],rain=snap.day===day;
  (snap.plants||[]).forEach(p=>{
    if(snap.rem.water&&!(rain&&p.rainSkip)&&p.wDue<=day)o.push({k:'w',id:p.id,name:p.name});
    if(snap.rem.feed&&!p.resting&&p.fDue<=day)o.push({k:'f',id:p.id,name:p.name});
  });
  return o;
}
async function show(snap,tasks,test){
  const tx=snap.tx||{},ids=[...new Set(tasks.map(t=>t.id))],n=ids.length;
  const w=tasks.filter(t=>t.k==='w').map(t=>t.name),f=tasks.filter(t=>t.k==='f').map(t=>t.name);
  const title=test&&!n?tx.t1:n===1?tx.t1:n===2?(tx.t2||tx.tn).replace('{n}',n):(tx.tn||'').replace('{n}',n);
  const lines=[];
  if(w.length)lines.push(tx.water+': '+w.join(', '));
  if(f.length)lines.push(tx.feed+': '+f.join(', '));
  if(tx.note)lines.push(tx.note);
  if(test)lines.unshift(tx.test);
  await self.registration.showNotification(title||'Plant Parent',{
    body:lines.join('\n'),icon:'icon-192.png',badge:'icon-192.png',tag:'pp-daily',renotify:true,
    lang:snap.lang||'en',dir:snap.lang==='ar'?'rtl':'ltr',
    data:{tasks,url:'./#care'},
    actions:tasks.length?[{action:'done',title:tx.done||'Done'},{action:'later',title:tx.later||'Later'}]:[]
  });
}
/* mode: false = normal daily/snooze check, 'test' = always show */
async function check(mode){
  const snap=await get('snap');
  if(!snap||!snap.rem)return false;
  if(!(snap.rem.on||mode==='test'))return false;
  if(self.Notification&&Notification.permission!=='granted')return false;
  const day=dayNum(),rt=(await get('rt'))||{},now=Date.now();
  const tasks=dueTasks(snap,day);
  if(mode==='test'){await show(snap,tasks,true);return true}
  const [h,m]=String(snap.rem.time||'08:00').split(':').map(Number),d=new Date();
  const dueTime=d.getHours()*60+d.getMinutes()>=h*60+m;
  if(rt.snooze&&now<rt.snooze)return false;
  const snoozeOver=!!(rt.snooze&&now>=rt.snooze);
  if(!snoozeOver&&(!dueTime||rt.last===day))return false;
  rt.last=day;rt.snooze=0;await set('rt',rt);
  if(!tasks.length)return false;
  await show(snap,tasks,false);return true;
}
self.addEventListener('message',e=>{
  const d=e.data||{};
  if(d.type==='check')e.waitUntil(check(false));
  if(d.type==='test')e.waitUntil(check('test'));
});
self.addEventListener('periodicsync',e=>{if(e.tag==='pp-check')e.waitUntil(check(false))});
self.addEventListener('notificationclick',e=>{
  const n=e.notification,d=n.data||{};n.close();
  e.waitUntil((async()=>{
    if(e.action==='done'){
      const day=dayNum(),snap=await get('snap'),q=(await get('queue'))||[];
      (d.tasks||[]).forEach(t=>{
        q.push({k:t.k,id:t.id,day});
        const p=snap&&(snap.plants||[]).find(x=>x.id===t.id);
        if(p){if(t.k==='w')p.wDue=day+p.wi;else p.fDue=day+p.fi}
      });
      await set('queue',q);if(snap)await set('snap',snap);
      (await self.clients.matchAll({type:'window',includeUncontrolled:true})).forEach(c=>c.postMessage({type:'pp-queue'}));
      return;
    }
    if(e.action==='later'){const rt=(await get('rt'))||{};rt.snooze=Date.now()+36e5;await set('rt',rt);return}
    const cs=await self.clients.matchAll({type:'window',includeUncontrolled:true});
    for(const c of cs){if('focus' in c){await c.focus();return}}
    await self.clients.openWindow(d.url||'./#care');
  })());
});
