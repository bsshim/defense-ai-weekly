/**
 * 국방 AI 브리핑 — GAS 프록시 + 웹앱 통합
 *
 * [설치]
 * 1. script.google.com → 새 프로젝트 → 이 코드 붙여넣기
 * 2. 프로젝트 설정 → 스크립트 속성 → ANTHROPIC_API_KEY 추가
 * 3. 배포 → 새 배포 → 웹 앱
 *    - 실행 계정: 나
 *    - 액세스 권한: ⚠️ 반드시 "본인만"으로 설정하세요 (권장).
 *      "모든 사용자"로 배포하면 URL을 아는 누구나 callClaude()를
 *      google.script.run으로 임의 프롬프트와 함께 직접 호출할 수 있어,
 *      당신의 Anthropic API 키/과금이 브리핑 목적과 무관하게 남용될 수
 *      있습니다(오픈 프록시 위험). 조직 내 공유가 꼭 필요하다면
 *      Google Workspace 도메인으로 제한하거나 별도 인증/레이트리밋을
 *      추가한 뒤에만 "모든 사용자"를 고려하세요.
 * 4. 배포 URL을 복사해서 브라우저에서 열기
 */

const API_KEY = () => PropertiesService.getScriptProperties().getProperty('ANTHROPIC_API_KEY');

// ── 웹앱 UI 반환 ──────────────────────────────────────────
function doGet() {
  return HtmlService
    .createHtmlOutput(getHtml())
    .setTitle('국방 AI 브리핑')
    // 클릭재킹 방지를 위해 기본값(DEFAULT) 사용.
    // 다른 사이트에 iframe으로 반드시 임베드해야 하는 경우에만
    // 위험을 인지한 상태로 XFrameOptionsMode.ALLOWALL로 변경하세요.
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
}

// ── 브라우저 → GAS 프록시 → Anthropic API ────────────────
function callClaude(systemPrompt, userPrompt) {
  const key = API_KEY();
  if (!key) return { error: 'ANTHROPIC_API_KEY가 스크립트 속성에 없습니다.' };

  const payload = {
    model: 'claude-sonnet-4-20250514',
    max_tokens: 16000,
    tools: [{ type: 'web_search_20250305', name: 'web_search' }],
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }]
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'web-search-2025-03-05'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    const res  = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', options);
    const code = res.getResponseCode();
    const data = JSON.parse(res.getContentText());

    if (code !== 200) {
      return { error: `API 오류 (HTTP ${code}): ${data.error?.message || res.getContentText()}` };
    }

    const text = (data.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('\n');

    return {
      result: text,
      truncated: data.stop_reason === 'max_tokens'
    };
  } catch (e) {
    return { error: e.message };
  }
}

