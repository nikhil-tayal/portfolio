#!/usr/bin/env node
// Generates public/showcases/<slug>/workflow.svg for all showcase projects.
// Run: node scripts/generate-workflow-svgs.js

const fs = require('fs');
const path = require('path');

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
  blue:   ['#dae8fc','#6c8ebf'],
  yellow: ['#fff2cc','#d6b656'],
  green:  ['#d5e8d4','#82b366'],
  red:    ['#f8cecc','#b85450'],
  gray:   ['#f5f5f5','#666666'],
};
const AH = { gray:'#666666', blue:'#6c8ebf', green:'#82b366', red:'#b85450' };
const AID = { gray:'g', blue:'b', green:'gr', red:'r' };

function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// ─── Shape primitives ────────────────────────────────────────────────────────

function box(x,y,w,h,col,l1,l2=''){
  const [f,s]=C[col]; const cx=x+w/2; const cy=y+h/2;
  const t1y = l2 ? cy-5 : cy+4;
  return [
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${f}" stroke="${s}" stroke-width="1.5"/>`,
    `<text x="${cx}" y="${t1y}" text-anchor="middle" font-size="10" font-weight="bold" fill="#333">${esc(l1)}</text>`,
    l2?`<text x="${cx}" y="${t1y+15}" text-anchor="middle" font-size="10" fill="#555">${esc(l2)}</text>`:''
  ].filter(Boolean).join('\n');
}

function sbox(x,y,w,h,col,l1){ // small single-line box
  const [f,s]=C[col]; const cx=x+w/2; const cy=y+h/2;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${f}" stroke="${s}" stroke-width="1.2"/>
<text x="${cx}" y="${cy+4}" text-anchor="middle" font-size="9" fill="#333">${esc(l1)}</text>`;
}

function oval(x,y,w,h,l1,l2=''){
  const cx=x+w/2; const cy=y+h/2;
  const t1y = l2 ? cy-5 : cy+4;
  return [
    `<ellipse cx="${cx}" cy="${cy}" rx="${w/2}" ry="${h/2}" fill="${C.green[0]}" stroke="${C.green[1]}" stroke-width="1.5"/>`,
    `<text x="${cx}" y="${t1y}" text-anchor="middle" font-size="10" fill="#333">${esc(l1)}</text>`,
    l2?`<text x="${cx}" y="${t1y+15}" text-anchor="middle" font-size="10" fill="#333">${esc(l2)}</text>`:''
  ].filter(Boolean).join('\n');
}

function dmnd(x,y,w,h,l1,l2=''){
  const cx=x+w/2; const cy=y+h/2;
  const pts=`${cx},${y} ${x+w},${cy} ${cx},${y+h} ${x},${cy}`;
  const t1y = l2 ? cy-5 : cy+4;
  return [
    `<polygon points="${pts}" fill="${C.yellow[0]}" stroke="${C.yellow[1]}" stroke-width="1.5"/>`,
    `<text x="${cx}" y="${t1y}" text-anchor="middle" font-size="10" fill="#333">${esc(l1)}</text>`,
    l2?`<text x="${cx}" y="${t1y+15}" text-anchor="middle" font-size="10" fill="#333">${esc(l2)}</text>`:''
  ].filter(Boolean).join('\n');
}

function cyl(x,y,w,h,l1,l2=''){
  const cx=x+w/2; const ry=9; const by=y+ry; const bh=h-ry*2;
  const cy=y+h/2; const t1y = l2 ? cy-5 : cy+4;
  return [
    `<rect x="${x}" y="${by}" width="${w}" height="${bh}" fill="${C.green[0]}" stroke="${C.green[1]}" stroke-width="1.5"/>`,
    `<ellipse cx="${cx}" cy="${by}" rx="${w/2-1}" ry="${ry}" fill="${C.green[0]}" stroke="${C.green[1]}" stroke-width="1.5"/>`,
    `<ellipse cx="${cx}" cy="${by+bh}" rx="${w/2-1}" ry="${ry}" fill="${C.green[0]}" stroke="${C.green[1]}" stroke-width="1.5"/>`,
    `<text x="${cx}" y="${t1y}" text-anchor="middle" font-size="10" font-weight="bold" fill="#333">${esc(l1)}</text>`,
    l2?`<text x="${cx}" y="${t1y+15}" text-anchor="middle" font-size="10" fill="#555">${esc(l2)}</text>`:''
  ].filter(Boolean).join('\n');
}

function note(x,y,w,h,txt){
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${C.red[0]}" stroke="${C.red[1]}" stroke-width="1"/>
<text x="${x+w/2}" y="${y+h/2+4}" text-anchor="middle" font-size="9" fill="#666">${esc(txt)}</text>`;
}

function lbl(x,y,text){ return `<text x="${x}" y="${y}" font-size="9" font-style="italic" fill="#aaa">${esc(text)}</text>`; }
function hdr(x,y,text){ return `<text x="${x}" y="${y}" font-size="13" font-weight="bold" fill="#333">${esc(text)}</text>`; }

// ─── Arrow primitives ────────────────────────────────────────────────────────

function harr(x1,y,x2,col='gray',label=''){
  const c=AH[col]; const id=AID[col];
  const lb=label?`\n<text x="${(x1+x2)/2}" y="${y-5}" text-anchor="middle" font-size="9" fill="${c}">${esc(label)}</text>`:'';
  return `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${c}" stroke-width="1.5" marker-end="url(#ah-${id})"/>${lb}`;
}

