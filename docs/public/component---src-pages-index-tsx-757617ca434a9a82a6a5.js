(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{264:function(e,t,a){"use strict";a.r(t);var n=a(276),r=a(0),i=a.n(r),l=a(286),o=a(285);t.default=function(){return i.a.createElement(l.a,null,i.a.createElement(o.a,{title:"Home",keywords:["infoSum","charts","react"],description:""}),i.a.createElement("ul",null,i.a.createElement("li",null,i.a.createElement(n.a,{to:"/histogram"},"Histogram")),i.a.createElement("li",null,i.a.createElement(n.a,{to:"/line"},"Line Chart")),i.a.createElement("li",null,i.a.createElement(n.a,{to:"/pie"},"Pie Chart")),i.a.createElement("li",null,i.a.createElement(n.a,{to:"/joyplot"},"Joy Plot")),i.a.createElement("li",null,i.a.createElement(n.a,{to:"/map"},"Map"))))}},276:function(e,t,a){"use strict";a.d(t,"b",function(){return u});var n=a(0),r=a.n(n),i=a(1),l=a.n(i),o=a(53),c=a.n(o);a.d(t,"a",function(){return c.a});a(280);var s=r.a.createContext({}),u=function(e){return r.a.createElement(s.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};u.propTypes={data:l.a.object,query:l.a.string.isRequired,render:l.a.func,children:l.a.func}},280:function(e,t,a){var n;e.exports=(n=a(288))&&n.default||n},285:function(e,t,a){"use strict";var n=a(290),r=a(1),i=a.n(r),l=a(0),o=a.n(l),c=a(305),s=a.n(c);function u(e){var t=e.description,a=e.lang,r=e.meta,i=e.keywords,l=e.title,c=n.data.site,u=t||c.siteMetadata.description;return o.a.createElement(s.a,{htmlAttributes:{lang:a},title:l,titleTemplate:"%s | "+c.siteMetadata.title,meta:[{content:u,name:"description"},{content:l,property:"og:title"},{content:u,property:"og:description"},{content:"website",property:"og:type"},{content:"summary",name:"twitter:card"},{content:c.siteMetadata.author,name:"twitter:creator"},{content:l,name:"twitter:title"},{content:u,name:"twitter:description"}].concat(i.length>0?{content:i.join(", "),name:"keywords"}:[]).concat(r)})}u.defaultProps={keywords:[],lang:"en",meta:[]},u.propTypes={description:i.a.string,keywords:i.a.arrayOf(i.a.string),lang:i.a.string,meta:i.a.array,title:i.a.string.isRequired},t.a=u},286:function(e,t,a){"use strict";var n=a(287),r=(a(304),a(276)),i=a(1),l=a.n(i),o=a(0),c=a.n(o),s=a(289),u=function(e){var t=e.siteTitle;return c.a.createElement(s.a,{position:"static"},c.a.createElement(s.k,null,c.a.createElement(s.l,{variant:"h6",color:"inherit"},c.a.createElement(r.a,{to:"/"},t)),c.a.createElement(s.b,null,c.a.createElement(r.a,{to:"/histogram"},"Histogram")),c.a.createElement(s.b,null,c.a.createElement(r.a,{to:"/line"},"Line Chart")),c.a.createElement(s.b,null,c.a.createElement(r.a,{to:"/pie"},"Pie Chart")),c.a.createElement(s.b,null,c.a.createElement(r.a,{to:"/joyplot"},"Joy Plot"))))};u.propTypes={siteTitle:l.a.string},u.defaultProps={siteTitle:""};var m=u,d=function(e){var t=e.children;return c.a.createElement(r.b,{query:"755544856",render:function(e){return c.a.createElement(c.a.Fragment,null,c.a.createElement(m,{siteTitle:e.site.siteMetadata.title}),c.a.createElement("div",{style:{flexGrow:2,margin:"0 auto",padding:"0px 1.0875rem 1.45rem",paddingTop:0,width:"100%"}},c.a.createElement("main",null,t)),c.a.createElement("footer",null,"© ",(new Date).getFullYear(),", Built by"," ",c.a.createElement("a",{href:"https://www.infosum.com"},"InfoSum")))},data:n})};d.propTypes={children:l.a.node.isRequired};t.a=d},287:function(e){e.exports={data:{site:{siteMetadata:{title:"Infosum Charts"}}}}},288:function(e,t,a){"use strict";a.r(t);a(54);var n=a(0),r=a.n(n),i=a(1),l=a.n(i),o=a(85),c=a(4),s=function(e){var t=e.location,a=c.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(o.a,Object.assign({location:t,pageResources:a},a.json))};s.propTypes={location:l.a.shape({pathname:l.a.string.isRequired}).isRequired},t.default=s},290:function(e){e.exports={data:{site:{siteMetadata:{title:"Infosum Charts",description:"Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.",author:"@gatsbyjs"}}}}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-757617ca434a9a82a6a5.js.map