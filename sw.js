/* Plant Parent service worker: care reminders. Reads the snapshot the page stores in IndexedDB ('pp' > 'kv' > 'snap'). */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
const dayNo=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*60000)/86400000);
const idb=()=>new Promise((res,rej)=>{const q=indexedDB.open('pp',1);q.onupgradeneeded=()=>q.result.createObjectStore('kv');q.onsuccess=()=>res(q.result);q.onerror=()=>rej(q.error)});
const get=async k=>{try{const d=await idb();return await new Promise(r=>{const q=d.transaction('kv').objectStore('kv').get(k);q.onsuccess=()=>r(q.result);q.onerror=()=>r(undefined)})}catch(e){return undefined}};
const set=async(k,v)=>{try{const d=await idb();await new Promise(r=>{const x=d.transaction('kv','readwrite');x.objectStore('kv').put(v,k);x.oncomplete=()=>r();x.onerror=()=>r()})}catch(e){}};

function due(snap,d){
  const r=snap.rem||{},ps=snap.plants||[];
  return{
    w:r.water?ps.filter(p=>!p.rainSkip&&p.wDue<=d):[],
    f:r.feed?ps.filter(p=>!p.resting&&p.fDue<=d):[]
  };
}
async function notify(snap,d,test){
  const tx=snap.tx||{},ar=snap.lang==='ar',j=a=>a.slice(0,6).map(p=>p.name).join(ar?'، ':', ')+(a.length>6?' +'+(a.length-6):'');
  if(test){
    await self.registration.showNotification(tx.t1||'Plant Parent',{body:tx.test||'',tag:'care-test',icon:'icon.svg',badge:'icon.svg',lang:snap.lang,dir:ar?'rtl':'ltr'});
    return;
  }
  const {w,f}=due(snap,d);
  const ids=[...new Set([...w,...f].map(p=>p.id))];
  if(!ids.length)return false;
  const title=ids.length===1?tx.t1:ids.length===2?tx.t2:(tx.tn||'').replace('{n}',ids.length);
  const body=[w.length?'💧 '+tx.water+': '+j(w):'',f.length?'🌱 '+tx.feed+': '+j(f):'',tx.note||''].filter(Boolean).join('\n');
  await self.registration.showNotification((title||'').replace('{n}',ids.length),{body,tag:'care-'+d,icon:'icon.svg',badge:'icon.svg',lang:snap.lang,dir:ar?'rtl':'ltr',
    actions:[{action:'done',title:tx.done||'Done'},{action:'later',title:tx.later||'1h'}],data:{day:d}});
  return true;
}
async function check(){
  const snap=await get('snap');
  if(!snap||!snap.rem||!snap.rem.on)return;
  const d=dayNo(),now=new Date(),[h,m]=(snap.rem.time||'08:00').split(':').map(Number);
  let force=false;
  const later=await get('later');
  if(later){if(Date.now()<later)return;await set('later',null);force=true}
  if(!force){
    if(now.getHours()*60+now.getMinutes()<h*60+m)return;
    if((await get('last'))===d)return;
  }
  if(await notify(snap,d))await set('last',d);
}
self.addEventListener('message',e=>{
  const t=e.data&&e.data.type;
  if(t==='check')e.waitUntil(check());
  else if(t==='test')e.waitUntil((async()=>{const s=await get('snap');if(s)await notify(s,dayNo(),true)})());
});
self.addEventListener('periodicsync',e=>{if(e.tag==='pp-check'||e.tag==='plant-care')e.waitUntil(check())});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil((async()=>{
    if(e.action==='later'){await set('later',Date.now()+3600e3);return}
    if(e.action==='done'){
      const snap=await get('snap'),d=dayNo();
      if(snap){
        const {w,f}=due(snap,d),q=(await get('queue'))||[];
        w.forEach(p=>{q.push({k:'w',id:p.id,day:d});p.wDue=d+(p.wi||7)});
        f.forEach(p=>{q.push({k:'f',id:p.id,day:d});p.fDue=d+(p.fi||30)});
        await set('queue',q);await set('snap',snap);
        (await clients.matchAll({type:'window',includeUncontrolled:true})).forEach(c=>c.postMessage({type:'pp-queue'}));
      }
      return;
    }
    const l=await clients.matchAll({type:'window',includeUncontrolled:true});
    return l.length?l[0].focus():clients.openWindow('./');
  })());
});