function varr(x,y1,y2,col='gray',label=''){
  const c=AH[col]; const id=AID[col];
  const lb=label?`\n<text x="${x+5}" y="${(y1+y2)/2+4}" font-size="9" fill="${c}">${esc(label)}</text>`:'';
  return `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${c}" stroke-width="1.5" marker-end="url(#ah-${id})"/>${lb}`;
}

// Diagonal straight arrow
function darr(x1,y1,x2,y2,col='blue'){
  const c=AH[col]; const id=AID[col];
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="1.5" marker-end="url(#ah-${id})"/>`;
}

// Elbow: down from y1 → midY → across to x2 → down to y2
function earr(x1,y1,x2,y2,col='green',midY=null){
  const c=AH[col]; const id=AID[col];
  const my=midY??Math.round((y1+y2)/2);
  return `<path d="M${x1},${y1} L${x1},${my} L${x2},${my} L${x2},${y2}" fill="none" stroke="${c}" stroke-width="1.5" marker-end="url(#ah-${id})"/>`;
}

// U-loop retry: src bottom → yLow → across to dst x → up to dst top
function uarr(x1,yBot,yLow,x2,yTop,label=''){
  return `<path d="M${x1},${yBot} L${x1},${yLow} L${x2},${yLow} L${x2},${yTop}" fill="none" stroke="#b85450" stroke-width="1.5" stroke-dasharray="4 2" marker-end="url(#ah-r)"/>
<text x="${Math.round((x1+x2)/2)}" y="${yLow+12}" text-anchor="middle" font-size="9" fill="#b85450">${esc(label)}</text>`;
}

// ─── SVG wrapper ─────────────────────────────────────────────────────────────

function makeSVG(elements){
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1654 1169" font-family="system-ui,-apple-system,BlinkMacSystemFont,sans-serif">
<defs>
  <marker id="ah-g"  viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#666666"/></marker>
  <marker id="ah-b"  viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#6c8ebf"/></marker>
  <marker id="ah-gr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#82b366"/></marker>
  <marker id="ah-r"  viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#b85450"/></marker>
</defs>
<rect width="1654" height="1169" fill="white"/>
<line x1="40" y1="488" x2="1614" y2="488" stroke="#ccc" stroke-width="1" stroke-dasharray="6 4"/>
${elements.join('\n')}
</svg>`;
}

// ─── Diagram definitions ─────────────────────────────────────────────────────

function helitaxii(){
  const e=[];
  e.push(hdr(40,34,'SYSTEM ARCHITECTURE'));
  e.push(hdr(40,516,'USER JOURNEY — CUSTOMER BOOKING'));

  // Arch: labels
  e.push(lbl(40,70,'Client Layer'));
  e.push(lbl(40,222,'API Layer'));
  e.push(lbl(40,375,'Services & Storage'));

  // Arch: clients
  e.push(box(130,58,155,55,'blue','Customer Web','Next.js'));
  e.push(box(325,58,155,55,'blue','B2B Agent Portal','Next.js · 10+ agents'));
  e.push(box(520,58,155,55,'blue','Admin Console','Next.js · 3 roles'));
  e.push(box(715,58,155,55,'blue','Ground Staff App','React Native · 15 staff'));

  // Arch: API
  const apiCx=455, apiTopY=208, apiBotY=263;
  e.push(box(330,208,250,55,'yellow','NestJS API','REST · JWT Auth · Role Guards'));

  // Arch: services
  e.push(cyl(110,360,120,65,'MongoDB','Primary DB'));
  e.push(box(265,360,130,65,'green','Razorpay','Payments · 200+/mo'));
  e.push(box(430,360,120,65,'green','AWS S3','File Storage'));
  e.push(box(585,360,130,65,'green','AWS SES','Email Confirmations'));
  e.push(cyl(750,360,120,65,'Redis','Cache · Sessions'));
  e.push(note(265,448,130,26,'Webhook · State Machine'));

  // Arch: client → API (diagonal)
  [207,402,597,792].forEach(cx => e.push(darr(cx,113,apiCx,apiTopY,'blue')));
  // Arch: API → services (elbow, midY=311)
  [170,330,490,650,810].forEach(cx => e.push(earr(apiCx,apiBotY,cx,360,'green',311)));
  e.push(varr(330,425,448,'red')); // webhook callback

  // Journey
  const JY=558, JH=55, JCY=JY+JH/2;
  const EY=668, EH=50;
  e.push(oval(40,JY,120,JH,'Customer visits','helitaxii.com'));
  e.push(box(200,JY,130,JH,'blue','Select route','date & seats'));
  e.push(box(370,JY,130,JH,'blue','View available','flights & prices'));
  e.push(box(540,JY,130,JH,'blue','Enter passenger','details'));
  e.push(box(710,JY,130,JH,'yellow','Razorpay','Checkout'));
  e.push(dmnd(888,548,110,75,'Payment','success?'));
  e.push(box(882,EY,125,EH,'red','Show error','retry payment'));
  e.push(box(1050,JY,130,JH,'green','Booking confirmed','+ unique ID'));
  e.push(box(1050,EY,130,EH,'blue','Confirmation email','sent via SES'));
  e.push(box(1230,JY,130,JH,'gray','Customer arrives','at helipad'));
  e.push(box(1230,EY,130,EH,'blue','Staff scans QR','via ground app'));
  e.push(oval(1420,660,120,55,'Check-in','complete ✓'));

  // Journey arrows
  e.push(harr(160,JCY,200));
  e.push(harr(330,JCY,370));
  e.push(harr(500,JCY,540));
  e.push(harr(670,JCY,710));
  e.push(harr(840,JCY,888));
  e.push(varr(943,623,668,'red','No'));
  e.push(harr(998,JCY,1050,'green','Yes'));
  e.push(varr(1115,613,668));
  e.push(harr(1180,JCY,1230));
  e.push(varr(1295,613,668));
  e.push(harr(1360,668+EH/2,1420,'green'));
  e.push(uarr(944,718,745,775,558,'retry'));
  return e;
}

