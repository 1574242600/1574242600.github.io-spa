(this["webpackJsonpyoshino-theme"]=this["webpackJsonpyoshino-theme"]||[]).push([[9],{109:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return j}));var a=n(13),r=n.n(a),i=n(20),o=n(3),s=n(4),c=n(7),u=n(6),l=n(0),p=n.n(l),h=n(17),d=(n(30),n(90)),f=h.a.Col,m=function(t){Object(c.a)(n,t);var e=Object(u.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){var t=this.props.data;return p.a.createElement(f,{xs:12,lg:6,sm:8,style:{padding:"16px "}},p.a.createElement("a",{href:t.url,style:{textDecoration:"none"}},p.a.createElement("img",{src:t.avatar,alt:t.title,style:{width:"100px",height:"100px"}}),p.a.createElement("h3",{style:{color:"#555",fontSize:"16px"}},t.name),p.a.createElement("span",{style:{fontSize:"12px"}},t.intr)))}}]),n}(p.a.Component),b=n(89),y=n(2),g=n(88),v=h.a.Row,j=function(t){Object(c.a)(n,t);var e=Object(u.a)(n);function n(t){var a;return Object(o.a)(this,n),(a=e.call(this,t)).state={loading:!0,list:[]},a}return Object(s.a)(n,[{key:"componentDidMount",value:function(){var t=Object(i.a)(r.a.mark((function t(){var e;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=this.state,t.next=3,y.b.getPage("link");case 3:e.list=t.sent,e.loading=!1,y.b.setMeta("description","\u6211\u7684\u670b\u53cb\u4eec"),this.setState(e);case 7:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"renderLinkCard",value:function(){return this.state.list.map((function(t,e){return p.a.createElement(m,{data:t,key:e})}))}},{key:"render",value:function(){return p.a.createElement(v,null,p.a.createElement(d.a,{width:window.isLg?void 0:"95%",loading:this.state.loading},!this.state.loading&&p.a.createElement(g.a,{margin:window.isLg?"24px":"0"},p.a.createElement(b.a,{style:{fontSize:"36px",color:"#444",fontWeight:700,paddingLeft:"16px "}},Object(y.d)("Links")),p.a.createElement(v,{style:{margin:"24px"}},this.renderLinkCard()))))}}]),n}(p.a.Component)},88:function(t,e,n){"use strict";n.d(e,"a",(function(){return p}));var a=n(3),r=n(4),i=n(7),o=n(6),s=n(0),c=n.n(s),u=n(17),l=(n(30),u.a.Row),p=function(t){Object(i.a)(n,t);var e=Object(o.a)(n);function n(){return Object(a.a)(this,n),e.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){return c.a.createElement(l,{style:{backgroundColor:"#f5f5f5",margin:this.props.margin},className:"yoshino-card-shadow"},this.props.children)}}]),n}(c.a.Component);p.defaultProps={margin:"0"}},89:function(t,e,n){"use strict";n.d(e,"a",(function(){return u}));var a=n(3),r=n(4),i=n(7),o=n(6),s=n(0),c=n.n(s),u=function(t){Object(i.a)(n,t);var e=Object(o.a)(n);function n(){return Object(a.a)(this,n),e.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){return c.a.createElement("h2",{style:this.props.style},this.props.children)}}]),n}(c.a.Component)},90:function(t,e,n){"use strict";n.d(e,"a",(function(){return h}));var a=n(3),r=n(4),i=n(7),o=n(6),s=n(0),c=n.n(s),u=n(17),l=(n(30),n(36)),p=u.a.Col,h=function(t){Object(i.a)(n,t);var e=Object(o.a)(n);function n(){return Object(a.a)(this,n),e.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){return c.a.createElement(p,{style:{width:this.props.width,display:"block",margin:"0 auto"}},this.props.loading&&c.a.createElement(l.a,{Loading:this.props.loading}),this.props.children)}}]),n}(c.a.Component);h.defaultProps={width:"92%"}}}]);
//# sourceMappingURL=9.d2618c18.chunk.js.map