// ── HTML 웹앱 UI ──────────────────────────────────────────
function getHtml() {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>국방 AI 브리핑</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8f9fa;color:#1a1a1a;font-size:14px}
.wrap{max-width:860px;margin:0 auto;padding:2rem 1rem}
.header{margin-bottom:1.5rem;padding-bottom:1.25rem;border-bottom:1px solid #e5e7eb}
.badge{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:#1d6fbc;background:#e8f1fb;padding:3px 10px;border-radius:4px;margin-bottom:8px}
.dot{width:6px;height:6px;border-radius:50%;background:#1d6fbc}
h1{font-size:22px;font-weight:600;line-height:1.3}
.subtitle{font-size:13px;color:#6b7280;margin-top:4px}
.date-box{background:#f1f5f9;border-radius:8px;padding:8px 14px;font-size:12px;color:#6b7280;margin-top:1rem}
.date-box strong{color:#1a1a1a;font-size:13px}
.notice{display:flex;gap:8px;padding:10px 14px;background:#fffbeb;border:1px solid #fcd34d;border-radius:8px;font-size:12px;color:#92400e;margin-top:10px;line-height:1.6}
.notice.danger{background:#fef2f2;border-color:#fca5a5;color:#991b1b}
.status{display:none;align-items:center;gap:10px;padding:10px 14px;background:#f1f5f9;border-radius:8px;font-size:13px;color:#6b7280;margin-bottom:1rem}
.status.show{display:flex}
.spinner{width:14px;height:14px;border:2px solid #e5e7eb;border-top-color:#1a1a1a;border-radius:50%;animation:spin .7s linear infinite;flex-shrink:0}
@keyframes spin{to{transform:rotate(360deg)}}
.prog-track{flex:1;height:3px;background:#e5e7eb;border-radius:2px;overflow:hidden}
.prog-fill{height:100%;background:#1a1a1a;border-radius:2px;transition:width .4s}
.btn-run{display:flex;align-items:center;gap:8px;padding:9px 22px;font-size:14px;font-weight:600;background:#1a1a1a;color:#fff;border:none;border-radius:8px;cursor:pointer;margin-top:1rem;transition:opacity .15s}
.btn-run:hover{opacity:.85}
.btn-run:disabled{opacity:.4;cursor:not-allowed}
.error{padding:10px 14px;background:#fef2f2;border:1px solid #fca5a5;border-radius:8px;color:#b91c1c;font-size:13px;margin-bottom:1rem;display:none}
.error.show{display:block}
.warn-trunc{display:none;padding:10px 14px;background:#fffbeb;border:1px solid #fcd34d;border-radius:8px;color:#92400e;font-size:12px;margin-bottom:1rem;line-height:1.6}
.warn-trunc.show{display:block}
.result{display:none}
.result.show{display:block}
.result-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;flex-wrap:wrap;gap:8px}
.result-title{font-size:15px;font-weight:600}
.result-meta{font-size:12px;color:#9ca3af}
.actions{display:flex;gap:8px}
.btn-sm{display:flex;align-items:center;gap:5px;padding:6px 12px;font-size:12px;border:1px solid #e5e7eb;border-radius:6px;cursor:pointer;background:#fff;color:#6b7280;transition:all .12s}
.btn-sm:hover{background:#f9fafb;color:#1a1a1a;border-color:#d1d5db}
.tabs{display:flex;border-bottom:1px solid #e5e7eb;margin-bottom:1rem;overflow-x:auto}
.tab{padding:8px 16px;font-size:13px;color:#9ca3af;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;white-space:nowrap}
.tab:hover{color:#1a1a1a}
.tab.on{color:#1a1a1a;border-bottom-color:#1a1a1a;font-weight:600}
.pane{display:none}
.pane.on{display:block}
.full-text{font-size:13px;line-height:1.9;white-space:pre-wrap;word-break:break-word;color:#374151}
.sum-box{padding:1.25rem;background:#f8fafc;border-radius:10px;margin-bottom:1rem}
.sum-box h3{font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px}
.sum-list{list-style:none}
.sum-list li{font-size:13px;line-height:1.6;padding:6px 0;border-bottom:1px solid #f1f5f9;display:flex;gap:8px}
.sum-list li:last-child{border:none}
.num{font-size:11px;font-weight:600;color:#d1d5db;min-width:18px;padding-top:2px}
.card{padding:1rem 1.25rem;border:1px solid #f1f5f9;border-radius:10px;margin-bottom:10px}
.card-title{font-size:14px;font-weight:600;margin-bottom:6px}
.card-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}
.tag{font-size:11px;padding:2px 8px;border-radius:3px;font-weight:600}
.t-us{background:#dbeafe;color:#1e40af}
.t-ops{background:#fee2e2;color:#991b1b}
.t-kr{background:#dcfce7;color:#166534}
.t-tech{background:#fef9c3;color:#854d0e}
.card-body{font-size:13px;line-height:1.7;color:#6b7280}
.insight{font-size:12px;margin-top:8px;padding:6px 10px;border-left:2px solid #93c5fd;color:#1e40af;background:#eff6ff;border-radius:0 4px 4px 0}
.src-row{display:flex;gap:10px;padding:8px 0;border-bottom:1px solid #f9fafb;align-items:flex-start}
.src-row:last-child{border:none}
.src-i{font-size:11px;color:#d1d5db;min-width:20px;padding-top:2px}
.src-title{font-size:13px;color:#374151;line-height:1.4}
.src-meta{font-size:11px;color:#9ca3af;margin-top:2px}
.empty{text-align:center;padding:3rem 1rem;color:#9ca3af}
.empty-t{font-size:15px;font-weight:600;color:#6b7280;margin-bottom:6px}
.empty-d{font-size:13px;line-height:1.6}
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <div class="badge"><span class="dot"></span>OSINT Auto-Briefing</div>
    <h1>국방 AI &amp; 자율무인체계 동향 브리핑</h1>
    <p class="subtitle">실행일 기준 정확히 7일 이내 기사만 수집 · API 키 불필요 (GAS 프록시)</p>
    <div class="date-box">수집 범위: <strong id="dateRange">계산 중...</strong></div>
    <div class="notice">
      ℹ️ API 키는 Google Apps Script 스크립트 속성에 저장됩니다. 브라우저에 노출되지 않습니다.
    </div>
    <div class="notice danger">
      ⚠️ 이 웹앱은 배포자의 Anthropic API 키로 요청을 대신 실행합니다. 배포 시
      액세스 권한을 <strong>"본인만"</strong>으로 설정하세요. "모든 사용자"로 설정하면
      URL을 아는 누구든 이 앱을 통해 배포자의 API 키로 임의의 요청을 실행하고
      과금을 발생시킬 수 있습니다.
    </div>
    <button class="btn-run" id="runBtn" onclick="start()">▶ 브리핑 생성</button>
  </div>

  <div class="status" id="status">
    <div class="spinner"></div>
    <span id="statusTxt">준비 중...</span>
    <div class="prog-track"><div class="prog-fill" id="prog" style="width:5%"></div></div>
  </div>

  <div class="error" id="err"></div>
  <div class="warn-trunc" id="warnTrunc">
    ⚠️ 응답이 최대 출력 길이(max_tokens)에 도달해 중간에 잘렸을 수 있습니다.
    특히 마지막 섹션(주요 출처)이 누락되었을 수 있으니 전체 원문 탭을 확인하세요.
  </div>

  <div class="result" id="result">
    <div class="result-header">
      <div>
        <div class="result-title" id="rTitle"></div>
        <div class="result-meta" id="rMeta"></div>
      </div>
      <div class="actions">
        <button class="btn-sm" onclick="copyAll()">복사</button>
        <button class="btn-sm" onclick="saveFile()">저장</button>
        <button class="btn-sm" onclick="start()">재실행</button>
      </div>
    </div>
    <div class="tabs">
      <div class="tab on" data-t="full" onclick="tab(this)">전체 원문</div>
      <div class="tab" data-t="sum" onclick="tab(this)">핵심 요약</div>
      <div class="tab" data-t="items" onclick="tab(this)">항목별 카드</div>
      <div class="tab" data-t="src" onclick="tab(this)">출처 목록</div>
    </div>
    <div class="pane on" id="p-full"><div class="full-text" id="fullTxt"></div></div>
    <div class="pane" id="p-sum"><div id="sumC"></div></div>
    <div class="pane" id="p-items"><div id="itemsC"></div></div>
    <div class="pane" id="p-src"><div id="srcC"></div></div>
  </div>

  <div class="empty" id="empty">
    <div style="font-size:28px;margin-bottom:12px;opacity:.3">◎</div>
    <div class="empty-t">버튼을 눌러 브리핑을 시작하세요</div>
    <div class="empty-d">오늘 기준 7일 이내 기사만 수집합니다.</div>
  </div>
</div>

<script>
let last = '';

// XSS 방지: innerHTML에 삽입되는 모든 동적 텍스트는 이 함수를 거쳐야 함
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[c]));
}

function dates() {
  const n = new Date(), c = new Date(n - 7*864e5);
  const ko = d => d.toLocaleDateString('ko-KR',{year:'numeric',month:'long',day:'numeric'});
  const iso = d => d.toISOString().slice(0,10);
  const sh = d => d.toLocaleDateString('ko-KR',{month:'short',day:'numeric'});
  return { todayKo:ko(n), cutoffKo:ko(c), todayISO:iso(n), cutoffISO:iso(c), todaySh:sh(n), cutoffSh:sh(c) };
}

(function(){ const d=dates(); document.getElementById('dateRange').textContent=d.cutoffSh+' → '+d.todaySh; })();

function tab(el) {
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('on'));
  document.querySelectorAll('.pane').forEach(p=>p.classList.remove('on'));
  el.classList.add('on');
  document.getElementById('p-'+el.dataset.t).classList.add('on');
}

function setS(txt,pct){
  document.getElementById('status').classList.add('show');
  document.getElementById('statusTxt').textContent=txt;
  document.getElementById('prog').style.width=pct+'%';
}
function hideS(){ document.getElementById('status').classList.remove('show'); }
function showErr(m){ const e=document.getElementById('err'); e.textContent='오류: '+m; e.classList.add('show'); }
function hideErr(){ document.getElementById('err').classList.remove('show'); }
function hideTrunc(){ document.getElementById('warnTrunc').classList.remove('show'); }
function showTrunc(){ document.getElementById('warnTrunc').classList.add('show'); }

function start() {
  hideErr();
  hideTrunc();
  document.getElementById('empty').style.display='none';
  document.getElementById('result').classList.remove('show');
  document.getElementById('runBtn').disabled=true;

  const d = dates();
  document.getElementById('dateRange').textContent=d.cutoffSh+' → '+d.todaySh;
  setS('Claude에 연결 중...', 10);

  const sys = \`당신은 국방 기술 전문 애널리스트입니다.
[날짜 준수 — 최우선]
오늘: \${d.todayKo} (\${d.todayISO})
허용 범위: \${d.cutoffKo} (\${d.cutoffISO}) ~ \${d.todayKo}
이 범위 밖 기사는 절대 포함하지 마십시오. 날짜 불명 기사도 제외.
각 항목에 날짜(YYYY-MM-DD) 반드시 명시.\`;

  const usr = \`오늘(\${d.todayKo}) 기준 \${d.cutoffKo}~\${d.todayKo} 7일 범위 국방 AI·무인기 동향 브리핑 작성.

검색: defense AI drone autonomous UAV CCA UCAV military AI (after:\${d.cutoffISO}), 국방AI 자율무기체계

# 국방 AI & 자율무인체계 일일 동향 브리핑
**기준일:** \${d.todayKo}  **수집:** \${d.cutoffKo} ~ \${d.todayKo}

---
## 핵심 요약
[3~5개, 각 2~3줄]
---
## 1. 미국 국방 AI 프로그램
- **[제목]** (매체, 날짜)  내용+시사점
## 2. AI 무인기 / 자율무기체계
- **[제목]** (매체, 날짜)  내용+시사점
## 3. 전장 드론 사례
- **[제목]** (매체, 날짜)  내용+시사점
## 4. 주요국 정책 & 투자
- **[제목]** (매체, 날짜)  내용+시사점
## 5. 기술 R&D 동향
- **[제목]** (매체, 날짜)  내용+시사점
---
## 한국 안보 시사점
---
## 주요 출처
[번호. 매체 — 제목 (YYYY-MM-DD)]\`;

  setS('웹 검색 및 분석 중... (30~60초)', 20);

  google.script.run
    .withSuccessHandler(function(res) {
      setS('완료!', 100);
      if (res.error) { hideS(); showErr(res.error); document.getElementById('runBtn').disabled=false; return; }
      last = res.result;
      if (res.truncated) showTrunc();
      setTimeout(function(){
        hideS();
        render(res.result, d);
        document.getElementById('runBtn').disabled=false;
      }, 400);
    })
    .withFailureHandler(function(e) {
      hideS(); showErr(e.message||'알 수 없는 오류');
      document.getElementById('runBtn').disabled=false;
    })
    .callClaude(sys, usr);
}

function render(text, d) {
  document.getElementById('result').classList.add('show');
  document.getElementById('rTitle').textContent='국방 AI 브리핑 — '+d.todayKo;
  document.getElementById('rMeta').textContent='수집: '+d.cutoffSh+' ~ '+d.todaySh+' · '+new Date().toLocaleTimeString('ko-KR');
  document.getElementById('fullTxt').textContent=text;
  renderSum(text); renderItems(text); renderSrc(text);
}

function renderSum(text) {
  const m=text.match(/##\s*핵심\s*요약[\s\S]*?\n([\s\S]*?)(?=\n##\s|\n---)/i);
  const lines=(m?m[1]:'').split('\n').map(l=>l.replace(/^[-*\d.]\s*/,'')).filter(l=>l.length>10);
  let h='<div class="sum-box"><h3>핵심 요약</h3><ul class="sum-list">';
  (lines.length?lines:['요약 파싱 불가 — 전체 원문 탭 확인']).slice(0,6).forEach((l,i)=>{
    h+=\`<li><span class="num">\${i+1}</span><span>\${esc(l)}</span></li>\`;
  });
  document.getElementById('sumC').innerHTML=h+'</ul></div>';
}

function renderItems(text) {
  const smap={미국:['t-us','미국'],무인기:['t-ops','무인기'],자율:['t-ops','자율무기'],전장:['t-ops','전장'],한국:['t-kr','한국'],정책:['t-kr','정책'],기술:['t-tech','R&D']};
  function gt(t){const k=t.toLowerCase();for(const[s,v]of Object.entries(smap))if(k.includes(s))return v;return['t-tech','기타'];}
  let h='';
  text.split(/\n##\s+/).forEach(sec=>{
    const nl=sec.indexOf('\n');
    const st=sec.slice(0,nl).replace(/^\d+\.\s*/,'').trim();
    if(!st||/핵심|한국.*안보|출처/.test(st))return;
    const[tc,tl]=gt(st);
    sec.split(/\n-\s+\*\*|\n\*\s+\*\*/).slice(1).forEach(item=>{
      const fl=item.split('\n')[0];
      const rest=item.split('\n').slice(1).join('\n').trim();
      const tm=fl.match(/^(.+?)\*\*\s*\(([^)]*)\)/);
      const it=tm?tm[1].trim():fl.replace(/\*\*/g,'').trim();
      const im=tm?tm[2]:'';
      const ins=rest.match(/시사점[:\s]+(.+)/);
      const ins2=ins?ins[1].trim():'';
      const body=rest.replace(/시사점[:\s]+.+/,'').trim();
      h+=\`<div class="card"><div class="card-title">\${esc(it)}</div><div class="card-tags"><span class="tag \${tc}">\${esc(tl)}</span>\${im?'<span style="font-size:11px;color:#9ca3af">'+esc(im)+'</span>':''}</div><div class="card-body">\${esc(body||rest)}</div>\${ins2?'<div class="insight">▸ '+esc(ins2)+'</div>':''}</div>\`;
    });
  });
  document.getElementById('itemsC').innerHTML=h||'<div class="empty"><div class="empty-t">항목 파싱 불가</div><div class="empty-d">전체 원문 탭 확인</div></div>';
}

function renderSrc(text) {
  const m=text.match(/##\s*주요\s*출처[\s\S]*?\n([\s\S]*?)$/i);
  const lines=(m?m[1]:'').split('\n').filter(l=>l.trim()&&!l.startsWith('#'));
  let h='<div>',any=false;
  lines.forEach((l,i)=>{
    const c=l.replace(/^\d+\.\s*/,'').trim();
    if(!c)return;
    const p=c.split('—');
    any=true;
    h+=\`<div class="src-row"><span class="src-i">\${i+1}</span><div><div class="src-title">\${esc((p[1]||c).trim())}</div><div class="src-meta">\${esc(p[0].trim())}</div></div></div>\`;
  });
  document.getElementById('srcC').innerHTML=h+(any?'':'<div style="font-size:13px;color:#9ca3af;padding:1rem 0">출처 파싱 불가</div>')+'</div>';
}

function copyAll(){
  if(!last)return;
  navigator.clipboard.writeText(last).then(()=>alert('클립보드에 복사됐습니다.'));
}
function saveFile(){
  if(!last)return;
  const d=new Date().toISOString().slice(0,10);
  const b=new Blob([last],{type:'text/plain;charset=utf-8'});
  const u=URL.createObjectURL(b);
  const a=document.createElement('a');
  a.href=u; a.download='국방AI브리핑_'+d+'.md';
  a.click(); URL.revokeObjectURL(u);
}
</script>
</body>
</html>`;
}
