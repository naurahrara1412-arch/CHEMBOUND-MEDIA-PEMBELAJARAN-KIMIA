const sectionIds=['beranda','peta','konsep','konsep-lanjutan','audio-visual','simulasi','contoh','kehidupan','latihan','kuis','ringkasan'];
const stepMap={1:'beranda',2:'peta',3:'konsep',4:'konsep-lanjutan',5:'audio-visual',6:'simulasi',7:'contoh',8:'kehidupan',9:'latihan',10:'kuis',11:'ringkasan'};
const stageNarrations=[
'Tahap 1. Kita mulai dari atom nitrogen, N. Konfigurasi elektronnya adalah 1s² 2s² 2p³. Jadi nitrogen memiliki lima elektron valensi. Saat membentuk NH₃, tiga elektron digunakan untuk membentuk tiga ikatan N–H dan tersisa satu pasangan elektron bebas pada N.',
'Tahap 2. Tiga atom hidrogen berikatan dengan nitrogen sehingga terbentuk NH₃. Nitrogen masih memiliki satu pasangan elektron bebas. Pasangan inilah yang akan menjadi sumber dua elektron untuk pembentukan ikatan koordinasi.',
'Tahap 3. Ion H⁺ mendekat sebagai penerima pasangan elektron. H⁺ tidak menyumbangkan pasangan elektron pada ikatan baru; yang menjadi sumber pasangan elektron adalah nitrogen pada NH₃.',
'Tahap 4. Pasangan elektron bebas pada nitrogen didonasikan menuju H⁺. Karena panah dimulai dari pasangan elektron pada N, panah menunjukkan asal pasangan elektron. Setelah digunakan bersama, pasangan ini membentuk ikatan N–H baru.',
'Tahap 5. Setelah terbentuk ikatan baru, spesies yang dihasilkan adalah NH₄⁺ atau ion amonium. Secara keseluruhan reaksinya dapat ditulis NH₃ + H⁺ → NH₄⁺.',
'Tahap 6. Ikatan yang terbentuk dari pasangan elektron yang seluruhnya berasal dari N disebut ikatan kovalen koordinasi. Penting: setelah NH₄⁺ terbentuk, keempat ikatan N–H bersifat ekuivalen; label koordinasi menjelaskan asal pasangan elektron pada proses pembentukan, bukan bahwa satu ikatan tetap berbeda selamanya.'
];
const stages=[
 ['Konfigurasi N','Konfigurasi elektron N: 1s² 2s² 2p³. Lima elektron valensi menjadi dasar pembentukan NH₃.','N','Apa yang dimiliki N pada kulit valensinya?'],
 ['NH₃ terbentuk','Tiga elektron N berpasangan dengan tiga elektron H untuk membentuk tiga ikatan N–H. Satu pasangan elektron tetap bebas pada N.','NH₃','Di mana pasangan elektron bebas N?'],
 ['Pasangan bebas','NH₃ memiliki satu pasangan elektron bebas pada N. Pasangan ini adalah sumber dua elektron untuk ikatan koordinasi.','N:••','Mengapa pasangan ini penting?'],
 ['H⁺ mendekat','H⁺ bertindak sebagai akseptor pasangan elektron. H⁺ tidak membawa pasangan elektron untuk ikatan baru.','H⁺','Siapa yang menyumbangkan pasangan?'],
 ['Donasi elektron','Pasangan bebas N diarahkan menuju H⁺. Panah dimulai dari N karena N adalah donor pasangan elektron.','N: → H⁺','Dari mana panah dimulai?'],
 ['NH₄⁺ terbentuk','NH₃ menerima H⁺ dan menghasilkan NH₄⁺. Keempat ikatan N–H menjadi ekuivalen setelah ion terbentuk.','NH₄⁺','Apa makna ikatan koordinasi?']
];
let stage=0;
function sceneMarkup(i){
 const common=`<div class="sim-chip">${i+1}/6</div>`;
 if(i===0)return common+`<div class="orbital-scene"><div class="orbital atom-orb">N</div><div class="orbital-line">1s² &nbsp; 2s² &nbsp; 2p³</div><div class="electron-pairs"><span>↑↓</span><span>↑↓</span><span>↑ ↑ ↑</span></div></div>`;
 if(i===1)return common+`<div class="lewis-scene"><div class="molecule"><span>H</span><span class="bond">—</span><b>N</b><span class="bond">—</span><span>H</span><i>••</i><span class="down">|<br>H</span></div><small>NH₃ • satu pasangan elektron bebas pada N</small></div>`;
 if(i===2)return common+`<div class="lewis-scene focus"><div class="molecule"><b>N</b><span class="bond">—H</span><span class="bond">—H</span><span class="bond">—H</span><i>••</i></div><div class="callout">pasangan elektron bebas = sumber 2 e⁻</div></div>`;
 if(i===3)return common+`<div class="reaction-scene"><div class="species nh3">NH₃<div class="dots">••</div></div><div class="plus">+</div><div class="species hplus">H⁺</div><div class="role">N = donor &nbsp; • &nbsp; H⁺ = akseptor</div></div>`;
 if(i===4)return common+`<div class="reaction-scene donation"><div class="species nh3">NH₃<div class="dots">••</div></div><div class="arrow">•• ─────────▶</div><div class="species hplus">H⁺</div><div class="role">panah dimulai dari pasangan elektron donor</div></div>`;
 return common+`<div class="reaction-scene final"><div class="species product">[ NH₄⁺ ]</div><div class="equiv"><span>N–H</span><span>N–H</span><span>N–H</span><span>N–H</span></div><div class="role">NH₃ + H⁺ → NH₄⁺</div></div>`;
}
function setStage(i){stage=i;document.getElementById('stageLabel').textContent=`Tahap ${i+1}/6`;document.getElementById('stageTitle').textContent=stages[i][0];document.getElementById('stageText').textContent=stages[i][1];document.getElementById('challengeText').textContent=stages[i][3];document.getElementById('simScene').innerHTML=sceneMarkup(i);document.querySelectorAll('.stage-chip').forEach((x,j)=>x.classList.toggle('active',j===i));}
function nextStage(){setStage(Math.min(5,stage+1))}function prevStage(){setStage(Math.max(0,stage-1))}
const st=document.getElementById('stages');stages.forEach((s,i)=>{const d=document.createElement('button');d.className='stage-chip';d.type='button';d.textContent=`${i+1}. ${s[0]}`;d.onclick=()=>setStage(i);st.appendChild(d)});setStage(0);
function speak(t){if(!('speechSynthesis'in window)){alert('Browser ini belum mendukung audio otomatis.');return;}window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='id-ID';u.rate=.93;u.pitch=1;window.speechSynthesis.speak(u)}
function speakSimulation(){speak(stageNarrations.join(' '))}
function speakVideoExplanation(){speak('Video ini menghubungkan konsep ikatan kovalen koordinasi dengan konteks pertanian. Ammonia atau NH3 memiliki pasangan elektron bebas pada nitrogen. Ketika NH3 menerima H plus, pasangan elektron dari nitrogen digunakan untuk membentuk ikatan baru sehingga terbentuk NH4 plus, ion amonium. Dalam lingkungan tanah dan dalam beberapa pupuk nitrogen, amonium merupakan salah satu bentuk nitrogen yang dapat dijumpai. Jadi, konteks kehidupan sehari-hari di video bukan berarti semua pupuk adalah amonium, melainkan menunjukkan bahwa bentuk nitrogen dan kesetimbangan ammonia-amonium relevan dalam pertanian.')}
const practiceData=[['Pasangan elektron pada ikatan koordinasi berasal dari…',['dua atom secara terpisah','satu atom donor','inti atom'],'satu atom donor'],['Pada NH₃ + H⁺ → NH₄⁺, donor pasangan elektron adalah…',['N pada NH₃','H⁺','atom H bebas'],'N pada NH₃'],['Arah panah pada donor : → akseptor menunjukkan…',['asal pasangan elektron','arah gerak atom','jumlah proton'],'asal pasangan elektron']];let pidx=0;function renderPractice(){const q=practiceData[pidx];document.getElementById('practice').innerHTML=`<h3>${pidx+1}. ${q[0]}</h3>`+q[1].map(a=>`<button onclick="practiceAnswer(this,'${a.replace(/'/g,"\\'")}','${q[2].replace(/'/g,"\\'")}')">${a}</button>`).join('')}function practiceAnswer(btn,a,c){document.querySelectorAll('#practice button').forEach(x=>x.disabled=true);btn.textContent+=(a===c?' ✓ Benar':' ✕ Coba lagi');if(pidx<practiceData.length-1){setTimeout(()=>{pidx++;renderPractice()},700)}}renderPractice();
const quiz=[['Ikatan kovalen adalah…',['berbagi pasangan elektron','memindahkan inti atom','menghilangkan semua elektron'],0],['Donor adalah atom yang…',['menerima pasangan elektron','menyumbangkan pasangan elektron','tidak memiliki elektron'],1],['Akseptor adalah atom yang…',['menerima pasangan elektron','menyumbangkan proton','selalu berupa N'],0],['Konfigurasi N adalah…',['1s² 2s² 2p³','1s² 2p⁶','1s² 2s² 2p⁶'],0],['NH₃ memiliki…',['satu pasangan elektron bebas pada N','tidak memiliki elektron valensi','empat pasangan bebas pada H'],0],['H⁺ dalam simulasi berperan sebagai…',['donor pasangan elektron','akseptor pasangan elektron','pasangan elektron bebas'],1],['Pada N:→H⁺, panah menunjukkan…',['asal pasangan elektron','arah proton','jumlah atom'],0],['Produk utama simulasi adalah…',['NH₄⁺','N₂','H₂'],0]];let qi=0,score=0,answered=false;function renderQuiz(){answered=false;const q=quiz[qi];document.getElementById('quizIndicator').textContent=`Soal ${qi+1} dari 8`;document.getElementById('quizScore').textContent=`Skor: ${score}`;document.getElementById('quizArea').innerHTML=`<h3>${q[0]}</h3>`+q[1].map((a,i)=>`<button class="quiz-choice" onclick="answerQuiz(${i})">${String.fromCharCode(65+i)}. ${a}</button>`).join('');document.getElementById('nextQuiz').textContent=qi===7?'Selesai':'Soal Berikutnya'}function answerQuiz(i){if(answered)return;answered=true;if(i===quiz[qi][2])score++;document.querySelectorAll('.quiz-choice').forEach((b,j)=>{b.disabled=true;if(j===quiz[qi][2])b.textContent+=' ✓'}) ;document.getElementById('quizScore').textContent=`Skor: ${score}`}function nextQuiz(){if(!answered&&qi<7)return;if(qi<7){qi++;renderQuiz()}else{document.getElementById('quizArea').innerHTML=`<h3>Kuis selesai 🎉</h3><p>Skormu: <b>${score}/8</b>. Gunakan tombol <b>Lihat Ringkasan</b> di bagian paling bawah untuk melanjutkan.</p>`;document.getElementById('nextQuiz').textContent='Kuis Selesai';document.getElementById('nextQuiz').disabled=true}}renderQuiz();
function saveReason(){localStorage.setItem('chemBondReason',document.getElementById('alasan').value);document.getElementById('reasonSaved').textContent='Tersimpan di perangkat.'}function saveReflection(){localStorage.setItem('chemBondReflection',document.getElementById('refleksi').value);document.getElementById('saved').textContent=' ✓ Refleksi tersimpan.'}
const jaw=localStorage.getItem('chemBondReason');if(jaw)document.getElementById('alasan').value=jaw;const ref=localStorage.getItem('chemBondReflection');if(ref)document.getElementById('refleksi').value=ref;
let currentStep=1;
function applyLockState(){
  sectionIds.forEach((id,i)=>{
    const el=document.getElementById(id);
    if(el)el.classList.toggle('locked',i+1>currentStep);
  });
  document.querySelectorAll('.topbar nav a').forEach(a=>{
    const id=(a.getAttribute('href')||'').replace('#','');
    const idx=sectionIds.indexOf(id)+1;
    const enabled=idx>0 && idx<=currentStep;
    a.classList.toggle('nav-locked',!enabled);
    a.setAttribute('aria-disabled',String(!enabled));
    a.tabIndex=enabled?0:-1;
  });
}
function goStep(n){
  if(n<1 || n>sectionIds.length)return;
  if(n>currentStep+1)return;
  if(n===1 && currentStep===sectionIds.length){currentStep=1}else{currentStep=Math.max(currentStep,n);}
  applyLockState();
  const el=document.getElementById(stepMap[n]);
  if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
  history.replaceState(null,'','#'+stepMap[n]);
  updateProgress();
}
document.querySelectorAll('.topbar nav a').forEach(a=>a.addEventListener('click',e=>{
  const id=(a.getAttribute('href')||'').replace('#','');
  const idx=sectionIds.indexOf(id)+1;
  if(idx<1 || idx>currentStep){e.preventDefault();return;}
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});
  history.replaceState(null,'','#'+id);
}));
const requestedHash=location.hash.replace('#','');
const requestedIndex=sectionIds.indexOf(requestedHash)+1;
currentStep=1;
applyLockState();
if(requestedIndex===1 || !requestedHash)history.replaceState(null,'','#beranda');
else history.replaceState(null,'','#beranda');
function updateProgress(){const max=document.body.scrollHeight-innerHeight;const pct=max>0?Math.round(scrollY/max*100):0;document.getElementById('progressBar').style.width=pct+'%';document.getElementById('progressText').textContent=pct+'%';document.getElementById('heroProgress').textContent=pct+'%'}
addEventListener('scroll',updateProgress);
updateProgress();
