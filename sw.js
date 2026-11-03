const C='pp-state';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
const dayNo=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*60000)/86400000);
async function load(){const r=await (await caches.open(C)).match('state');return r?r.json():null}
async function save(s){await (await caches.open(C)).put('state',new Response(JSON.stringify(s)))}
async function check(){
  const s=await load();if(!s||!s.on)return;
  const d=dayNo(),n=new Date(),[h,m]=s.time.split(':').map(Number);
  if(s.last===d||n.getHours()*60+n.getMinutes()<h*60+m)return;
  const w=s.items.filter(i=>i.k==='w'&&i.d<=d).map(i=>i.n),f=s.items.filter(i=>i.k==='f'&&i.d<=d).map(i=>i.n);
  if(!w.length&&!f.length)return;
  const ar=s.lang==='ar',j=a=>a.slice(0,6).join(ar?'، ':', ')+(a.length>6?' +'+(a.length-6):'');
  const body=[w.length?(ar?'💧 اسقِ: ':'💧 Water: ')+j(w):'',f.length?(ar?'🌱 سمّد: ':'🌱 Feed: ')+j(f):''].filter(Boolean).join('\n');
  await self.registration.showNotification(ar?'تذكيرات العناية':'Care reminders',{body,tag:'care-'+d,icon:'icon.svg',badge:'icon.svg',lang:s.lang,dir:ar?'rtl':'ltr',data:{url:s.url}});
  s.last=d;await save(s);
}
self.addEventListener('message',e=>{
  if(!e.data||e.data.type!=='plan')return;
  e.waitUntil((async()=>{const old=await load(),p=e.data.plan;
    if(old&&typeof old.last==='number'&&old.last>=p.last)p.last=old.last;
    await save(p);await check()})());
});
self.addEventListener('periodicsync',e=>{if(e.tag==='plant-care')e.waitUntil(check())});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>l.length?l[0].focus():clients.openWindow((e.notification.data&&e.notification.data.url)||'./')));
});