function camoWinglet(){
  const e=[];
  e.push(hdr(40,34,'SYSTEM ARCHITECTURE'));
  e.push(hdr(40,516,'USER JOURNEY — CAMO ENGINEER MAINTENANCE ENTRY'));

  e.push(lbl(40,55,'User Roles'));
  e.push(lbl(40,155,'Web App'));
  e.push(lbl(40,252,'API Layer'));
  e.push(lbl(40,375,'Services'));

  e.push(box(130,48,160,55,'blue','CAMO Engineer','Creates & submits'));
  e.push(box(330,48,160,55,'blue','Inspector','Reviews & signs off'));
  e.push(box(530,48,160,55,'blue','Admin','Approves & archives'));

  const appCx=425, appTopY=145, appBotY=200;
  e.push(box(320,145,210,55,'blue','CAMO Winglet','React.js · Role-based UI'));

  const apiCx=420, apiTopY=248, apiBotY=303;
  e.push(box(285,248,270,55,'yellow','NestJS API','REST · JWT · Role Guards · Templates'));

  e.push(cyl(130,360,130,65,'MongoDB','Aircraft · Logs · Users'));
  e.push(box(300,360,130,65,'green','AWS S3','Docs · Attachments'));
  e.push(box(470,360,130,65,'green','CSV Bulk Import','Historical records'));
  e.push(box(640,360,140,65,'red','DGCA Compliance','Audit-ready records'));

  [210,410,610].forEach(cx => e.push(darr(cx,103,appCx,appTopY,'blue')));
  e.push(varr(appCx,appBotY,apiTopY,'blue'));
  [195,365,535,710].forEach(cx => e.push(earr(apiCx,apiBotY,cx,360,'green',332)));

  const JY=558, JH=55, JCY=JY+JH/2;
  const EY=668, EH=50;
  e.push(oval(40,JY,110,JH,'Engineer','logs in'));
  e.push(box(190,JY,130,JH,'blue','Select aircraft','(12+ registered)'));
  e.push(box(360,JY,130,JH,'blue','Choose inspection','template'));
  e.push(box(530,JY,130,JH,'blue','Fill template-driven','maintenance form'));
  e.push(dmnd(710,548,110,75,'All fields','complete?'));
  e.push(box(704,EY,120,EH,'red','Highlight missing','fields'));
  e.push(box(870,JY,130,JH,'yellow','Submit for','Inspector review'));
  e.push(box(1050,JY,130,JH,'blue','Inspector reviews','& signs off'));
  e.push(dmnd(1230,548,110,75,'Inspector','approved?'));
  e.push(box(1224,EY,120,EH,'red','Revision','requested'));
  e.push(box(1400,JY,130,JH,'green','Admin approves','& archives'));
  e.push(oval(1400,660,140,55,'DGCA record','stored ✓'));

  e.push(harr(150,JCY,190));
  e.push(harr(320,JCY,360));
  e.push(harr(490,JCY,530));
  e.push(harr(660,JCY,710));
  e.push(varr(765,623,668,'red','No'));
  e.push(harr(820,JCY,870,'green','Yes'));
  e.push(harr(1000,JCY,1050));
  e.push(harr(1180,JCY,1230));
  e.push(varr(1285,623,668,'red','No'));
  e.push(harr(1340,JCY,1400,'green','Yes'));
  e.push(varr(1465,613,660,'green'));
  e.push(uarr(764,718,742,595,613,'fix & resubmit'));
  return e;
}

