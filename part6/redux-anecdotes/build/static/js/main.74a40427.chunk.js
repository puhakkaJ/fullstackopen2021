(this["webpackJsonpredux-anecdotes"]=this["webpackJsonpredux-anecdotes"]||[]).push([[0],{54:function(t,e,n){"use strict";n.r(e);var r=n(0),c=n(7),a=n.n(c),o=n(3),i=n(5),u=n(23),s=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET_FILTER":return e.filter;default:return t}},d=n(13),j=function(t){return{content:t,votes:0}},l=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1?arguments[1]:void 0;switch(console.log("state now: ",t),console.log("action",e),e.type){case"VOTE":return t.map((function(t){return t.id===e.data.id?Object(d.a)(Object(d.a)({},t),{},{votes:t.votes+1}):t}));case"NEW_ANECDOTE":return t.concat(e.data);case"INIT_ANECDOTES":return e.data;default:return t}},f="You can vote exciting anectodes or add new ones",O=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"NEW_NOTIFICATION":return e.data;case"CLEAR_NOTIFICATION":return"";default:return t}},b=Object(i.combineReducers)({anecdotes:l,filter:s,notification:O}),v=Object(i.createStore)(b,Object(u.composeWithDevTools)()),p=n(4),h=n.n(p),x=n(6),T=n(12),I=n.n(T),N="http://localhost:3001/anecdotes",E={getAll:function(){var t=Object(x.a)(h.a.mark((function t(){var e;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,I.a.get(N);case 2:return e=t.sent,t.abrupt("return",e.data);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),createNew:function(){var t=Object(x.a)(h.a.mark((function t(e){var n,r;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={content:e},t.next=3,I.a.post(N,n);case 3:return r=t.sent,t.abrupt("return",r.data);case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},y=n(1),g=function(t){var e=Object(o.b)(),n=function(){var t=Object(x.a)(h.a.mark((function t(n){var r,c;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),r=n.target.anecdote.value,n.target.anecdote.value="",t.next=5,E.createNew(r);case 5:c=t.sent,e({type:"NEW_ANECDOTE",data:j(c)}),e({type:"NEW_NOTIFICATION",data:"you added '".concat(r,"'")}),setTimeout((function(){e({type:"CLEAR_NOTIFICATION"})}),5e3);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(y.jsxs)("div",{children:[Object(y.jsx)("h2",{children:"create new"}),Object(y.jsxs)("form",{onSubmit:n,children:[Object(y.jsx)("input",{name:"anecdote"}),Object(y.jsx)("button",{type:"submit",children:"create"})]})]})},C=function(){var t=Object(o.b)();return Object(y.jsxs)("div",{style:{marginBottom:10},children:["filter ",Object(y.jsx)("input",{onChange:function(e){e.preventDefault();var n=e.target.value;t(function(t){return{type:"SET_FILTER",filter:t}}(n))}})]})},w=function(){var t=Object(o.c)((function(t){return t.notification}));return""===t?Object(y.jsx)("div",{}):Object(y.jsx)("div",{style:{border:"solid",padding:10,borderWidth:1},children:t})},m=function(t){var e=t.anecdote,n=t.handleClick;return Object(y.jsxs)("div",{children:[e.content,Object(y.jsxs)("div",{children:[" has ",e.votes,Object(y.jsx)("button",{onClick:n,children:"vote"})]})]})},A=function(){var t=Object(o.b)(),e=Object(o.c)((function(t){return""===t.filter?t.anecdotes:t.anecdotes.filter((function(e){return e.content.toLowerCase().includes(t.filter.toLowerCase())}))}));return Object(y.jsxs)("div",{children:[Object(y.jsx)(w,{}),Object(y.jsx)("br",{}),Object(y.jsx)(C,{}),e.sort((function(t,e){return t.votes-e.votes})).reverse().map((function(e){return Object(y.jsx)(m,{anecdote:e,handleClick:function(){var n;t({type:"VOTE",data:{id:e.id}}),t((n=e.content,{type:"NEW_NOTIFICATION",data:"you voted '".concat(n,"'")})),setTimeout((function(){t({type:"CLEAR_NOTIFICATION"})}),5e3)}},e.id)}))]})},_=function(){var t=Object(o.b)();return Object(r.useEffect)((function(){E.getAll().then((function(e){return t(function(t){return{type:"INIT_ANECDOTES",data:t}}(e))}))}),[t]),Object(y.jsxs)("div",{children:[Object(y.jsx)("h2",{children:"Anecdotes"}),Object(y.jsx)(A,{}),Object(y.jsx)(g,{})]})};a.a.render(Object(y.jsx)(o.a,{store:v,children:Object(y.jsx)(_,{})}),document.getElementById("root"))}},[[54,1,2]]]);
//# sourceMappingURL=main.74a40427.chunk.js.map