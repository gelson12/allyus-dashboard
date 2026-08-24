import{Y as V,u as J,D as W,r as o,j as n}from"./index-Dsz1Rfbu.js";class L extends Error{constructor(a,l){super(`kiosk ${a}${l?` (${l})`:""}`),this.kind=a,this.status=l}}function Q(e){return e===401?"unauthorised":e===403||e===402?"forbidden":e===429?"throttled":e===400||e===404?"notOpen":"server"}async function M(e,a,l){let h;try{h=await fetch(`${V}${a}`,{...l,headers:{...l.headers??{},"x-atlas-checkin-key":e},credentials:"omit",cache:"no-store"})}catch{throw new L("offline")}if(!h.ok)throw new L(Q(h.status),h.status);return await h.json()}function X(e,a){return M(e,"/public/checkin/sessions",{method:"GET",signal:a})}function Z(e,a,l){return M(e,"/public/checkin/claim",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a),signal:l})}const _="allyus_kiosk_key",ee=6e4,ne=7e3,te=45e3,ie=2e4;function oe(){var a,l;let e=null;try{const h=window.location.hash.replace(/^#/,""),f=new URLSearchParams(h),v=f.get("k")??f.get("key");v&&v.startsWith("wk_")&&(e=v)}catch{}if(e){try{(a=window.localStorage)==null||a.setItem(_,e)}catch{}try{window.history.replaceState(null,"",window.location.pathname+window.location.search)}catch{}return e}try{return((l=window.localStorage)==null?void 0:l.getItem(_))??null}catch{return null}}function se(){var e;try{(e=window.localStorage)==null||e.removeItem(_)}catch{}}function re(e,a){try{return new Date(e).toLocaleTimeString(a,{hour:"2-digit",minute:"2-digit"})}catch{return e.slice(11,16)}}function ce(){const e=J(),{lang:a,setLang:l,supported:h}=W(),[f,v]=o.useState(null),[k,d]=o.useState("loading"),[$,B]=o.useState([]),[P,F]=o.useState(null),[T,w]=o.useState(""),[x,D]=o.useState(null),[E,O]=o.useState(!1),[g,p]=o.useState(null),[q,K]=o.useState(!1),z=o.useRef(null),C=o.useRef(null),I=o.useRef(null),j=o.useRef(null),A=o.useRef(null),b=o.useRef(!0);o.useEffect(()=>{const t=document.title;document.title=e("kiosk.title");let i=document.querySelector('meta[name="robots"]');const c=i===null;i||(i=document.createElement("meta"),i.name="robots",document.head.appendChild(i));const r=i.content;return i.content="noindex,nofollow",()=>{document.title=t,c?i==null||i.remove():i&&(i.content=r)}},[e]),o.useEffect(()=>{const t=oe();v(t),t||d("unprovisioned")},[]);const u=t=>{t.current!==null&&(window.clearTimeout(t.current),t.current=null)},R=o.useCallback(async t=>{var c;(c=A.current)==null||c.abort();const i=new AbortController;A.current=i;try{const r=await X(t,i.signal);if(!b.current)return;B(r.sessions),p(s=>s==="notOpen"?s:null),K(!1),d(s=>s==="entering"||s==="result"?s:"idle")}catch(r){if(!b.current||i.signal.aborted)return;const s=r instanceof L?r.kind:"server";if(s==="unauthorised"||s==="forbidden"){d("blocked"),p(s);return}p(s),K(!0),d(m=>m==="loading"?"idle":m)}},[]);o.useEffect(()=>{if(b.current=!0,!f)return;const t=async()=>{document.hidden||await R(f),b.current&&(u(C),C.current=window.setTimeout(()=>void t(),g==="throttled"?ie:ee))};t();const i=()=>{document.hidden||(u(C),t())};return document.addEventListener("visibilitychange",i),window.addEventListener("online",i),()=>{var c;b.current=!1,document.removeEventListener("visibilitychange",i),window.removeEventListener("online",i),u(C),(c=A.current)==null||c.abort()}},[f,R,g]),o.useEffect(()=>{const t=navigator;if(!t.wakeLock)return;let i=null,c=!1;const r=()=>{var s;document.hidden||(s=t.wakeLock)==null||s.request("screen").then(m=>{if(c){m.release();return}i=m}).catch(()=>{})};return r(),document.addEventListener("visibilitychange",r),()=>{c=!0,document.removeEventListener("visibilitychange",r);try{i==null||i.release()}catch{}}},[]);const N=o.useCallback(()=>{u(I),u(j),w(""),D(null),F(null),O(!1),p(t=>t==="notOpen"?null:t),d(t=>t==="blocked"?t:"idle")},[]);o.useEffect(()=>{if(u(j),k==="entering")return j.current=window.setTimeout(N,te),()=>u(j)},[k,T,N]),o.useEffect(()=>()=>{u(I),u(j)},[]);const S=$,y=o.useMemo(()=>S.find(t=>t.occurrenceId===P)??null,[S,P]);function Y(t){F(t.occurrenceId),w(""),p(i=>i==="notOpen"?null:i),d("entering"),window.setTimeout(()=>{var i;return(i=z.current)==null?void 0:i.focus()},50)}async function H(t){var c;if(t.preventDefault(),!f||!y||E)return;const i=T.trim();if(i.length<3){(c=z.current)==null||c.focus();return}O(!0),p(null);try{const r=await Z(f,{occurrenceId:y.occurrenceId,contact:i});if(!b.current)return;w(""),D({found:r.found,status:r.status,serviceName:r.serviceName??y.serviceName,memberState:r.memberState}),d("result"),r.found&&B(s=>s.map(m=>m.occurrenceId===y.occurrenceId?{...m,checkedIn:m.checkedIn+1}:m)),u(I),I.current=window.setTimeout(N,ne)}catch(r){if(!b.current)return;w("");const s=r instanceof L?r.kind:"server";if(s==="unauthorised"||s==="forbidden"){d("blocked"),p(s);return}p(s),s==="notOpen"&&(d("idle"),F(null),R(f))}finally{b.current&&O(!1)}}function G(){se(),v(null),B([]),p(null),d("unprovisioned")}const U=g==="offline"?e("kiosk.noticeOffline"):g==="throttled"?e("kiosk.noticeBusy"):g==="server"?e("kiosk.noticeServer"):g==="notOpen"?e("kiosk.noticeNotOpen"):null;return n.jsxs("div",{className:"kiosk",lang:a,children:[n.jsx(ae,{}),n.jsxs("header",{className:"kiosk-top",children:[n.jsx("span",{className:"kiosk-brand","aria-hidden":"true",children:"ALLYUS"}),n.jsx("select",{className:"kiosk-lang",value:a,"aria-label":e("langSwitcher.label"),onChange:t=>l(t.target.value),children:h.map(t=>n.jsx("option",{value:t.code,children:t.name},t.code))})]}),U&&k!=="blocked"&&n.jsxs("p",{className:"kiosk-notice",role:"status",children:[U,q&&` ${e("kiosk.noticeStale")}`]}),n.jsxs("main",{className:"kiosk-main",children:[k==="unprovisioned"&&n.jsxs("section",{className:"kiosk-panel",children:[n.jsx("h1",{className:"kiosk-h1",children:e("kiosk.setupTitle")}),n.jsx("p",{className:"kiosk-lead",children:e("kiosk.setupBody")}),n.jsx("p",{className:"kiosk-fine",children:e("kiosk.setupHint")})]}),k==="blocked"&&n.jsxs("section",{className:"kiosk-panel",children:[n.jsx("h1",{className:"kiosk-h1",children:e(g==="forbidden"?"kiosk.blockedPlanTitle":"kiosk.blockedTitle")}),n.jsx("p",{className:"kiosk-lead",children:e(g==="forbidden"?"kiosk.blockedPlanBody":"kiosk.blockedBody")}),n.jsx("button",{type:"button",className:"kiosk-btn",onClick:G,children:e("kiosk.blockedAction")})]}),k==="loading"&&n.jsx("section",{className:"kiosk-panel",children:n.jsx("p",{className:"kiosk-lead",children:e("kiosk.loading")})}),k==="idle"&&S.length===0&&n.jsxs("section",{className:"kiosk-panel",children:[n.jsx("h1",{className:"kiosk-h1",children:e("kiosk.nothingTitle")}),n.jsx("p",{className:"kiosk-lead",children:e("kiosk.nothingBody")})]}),k==="idle"&&S.length>0&&n.jsxs("section",{className:"kiosk-panel",children:[n.jsx("h1",{className:"kiosk-h1",children:e("kiosk.pickTitle")}),n.jsx("ul",{className:"kiosk-sessions",children:S.map(t=>n.jsx("li",{children:n.jsxs("button",{type:"button",className:"kiosk-session",onClick:()=>Y(t),children:[n.jsx("span",{className:"kiosk-session-name",children:t.serviceName}),n.jsxs("span",{className:"kiosk-session-meta",children:[re(t.startAt,a)," · ",e("kiosk.seatCount",{in:String(t.checkedIn),of:String(t.seatsTaken)})]})]})},t.occurrenceId))})]}),k==="entering"&&y&&n.jsxs("section",{className:"kiosk-panel",children:[n.jsx("h1",{className:"kiosk-h1",children:y.serviceName}),n.jsx("p",{className:"kiosk-lead",children:e("kiosk.enterPrompt")}),n.jsxs("form",{className:"kiosk-form",onSubmit:t=>void H(t),children:[n.jsx("label",{className:"kiosk-sr",htmlFor:"kiosk-contact",children:e("kiosk.enterPrompt")}),n.jsx("input",{id:"kiosk-contact",ref:z,className:"kiosk-input",type:"text",inputMode:"email",autoComplete:"off",autoCorrect:"off",autoCapitalize:"none",spellCheck:!1,name:"kiosk-contact",maxLength:200,value:T,disabled:E,placeholder:e("kiosk.enterPlaceholder"),onChange:t=>w(t.target.value)}),n.jsx("button",{type:"submit",className:"kiosk-btn kiosk-btn-primary",disabled:E||T.trim().length<3,children:e(E?"kiosk.checkingIn":"kiosk.checkInBtn")}),n.jsx("button",{type:"button",className:"kiosk-link",onClick:N,children:e("kiosk.back")})]}),n.jsx("p",{className:"kiosk-fine",children:e("kiosk.privacyNote")})]}),k==="result"&&x&&n.jsxs("section",{className:x.found?"kiosk-panel kiosk-yes":"kiosk-panel kiosk-no",role:"status","aria-live":"polite",children:[x.found?n.jsxs(n.Fragment,{children:[n.jsx("h1",{className:"kiosk-h1 kiosk-huge",children:e("kiosk.welcome")}),n.jsx("p",{className:"kiosk-lead",children:x.status==="LATE"?e("kiosk.doneLate",{name:x.serviceName??""}):e("kiosk.done",{name:x.serviceName??""})}),x.memberState==="PAST_DUE"&&n.jsx("p",{className:"muted",children:e("kiosk.membershipNeedsAttention")})]}):n.jsxs(n.Fragment,{children:[n.jsx("h1",{className:"kiosk-h1",children:e("kiosk.notFoundTitle")}),n.jsx("p",{className:"kiosk-lead",children:e("kiosk.notFoundBody")})]}),n.jsx("button",{type:"button",className:"kiosk-btn kiosk-btn-primary",onClick:N,children:e("kiosk.startOver")})]})]})]})}function ae(){return n.jsx("style",{children:`
      .kiosk {
        --k-bg: #0B0D10;
        --k-panel: #12151A;
        --k-line: #262B33;
        --k-emerald: #10B981;
        --k-emerald-deep: #047857;
        --k-amber: #F59E0B;
        --k-ink: #FFFFFF;
        --k-mute: #B4BCC6;
        position: fixed;
        inset: 0;
        display: flex;
        flex-direction: column;
        background: var(--k-bg);
        color: var(--k-ink);
        font-family: 'Segoe UI Variable Display', 'Segoe UI', system-ui, -apple-system, sans-serif;
        font-size: 1.05rem;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        touch-action: manipulation;
        overflow-y: auto;
      }
      .kiosk :focus-visible {
        outline: 4px solid var(--k-emerald);
        outline-offset: 3px;
      }
      .kiosk-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.9rem 1.4rem;
        border-bottom: 1px solid var(--k-line);
        flex: 0 0 auto;
      }
      .kiosk-brand {
        font-weight: 700;
        letter-spacing: 0.22em;
        font-size: 0.95rem;
        color: var(--k-emerald);
      }
      .kiosk-lang {
        min-height: 2.9rem;
        padding: 0.4rem 0.7rem;
        border-radius: 0.6rem;
        border: 1px solid var(--k-line);
        background: var(--k-panel);
        color: var(--k-ink);
        font-size: 1rem;
        font-family: inherit;
      }
      .kiosk-notice {
        margin: 0;
        padding: 0.85rem 1.4rem;
        background: rgba(245, 158, 11, 0.14);
        border-bottom: 1px solid rgba(245, 158, 11, 0.4);
        color: #FDE68A;
        font-size: 1.05rem;
        flex: 0 0 auto;
      }
      .kiosk-main {
        flex: 1 1 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.5rem;
      }
      .kiosk-panel {
        width: 100%;
        max-width: 44rem;
        display: flex;
        flex-direction: column;
        gap: 1.4rem;
        text-align: center;
      }
      .kiosk-h1 {
        margin: 0;
        font-size: clamp(2rem, 6vw, 3.4rem);
        line-height: 1.1;
        font-weight: 700;
      }
      .kiosk-huge { font-size: clamp(2.6rem, 9vw, 5rem); }
      .kiosk-lead {
        margin: 0;
        font-size: clamp(1.15rem, 2.6vw, 1.6rem);
        color: var(--k-mute);
      }
      .kiosk-fine {
        margin: 0;
        font-size: 1rem;
        color: var(--k-mute);
        opacity: 0.85;
      }
      .kiosk-sessions {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .kiosk-session,
      .kiosk-btn {
        -webkit-user-select: none;
        user-select: none;
        width: 100%;
        min-height: 4.5rem;
        border-radius: 1rem;
        border: 2px solid var(--k-line);
        background: var(--k-panel);
        color: var(--k-ink);
        font-family: inherit;
        font-size: 1.35rem;
        font-weight: 600;
        cursor: pointer;
        padding: 1rem 1.3rem;
      }
      .kiosk-session {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.3rem;
        text-align: left;
      }
      .kiosk-session:active { border-color: var(--k-emerald); }
      .kiosk-session-name { font-size: 1.6rem; }
      .kiosk-session-meta {
        font-size: 1.1rem;
        font-weight: 500;
        color: var(--k-mute);
      }
      .kiosk-btn-primary {
        background: linear-gradient(135deg, var(--k-emerald-deep), var(--k-emerald));
        border-color: transparent;
        color: #04140E;
        font-size: 1.5rem;
      }
      .kiosk-btn[disabled] { opacity: 0.45; cursor: default; }
      .kiosk-link {
        background: none;
        border: none;
        color: var(--k-mute);
        font-family: inherit;
        font-size: 1.15rem;
        text-decoration: underline;
        min-height: 3.2rem;
        cursor: pointer;
      }
      .kiosk-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .kiosk-input {
        width: 100%;
        min-height: 4.5rem;
        border-radius: 1rem;
        border: 2px solid var(--k-line);
        background: #05070A;
        color: var(--k-ink);
        font-family: inherit;
        /* 1.6rem is also what keeps iOS/Android from zooming the viewport on
           focus, which on a mounted tablet leaves the page scrolled sideways
           with no obvious way back. */
        font-size: 1.6rem;
        text-align: center;
        padding: 0.9rem 1rem;
      }
      .kiosk-input::placeholder { color: #6B7280; }
      .kiosk-yes .kiosk-h1 { color: var(--k-emerald); }
      .kiosk-no .kiosk-h1 { color: var(--k-amber); }
      .kiosk-sr {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
      @media (prefers-reduced-motion: no-preference) {
        .kiosk-panel { animation: kiosk-in 180ms ease-out; }
        @keyframes kiosk-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: none; }
        }
      }
    `})}export{ce as KioskPage};