function groundStaffApp(){
  const e=[];
  e.push(hdr(40,34,'SYSTEM ARCHITECTURE'));
  e.push(hdr(40,516,'USER JOURNEY — GROUND STAFF QR CHECK-IN'));

  e.push(lbl(40,65,'Client'));
  e.push(lbl(40,222,'API Layer'));
  e.push(lbl(40,372,'Services'));

  e.push(box(130,55,190,65,'blue','Ground Staff App','React Native · 15 staff · 5 helipads'));
  e.push(box(360,55,160,65,'blue','QR Scanner','Camera · Decode booking ID'));
  e.push(box(560,55,170,65,'blue','Push Notifications','FCM · New bookings & alerts'));

  const apiCx=440, apiTopY=214, apiBotY=269;
  e.push(box(315,214,250,55,'yellow','NestJS API','REST · JWT Mobile Auth · CRS Integration'));

  e.push(cyl(195,362,130,65,'MongoDB','Bookings · Check-ins'));
  e.push(box(365,362,140,65,'green','CRS (Helitaxii)','Live inventory sync'));
  e.push(box(545,362,120,65,'green','FCM','Push delivery'));

  [225,440,645].forEach(cx => e.push(darr(cx,120,apiCx,apiTopY,'blue')));
  [260,435,605].forEach(cx => e.push(earr(apiCx,apiBotY,cx,362,'green',316)));

  const JY=558, JH=55, JCY=JY+JH/2;
  const EY=668, EH=50;
  e.push(oval(40,JY,120,JH,'Staff opens','app (PIN/bio)'));
  e.push(box(200,JY,130,JH,'blue','View pending','check-in list'));
  e.push(box(370,JY,130,JH,'blue','Tap Scan QR','camera opens'));
  e.push(box(540,JY,130,JH,'blue','Scan passenger','QR code'));
  e.push(dmnd(720,548,110,75,'Valid','booking?'));
  e.push(box(712,EY,130,EH,'red','Show error','not found / checked'));
  e.push(box(885,JY,130,JH,'green','Show passenger','& flight details'));
  e.push(box(1060,JY,130,JH,'blue','Confirm','check-in'));
  e.push(box(1240,JY,145,JH,'green','CRS booking','updated ✓'));
  e.push(oval(1440,JY,120,JH,'All aboard','confirmed ✓'));

  e.push(harr(160,JCY,200));
  e.push(harr(330,JCY,370));
  e.push(harr(500,JCY,540));
  e.push(harr(670,JCY,720));
  e.push(varr(775,623,668,'red','No'));
  e.push(harr(830,JCY,885,'green','Yes'));
  e.push(harr(1015,JCY,1060));
  e.push(harr(1190,JCY,1240));
  e.push(harr(1385,JCY,1440,'green'));
  e.push(uarr(777,718,742,435,613,'scan next'));
  return e;
}

function pwGulf(){
  const e=[];
  e.push(hdr(40,34,'SYSTEM ARCHITECTURE'));
  e.push(hdr(40,516,'USER JOURNEY — STUDENT LEARNING FLOW'));

  e.push(lbl(40,65,'Client'));
  e.push(lbl(40,225,'API Layer'));
  e.push(lbl(40,372,'Services'));

  e.push(box(130,55,185,65,'blue','PW Gulf Web App','Next.js · SEO · 2M visitors/mo'));
  // 8 modules
  ['Courses','Live Classes','Tests / DPP','Leaderboard'].forEach((t,i)=>
    e.push(sbox(365+i*92,72,88,28,'blue',t)));
  ['Study Material','Discussions','Profile','Notifications'].forEach((t,i)=>
    e.push(sbox(365+i*92,104,88,28,'blue',t)));

  const apiCx=450, apiTopY=218, apiBotY=273;
  e.push(box(355,218,190,55,'yellow','NestJS API','REST · Auth · Modular'));

  e.push(cyl(165,362,140,65,'MongoDB','Users · Courses · Progress'));
  e.push(cyl(345,362,120,65,'Redis','Session · Cache'));
  e.push(box(505,362,120,65,'green','CDN','Video · Assets'));
  e.push(box(665,362,130,65,'green','Notification','Microservice'));

  [222,409].forEach(cx => e.push(darr(cx,120,apiCx,apiTopY,'blue')));
  [235,405,565,730].forEach(cx => e.push(earr(apiCx,apiBotY,cx,362,'green',318)));

  const JY=558, JH=55, JCY=JY+JH/2;
  const EY=668, EH=50;
  e.push(oval(40,JY,115,JH,'Student opens','PW Gulf'));
  e.push(box(195,JY,120,JH,'blue','Login /','Register'));
  e.push(box(355,JY,130,JH,'blue','Browse modules','& courses'));
  e.push(box(525,JY,130,JH,'blue','Enrol & watch','video lecture'));
  e.push(box(695,JY,130,JH,'blue','Attempt','practice test'));
  e.push(dmnd(875,548,110,75,'Test','passed?'));
  e.push(box(869,EY,125,EH,'red','Review material','& retry'));
  e.push(box(1045,JY,130,JH,'green','Score & progress','recorded'));
  e.push(box(1225,JY,130,JH,'blue','Leaderboard','position updated'));
  e.push(oval(1415,JY,120,JH,'DAU +25%','in 3 months ✓'));

  e.push(harr(155,JCY,195));
  e.push(harr(315,JCY,355));
  e.push(harr(485,JCY,525));
  e.push(harr(655,JCY,695));
  e.push(harr(825,JCY,875));
  e.push(varr(930,623,668,'red','No'));
  e.push(harr(985,JCY,1045,'green','Yes'));
  e.push(harr(1175,JCY,1225));
  e.push(harr(1355,JCY,1415,'green'));
  e.push(uarr(931,718,742,590,613,'retry'));
  return e;
}

