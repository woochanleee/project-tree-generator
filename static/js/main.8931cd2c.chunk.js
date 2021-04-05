(this["webpackJsonpproject-tree-generator"]=this["webpackJsonpproject-tree-generator"]||[]).push([[0],{15:function(e,t,c){},16:function(e,t,c){},18:function(e,t,c){},19:function(e,t,c){},20:function(e,t,c){"use strict";c.r(t);var n=c(8),r=c.n(n),j=(c(15),c(16),c(0));function a(){return Object(j.jsx)("header",{children:Object(j.jsx)("div",{children:Object(j.jsx)("a",{href:"https://github.com/woochanleee/project-tree-generator",target:"_blank",children:Object(j.jsx)("div",{children:Object(j.jsx)("h1",{children:"Projcet Tree Generator"})})})})})}var o=c(4),i=c(2),d=c(6),s=c(9),u=c(1),h=(c(18),c(10));function b(e){var t=e.treeContent,c=e.treeContents,n=e.setTreeContents,r=e.focusId,a=e.setFocusId,o=e.focusIdChanged,h=e.setFocusIdChanged,b=t.id,l=t.depth,p=t.text,O=Object(u.useCallback)((function(e,t){var n,r=Object(s.a)(c.slice(e));try{for(r.s();!(n=r.n()).done;){var j=n.value;if(j.depth<t)return!0;if(j.depth===t)return!1}}catch(a){r.e(a)}finally{r.f()}return!0}),[c]),x=Object(u.useMemo)((function(){for(var e=[],t=l-1,n=b-2;n>=0;n--)c[n].depth===t&&(t--,e.push(O(c[n].id,c[n].depth)));return e.reverse()}),[c]),f=Object(u.useRef)(null);Object(u.useEffect)((function(){var e;r===b&&(null===(e=f.current)||void 0===e||e.focus(),h(!1))}),[o]);var I=Object(u.useMemo)((function(){return x.map((function(e){return e?"\xa0\xa0\xa0":"\u2502\xa0\xa0"})).join("")+(O(b,l)?"\u2514\u2500":"\u251c\u2500")+"\xa0"}),[x]);return Object(u.useEffect)((function(){var e=Object(d.a)(c);e[b-1].depthIndicator=I,n(e)}),[I]),Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("div",{children:[Object(j.jsx)("span",{children:I}),Object(j.jsx)("input",{contentEditable:!0,ref:f,placeholder:"Folder or File Name",value:p,onChange:function(e){var t=Object(d.a)(c);t[b-1].text=e.target.value,n(t)},onKeyDown:function(e){if("Tab"===e.key&&(1!==b&&e.preventDefault(),1!==l&&e.shiftKey)){for(var t=c.map((function(e,t){return Object(i.a)(Object(i.a)({},e),{},{depth:t+1===b?e.depth-1:e.depth})})),r=b;r<t.length&&!(l>=t[r].depth);r++)t[r].depth=t[r].depth-1;n(t)}var j,o;if("Backspace"===e.key&&(1!==b&&(null!==(j=null===(o=c[b])||void 0===o?void 0:o.depth)&&void 0!==j?j:l)<=l&&""===c[b-1].text)){var s=Object(d.a)(c);s.splice(b-1,1);for(var u=b-1;u<s.length;u++)s[u]=Object(i.a)(Object(i.a)({},s[u]),{},{id:u+1});n(s),a(b-1),h(!0)}if("ArrowUp"===e.key&&1!==b&&(a(b-1),h(!0)),"ArrowDown"===e.key&&c.length!==b&&(a(b+1),h(!0)),"Enter"===e.key){e.preventDefault();var p=Object(d.a)(c);p.splice(b,0,{id:b+1,text:"",depth:l,depthIndicator:""});for(var O=b;O<p.length;O++)p[O]=Object(i.a)(Object(i.a)({},p[O]),{},{id:O+1});n(p),a(b+1),h(!0)}e.shiftKey||"Tab"!==e.key||(e.preventDefault(),1!==b&&c[b-2].depth+1!==l&&n(c.map((function(e,t){return Object(i.a)(Object(i.a)({},e),{},{depth:t+1===b?e.depth+1:e.depth})}))))}})]})})}function l(){var e=Object(u.useState)(""),t=Object(o.a)(e,2),c=t[0],n=t[1],r=Object(u.useState)([{id:1,depth:1,text:"",depthIndicator:""}]),a=Object(o.a)(r,2),i=a[0],d=a[1],s=Object(u.useState)(1),h=Object(o.a)(s,2),l=h[0],p=h[1],O=Object(u.useState)(!1),x=Object(o.a)(O,2),f=x[0],I=x[1],v=Object(u.useState)(!1),N=Object(o.a)(v,2),g=N[0],L=N[1];return Object(j.jsx)("section",{children:Object(j.jsxs)("div",{children:[Object(j.jsx)("h2",{children:"Project Tree"}),Object(j.jsxs)("div",{className:"editor",children:[Object(j.jsx)("button",{className:"copy-button ".concat(g?"success":""),"data-clipboard-text":"```\n"+"\ud83d\udce6 ".concat(c,"\n")+i.map((function(e){return e.depthIndicator+e.text})).join("\n")+"\n```",onClick:function(){L(!0),setTimeout((function(){L(!1)}),1e3)},children:Object(j.jsx)("i",{})}),Object(j.jsxs)("div",{children:[Object(j.jsx)("span",{children:"\ud83d\udce6"}),Object(j.jsx)("input",{placeholder:"Root Folder Name",value:c,onChange:function(e){return n(e.target.value)}})]}),i.map((function(e){return Object(j.jsx)(b,{treeContent:e,treeContents:i,setTreeContents:d,focusId:l,setFocusId:p,focusIdChanged:f,setFocusIdChanged:I},e.id)}))]}),Object(j.jsxs)("div",{className:"manual-wrapper",children:[Object(j.jsx)("h3",{children:"Manual"}),Object(j.jsx)("p",{children:"\u21b5: New Folder"}),Object(j.jsx)("p",{children:"\u232b: Delete Folder"}),Object(j.jsx)("p",{children:"\u21e5: Depth +1"}),Object(j.jsx)("p",{children:"\u21e7 + \u21e5: Depth -1"}),Object(j.jsx)("p",{children:"\u25b3: Up"}),Object(j.jsx)("p",{children:"\u25bd: Down"}),Object(j.jsxs)("p",{children:[Object(j.jsx)("img",{src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01Ljc1IDFhLjc1Ljc1IDAgMDAtLjc1Ljc1djNjMCAuNDE0LjMzNi43NS43NS43NWg0LjVhLjc1Ljc1IDAgMDAuNzUtLjc1di0zYS43NS43NSAwIDAwLS43NS0uNzVoLTQuNXptLjc1IDNWMi41aDNWNGgtM3ptLTIuODc0LS40NjdhLjc1Ljc1IDAgMDAtLjc1Mi0xLjI5OEExLjc1IDEuNzUgMCAwMDIgMy43NXY5LjVjMCAuOTY2Ljc4NCAxLjc1IDEuNzUgMS43NWg4LjVBMS43NSAxLjc1IDAgMDAxNCAxMy4yNXYtOS41YTEuNzUgMS43NSAwIDAwLS44NzQtMS41MTUuNzUuNzUgMCAxMC0uNzUyIDEuMjk4LjI1LjI1IDAgMDEuMTI2LjIxN3Y5LjVhLjI1LjI1IDAgMDEtLjI1LjI1aC04LjVhLjI1LjI1IDAgMDEtLjI1LS4yNXYtOS41YS4yNS4yNSAwIDAxLjEyNi0uMjE3eiIvPjwvc3ZnPg==",alt:"copy button"}),": Copy Project Tree Code For Markdown"]})]})]})})}new(c.n(h).a)(".copy-button");c(19);function p(){return Object(j.jsxs)("footer",{children:["Made By","\xa0",Object(j.jsx)("a",{href:"https://github.com/woochanleee",target:"_blank",children:"\xa9uchanlee"})]})}function O(){return Object(j.jsxs)("main",{children:[Object(j.jsx)(a,{}),Object(j.jsx)(l,{}),Object(j.jsx)(p,{})]})}r.a.render(Object(j.jsx)(O,{}),document.getElementById("root"))}},[[20,1,2]]]);
//# sourceMappingURL=main.8931cd2c.chunk.js.map