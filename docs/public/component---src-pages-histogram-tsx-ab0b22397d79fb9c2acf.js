(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{262:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),i=a(279),o=a(284),s=a(282);e.default=function(){return r.a.createElement(o.a,null,r.a.createElement(s.a,{title:"Histogram",description:""}),r.a.createElement(i.n,{variant:"h2"},"Histogram"))}},274:function(t,e,a){"use strict";a.d(e,"b",function(){return u});var n=a(0),r=a.n(n),i=a(1),o=a.n(i),s=a(53),c=a.n(s);a.d(e,"a",function(){return c.a});a(275);var l=r.a.createContext({}),u=function(t){return r.a.createElement(l.Consumer,null,function(e){return t.data||e[t.query]&&e[t.query].data?(t.render||t.children)(t.data?t.data.data:e[t.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};u.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},275:function(t,e,a){var n;t.exports=(n=a(286))&&n.default||n},282:function(t,e,a){"use strict";var n=a(288),r=a(1),i=a.n(r),o=a(0),s=a.n(o),c=a(310),l=a.n(c);function u(t){var e=t.description,a=t.lang,r=t.meta,i=t.keywords,o=t.title,c=n.data.site,u=e||c.siteMetadata.description;return s.a.createElement(l.a,{htmlAttributes:{lang:a},title:o,titleTemplate:"%s | "+c.siteMetadata.title,meta:[{content:u,name:"description"},{content:o,property:"og:title"},{content:u,property:"og:description"},{content:"website",property:"og:type"},{content:"summary",name:"twitter:card"},{content:c.siteMetadata.author,name:"twitter:creator"},{content:o,name:"twitter:title"},{content:u,name:"twitter:description"}].concat(i.length>0?{content:i.join(", "),name:"keywords"}:[]).concat(r)})}u.defaultProps={keywords:[],lang:"en",meta:[]},u.propTypes={description:i.a.string,keywords:i.a.arrayOf(i.a.string),lang:i.a.string,meta:i.a.array,title:i.a.string.isRequired},e.a=u},284:function(t,e,a){"use strict";var n=a(285),r=(a(309),a(274)),i=a(1),o=a.n(i),s=a(0),c=a.n(s),l=a(279),u=function(t){var e=t.siteTitle;return c.a.createElement(l.a,{position:"static"},c.a.createElement(l.m,null,c.a.createElement(l.n,{variant:"h6",color:"inherit"},c.a.createElement(r.a,{to:"/"},e)),c.a.createElement(l.b,null,c.a.createElement(r.a,{to:"/histogram"},"Histogram")),c.a.createElement(l.b,null,c.a.createElement(r.a,{to:"/line"},"Line Chart")),c.a.createElement(l.b,null,c.a.createElement(r.a,{to:"/pie"},"Pie Chart")),c.a.createElement(l.b,null,c.a.createElement(r.a,{to:"/joyplot"},"Joy Plot"))))};u.propTypes={siteTitle:o.a.string},u.defaultProps={siteTitle:""};var d=u,m=function(t){var e=t.children;return c.a.createElement(r.b,{query:"755544856",render:function(t){return c.a.createElement(c.a.Fragment,null,c.a.createElement(d,{siteTitle:t.site.siteMetadata.title}),c.a.createElement("div",{style:{flexGrow:2,margin:"0 auto",padding:"0px 1.0875rem 1.45rem",paddingTop:0,width:"100%"}},c.a.createElement("main",null,e)),c.a.createElement("footer",null,"© ",(new Date).getFullYear(),", Built by"," ",c.a.createElement("a",{href:"https://www.infosum.com"},"InfoSum")))},data:n})};m.propTypes={children:o.a.node.isRequired};e.a=m},285:function(t){t.exports={data:{site:{siteMetadata:{title:"Infosum Charts"}}}}},286:function(t,e,a){"use strict";a.r(e);a(54);var n=a(0),r=a.n(n),i=a(1),o=a.n(i),s=a(85),c=a(4),l=function(t){var e=t.location,a=c.default.getResourcesForPathnameSync(e.pathname);return r.a.createElement(s.a,Object.assign({location:e,pageResources:a},a.json))};l.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},e.default=l},288:function(t){t.exports={data:{site:{siteMetadata:{title:"Infosum Charts",description:"Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.",author:"@gatsbyjs"}}}}}}]);
//# sourceMappingURL=component---src-pages-histogram-tsx-ab0b22397d79fb9c2acf.js.map