function notificationMicroservice(){
  const e=[];
  e.push(hdr(40,34,'SYSTEM ARCHITECTURE'));
  e.push(hdr(40,516,'SYSTEM FLOW — EVENT TO DELIVERY'));

  e.push(lbl(40,55,'Producer Services'));
  e.push(lbl(40,155,'Queue'));
  e.push(lbl(40,255,'Microservice'));
  e.push(lbl(40,370,'Delivery Channels'));

  e.push(box(130,48,145,55,'blue','User Service','Reg · Auth events'));
  e.push(box(315,48,145,55,'blue','Course Service','Enrol · Progress events'));
  e.push(box(500,48,145,55,'blue','Payment Service','Success · Failure events'));

  const qCx=390, qTopY=148, qBotY=203;
  e.push(box(290,148,200,55,'yellow','Redis Queue (Bull)','Event bus · Priority queues'));

  const msCx=390, msTopY=248, msBotY=303;
  e.push(box(225,248,330,55,'yellow','NestJS Notification Microservice','Consumer · Template resolver · Channel router'));

  e.push(box(165,362,90,55,'green','FCM','Push'));
  e.push(box(270,362,90,55,'green','AWS SES','Email'));
  e.push(box(375,362,90,55,'green','SMS','Twilio'));
  e.push(box(480,362,90,55,'green','In-App','WebSocket'));
  e.push(cyl(620,362,120,65,'MongoDB','Delivery logs'));

  [202,387,572].forEach(cx => e.push(darr(cx,103,qCx,qTopY,'blue')));
  e.push(varr(qCx,qBotY,msTopY,'yellow'));
  [210,315,420,525,680].forEach(cx => e.push(earr(msCx,msBotY,cx,362,'green',333)));

  const JY=558, JH=55, JCY=JY+JH/2;
  const EY=668, EH=50;
  e.push(oval(40,555,140,60,'Event triggered','e.g. payment_success'));
  e.push(box(220,JY,130,JH,'blue','Producer publishes','event to queue'));
  e.push(box(390,JY,130,JH,'yellow','Microservice','consumes event'));
  e.push(box(560,JY,130,JH,'blue','Resolve template','& user prefs'));
  e.push(dmnd(738,548,110,75,'Multiple','channels?'));
  e.push(box(738,EY,115,EH,'blue','Fan out to','all channels'));
  e.push(box(900,JY,130,JH,'blue','Send via','channel worker'));
  e.push(dmnd(1085,548,110,75,'Delivery','success?'));
  e.push(box(1079,EY,125,EH,'red','Retry (exp. backoff','max 3×)'));
  e.push(box(1250,JY,130,JH,'green','Log delivered','to MongoDB'));
  e.push(oval(1440,JY,120,JH,'Delivery -30%','latency ✓'));

  e.push(harr(180,JCY,220));
  e.push(harr(350,JCY,390));
  e.push(harr(520,JCY,560));
  e.push(harr(690,JCY,738));
  e.push(varr(793,623,668,'blue','Yes'));
  e.push(harr(853,JCY,900,'gray','No'));
  // fan-out → channel worker
  e.push(earr(853,668+EH/2,900,JCY,'gray',JCY));
  e.push(harr(1030,JCY,1085));
  e.push(varr(1140,623,668,'red','No'));
  e.push(harr(1195,JCY,1250,'green','Yes'));
  e.push(harr(1380,JCY,1440,'green'));
  e.push(uarr(1141,718,742,965,613,'retry'));
  return e;
}

function trade360(){
  const e=[];
  e.push(hdr(40,34,'SYSTEM ARCHITECTURE'));
  e.push(hdr(40,516,'USER JOURNEY — EXPORTER CREATING A TRADE'));

  e.push(lbl(40,65,'Client Layer'));
  e.push(lbl(40,222,'API Layer'));
  e.push(lbl(40,370,'Integrations (15+)'));

  e.push(box(130,58,165,55,'blue','Exporter Portal','React.js · 200+ exporters'));
  e.push(box(335,58,165,55,'blue','Importer Portal','React.js · 200+ importers'));

  const apiCx=365, apiTopY=215, apiBotY=270;
  e.push(box(255,215,220,55,'yellow','REST API','Auth · RBAC · Trade management'));

  e.push(cyl(130,362,130,65,'MongoDB','Trades · Docs · Users'));
  e.push(cyl(300,362,120,65,'Redis','Cache · Sessions'));
  e.push(box(460,362,140,65,'green','Logistics APIs','Shipping & tracking'));
  e.push(box(640,362,140,65,'green','Banking APIs','Payment & FX rates'));
  e.push(box(820,362,140,65,'green','Compliance APIs','KYC · AML checks'));

  [212,417].forEach(cx => e.push(darr(cx,113,apiCx,apiTopY,'blue')));
  [195,360,530,710,890].forEach(cx => e.push(earr(apiCx,apiBotY,cx,362,'green',316)));

  const JY=558, JH=55, JCY=JY+JH/2;
  const EY=668, EH=50;
  e.push(oval(40,JY,110,JH,'Exporter','logs in'));
  e.push(box(190,JY,120,JH,'blue','Create trade','record'));
  e.push(box(350,JY,120,JH,'blue','Upload trade','documents'));
  e.push(box(510,JY,120,JH,'blue','Invite importer','to review'));
  e.push(dmnd(685,548,110,75,'Importer','accepts?'));
  e.push(box(679,EY,120,EH,'red','Revision','requested'));
  e.push(box(850,JY,140,JH,'green','Trade finalised','payment confirmed'));
  e.push(box(1040,JY,120,JH,'blue','Shipping','initiated'));
  e.push(box(1210,JY,130,JH,'blue','Container tracking','activated'));
  e.push(oval(1400,JY,130,JH,'Trade archived','✓ 200+ users'));

  e.push(harr(150,JCY,190));
  e.push(harr(310,JCY,350));
  e.push(harr(470,JCY,510));
  e.push(harr(630,JCY,685));
  e.push(varr(740,623,668,'red','No'));
  e.push(harr(795,JCY,850,'green','Yes'));
  e.push(harr(990,JCY,1040));
  e.push(harr(1160,JCY,1210));
  e.push(harr(1340,JCY,1400,'green'));
  e.push(uarr(739,718,742,410,613,'revise & re-upload'));
  return e;
}

