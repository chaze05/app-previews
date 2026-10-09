const fs = require("fs");
const path = require("path");

const APPS = [
  {
    file: "ambag/index.html",
    name: "Ambag",
    glow: "124,108,255",
    glow2: "74,155,255",
    bg: "#0a0d16",
  },
  {
    file: "tipon/index.html",
    name: "Tipon",
    glow: "46,212,122",
    glow2: "14,82,50",
    bg: "#062113",
  },
];

function frameMarkup(app) {
  return `
    <style id="preview-frame">
      @media (min-width: 560px) {
        html {
          background: #05060a;
        }
        body {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 18px;
          background:
            radial-gradient(700px 700px at 78% 10%, rgba(${app.glow},0.26), transparent 60%),
            radial-gradient(650px 650px at 18% 92%, rgba(${app.glow2},0.16), transparent 60%),
            #05060a;
        }
        .preview-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          font: 600 13px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        }
        .preview-bar a,
        .preview-bar span {
          color: rgba(255,255,255,0.72);
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.05);
          padding: 8px 14px;
          border-radius: 999px;
          backdrop-filter: blur(8px);
        }
        .preview-bar a:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.4);
        }
        #root {
          --frame-h: min(840px, calc(100vh - 132px));
          flex: 0 0 auto;
          height: var(--frame-h);
          width: calc(var(--frame-h) * 0.4626);
          border-radius: calc(var(--frame-h) * 0.058);
          overflow: hidden;
          position: relative;
          background: ${app.bg};
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow:
            0 0 0 9px rgba(255,255,255,0.045),
            0 0 0 10px rgba(255,255,255,0.10),
            0 60px 130px rgba(0,0,0,0.65),
            0 0 90px rgba(${app.glow},0.16);
          transform: translateZ(0);
        }
      }
      @media (max-width: 559px) {
        .preview-bar {
          display: none;
        }
      }
    </style>
`;
}

function barMarkup(app) {
  return `
    <div class="preview-bar">
      <a href="/app-previews/">&larr; All previews</a>
      <span>${app.name} &mdash; mobile web preview</span>
    </div>
`;
}

let changed = 0;
for (const app of APPS) {
  const file = path.resolve(app.file);
  let html = fs.readFileSync(file, "utf8");
  if (html.includes('id="preview-frame"')) {
    console.log("already wrapped:", app.file);
    continue;
  }
  html = html.replace("</head>", frameMarkup(app) + "  </head>");
  html = html.replace('<div id="root"></div>', barMarkup(app) + '    <div id="root"></div>');
  fs.writeFileSync(file, html);
  changed += 1;
  console.log("wrapped:", app.file);
}
console.log(changed ? `done (${changed} files)` : "nothing to do");
