(function (root) {
  var THEMES = {
    peach: { bg: '#ffe3d3', card: '#fff', tx: '#3b1f14', btn: '#ff7a59', btx: '#fff', sub: '#9a5b45' },
    lilac: { bg: '#e6dcff', card: '#fff', tx: '#2a1b5c', btn: '#7c4dff', btx: '#fff', sub: '#6d5aa8' },
    mint: { bg: '#d4f5e6', card: '#fff', tx: '#0f3b2b', btn: '#1fa971', btx: '#fff', sub: '#4d8a73' },
    sky: { bg: '#d8ecff', card: '#fff', tx: '#0f2f55', btn: '#2e86f5', btx: '#fff', sub: '#5b7da3' },
    night: { bg: '#15131f', card: '#221f33', tx: '#f4f1ff', btn: '#ffd166', btx: '#2a2200', sub: '#a59fc7' }
  };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function safeUrl(u) {
    u = String(u || '').trim(); if (!u) return '';
    if (/^(mailto:|tel:)/i.test(u)) return u;
    if (!/^[a-z][a-z0-9+.-]*:/i.test(u)) u = 'https://' + u;
    return /^https?:\/\//i.test(u) ? u : '';
  }
  function html(d) {
    var t = THEMES[d.theme] || THEMES.peach, links = (d.links || []).map(function (l) { return { label: String(l.label || '').trim(), url: safeUrl(l.url) }; }).filter(function (l) { return l.label && l.url; });
    var av = d.avatar ? esc(d.avatar) : esc((d.name || '?').trim().charAt(0).toUpperCase());
    var dir = /[\u0600-\u06FF]/.test(d.name + d.bio) ? 'rtl' : 'ltr';
    return '<!doctype html>\n<html lang="en" dir="' + dir + '">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>' + esc(d.name) + '</title>\n<meta name="description" content="' + esc(d.bio) + '">\n<style>\n*{box-sizing:border-box}body{margin:0;min-height:100vh;background:' + t.bg + ';color:' + t.tx + ';font:16px/1.5 system-ui,"Segoe UI",sans-serif;display:flex;justify-content:center;padding:44px 18px}\n.c{width:100%;max-width:440px;text-align:center}.a{width:96px;height:96px;border-radius:50%;background:' + t.btn + ';color:' + t.btx + ';font-size:44px;font-weight:700;display:flex;align-items:center;justify-content:center;margin:0 auto 14px}\nh1{margin:0;font-size:24px}p{margin:6px 0 26px;color:' + t.sub + '}\na{display:block;margin:0 0 12px;padding:15px 18px;border-radius:16px;background:' + t.card + ';color:' + t.tx + ';text-decoration:none;font-weight:600;border:2px solid ' + t.btn + ';transition:transform .12s,background .12s}\na:hover{transform:translateY(-2px);background:' + t.btn + ';color:' + t.btx + '}\n</style>\n</head>\n<body>\n<main class="c">\n<div class="a">' + av + '</div>\n<h1>' + esc(d.name) + '</h1>\n<p>' + esc(d.bio) + '</p>\n' + links.map(function (l) { return '<a href="' + esc(l.url) + '" rel="noopener">' + esc(l.label) + '</a>'; }).join('\n') + '\n</main>\n</body>\n</html>\n';
  }
  function enc(d) { return btoa(unescape(encodeURIComponent(JSON.stringify(d)))); }
  function dec(s) { return JSON.parse(decodeURIComponent(escape(atob(s)))); }
  var api = { THEMES: THEMES, html: html, safeUrl: safeUrl, enc: enc, dec: dec };
  if (typeof module !== 'undefined') module.exports = api; else root.LinkDrop = api;
})(this);