function dripSwitch(){
  const e=[];
  e.push(hdr(40,34,'SYSTEM ARCHITECTURE'));
  e.push(hdr(40,516,'USER JOURNEY — INITIATING A USD TRANSFER'));

  e.push(lbl(40,65,'Client'));
  e.push(lbl(40,225,'API Layer'));
  e.push(lbl(40,372,'Services'));

  e.push(box(130,55,200,65,'blue','Drip Switch Portal','React.js · TypeScript · Redux'));

  const apiCx=365, apiTopY=218, apiBotY=273;
  e.push(box(235,218,260,55,'yellow','REST API','Auth · Transactions · Compliance'));

  e.push(cyl(130,362,130,65,'MongoDB','Transaction ledger'));
  e.push(box(300,362,150,65,'green','KYC / Compliance','Identity verification'));
  e.push(box(490,362,150,65,'green','Banking Integration','Wire transfer API'));
  e.push(box(680,362,130,65,'green','FX Rate Service','Live USD rates'));

  e.push(darr(230,120,apiCx,apiTopY,'blue'));
  [195,375,565,745].forEach(cx => e.push(earr(apiCx,apiBotY,cx,362,'green',318)));

  const JY=558, JH=55, JCY=JY+JH/2;
  const EY=668, EH=50;
  e.push(oval(40,JY,120,JH,'User logs into','Drip Switch'));
  e.push(box(200,JY,120,JH,'blue','Initiate USD','transfer'));
  e.push(box(360,JY,130,JH,'blue','Enter amount &','recipient details'));
  e.push(dmnd(545,548,110,75,'KYC','approved?'));
  e.push(box(539,EY,125,EH,'red','Request additional','documents'));
  e.push(box(710,JY,140,JH,'blue','Generate &','confirm transaction'));
  e.push(box(900,JY,120,JH,'yellow','Submit to','banking API'));
  e.push(dmnd(1078,548,110,75,'Bank','confirms?'));
  e.push(box(1072,EY,125,EH,'red','Rollback &','notify user'));
  e.push(box(1248,JY,140,JH,'green','Ledger updated','receipt generated'));
  e.push(oval(1448,JY,130,JH,'$2M+ processed','in 2 months ✓'));

  e.push(harr(160,JCY,200));
  e.push(harr(320,JCY,360));
  e.push(harr(490,JCY,545));
  e.push(varr(600,623,668,'red','No'));
  e.push(harr(655,JCY,710,'green','Yes'));
  e.push(harr(850,JCY,900));
  e.push(harr(1020,JCY,1078));
  e.push(varr(1133,623,668,'red','No'));
  e.push(harr(1188,JCY,1248,'green','Yes'));
  e.push(harr(1388,JCY,1448,'green'));
  e.push(uarr(601,718,742,425,613,'resubmit docs'));
  return e;
}

function containerTracker(){
  const e=[];
  e.push(hdr(40,34,'SYSTEM ARCHITECTURE'));
  e.push(hdr(40,516,'USER JOURNEY — TRACKING A CONTAINER'));

  e.push(lbl(40,65,'Client'));
  e.push(lbl(40,212,'API Layer'));
  e.push(lbl(40,295,'Shipping Carrier APIs'));
  e.push(lbl(40,400,'Storage'));

  e.push(box(130,55,200,65,'blue','Container Tracker App','React.js · 10,000+ req/mo'));

  const apiCx=280, apiTopY=203, apiBotY=258;
  e.push(box(195,203,170,55,'yellow','REST API','Container lookup · Auth'));
  e.push(box(400,203,170,55,'yellow','WebSocket Server','Real-time status push'));

  e.push(box(165,288,120,55,'green','Carrier 1','Corridor A'));
  e.push(box(315,288,120,55,'green','Carrier 2','Corridor B'));
  e.push(box(465,288,120,55,'green','Carrier 3','Corridor C'));
  e.push(cyl(285,392,150,65,'MongoDB','Tracking cache · History'));

  e.push(darr(230,120,apiCx,apiTopY,'blue'));
  e.push(darr(485,230,230,apiBotY/2+apiTopY/2,'yellow')); // WS pushes back
  [225,375,525].forEach(cx => e.push(earr(apiCx,apiBotY,cx,288,'green',273)));
  e.push(earr(apiCx,apiBotY,360,392,'green',318));

  const JY=558, JH=55, JCY=JY+JH/2;
  const EY=668, EH=50;
  e.push(oval(40,JY,120,JH,'User enters','container ID'));
  e.push(box(200,JY,120,JH,'blue','API queries','Carrier 1'));
  e.push(dmnd(372,548,110,75,'Found on','carrier?'));
  e.push(box(366,EY,125,EH,'red','Try Carrier 2','then Carrier 3'));
  e.push(box(538,JY,130,JH,'green','Return tracking','data & route'));
  e.push(box(718,JY,130,JH,'blue','Display timeline','& location'));
  e.push(box(898,JY,130,JH,'yellow','Real-time updates','via WebSocket'));
  e.push(dmnd(1082,548,110,75,'Status','change?'));
  e.push(box(1076,EY,125,EH,'green','Push alert','to user'));
  e.push(oval(1255,JY,145,JH,'Container delivered','✓ 10k+ req/mo'));

  e.push(harr(160,JCY,200));
  e.push(harr(320,JCY,372));
  e.push(varr(427,623,668,'red','No'));
  e.push(harr(482,JCY,538,'green','Yes'));
  e.push(harr(668,JCY,718));
  e.push(harr(848,JCY,898));
  e.push(harr(1028,JCY,1082));
  e.push(varr(1137,623,668,'green','Yes'));
  e.push(harr(1192,JCY,1255,'gray','No (polling)'));
  // Carrier 2/3 → found
  e.push(uarr(491,718,742,603,613,'found on carrier'));
  return e;
}

