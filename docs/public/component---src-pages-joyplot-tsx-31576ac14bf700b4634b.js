(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{265:function(t,e,n){"use strict";n.r(e);n(54);var r=n(0),i=n.n(r),a=n(280),o=n(323),s=n(284),c=n(283),u=n(299),l=Object.assign({},u.c,{counts:[Object.assign({},u.c.counts[0],{data:[7,6,5,4,3,2,1],label:"Data 2"})],title:"Plot 2"});e.default=function(){return i.a.createElement(s.a,null,i.a.createElement(c.a,{title:"Joy Plot",description:""}),i.a.createElement(a.n,{variant:"h2"},"Joy Plot"),i.a.createElement("div",null,i.a.createElement(a.g,{container:!0,spacing:24},i.a.createElement(a.g,{item:!0,xs:6},i.a.createElement(a.c,null,i.a.createElement(a.d,null,i.a.createElement(o.a,{data:[u.c,l],colorScheme:["rgba(0, 0, 0, 0.5)","#666"],width:400,height:400})))))))}},274:function(t,e,n){"use strict";n.d(e,"b",function(){return l});var r=n(0),i=n.n(r),a=n(1),o=n.n(a),s=n(53),c=n.n(s);n.d(e,"a",function(){return c.a});n(275);var u=i.a.createContext({}),l=function(t){return i.a.createElement(u.Consumer,null,function(e){return t.data||e[t.query]&&e[t.query].data?(t.render||t.children)(t.data?t.data.data:e[t.query].data):i.a.createElement("div",null,"Loading (StaticQuery)")})};l.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},275:function(t,e,n){var r;t.exports=(r=n(286))&&r.default||r},276:function(t,e,n){"use strict";e.a=["#4bbcad","#d54539","#5ab94d","#8a5cd3","#a4b243","#ba5ccd","#54995c","#cf47a1","#d29f3e","#5c6fda","#c36528","#5fa6dc","#d74770","#7d7430","#8a529e","#df9273","#5f74b8","#ac5450","#d192d7","#b26088"]},281:function(t,e,n){"use strict";n.d(e,"b",function(){return i});var r=n(270);e.a={fx:{in:function(t){t.style("left",r.a.pageX+"px").style("top",r.a.pageY-55+"px"),t.transition().duration(200).style("opacity",.9)},move:function(t){t.style("left",r.a.pageX+"px").style("top",r.a.pageY-55+"px")},out:function(t){t.transition().duration(100).style("opacity",0)}}};var i=function(t,e){return e&&e.remove(),(e=Object(r.d)(t).append("div").attr("class","tooltip top").style("opacity",0)).append("div").attr("class","tooltip-arrow"),{tipContainer:e,tipContent:e.append("div").attr("class","tooltip-inner")}}},282:function(t,e,n){"use strict";var r=Array.prototype.slice,i=function(t){return t},a=1,o=2,s=3,c=4,u=1e-6;function l(t){return"translate("+(t+.5)+",0)"}function f(t){return"translate(0,"+(t+.5)+")"}function d(){return!this.__axis}function h(t,e){var n=[],h=null,p=null,g=6,m=6,b=3,y=t===a||t===c?-1:1,v=t===c||t===o?"x":"y",x=t===a||t===s?l:f;function k(r){var l=null==h?e.ticks?e.ticks.apply(e,n):e.domain():h,f=null==p?e.tickFormat?e.tickFormat.apply(e,n):i:p,k=Math.max(g,0)+b,w=e.range(),E=+w[0]+.5,A=+w[w.length-1]+.5,O=(e.bandwidth?function(t){var e=Math.max(0,t.bandwidth()-1)/2;return t.round()&&(e=Math.round(e)),function(n){return+t(n)+e}}:function(t){return function(e){return+t(e)}})(e.copy()),_=r.selection?r.selection():r,S=_.selectAll(".domain").data([null]),j=_.selectAll(".tick").data(l,e).order(),C=j.exit(),M=j.enter().append("g").attr("class","tick"),F=j.select("line"),D=j.select("text");S=S.merge(S.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),j=j.merge(M),F=F.merge(M.append("line").attr("stroke","currentColor").attr(v+"2",y*g)),D=D.merge(M.append("text").attr("fill","currentColor").attr(v,y*k).attr("dy",t===a?"0em":t===s?"0.71em":"0.32em")),r!==_&&(S=S.transition(r),j=j.transition(r),F=F.transition(r),D=D.transition(r),C=C.transition(r).attr("opacity",u).attr("transform",function(t){return isFinite(t=O(t))?x(t):this.getAttribute("transform")}),M.attr("opacity",u).attr("transform",function(t){var e=this.parentNode.__axis;return x(e&&isFinite(e=e(t))?e:O(t))})),C.remove(),S.attr("d",t===c||t==o?m?"M"+y*m+","+E+"H0.5V"+A+"H"+y*m:"M0.5,"+E+"V"+A:m?"M"+E+","+y*m+"V0.5H"+A+"V"+y*m:"M"+E+",0.5H"+A),j.attr("opacity",1).attr("transform",function(t){return x(O(t))}),F.attr(v+"2",y*g),D.attr(v,y*k).text(f),_.filter(d).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",t===o?"start":t===c?"end":"middle"),_.each(function(){this.__axis=O})}return k.scale=function(t){return arguments.length?(e=t,k):e},k.ticks=function(){return n=r.call(arguments),k},k.tickArguments=function(t){return arguments.length?(n=null==t?[]:r.call(t),k):n.slice()},k.tickValues=function(t){return arguments.length?(h=null==t?null:r.call(t),k):h&&h.slice()},k.tickFormat=function(t){return arguments.length?(p=t,k):p},k.tickSize=function(t){return arguments.length?(g=m=+t,k):g},k.tickSizeInner=function(t){return arguments.length?(g=+t,k):g},k.tickSizeOuter=function(t){return arguments.length?(m=+t,k):m},k.tickPadding=function(t){return arguments.length?(b=+t,k):b},k}function p(t){return h(s,t)}function g(t){return h(c,t)}n.d(e,"a",function(){return p}),n.d(e,"b",function(){return g})},283:function(t,e,n){"use strict";var r=n(288),i=n(1),a=n.n(i),o=n(0),s=n.n(o),c=n(314),u=n.n(c);function l(t){var e=t.description,n=t.lang,i=t.meta,a=t.keywords,o=t.title,c=r.data.site,l=e||c.siteMetadata.description;return s.a.createElement(u.a,{htmlAttributes:{lang:n},title:o,titleTemplate:"%s | "+c.siteMetadata.title,meta:[{content:l,name:"description"},{content:o,property:"og:title"},{content:l,property:"og:description"},{content:"website",property:"og:type"},{content:"summary",name:"twitter:card"},{content:c.siteMetadata.author,name:"twitter:creator"},{content:o,name:"twitter:title"},{content:l,name:"twitter:description"}].concat(a.length>0?{content:a.join(", "),name:"keywords"}:[]).concat(i)})}l.defaultProps={keywords:[],lang:"en",meta:[]},l.propTypes={description:a.a.string,keywords:a.a.arrayOf(a.a.string),lang:a.a.string,meta:a.a.array,title:a.a.string.isRequired},e.a=l},284:function(t,e,n){"use strict";var r=n(285),i=(n(313),n(274)),a=n(1),o=n.n(a),s=n(0),c=n.n(s),u=n(280),l=function(t){var e=t.siteTitle;return c.a.createElement(u.a,{position:"static"},c.a.createElement(u.m,null,c.a.createElement(u.n,{variant:"h6",color:"inherit"},c.a.createElement(i.a,{to:"/"},e)),c.a.createElement(u.b,null,c.a.createElement(i.a,{to:"/histogram"},"Histogram")),c.a.createElement(u.b,null,c.a.createElement(i.a,{to:"/line"},"Line Chart")),c.a.createElement(u.b,null,c.a.createElement(i.a,{to:"/pie"},"Pie Chart")),c.a.createElement(u.b,null,c.a.createElement(i.a,{to:"/joyplot"},"Joy Plot"))))};l.propTypes={siteTitle:o.a.string},l.defaultProps={siteTitle:""};var f=l,d=function(t){var e=t.children;return c.a.createElement(i.b,{query:"755544856",render:function(t){return c.a.createElement(c.a.Fragment,null,c.a.createElement(f,{siteTitle:t.site.siteMetadata.title}),c.a.createElement("div",{style:{flexGrow:2,margin:"0 auto",padding:"0px 1.0875rem 1.45rem",paddingTop:0,width:"100%"}},c.a.createElement("main",null,e)),c.a.createElement("footer",null,"© ",(new Date).getFullYear(),", Built by"," ",c.a.createElement("a",{href:"https://www.infosum.com"},"InfoSum")))},data:r})};d.propTypes={children:o.a.node.isRequired};e.a=d},285:function(t){t.exports={data:{site:{siteMetadata:{title:"Infosum Charts"}}}}},286:function(t,e,n){"use strict";n.r(e);n(54);var r=n(0),i=n.n(r),a=n(1),o=n.n(a),s=n(85),c=n(4),u=function(t){var e=t.location,n=c.default.getResourcesForPathnameSync(e.pathname);return i.a.createElement(s.a,Object.assign({location:e,pageResources:n},n.json))};u.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},e.default=u},288:function(t){t.exports={data:{site:{siteMetadata:{title:"Infosum Charts",description:"Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.",author:"@gatsbyjs"}}}}},289:function(t,e,n){"use strict";n(309);var r=n(334);e.a=function(t){return t.filter(function(t){try{var e=r(t),n=e.hsl().array();if(n.length>3)return!1;var i=e.luminosity();return i<.8&&i>.1&&n[2]<200&&n[2]>20}catch(a){return!1}}).filter(function(t,e,n){return n.indexOf(t)===e}).sort(function(){return Math.random()-.5})}},290:function(t,e,n){"use strict";n(84),n(326),n(128);e.a=function(t,e){return Object.keys(e).forEach(function(n){t.attr(n,e[n])}),t}},293:function(t,e,n){"use strict";var r=function(t,e){return t<e?-1:t>e?1:t>=e?0:NaN};var i,a;1===(i=r).length&&(a=i,i=function(t,e){return r(a(t),e)});var o=function(t,e){let n,r;if(void 0===e)for(let i of t)null!=i&&i>=i&&(void 0===n?n=r=i:(n>i&&(n=i),r<i&&(r=i)));else{let i=-1;for(let a of t)null!=(a=e(a,++i,t))&&a>=a&&(void 0===n?n=r=a:(n>a&&(n=a),r<a&&(r=a)))}return[n,r]};var s=Array.prototype;s.slice,s.map,Math.sqrt(50),Math.sqrt(10),Math.sqrt(2);n.d(e,"a",function(){return o})},299:function(t,e,n){"use strict";n.d(e,"d",function(){return i}),n.d(e,"b",function(){return a}),n.d(e,"c",function(){return o}),n.d(e,"a",function(){return s}),n.d(e,"e",function(){return c});var r=n(289),i={x:{style:{stroke:"#eeAA00","stroke-opacity":.4},ticks:5},y:{height:20,style:{"stroke-opacity":.4},ticks:5}},a={bins:["Data 1","Data 6","Data 3","Dat 4"],counts:[{data:[1,2,3,4],label:"DataSet 1"},{data:[13,14,15,16],label:"DataSet 2"}],grid:i},o={bins:["bin 1","bin 2","bin 3 with a long name","bin 4","bin 5","bin 6","bin 7"],counts:[{borderColors:["red"],data:[1,2,3,4,5,6,7],label:"Data 1"}],title:"Plot 1"},s={x:{height:20,label:"X Axis",margin:20,text:{style:{dy:".35em","text-anchor":"start",transform:"rotate(90)",x:0,y:0}},tickSize:0},y:{label:"Y Axis!",style:{fill:"none",stroke:"#eeAA00"},text:{style:{fill:"#eeAA00"}},tickSize:20,ticks:3,width:50}},c=Object(r.a)(["rgba(255, 113, 1, 0.5)","#fff6ef","rgba(0, 169, 123, 0.5)","#f6fffd","#D7263D","rgba(215, 38, 61, 0.05)","#0f2629","#ededed","rgba(86, 180, 191, 0.5)","#f5fbfb","#000000","#0f2629","#D7263D","#FBD7D9","#ffebec","#963540","#22545a","#56b4bf","#56b4bf","#56b4bf","#FF7101","#449098","#77c3cb","#d4eef8","#ff7101","#FF7101","#cc5a00","#ff8d33","#fef9e5","#7d5d2e","#00a97b","#008762","#33ba95","#dbf1d6","#227839","#0f5e7b","#d4eef8","#0f5e7b","#F9C80E","#007656","#c5e5e9","#f9c80e","#a9a9a9","#dbdbdb","#cccccc","#e6e6e6","#56b4bf","#449098","#77c3cb","#22545a","#ff7101","#cdcdcd","#ffffff","#d7263d","#00a97b","#888888","#e6e6e6","#f2f2f2","#f4f4f4"])},300:function(t,e,n){"use strict";n(335);var r=n(7),i=n(129),a=n(25),o=/./.toString,s=function(t){n(26)(RegExp.prototype,"toString",t,!0)};n(24)(function(){return"/a/b"!=o.call({source:"a",flags:"b"})})?s(function(){var t=r(this);return"/".concat(t.source,"/","flags"in t?t.flags:!a&&t instanceof RegExp?i.call(t):void 0)}):"toString"!=o.name&&s(function(){return o.call(this)})},304:function(t,e,n){"use strict";var r=n(16),i=n(141)(6),a="findIndex",o=!0;a in[]&&Array(1)[a](function(){o=!1}),r(r.P+r.F*o,"Array",{findIndex:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),n(56)(a)},310:function(t,e,n){var r=n(57)("meta"),i=n(17),a=n(40),o=n(38).f,s=0,c=Object.isExtensible||function(){return!0},u=!n(24)(function(){return c(Object.preventExtensions({}))}),l=function(t){o(t,r,{value:{i:"O"+ ++s,w:{}}})},f=t.exports={KEY:r,NEED:!1,fastKey:function(t,e){if(!i(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!a(t,r)){if(!c(t))return"F";if(!e)return"E";l(t)}return t[r].i},getWeak:function(t,e){if(!a(t,r)){if(!c(t))return!0;if(!e)return!1;l(t)}return t[r].w},onFreeze:function(t){return u&&f.NEED&&c(t)&&!a(t,r)&&l(t),t}}},311:function(t,e,n){var r=n(17);t.exports=function(t,e){if(!r(t)||t._t!==e)throw TypeError("Incompatible receiver, "+e+" required!");return t}},323:function(t,e,n){"use strict";n(300),n(54);var r=n(82),i=n.n(r),a=n(10),o=n.n(a),s=n(279),c=n(0),u=n(55),l=(n(304),n(128),n(84),n(336),n(143),n(339),n(305),n(293)),f=n(282),d=n(277),h=n(270),p=n(278),g=n(301),m=n(276),b=n(290),y=n(281),v=function(){var t,e,n,r,i,a=Object(d.a)(),o=Object(d.b)(),s=Object(d.a)(),c=Object(d.a)();var u={axis:{x:{height:20,label:"",margin:10,style:{fill:"none","shape-rendering":"crispEdges",stroke:"#666","stroke-opacity":1,"stroke-width":1},text:{style:{fill:"#666"}}},y:{label:"",style:{fill:"none","shape-rendering":"crispEdges",stroke:"#666","stroke-opacity":1,"stroke-width":1},text:{style:{fill:"#666"}},ticks:10,width:25}},bar:{groupMargin:0,margin:0,width:50},className:"histogram-d3",colorScheme:m.a,data:[{bins:[],counts:[]}],delay:0,domain:{max:null,min:null},duration:400,grid:{x:{style:{fill:"none",stroke:"#bbb","stroke-opacity":.7,"stroke-width":1},ticks:5,visible:!0},y:{style:{fill:"none",stroke:"#bbb","stroke-opacity":.7,"stroke-width":1},ticks:5,visible:!0}},height:200,margin:{left:5,top:5},stroke:{color:"#005870",dasharray:"",linecap:"butt",width:0},tip:y.a,tipContainer:"body",tipContentFn:function(t,e,n,r){return r+": "+t[e]+"<br />"+n},visible:{},width:200};return{create:function(e,n){void 0===n&&(n={}),this.mergeProps(n),this._makeSvg(e),this.makeGrid(r),this.makeScales(),this.containers=r.data.map(function(e,n){return t.append("g").attr("class","histogram-container-"+n)}),this.update(e,r)},mergeProps:function(t){(r=p(u,t)).data=t.data,t.colorScheme&&(r.colorScheme=t.colorScheme)},_makeSvg:function(i){if(t){t.selectAll("svg > *").remove(),t.remove();var a=i.getElementsByTagName("svg");a.length>0&&i.removeChild(a[0])}var o=r,s=o.margin,c=o.width,u=o.height,l=o.className;t=Object(h.d)(i).append("svg").attr("class",l).attr("width",c).attr("height",u).attr("viewBox","0 0 "+c+" "+u).append("g").attr("transform","translate("+s.left+","+s.top+")");var f=Object(y.b)(r.tipContainer,e);n=f.tipContent,e=f.tipContainer},valuesCount:function(t){return t.reduce(function(t,e){return e.data.length>t?e.data.length:t},0)},appendDomainRange:function(t,e){var n=[],i=r.domain,o=e.reduce(function(t,e){var n=e.reduce(function(t,e){return[].concat(t,e.map(function(t){return t.value}))},[]);return[].concat(t,n)},[0]),s=Object(l.a)(o,function(t){return t});n[1]=i&&i.hasOwnProperty("max")&&null!==i.max?i.max:s[1],n[0]=i&&i.hasOwnProperty("min")&&null!==i.min?i.min:s[0];var c=[a.bandwidth(),0];t.range(c).domain(n)},yAxisWidth:function(){var t=r.axis;return""===t.y.label?t.y.width:t.y.width+30},xAxisHeight:function(){var t=r.axis;return""===t.x.label?t.x.height:t.x.height+30},makeScales:function(){var e=r,n=e.axis,i=e.margin,a=e.height,o=e.width;this.xAxis=t.append("g").attr("class","x-axis"),this.yAxis=t.append("g").attr("class","y-axis"),""!==n.x.label&&t.append("text").attr("class","x-axis-label").attr("transform","translate("+Number(o)/2+" ,"+(a-this.xAxisHeight()-2*i.left+10+n.x.margin)+")").style("text-anchor","middle").text(n.x.label),""!==n.y.label&&t.append("text").attr("class","y-axis-label").attr("transform","translate(0, -"+this.gridHeight()+")rotate(-90)").attr("y",0-i.left).attr("x",0-(a/2-2*i.top)).attr("dy","1em").style("text-anchor","middle").text(n.y.label)},getBins:function(){return r.data.reduce(function(t,e){return Array.from(new Set(t.concat(e.bins)))},[])},_drawScales:function(e){var n,u=this,l=r,d=(l.bar,l.domain,l.margin),h=(l.width,l.height),p=l.axis,m=e.reduce(function(t,e){var n=u.valuesCount(e.counts);return n>t?n:t},0),y=this.gridWidth(),v=e[0].counts.map(function(t){return t.label}),x=this.getBins();s.domain(x).rangeRound([0,y]).paddingInner(this.groupedMargin()),c.domain(v).rangeRound([0,s.bandwidth()]).paddingInner(this.barMargin()),n=Object(f.a)(s);var k=g(p,"x.tickSize",void 0);void 0!==k?n.tickSize(k):y/m<10&&n.tickValues(s.domain().filter(function(t,e){return!(e%10)})),this.xAxis.attr("transform","translate("+(this.yAxisWidth()+p.y.style["stroke-width"])+","+(h-this.xAxisHeight()-2*d.left)+")").call(n);var w=e.map(function(t){return t.title}),E=[h-2*d.top-this.xAxisHeight(),0];a.domain(w).rangeRound(E),this.appendDomainRange(o,i);var A=Object(f.b)(a).ticks(p.y.ticks),O=g(p,"y.tickSize",void 0);void 0!==O&&A.tickSize(O),this.yAxis.attr("transform","translate("+this.yAxisWidth()+", 0)").transition().call(A);Object.assign({},p.x.text.style),Object.assign({},p.y.text.style);Object(b.a)(t.selectAll(".y-axis .domain, .y-axis .tick line"),p.y.style),Object(b.a)(t.selectAll(".y-axis .tick text"),p.y.text.style),Object(b.a)(t.selectAll(".x-axis .domain, .x-axis .tick line"),p.x.style),Object(b.a)(t.selectAll(".x-axis .tick text"),p.x.text.style)},gridWidth:function(){var t=r,e=(t.axis,t.width),n=t.margin;return Number(e)-2*n.left-this.yAxisWidth()},gridHeight:function(){var t=r,e=t.height,n=t.margin;t.axis;return e-2*n.top-this.xAxisHeight()},groupedMargin:function(){var t=g(r.bar,"groupMargin",.1);return t>=0&&t<=1?t:0},barMargin:function(){var t=g(r.bar,"margin",0);return t>=0&&t<=1?t:.1},barWidth:function(){return c.bandwidth()},updateChart:function(t){var i=this,u=this.getBins(),l=r,f=(l.height,l.width,l.margin,l.bar,l.delay),h=l.duration,p=l.axis,g=l.stroke,m=l.tip,b=l.tipContentFn,y=this.barWidth(),v=Object(d.d)(r.colorScheme),x=Object(d.d)(["#FFF"]),k=this.yAxisWidth();this.groupedMargin(),t.reduce(function(t,e){var n=e.reduce(function(t,e){return e.length>t?e.length:t},0);return n>t?n:t},0);t.forEach(function(t,l){var d=r.data[l].title,w=i.containers[l].selectAll("g").data(t),E=w.enter().append("g").merge(w).attr("transform",function(t){return"translate("+(k+p.y.style["stroke-width"]+s(t[0].label))+", "+a(t[0].joyLabel)+")"}).selectAll("rect").data(function(t){return t});E.enter().append("rect").attr("height",0).attr("y",function(t){return a.bandwidth()}).attr("class","bar").attr("x",function(t){return c(t.groupLabel)}).attr("width",function(t){return y}).attr("fill",function(t,e){return v(e)}).on("mouseover",function(t){var r=u.findIndex(function(e){return e===t.label});n.html(function(){return b(u,r,t.value,d)}),m.fx.in(e)}).on("mousemove",function(){return m.fx.move(e)}).on("mouseout",function(){return m.fx.out(e)}).merge(E).transition().duration(h).delay(f).attr("y",function(t){return o(t.value)}).attr("stroke",function(t,e){if(x)return x(e)}).attr("shape-rendering","crispEdges").attr("stroke-width",g.width).attr("stroke-linecap",g.linecap).attr("stroke-dasharray",function(t){var e=a.bandwidth()-o(t.value);return y+" 0 "+e+" "+y}).attr("height",function(t){return a.bandwidth()-o(t.value)}),w.exit().remove()})},makeGrid:function(e){e.grid;this.gridX=t.append("g").attr("class","grid gridX"),this.gridY=t.append("g").attr("class","grid gridY")},_drawGrid:function(){var t=this,e=r,n=e.data,i=e.height,o=e.width,c=e.axis,u=e.grid,l=e.margin,d=(e.bar,n.reduce(function(e,n){var r=t.valuesCount(n.counts);return r>e?e:r},0)),h=c.y.style["stroke-width"],p=this.yAxisWidth()+h,m=this.gridHeight();u.x.visible&&(this.gridX.attr("transform","translate("+p+", "+m+")"),this.gridX.call(function(t){return void 0===t&&(t=5),Object(f.a)(s).ticks(t)}(g(u,"x.ticks",d)).tickSize(-i+this.xAxisHeight()+2*l.top).tickFormat(function(){return""})),Object(b.a)(this.gridX.selectAll(".tick line"),u.x.style),Object(b.a)(this.gridX.selectAll(".domain"),{stroke:"transparent"})),u.y.visible&&(this.gridY.attr("transform","translate("+(this.yAxisWidth()+h)+", 0)").transition().call(function(t){return void 0===t&&(t=5),Object(f.b)(a).ticks(t)}(g(u,"y.ticks",d)).tickSize(-o+2*l.left+this.yAxisWidth()).tickFormat(function(){return""})),Object(b.a)(this.gridY.selectAll(".tick line"),u.y.style),this.gridY.selectAll(".gridY .tick line").filter(function(t,e){return 0===e}).attr("display","none"),Object(b.a)(this.gridY.selectAll(".domain"),{stroke:"transparent"}))},update:function(t,e){if(r.data){this.mergeProps(e);var n=r,a=n.data,o=n.visible;i=a.map(function(t){var e=[];return t.counts.forEach(function(n){n.data.forEach(function(r,i){e[i]||(e[i]=[]),e[i].push({groupLabel:n.label,joyLabel:t.title,label:t.bins[i],value:!1!==o[t.bins[i]]&&!1!==o[n.label]?r:0})})}),e}),this._drawScales(r.data),this._drawGrid(),this.updateChart(i)}},destroy:function(e){t.selectAll("svg > *").remove()}}},x=function(t){function e(e){var n;return(n=t.call(this,e)||this).chart=v(),n.state={parentWidth:300},n}o()(e,t);var n=e.prototype;return n.handleResize=function(){var t=this,e=this.getDOMNode(),n=this.ref&&this.ref.offsetWidth?this.ref.offsetWidth:0;this.setState({parentWidth:n},function(){return t.chart.create(e,t.getChartState())})},n.componentDidMount=function(){var t=this;this.chart.create(this.getDOMNode(),this.getChartState()),"100%"===this.props.width&&(window.addEventListener("resize",function(e){return t.handleResize()}),this.handleResize())},n.componentDidUpdate=function(){this.chart.update(this.getDOMNode(),this.getChartState())},n.getChartState=function(){var t=this.props.width,e=this.props,n=(e.children,i()(e,["children"]));return"100%"===t&&(t=this.state.parentWidth||300),Object.assign({},n,{width:t})},n.componentWillUnmount=function(){"100%"===this.props.width&&window.removeEventListener("resize",this.handleResize),this.chart.destroy(this.getDOMNode())},n.getDOMNode=function(){return u.findDOMNode(this.ref)},n.render=function(){var t=this;return c.createElement("div",{ref:function(e){return t.ref=e},className:"histogram-chart-container"})},e}(c.Component);x.defaultProps={axis:{},bar:{margin:0,width:10},grid:{x:{style:{fill:"none",stroke:"#bbb","stroke-opacity":.7,"stroke-width":1},ticks:5,visible:!0},y:{style:{fill:"none",stroke:"#bbb","stroke-opacity":.7,"stroke-width":1},ticks:5,visible:!0}},height:200,margin:{left:5,top:5},stroke:{color:function(t,e,n){return Object(s.f)(n(e)).darker(1).toString()},width:1},width:"100%"};e.a=x},326:function(t,e,n){var r=n(39),i=n(58);n(341)("keys",function(){return function(t){return i(r(t))}})},335:function(t,e,n){n(25)&&"g"!=/./g.flags&&n(38).f(RegExp.prototype,"flags",{configurable:!0,get:n(129)})},336:function(t,e,n){"use strict";var r=n(337),i=n(311);t.exports=n(338)("Set",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{add:function(t){return r.def(i(this,"Set"),t=0===t?0:t,t)}},r)},337:function(t,e,n){"use strict";var r=n(38).f,i=n(135),a=n(132),o=n(27),s=n(130),c=n(131),u=n(87),l=n(142),f=n(140),d=n(25),h=n(310).fastKey,p=n(311),g=d?"_s":"size",m=function(t,e){var n,r=h(e);if("F"!==r)return t._i[r];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,n,u){var l=t(function(t,r){s(t,l,e,"_i"),t._t=e,t._i=i(null),t._f=void 0,t._l=void 0,t[g]=0,null!=r&&c(r,n,t[u],t)});return a(l.prototype,{clear:function(){for(var t=p(this,e),n=t._i,r=t._f;r;r=r.n)r.r=!0,r.p&&(r.p=r.p.n=void 0),delete n[r.i];t._f=t._l=void 0,t[g]=0},delete:function(t){var n=p(this,e),r=m(n,t);if(r){var i=r.n,a=r.p;delete n._i[r.i],r.r=!0,a&&(a.n=i),i&&(i.p=a),n._f==r&&(n._f=i),n._l==r&&(n._l=a),n[g]--}return!!r},forEach:function(t){p(this,e);for(var n,r=o(t,arguments.length>1?arguments[1]:void 0,3);n=n?n.n:this._f;)for(r(n.v,n.k,this);n&&n.r;)n=n.p},has:function(t){return!!m(p(this,e),t)}}),d&&r(l.prototype,"size",{get:function(){return p(this,e)[g]}}),l},def:function(t,e,n){var r,i,a=m(t,e);return a?a.v=n:(t._l=a={i:i=h(e,!0),k:e,v:n,p:r=t._l,n:void 0,r:!1},t._f||(t._f=a),r&&(r.n=a),t[g]++,"F"!==i&&(t._i[i]=a)),t},getEntry:m,setStrong:function(t,e,n){u(t,e,function(t,n){this._t=p(t,e),this._k=n,this._l=void 0},function(){for(var t=this._k,e=this._l;e&&e.r;)e=e.p;return this._t&&(this._l=e=e?e.n:this._t._f)?l(0,"keys"==t?e.k:"values"==t?e.v:[e.k,e.v]):(this._t=void 0,l(1))},n?"entries":"values",!n,!0),f(e)}}},338:function(t,e,n){"use strict";var r=n(8),i=n(16),a=n(26),o=n(132),s=n(310),c=n(131),u=n(130),l=n(17),f=n(24),d=n(133),h=n(59),p=n(354);t.exports=function(t,e,n,g,m,b){var y=r[t],v=y,x=m?"set":"add",k=v&&v.prototype,w={},E=function(t){var e=k[t];a(k,t,"delete"==t?function(t){return!(b&&!l(t))&&e.call(this,0===t?0:t)}:"has"==t?function(t){return!(b&&!l(t))&&e.call(this,0===t?0:t)}:"get"==t?function(t){return b&&!l(t)?void 0:e.call(this,0===t?0:t)}:"add"==t?function(t){return e.call(this,0===t?0:t),this}:function(t,n){return e.call(this,0===t?0:t,n),this})};if("function"==typeof v&&(b||k.forEach&&!f(function(){(new v).entries().next()}))){var A=new v,O=A[x](b?{}:-0,1)!=A,_=f(function(){A.has(1)}),S=d(function(t){new v(t)}),j=!b&&f(function(){for(var t=new v,e=5;e--;)t[x](e,e);return!t.has(-0)});S||((v=e(function(e,n){u(e,v,t);var r=p(new y,e,v);return null!=n&&c(n,m,r[x],r),r})).prototype=k,k.constructor=v),(_||j)&&(E("delete"),E("has"),m&&E("get")),(j||O)&&E(x),b&&k.clear&&delete k.clear}else v=g.getConstructor(e,t,m,x),o(v.prototype,n),s.NEED=!0;return h(v,t),w[t]=v,i(i.G+i.W+i.F*(v!=y),w),b||g.setStrong(v,t,m),v}},339:function(t,e,n){"use strict";var r=n(27),i=n(16),a=n(39),o=n(137),s=n(138),c=n(20),u=n(340),l=n(139);i(i.S+i.F*!n(133)(function(t){Array.from(t)}),"Array",{from:function(t){var e,n,i,f,d=a(t),h="function"==typeof this?this:Array,p=arguments.length,g=p>1?arguments[1]:void 0,m=void 0!==g,b=0,y=l(d);if(m&&(g=r(g,p>2?arguments[2]:void 0,2)),null==y||h==Array&&s(y))for(n=new h(e=c(d.length));e>b;b++)u(n,b,m?g(d[b],b):d[b]);else for(f=y.call(d),n=new h;!(i=f.next()).done;b++)u(n,b,m?o(f,g,[i.value,b],!0):i.value);return n.length=b,n}})},340:function(t,e,n){"use strict";var r=n(38),i=n(86);t.exports=function(t,e,n){e in t?r.f(t,e,i(0,n)):t[e]=n}},341:function(t,e,n){var r=n(16),i=n(28),a=n(24);t.exports=function(t,e){var n=(i.Object||{})[t]||Object[t],o={};o[t]=e(n),r(r.S+r.F*a(function(){n(1)}),"Object",o)}}}]);
//# sourceMappingURL=component---src-pages-joyplot-tsx-31576ac14bf700b4634b.js.map