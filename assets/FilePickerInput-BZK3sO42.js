import{u as b,r as t,j as i,I as x}from"./index-D2jnBHgl.js";function g({inputRef:r,emptyLabel:d,explain:p,subject:f,onChange:l,disabled:s,...n}){const c=b(),a=t.useId(),u=t.useRef(null),[m,h]=t.useState(null);function k(e){const o=e.target.files;h(!o||o.length===0?null:o.length===1?o[0].name:`${o.length}`),l==null||l(e)}return i.jsxs("span",{className:`file-picker${s?" is-disabled":""}`,children:[i.jsx("input",{...n,id:n.id??a,ref:e=>{u.current=e,typeof r=="function"?r(e):r&&"current"in r&&(r.current=e)},type:"file",className:"file-picker-native",disabled:s,onChange:k}),i.jsx("label",{className:"file-picker-button",htmlFor:n.id??a,children:c("common.chooseFile")}),i.jsx("span",{className:"file-picker-name",children:m??d??c("common.noFileChosen")}),i.jsx(x,{subject:f,children:p}),i.jsx("style",{children:`
        .file-picker {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          max-width: 100%;
        }
        /* Visually hidden, NOT removed: display:none would take it out of
           the tab order and strand every keyboard user. */
        .file-picker-native {
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
        .file-picker-button {
          display: inline-block;
          padding: 0.42rem 0.8rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          background: #fff;
          color: inherit;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          margin: 0;
        }
        .file-picker-button:hover {
          border-color: var(--emerald, #10b981);
        }
        /* The ring the hidden input can no longer draw for itself. */
        .file-picker-native:focus-visible + .file-picker-button {
          outline: 2px solid var(--emerald, #10b981);
          outline-offset: 2px;
        }
        .file-picker-name {
          font-size: 0.86rem;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .file-picker.is-disabled .file-picker-button {
          opacity: 0.55;
          cursor: not-allowed;
        }
        @media (prefers-color-scheme: dark) {
          .file-picker-button {
            background: #23272b;
            border-color: #444;
          }
          .file-picker-name { color: #999; }
        }
      `})]})}export{g as F};