function pemant(){
  const e=[];
  e.push(hdr(40,34,'SYSTEM ARCHITECTURE'));
  e.push(hdr(40,516,'USER JOURNEY — MSME CREDIT APPLICATION'));

  e.push(lbl(40,55,'Portals'));
  e.push(lbl(40,210,'API Layer'));
  e.push(lbl(40,370,'Services'));

  e.push(box(130,48,165,55,'blue','MSME Portal','React.js · 7,000+ MSMEs'));
  e.push(box(335,48,175,55,'blue','Underwriter Dashboard','React.js · 2,500+ users'));
  e.push(box(550,48,165,55,'blue','Admin Panel','React.js · Management'));

  const apiCx=405, apiTopY=203, apiBotY=258;
  e.push(box(285,203,240,55,'yellow','REST API','Auth · RBAC · Credit management'));

  e.push(cyl(130,360,140,65,'MongoDB','Applications · Decisions'));
  e.push(box(310,360,140,65,'green','Credit Engine','Scoring · Risk model'));
  e.push(box(490,360,140,65,'green','KYC Module','Identity verification'));
  e.push(box(670,360,130,65,'green','AWS S3','GST · Bank statements'));

  [212,422,632].forEach(cx => e.push(darr(cx,103,apiCx,apiTopY,'blue')));
  [200,380,560,735].forEach(cx => e.push(earr(apiCx,apiBotY,cx,360,'green',309)));

  const JY=558, JH=55, JCY=JY+JH/2;
  const EY=668, EH=50;
  e.push(oval(40,JY,115,JH,'MSME visits','PEMANT'));
  e.push(box(195,JY,120,JH,'blue','Register &','KYC verify'));
  e.push(box(355,JY,130,JH,'blue','Submit financials','& documents'));
  e.push(box(535,JY,120,JH,'blue','Underwriter','reviews'));
  e.push(dmnd(712,548,110,75,'Credit','approved?'));
  e.push(box(706,EY,125,EH,'red','Decline / request','more info'));
  e.push(box(882,JY,135,JH,'green','Credit limit set','MSME notified'));
  e.push(box(1067,JY,120,JH,'blue','MSME draws','credit'));
  e.push(box(1237,JY,140,JH,'blue','Repayment schedule','generated'));
  e.push(oval(1437,JY,130,JH,'Active credit line','✓ 7,000+ MSMEs'));

  e.push(harr(155,JCY,195));
  e.push(harr(315,JCY,355));
  e.push(harr(485,JCY,535));
  e.push(harr(655,JCY,712));
  e.push(varr(767,623,668,'red','No'));
  e.push(harr(822,JCY,882,'green','Yes'));
  e.push(harr(1017,JCY,1067));
  e.push(harr(1187,JCY,1237));
  e.push(harr(1377,JCY,1437,'green'));
  e.push(uarr(768,718,742,420,613,'resubmit'));
  return e;
}

function underwriterDashboard(){
  const e=[];
  e.push(hdr(40,34,'SYSTEM ARCHITECTURE'));
  e.push(hdr(40,516,'USER JOURNEY — UNDERWRITER REVIEWING AN APPLICATION'));

  e.push(lbl(40,65,'Client'));
  e.push(lbl(40,225,'API Layer'));
  e.push(lbl(40,372,'Services'));

  e.push(box(130,55,205,65,'blue','Underwriter Dashboard','React.js · Redux · Highcharts'));
  e.push(box(375,55,200,65,'blue','Highcharts Visualisations','Revenue · Debt · Risk charts'));

  const apiCx=380, apiTopY=218, apiBotY=273;
  e.push(box(235,218,290,55,'yellow','REST API','Auth · Application management · Decisions'));

  e.push(cyl(160,362,140,65,'MongoDB','Applications · Decisions'));
  e.push(box(340,362,150,65,'green','Credit Engine','Risk score · Model output'));
  e.push(box(530,362,130,65,'green','Notification','MSME alerts'));

  [232,475].forEach(cx => e.push(darr(cx,120,apiCx,apiTopY,'blue')));
  [230,415,595].forEach(cx => e.push(earr(apiCx,apiBotY,cx,362,'green',318)));

  const JY=558, JH=55, JCY=JY+JH/2;
  const EY=668, EH=50;
  e.push(oval(40,JY,115,JH,'Underwriter','logs in'));
  e.push(box(195,JY,130,JH,'blue','View application','queue'));
  e.push(box(375,JY,130,JH,'blue','Select application','to review'));
  e.push(box(555,JY,135,JH,'blue','Analyse financial','charts (Highcharts)'));
  e.push(box(740,JY,120,JH,'blue','Check credit','risk score'));
  e.push(dmnd(918,548,110,75,'Approve','application?'));
  e.push(box(912,EY,125,EH,'red','Decline / request','more info'));
  e.push(box(1085,JY,135,JH,'green','Set credit limit','& log decision'));
  e.push(box(1270,JY,130,JH,'blue','MSME notified','of decision'));
  e.push(oval(1455,JY,140,JH,'Decision archived','✓ 2,500+ managed'));

  e.push(harr(155,JCY,195));
  e.push(harr(325,JCY,375));
  e.push(harr(505,JCY,555));
  e.push(harr(690,JCY,740));
  e.push(harr(860,JCY,918));
  e.push(varr(973,623,668,'red','No'));
  e.push(harr(1028,JCY,1085,'green','Yes'));
  e.push(harr(1220,JCY,1270));
  e.push(harr(1400,JCY,1455,'green'));
  return e;
}

