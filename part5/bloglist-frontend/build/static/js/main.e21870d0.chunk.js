(this["webpackJsonpbloglist-frontend"]=this["webpackJsonpbloglist-frontend"]||[]).push([[0],{23:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n.n(r),a=n(17),o=n.n(a),u=n(6),i=n(2),s=n.n(i),l=n(5),b=n(3),j=(n(23),n(0)),d=function(e){var t=e.user,n=e.blog,c=e.updateLikes,a=e.removeBlog,o=Object(r.useState)(!1),u=Object(b.a)(o,2),i=u[0],s=u[1];return Object(j.jsx)("div",{style:{paddingTop:10,paddingLeft:2,border:"solid Violet",borderWidth:1,marginBottom:5},children:!1===i?Object(j.jsxs)("div",{children:[" ",n.title,Object(j.jsxs)("b",{children:[" ",n.author]}),Object(j.jsx)("button",{type:"button",onClick:function(){return s(!0)},children:"view"})]}):Object(j.jsxs)("div",{children:[" ",n.title,Object(j.jsxs)("b",{children:[" ",n.author]}),Object(j.jsx)("button",{type:"button",onClick:function(){return s(!1)},children:"hide"}),Object(j.jsxs)("div",{children:[Object(j.jsx)("u",{children:n.url}),Object(j.jsx)("br",{}),"likes ",n.likes,Object(j.jsx)("button",{type:"button",onClick:c,children:"like"}),Object(j.jsx)("br",{}),n.user.name]}),t.name===n.user.name?Object(j.jsx)("div",{children:Object(j.jsx)("button",{className:"remove_button",type:"button",onClick:a,children:"remove"})}):Object(j.jsx)("div",{})]})})},f=function(e){var t=e.message,n=e.num;if(null===t)return null;var r="error".concat(n);return Object(j.jsx)("div",{className:r,children:t})},p=c.a.forwardRef((function(e,t){var n=Object(r.useState)(!1),c=Object(b.a)(n,2),a=c[0],o=c[1],u={display:a?"none":""},i={display:a?"":"none"},s=function(){o(!a)};return Object(r.useImperativeHandle)(t,(function(){return{toggleVisibility:s}})),Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{style:u,children:Object(j.jsx)("button",{onClick:s,children:e.buttonLabel})}),Object(j.jsxs)("div",{style:i,className:"togglableContent",children:[e.children,Object(j.jsx)("button",{onClick:s,children:"cancel"})]})]})}));p.displayName="Togglable";var O=p,h=function(e){var t=e.createBlog,n=Object(r.useState)(""),c=Object(b.a)(n,2),a=c[0],o=c[1],u=Object(r.useState)(""),i=Object(b.a)(u,2),s=i[0],l=i[1],d=Object(r.useState)(""),f=Object(b.a)(d,2),p=f[0],O=f[1];return Object(j.jsxs)("div",{children:[Object(j.jsx)("h2",{children:"create new"}),Object(j.jsxs)("form",{onSubmit:function(e){e.preventDefault(),t({title:a,author:s,url:p}),o(""),l(""),O("")},id:"send",children:[Object(j.jsxs)("div",{children:["title",Object(j.jsx)("input",{id:"title",type:"text",value:a,name:"title",onChange:function(e){var t=e.target;return o(t.value)}})]}),Object(j.jsxs)("div",{children:["author",Object(j.jsx)("input",{id:"author",type:"text",value:s,name:"author",onChange:function(e){var t=e.target;return l(t.value)}})]}),Object(j.jsxs)("div",{children:["url",Object(j.jsx)("input",{id:"url",type:"text",value:p,name:"url",onChange:function(e){var t=e.target;return O(t.value)}})]}),Object(j.jsx)("button",{type:"subbmit",children:"create"})]})]})},v=n(7),g=n.n(v),m="/api/blogs",x=null,w={getAll:function(){return g.a.get(m).then((function(e){return e.data}))},setToken:function(e){x="bearer ".concat(e)},create:function(){var e=Object(l.a)(s.a.mark((function e(t){var n,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:x}},e.next=3,g.a.post(m,t,n);case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),update:function(e,t){return g.a.put("".concat(m,"/").concat(e),t).then((function(e){return e.data}))},remove:function(e){var t={headers:{Authorization:x}};return g.a.delete("".concat(m,"/").concat(e),t).then((function(e){return e.data}))}},y={login:function(){var e=Object(l.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},k=function(){var e=Object(r.useState)([]),t=Object(b.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(null),o=Object(b.a)(a,2),i=o[0],p=o[1],v=Object(r.useState)(""),g=Object(b.a)(v,2),m=g[0],x=g[1],k=Object(r.useState)(""),S=Object(b.a)(k,2),C=S[0],T=S[1],B=Object(r.useState)(null),N=Object(b.a)(B,2),I=N[0],L=N[1],A=Object(r.useState)(1),J=Object(b.a)(A,2),U=J[0],D=J[1],E=Object(r.useRef)();Object(r.useEffect)((function(){(function(){var e=Object(l.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.getAll().then((function(e){c(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(r.useEffect)((function(){var e=window.localStorage.getItem("loggedNoteappUser");if(e){var t=JSON.parse(e);L(t),w.setToken(t.token)}}),[]);var R=function(){var e=Object(l.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,y.login({username:m,password:C});case 4:n=e.sent,window.localStorage.setItem("loggedNoteappUser",JSON.stringify(n)),D(3),p("welcome ".concat(m)),setTimeout((function(){p(null)}),5e3),w.setToken(n.token),L(n),x(""),T(""),e.next=21;break;case 15:e.prev=15,e.t0=e.catch(1),console.log(e.t0.message),D(1),p("wrong username of password"),setTimeout((function(){p(null)}),5e3);case 21:case"end":return e.stop()}}),e,null,[[1,15]])})));return function(t){return e.apply(this,arguments)}}(),V=function(){var e=Object(l.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault();try{window.localStorage.removeItem("loggedNoteappUser"),D(3),p("you logged out... See you next time"),setTimeout((function(){p(null)}),5e3),L(null),x(""),T("")}catch(n){console.log(n.message),D(1),p("logout failed"),setTimeout((function(){p(null)}),5e3)}case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),z=function(e){E.current.toggleVisibility(),w.create(e).then((function(e){c(n.concat(e).sort((function(e,t){return e.likes+t.likes})))})),D(2),p("a new blog ".concat(e.title," by ").concat(e.author," added")),setTimeout((function(){p(null)}),5e3)},H=function(){var e=Object(l.a)(s.a.mark((function e(t){var r,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.find((function(e){return e.id===t})),a=Object(u.a)(Object(u.a)({},r),{},{likes:r.likes+1}),e.next=4,w.update(t,Object(u.a)(Object(u.a)({},a),{},{id:t})).catch((function(){D(1),p("Blog '".concat(r.title,"' was already removed from server")),setTimeout((function(){p(null)}),5e3)}));case 4:c(n.map((function(e){return e.id!==t?e:Object(u.a)(Object(u.a)({},Object(u.a)(Object(u.a)({},a),{},{id:t})),{},{user:r.user})})));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),P=function(){var e=Object(l.a)(s.a.mark((function e(t){var r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=n.find((function(e){return e.id===t})),!window.confirm("Remove blog ".concat(r.title," by ").concat(r.author))){e.next=8;break}return e.next=4,w.remove(t).catch((function(){D(1),p("Blog '".concat(r.title,"' was already removed from server")),setTimeout((function(){p(null)}),5e3)}));case 4:D(2),p("Blog '".concat(r.title,"' was succesfully deleted")),setTimeout((function(){p(null)}),5e3),c(n.filter((function(e){return e.id!==t})));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return null===I?Object(j.jsxs)("div",{children:[Object(j.jsx)("h2",{children:"log in to application"}),Object(j.jsx)(f,{message:i,num:U}),Object(j.jsxs)("form",{onSubmit:R,children:[Object(j.jsxs)("div",{children:["username",Object(j.jsx)("input",{type:"text",value:m,name:"Username",onChange:function(e){var t=e.target;return x(t.value)}})]}),Object(j.jsxs)("div",{children:["password",Object(j.jsx)("input",{type:"password",value:C,name:"Password",onChange:function(e){var t=e.target;return T(t.value)}})]}),Object(j.jsx)("button",{type:"login",children:"login"})]})]}):Object(j.jsxs)("div",{children:[Object(j.jsx)("h2",{children:"blogs"}),Object(j.jsx)(f,{message:i,num:U}),Object(j.jsxs)("div",{children:[I.name," logged in",Object(j.jsx)("button",{type:"button",onClick:V,children:"logout"})]}),Object(j.jsx)(O,{buttonLabel:"new note",ref:E,children:Object(j.jsx)(h,{createBlog:z})}),Object(j.jsx)("br",{}),n.sort((function(e,t){return e.likes-t.likes})).reverse().map((function(e){return Object(j.jsx)(d,{user:I,blog:e,updateLikes:function(){return H(e.id)},removeBlog:function(){return P(e.id)}},e.id)}))]})};o.a.render(Object(j.jsx)(k,{}),document.getElementById("root"))}},[[43,1,2]]]);
//# sourceMappingURL=main.e21870d0.chunk.js.map