function hrmsMobileApp(){
  const e=[];
  e.push(hdr(40,34,'SYSTEM ARCHITECTURE'));
  e.push(hdr(40,516,'USER JOURNEY — EMPLOYEE LEAVE REQUEST'));

  e.push(lbl(40,65,'Client'));
  e.push(lbl(40,225,'API Layer'));
  e.push(lbl(40,372,'Services'));

  e.push(box(130,55,190,65,'blue','HRMS Mobile App','React Native · iOS & Android · 50+ staff'));
  ['Attendance','Leave Mgmt','Payroll','Push Notif.'].forEach((t,i)=>
    e.push(sbox(362+i*92,72,88,28,'blue',t)));
  ['Clock-in','Approvals','Payslips','Alerts'].forEach((t,i)=>
    e.push(sbox(362+i*92,104,88,28,'blue',t)));
  e.push(box(748,55,150,65,'blue','Biometric Auth','Face ID · Fingerprint'));

  const apiCx=415, apiTopY=215, apiBotY=270;
  e.push(box(275,215,280,55,'yellow','REST API','Auth · Employee management · Leave workflows'));

  e.push(cyl(165,362,155,65,'MongoDB','Employees · Attendance · Payroll'));
  e.push(box(360,362,130,65,'green','FCM','Push notifications'));
  e.push(box(530,362,140,65,'green','Biometric SDK','Native auth module'));

  [225,548,823].forEach(cx => e.push(darr(cx,120,apiCx,apiTopY,'blue')));
  [242,425,600].forEach(cx => e.push(earr(apiCx,apiBotY,cx,362,'green',316)));

  const JY=558, JH=55, JCY=JY+JH/2;
  const EY=668, EH=50;
  e.push(oval(40,JY,120,JH,'Employee opens','HRMS app'));
  e.push(box(200,JY,120,JH,'blue','Biometric','auth'));
  e.push(box(360,JY,135,JH,'blue','View dashboard','attendance · leave'));
  e.push(box(545,JY,120,JH,'blue','Apply for','leave'));
  e.push(box(715,JY,135,JH,'yellow','Manager notified','via FCM push'));
  e.push(dmnd(908,548,110,75,'Leave','approved?'));
  e.push(box(902,EY,125,EH,'red','Denied push','notification'));
  e.push(box(1078,JY,135,JH,'green','Leave recorded','balance updated'));
  e.push(box(1263,JY,130,JH,'blue','Employee views','monthly payslip'));
  e.push(oval(1453,JY,130,JH,'Records updated','✓ 50+ employees'));

  e.push(harr(160,JCY,200));
  e.push(harr(320,JCY,360));
  e.push(harr(495,JCY,545));
  e.push(harr(665,JCY,715));
  e.push(harr(850,JCY,908));
  e.push(varr(963,623,668,'red','No'));
  e.push(harr(1018,JCY,1078,'green','Yes'));
  e.push(harr(1213,JCY,1263));
  e.push(harr(1393,JCY,1453,'green'));
  return e;
}

// ─── Main ────────────────────────────────────────────────────────────────────

const diagrams = [
  ['helitaxii',                   helitaxii],
  ['camo-winglet',                camoWinglet],
  ['ground-staff-app',            groundStaffApp],
  ['pw-gulf',                     pwGulf],
  ['notification-microservice',   notificationMicroservice],
  ['trade360',                    trade360],
  ['drip-switch',                 dripSwitch],
  ['container-tracker',           containerTracker],
  ['pemant',                      pemant],
  ['underwriter-dashboard',       underwriterDashboard],
  ['hrms-mobile-app',             hrmsMobileApp],
];

const root = path.resolve(__dirname, '..', 'public', 'showcases');

diagrams.forEach(([slug, fn]) => {
  const dir = path.join(root, slug);
  fs.mkdirSync(dir, { recursive: true });
  const svgContent = makeSVG(fn());
  const out = path.join(dir, 'workflow.svg');
  fs.writeFileSync(out, svgContent, 'utf8');
  console.log(`✓ ${out}`);
});

console.log('\nDone — 11 workflow SVGs generated.');
