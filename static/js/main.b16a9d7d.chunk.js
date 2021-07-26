(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{138:function(e,t,s){},139:function(e,t,s){},140:function(e,t,s){},141:function(e,t,s){},142:function(e,t,s){},143:function(e,t,s){},144:function(e,t,s){},145:function(e,t,s){},146:function(e,t,s){"use strict";s.r(t);var c=s(1),i=s.n(c),r=s(22),n=s.n(r),a=s(15),l=s(3),j=s(29),o=s.n(j);var d=s(67),b=s(0);function h(e){var t=e.accessToken,s=e.trackUri,i=Object(c.useState)(!1),r=Object(l.a)(i,2),n=r[0],a=r[1];return Object(c.useEffect)((function(){return a(!0)}),[s]),t?Object(b.jsx)(d.a,{token:t,styles:{activeColor:"#fff",bgColor:"#333",color:"#fff",loaderColor:"#fff",sliderColor:"#1cb954",trackArtistColor:"#ccc",trackNameColor:"#fff"},showSaveIcon:!0,callback:function(e){e.isPlaying||a(!1)},play:n,uris:s?[s]:[]}):null}function m(e){var t=e.track,s=e.chooseTrack;return Object(b.jsxs)("div",{style:{display:"flex",margin:"10px",background:"gray",borderRadius:"5px"},onClick:function(){s(t)},children:[Object(b.jsx)("img",{src:t.albumUrl,style:{height:"64px",width:"64px"},alt:""}),Object(b.jsxs)("div",{style:{display:"flex",flexDirection:"column",justifyContent:"space-evenly",marginLeft:"10px"},children:[Object(b.jsx)("div",{children:t.title}),Object(b.jsx)("div",{children:t.artist})]})]})}var x,O,u=s(61),f=s.n(u),p=s(16),g=p.a.div(x||(x=Object(a.a)(["\n  cursor: pointer;\n  transition: background-color 0.2s;\n  &:hover {\n    background-color: #1583ff;\n  }\n"]))),v=function(e){var t,s,c=e.track,i=e.chooseTrack;return Object(b.jsxs)(g,{style:{display:"flex",alignItems:"center",margin:"10px"},onClick:function(){i(c)},children:[Object(b.jsx)("img",{src:null===(t=c.album)||void 0===t?void 0:t.images[0].url,alt:"",style:{height:"64px",width:"64px"}}),Object(b.jsxs)("div",{className:"songTitle actual",children:[Object(b.jsx)("div",{children:c.name}),Object(b.jsx)("div",{style:{color:"lightgray",fontSize:"1.4rem",opacity:"0.7",marginTop:"8px"},children:null===(s=c.album)||void 0===s?void 0:s.artists[0].name})]}),Object(b.jsx)("div",{className:"songAlbum",children:c.album.name}),Object(b.jsx)("div",{className:"songDate",children:c.album.release_date}),Object(b.jsx)("div",{className:"songTime",children:function(e){var t=Math.floor(e/6e4),s=(e%6e4/1e3).toFixed(0);return t+":"+(s<10?"0":"")+s}(c.duration_ms)})]})},w=(s(50),function(e){var t,s=e.setIsClicked,c=e.chooseTrack,i=e.playList,r=e.detail;return Object(b.jsx)(b.Fragment,{children:Object(b.jsx)("div",{className:"opacity",children:Object(b.jsxs)("div",{className:"sticky",children:[Object(b.jsx)("span",{style:{cursor:"pointer",fontSize:"30px"},onClick:function(){return s()},children:"\u2715"}),Object(b.jsxs)("div",{className:"playlistWrapper",children:[Object(b.jsxs)("div",{className:"playlistDetails",children:[Object(b.jsx)("img",{src:null===r||void 0===r?void 0:r.images[0].url,alt:"",width:"250px"}),Object(b.jsxs)("div",{style:{marginLeft:"30px"},children:[Object(b.jsx)("p",{children:"playlist"}),Object(b.jsx)("h2",{children:r.name}),Object(b.jsx)("p",{children:r.description}),Object(b.jsxs)("h4",{children:[r.tracks.total," songs"]})]})]}),Object(b.jsxs)("div",{children:[Object(b.jsxs)("div",{className:"songsInfo",children:[Object(b.jsx)("div",{className:"forImg"}),Object(b.jsx)("div",{className:"songTitle",children:"Title"}),Object(b.jsx)("div",{className:"songAlbum",children:"Album"}),Object(b.jsx)("div",{className:"songDate",children:"Date added"}),Object(b.jsx)("div",{className:"songTime",children:"time"})]}),i&&(null===(t=i.items)||void 0===t?void 0:t.map((function(e,t){return Object(b.jsx)(v,{track:e,chooseTrack:c},t)})))]})]})]})})})}),y=(s(51),s(2)),N=p.a.div(O||(O=Object(a.a)(["\n  cursor: pointer;\n  transition: all 0.2s;\n  &:hover {\n    background-color: #1583ff;\n    color: white;\n  }\n"]))),k=function(e){var t,s=e.playList,c=e.chooseTrack;function i(e){var t=Math.floor(e/6e4),s=(e%6e4/1e3).toFixed(0);return t+":"+(s<10?"0":"")+s}return Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)("div",{style:{maxWidth:"1125px",margin:"10px auto"},children:[Object(b.jsxs)("div",{className:"songsInfo",children:[Object(b.jsx)("div",{className:"forImg"}),Object(b.jsx)("div",{className:"songTitle",children:"Title"}),Object(b.jsx)("div",{className:"songAlbum",children:"Album"}),Object(b.jsx)("div",{className:"songDate",children:"Date added"}),Object(b.jsx)("div",{className:"songTime",children:"time"})]}),s&&(null===(t=s.items)||void 0===t?void 0:t.map((function(e,t){var s;return Object(b.jsx)(b.Fragment,{children:Object(b.jsx)(N,{children:Object(b.jsxs)("div",{onClick:function(){return function(e){c(e)}(e)},style:{display:"flex",alignItems:"center"},children:[Object(b.jsx)("img",{src:e.album.images[0].url,alt:"",style:{height:"64px",width:"64px"}}),Object(b.jsxs)("div",{className:"songTitle actual",children:[Object(b.jsx)("div",{children:e.name}),Object(b.jsx)("div",{style:{color:"gary",fontSize:"0.9rem",opacity:"0.7",marginTop:"8px"},children:null===(s=e.album)||void 0===s?void 0:s.artists[0].name})]}),Object(b.jsx)("div",{className:"songAlbum",children:e.album.name}),Object(b.jsx)("div",{className:"songDate",children:e.album.release_date}),Object(b.jsx)("div",{className:"songTime",children:i(e.duration_ms)})]})})})})))]})})},_=function(e){var t=e.partyPlaylist,s=e.setIsClicked,c=e.getOne,i=e.AlbumImg;return Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)("article",{className:"flow",children:[Object(b.jsx)("h1",{children:"playlists"}),Object(b.jsx)("p",{children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, recusandae nemo earum tempora quos ratione asperiores illo fuga in officiis."}),Object(b.jsx)("div",{className:"team",children:Object(b.jsx)("div",{className:"auto-grid",role:"list",children:null===t||void 0===t?void 0:t.map((function(e){return Object(b.jsx)("li",{onClick:function(){return s((function(e){return!e})),c(e.id)},children:Object(b.jsxs)("p",{className:"profile",children:[Object(b.jsx)("p",{children:e.name}),Object(b.jsx)(i,{imgUrl:e.icons[0].url})]})})}))})})]})})},C=s(35),S=s(148),L=s(149),T=s(11),I=s(65),A=s.n(I),P=(s(133),s(134),function(e){var t=e.allUs,s=e.AlbumImg,i=e.getOne,r=e.setIsClicked,n=e.des,a=Object(c.useState)(window.innerWidth),j=Object(l.a)(a,2),o=j[0],d=j[1];Object(c.useEffect)((function(){window.addEventListener("resize",(function(){d(window.innerWidth)}))}),[o]);var h={dots:!1,arrows:!0,infinite:!1,speed:500,slidesToShow:Math.ceil((o-222)/236),slidesToScroll:Math.ceil((o-222)/236)};return Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)(K,{style:{margin:"40px 0"},children:[Object(b.jsx)("h2",{children:n}),Object(b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",margin:"10px auto"},children:[Object(b.jsx)("p",{children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, quasi!"}),Object(b.jsx)(T.b,{to:t?"/".concat(t[0].id):"/",style:{backgroundColor:"rgb(30,215,96)",height:"fit-content",padding:" 6px 24px",borderRadius:"5px",boxShadow:"1px 1px 15px black",color:"black"},children:"see all"})]}),Object(b.jsx)(A.a,Object(C.a)(Object(C.a)({},h),{},{children:null===t||void 0===t?void 0:t.map((function(e){return Object(b.jsx)(b.Fragment,{children:Object(b.jsx)(T.b,{onClick:function(){r((function(e){return!e})),i(e.id)},to:"/",children:Object(b.jsx)(S.a,{children:Object(b.jsxs)(L.a,{style:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",borderRadius:"5px",padding:"10px",margin:"0 10px ",backgroundColor:"#4e4d4d"},children:[Object(b.jsx)("div",{style:{maxWidth:"200px",borderRadius:"10px"},children:Object(b.jsx)(s,{imgUrl:e.images[0].url},e.id)}),Object(b.jsxs)(L.a.Body,{children:[Object(b.jsx)("h4",{style:{color:"white",margin:"10px 0",overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",webkitLineClamp:"1",webkitBoxOrient:"vertical",cursor:"pointer"},children:e.name}),Object(b.jsx)("p",{style:{fontWeight:"200",fontSize:"15px",marginBottom:"10px",overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",webkitLineClamp:"2",webkitBoxOrient:"vertical",cursor:"pointer"},children:e.description})]})]})})},e.id)})}))}))]})})}),F=function(e){var t=e.partyPlaylist,s=e.setIsClicked,c=e.getOne,i=e.AlbumImg,r=Object(y.g)().id,n=t.find((function(e){return e[0].id===r}));return Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)("article",{className:"flow",children:[Object(b.jsx)("h1",{children:n[0].name}),Object(b.jsx)("p",{children:n[0].description}),Object(b.jsx)("div",{className:"team",children:Object(b.jsx)("div",{className:"auto-grid",role:"list",children:null===n||void 0===n?void 0:n.map((function(e){return Object(b.jsx)("li",{onClick:function(){return s((function(e){return!e})),c(e.id)},children:Object(b.jsxs)("p",{className:"profile",children:[Object(b.jsx)("p",{children:e.name}),Object(b.jsx)(i,{setIsClicked:s,imgUrl:e.images[0].url,getOne:function(){return c(e.id)}})]})},e.id)}))})})]})})},M=function(e){var t=e.userPlaylists,s=e.setIsClicked,c=e.getOne,i=e.AlbumImg;return Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)("article",{className:"flow",children:[Object(b.jsx)("h1",{children:"playlists"}),Object(b.jsx)("p",{children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, recusandae nemo earum tempora quos ratione asperiores illo fuga in officiis."}),Object(b.jsx)("div",{className:"team",children:Object(b.jsx)("div",{className:"auto-grid",role:"list",children:null===t||void 0===t?void 0:t.map((function(e){return Object(b.jsx)("li",{onClick:function(){return console.log("dsdfsdfssdf: ",e),s((function(e){return!e})),c(e.id)},children:Object(b.jsxs)("p",{className:"profile",children:[Object(b.jsx)("p",{children:e.name}),Object(b.jsx)(i,{imgUrl:e.images[0].url})]})},e.id)}))})})]})})},W=s(33),E=function(e){var t=e.imgUrl;return Object(b.jsx)(b.Fragment,{children:Object(b.jsx)("img",{src:t,alt:"",width:"100%"})})},U=(s(138),function(e){var t=e.searchRef,s=e.setSearch,c=e.userPlaylists,i=e.categoryPlaylist,r=e.playlistDes,n=e.setIsClicked,a=e.isClicked,l=e.Playlist,j=e.getOne,o=e.chooseTrack,d=e.playList,h=e.detail,m=e.myFocus;return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)("header",{children:[Object(b.jsx)("input",{ref:t,onChange:function(e){return s(e.target.value)},class:"nav-search",type:"text",placeholder:" Search"}),Object(b.jsx)("i",{className:"fas fa-cog"})]}),!t.current.value&&Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)("section",{className:"top-section",children:[Object(b.jsx)("h1",{children:"good afternoon"}),Object(b.jsx)("div",{className:"boxes",children:null===c||void 0===c?void 0:c.map((function(e){return Object(b.jsxs)("div",{className:"box",children:[Object(b.jsx)("div",{className:"box__image",children:Object(b.jsx)("img",{src:e.images[0].url,alt:""})}),Object(b.jsx)("div",{className:"box__title",children:e.name})]})}))})]}),Object(b.jsx)("div",{className:"middle-section",children:null===i||void 0===i?void 0:i.map((function(e,t){return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("h1",{children:r[t]},e.id),Object(b.jsx)("div",{className:"large-boxes",children:null===e||void 0===e?void 0:e.map((function(e){return Object(b.jsxs)("div",{className:"large-boxes__box",onClick:function(){return n((function(e){return!e})),j(e.id)},children:[Object(b.jsx)("img",{src:e.images[0].url,alt:""}),Object(b.jsx)("div",{className:"large-boxes__box--title",children:e.name})]},e.id)}))},e.id)]})}))}),a&&Object(b.jsx)(l,{setIsClicked:n,chooseTrack:o,playList:d,detail:h})]}),Object(b.jsx)("footer",{className:"footerM",children:Object(b.jsxs)("div",{className:"menuM",children:[Object(b.jsxs)("div",{className:"menu-item active",children:[Object(b.jsx)("i",{className:"fas fa-home"}),"Home"]}),Object(b.jsxs)("div",{className:"menu-item",onClick:m,children:[Object(b.jsx)("i",{className:"fas fa-search"}),"Search"]}),Object(b.jsxs)("div",{className:"menu-item",children:[Object(b.jsx)("i",{className:"fas fa-stream"}),"your library"]})]})})]})}),z=(s(139),function(e){var t=e.myFocus,s=e.userPlaylists,c=e.setIsClicked,i=e.getOne;return Object(b.jsx)(b.Fragment,{children:Object(b.jsx)("div",{className:"sideBar",children:Object(b.jsxs)("div",{className:"navLeft_sub_Container",children:[Object(b.jsxs)("div",{className:"navLeft_top",children:[Object(b.jsx)("div",{className:"navMenuBtn_Left",children:Object(b.jsx)("p",{children:Object(b.jsx)("span",{style:{fontSize:"36px"},className:"material-icons",children:"more_horiz"})})}),Object(b.jsxs)("div",{className:"mainNavPanel",children:[Object(b.jsx)(T.b,{to:"/",children:Object(b.jsxs)("div",{className:"navLeft_item",children:[Object(b.jsx)("p",{children:Object(b.jsx)("span",{style:{fontSize:"25px"},className:"material-icons hover-white",children:"home"})}),Object(b.jsx)("p",{className:"navLeft_text hover-white",children:Object(b.jsx)("h5",{children:"Home"})})]})}),Object(b.jsxs)("div",{onClick:t,className:"navLeft_item",children:[Object(b.jsx)("p",{children:Object(b.jsx)("span",{style:{fontSize:"25px"},className:"material-icons hover-white",children:"search"})}),Object(b.jsx)("p",{className:"navLeft_text hover-white",children:Object(b.jsx)("h5",{children:"Search"})})]}),Object(b.jsxs)("div",{className:"navLeft_item",children:[Object(b.jsx)("p",{children:Object(b.jsx)("span",{style:{fontSize:"25px"},className:"material-icons hover-white",children:"folder"})}),Object(b.jsx)("p",{className:"navLeft_text hover-white",children:Object(b.jsx)("h5",{children:"Your Library"})})]})]}),Object(b.jsxs)("div",{className:"subNavs",children:[Object(b.jsxs)("div",{className:"navLeft_item",children:[Object(b.jsx)("p",{children:Object(b.jsx)("span",{style:{fontSize:"25px"},className:"material-icons hover-white",children:"add_box"})}),Object(b.jsx)("p",{className:"navLeft_text hover-white",children:Object(b.jsx)("h5",{children:"Create Playlist"})})]}),Object(b.jsx)(T.b,{to:"/savedTracks",className:"navLeft_text hover-white",children:Object(b.jsxs)("div",{className:"navLeft_item",children:[Object(b.jsx)("p",{children:Object(b.jsx)("span",{style:{fontSize:"25px"},className:"material-icons hover-white",children:"favorite"})}),Object(b.jsx)("h5",{children:"Liked Songs"})]})})]})]}),Object(b.jsx)("div",{className:"navLeft_bottom",children:Object(b.jsx)("div",{className:"playlistList",children:null===s||void 0===s?void 0:s.map((function(e){return Object(b.jsx)("p",{style:{cursor:"pointer"},onClick:function(){return c((function(e){return!e})),i(e.id)},className:"playlistName",children:e.name},e.id)}))})})]})})})}),D=new f.a({clientId:"057cdd5b992444f2858403e816dcae20"});function B(e){var t=function(e){var t=Object(c.useState)(),s=Object(l.a)(t,2),i=s[0],r=s[1],n=Object(c.useState)(),a=Object(l.a)(n,2),j=a[0],d=a[1],b=Object(c.useState)(),h=Object(l.a)(b,2),m=h[0],x=h[1];return Object(c.useEffect)((function(){o.a.post("https://myspoty.herokuapp.com/login",{code:e}).then((function(e){r(e.data.accessToken),d(e.data.refreshToken),x(e.data.expiresIn),window.history.pushState({},null,"/")})).catch((function(){window.location="/"}))}),[e]),Object(c.useEffect)((function(){if(j&&m){var e=setInterval((function(){o.a.post("https://myspoty.herokuapp.com/refresh",{refreshToken:j}).then((function(e){r(e.data.accessToken),x(e.data.expiresIn)})).catch((function(){window.location="/"}))}),1e3*(m-60));return function(){return clearInterval(e)}}}),[j,m]),i}(e.code),s=Object(c.useRef)(""),i=Object(c.useState)(""),r=Object(l.a)(i,2),n=r[0],a=r[1],j=Object(c.useState)([]),d=Object(l.a)(j,2),x=d[0],O=d[1],u=Object(c.useState)(),f=Object(l.a)(u,2),p=f[0],g=f[1],v=Object(c.useState)(!1),N=Object(l.a)(v,2),C=N[0],S=N[1],L=Object(c.useState)(),T=Object(l.a)(L,2),I=T[0],A=T[1],B=Object(c.useState)(),R=Object(l.a)(B,2),Y=R[0],q=R[1],H=Object(c.useState)(),J=Object(l.a)(H,2),G=J[0],Z=J[1],K=Object(c.useState)(),V=Object(l.a)(K,2),Q=V[0],X=V[1],$=Object(c.useState)([]),ee=Object(l.a)($,2),te=ee[0],se=ee[1],ce=Object(c.useState)(),ie=Object(l.a)(ce,2),re=ie[0],ne=ie[1],ae=Object(c.useState)(""),le=Object(l.a)(ae,2),je=le[0],oe=le[1];function de(e){g(e),a("")}Object(c.useEffect)((function(){t&&D.setAccessToken(t)}),[t]),Object(c.useEffect)((function(){if(!n)return O([]);t&&function(e,t,s){var c=!1;e.searchTracks(t).then((function(e){c||s(e.body.tracks.items.map((function(e){var t=e.album.images.reduce((function(e,t){return t.height<e.height?t:e}),e.album.images[0]);return{artist:e.artists[0].name,title:e.name,uri:e.uri,albumUrl:t.url}})))}))}(D,n,O)}),[n,t]);var be=Object(c.useState)([]),he=Object(l.a)(be,2),me=he[0],xe=he[1];function Oe(e){var t;te.forEach((function(s){s.find((function(t){return t.id===e}))&&(t=s.find((function(t){return t.id===e})))})),Q.find((function(t){return t.id===e}))&&(t=Q.find((function(t){return t.id===e}))),Z(t),function(e,t,s){e.getPlaylistTracks(t.id,{offset:1,limit:100,fields:"items"}).then((function(e){s({items:e.body.items.map((function(e){return e.track}))})}),(function(e){console.log("Something went wrong!",e)}))}(D,t,A)}function ue(){s.current.focus()}Object(c.useEffect)((function(){t&&(function(e,t,s){e.getMe().then((function(c){s(c.body.display_name),e.getUserPlaylists(c.body.id).then((function(e){t(e.body.items)}),(function(e){console.log("Something went wrong!",e)}))}),(function(e){console.log("Something went wrong!",e)}))}(D,X,oe),function(e,t,s,c){e.getCategories({limit:10,offset:0,country:"US"}).then((function(i){console.log("chec",i.body),t(i.body.categories.items),i.body.categories.items.forEach((function(t){e.getPlaylistsForCategory(t.id,{country:"US",limit:30,offset:0}).then((function(e){s((function(e){return[].concat(Object(W.a)(e),[t.name])})),c((function(t){return[].concat(Object(W.a)(t),[e.body.playlists.items])}))}),(function(e){console.log("Something went wrong!",e)}))}))}),(function(e){console.log("Something went wrong!",e)}))}(D,ne,xe,se),function(e,t){e.getMySavedTracks({market:"ES",limit:50,offset:0}).then((function(e){console.log("last",e.body),t({items:e.body.items.map((function(e){return e.track}))})}))}(D,q))}),[t]);var fe=Object(c.useState)(window.innerWidth),pe=Object(l.a)(fe,2),ge=pe[0],ve=pe[1];return Object(c.useEffect)((function(){window.addEventListener("resize",(function(){ve(window.innerWidth)}))}),[ge]),Object(b.jsxs)(b.Fragment,{children:[ge>500?Object(b.jsxs)("div",{className:"siteWrapper",children:[Object(b.jsx)(z,{myFocus:ue,userPlaylists:Q,setIsClicked:S,getOne:Oe}),Object(b.jsxs)("div",{className:"main",children:[Object(b.jsxs)("header",{children:[Object(b.jsx)("div",{className:"nav-left",children:Object(b.jsx)("input",{ref:s,onChange:function(e){return a(e.target.value)},className:"nav-search",type:"text",placeholder:" Search"})}),Object(b.jsxs)("div",{className:"nav-right",children:[Object(b.jsx)("img",{className:"nav-image",src:"https://icon-library.com/images/my-profile-icon-png/my-profile-icon-png-22.jpg",alt:""}),Object(b.jsx)("p",{className:"username",children:je})]})]}),Object(b.jsxs)(y.c,{children:[Object(b.jsxs)(y.a,{exact:!0,path:"/",children:[Object(b.jsx)("div",{className:"searchResultsWrapper",children:x.map((function(e){return Object(b.jsx)(m,{track:e,chooseTrack:de},e.uri)}))}),Object(b.jsx)("hr",{}),te.map((function(e,t){return Object(b.jsx)(P,{allUs:e,AlbumImg:E,getOne:Oe,setIsClicked:S,des:me[t]},t)})),Object(b.jsx)(M,{userPlaylists:Q,setIsClicked:S,getOne:Oe,AlbumImg:E}),C&&Object(b.jsx)(w,{setIsClicked:S,chooseTrack:de,playList:I,detail:G})]}),Object(b.jsxs)(y.a,{path:"/savedTracks",children:[Object(b.jsx)("div",{style:{maxWidth:"1125px",margin:"0 auto"},children:Object(b.jsx)("div",{style:{maxWidth:"400px"},children:Object(b.jsx)("img",{src:"https://images.unsplash.com/photo-1612820885398-03b96dab50a8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA0fHxoZWFydHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",alt:"",width:"100%"})})}),Object(b.jsx)(k,{chooseTrack:de,playList:Y})]}),Object(b.jsxs)(y.a,{path:"/discover",children:[Object(b.jsx)("h1",{style:{marginTop:"77px"},children:"party playlist"}),Object(b.jsx)(_,{partyPlaylist:re,setIsClicked:S,getOne:Oe,AlbumImg:E}),C&&Object(b.jsx)(w,{setIsClicked:S,chooseTrack:de,playList:I,detail:G})]}),Object(b.jsxs)(y.a,{path:"/:id",children:[Object(b.jsx)(F,{partyPlaylist:te,setIsClicked:S,getOne:Oe,AlbumImg:E}),C&&Object(b.jsx)(w,{setIsClicked:S,chooseTrack:de,playList:I,detail:G})]})]}),Object(b.jsx)("div",{style:{height:"30px",marginBottom:"70px"}})]})]}):Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(U,{searchRef:s,setSearch:a,userPlaylists:Q,categoryPlaylist:te,playlistDes:me,setIsClicked:S,isClicked:C,Playlist:w,getOne:Oe,chooseTrack:de,playList:I,detail:G,myFocus:ue}),Object(b.jsx)("div",{className:"searchResultsWrapper",children:x.map((function(e){return Object(b.jsx)(m,{track:e,chooseTrack:de},e.uri)}))})]}),Object(b.jsx)("div",{className:"playerBackground",children:Object(b.jsx)("div",{className:"playerSticky",children:Object(b.jsx)("div",{children:Object(b.jsx)(h,{accessToken:t,trackUri:null===p||void 0===p?void 0:p.uri})})})})]})}var R,Y=function(){return Object(b.jsx)(b.Fragment,{children:Object(b.jsx)("header",{className:"headerL",children:Object(b.jsxs)("div",{className:"header-container",children:[Object(b.jsx)("div",{className:"header-logo",children:Object(b.jsx)("img",{alt:"",src:"images/spotify-logo.svg"})}),Object(b.jsxs)("nav",{className:"nav-mobile",children:[Object(b.jsx)("div",{className:"profileL",children:Object(b.jsx)("svg",{viewBox:"0 0 1024 1024",className:"profileL-icon",children:Object(b.jsx)("path",{d:"M730.06 679.64q-45.377 53.444-101.84 83.443t-120 29.999q-64.032 0-120.75-30.503t-102.6-84.451q-40.335 13.109-77.645 29.747t-53.948 26.722l-17.142 10.084Q106.388 763.84 84.96 802.41t-21.428 73.107 25.461 59.242 60.754 24.705h716.95q35.293 0 60.754-24.705t25.461-59.242-21.428-72.603-51.679-57.225q-6.554-4.033-18.907-10.84t-51.427-24.453-79.409-30.755zm-221.84 25.72q-34.285 0-67.561-14.873t-60.754-40.335-51.175-60.502-40.083-75.124-25.461-84.451-9.075-87.728q0-64.032 19.915-116.22t54.452-85.964 80.67-51.931 99.072-18.151 99.072 18.151 80.67 51.931 54.452 85.964 19.915 116.22q0 65.04-20.167 130.58t-53.948 116.72-81.426 83.443-98.568 32.268z"})})}),Object(b.jsx)("input",{type:"checkbox",className:"toggler"}),Object(b.jsx)("div",{className:"hamburger-menu",children:Object(b.jsx)("div",{})}),Object(b.jsxs)("div",{className:"menu",children:[Object(b.jsx)("div",{className:"background-overlay"}),Object(b.jsxs)("div",{className:"menu-overlay",children:[Object(b.jsxs)("ul",{children:[Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"Premium"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"Help"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"Download"})}),Object(b.jsx)("li",{role:"separator"}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"Account"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"Log out"})})]}),Object(b.jsx)("div",{className:"menu-overlay-logo",children:Object(b.jsx)("img",{alt:"",src:"images/spotify-logo.svg"})})]})]})]}),Object(b.jsxs)("nav",{className:"nav-desktop",children:[Object(b.jsxs)("ul",{children:[Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"Premium"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"Help"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"Download"})}),Object(b.jsx)("li",{role:"separator"})]}),Object(b.jsxs)("div",{className:"profileL-container",children:[Object(b.jsx)("input",{type:"checkbox",className:"dropdown-menu-toggler"}),Object(b.jsx)("div",{className:"dropdown-menu",children:Object(b.jsxs)("ul",{children:[Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"Account"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"Log out"})})]})}),Object(b.jsx)("div",{className:"profileL",children:Object(b.jsx)("i",{className:"fas fa-user"})}),Object(b.jsxs)("ul",{children:[Object(b.jsx)("li",{children:"ProfileL"}),Object(b.jsx)("li",{children:Object(b.jsx)("i",{className:"fas fa-chevron-down"})})]})]})]})]})})})},q=function(){return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("section",{className:"hero",children:Object(b.jsx)("div",{className:"hero-container",children:Object(b.jsxs)("div",{className:"hero-content",children:[Object(b.jsx)("h1",{className:"hero-title",children:"Go Premium. Be happy."}),Object(b.jsx)("a",{className:"hero-button",href:"https://accounts.spotify.com/authorize?client_id=057cdd5b992444f2858403e816dcae20&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state",children:"GET SPOTIFY PREMIUM"}),Object(b.jsxs)("div",{className:"terms",children:[Object(b.jsx)("span",{children:"*"}),Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",className:"hero-terms-link",children:"Terms and conditions"}),Object(b.jsx)("span",{children:"apply."})]})]})})}),Object(b.jsx)("section",{className:"albums",children:Object(b.jsxs)("div",{className:"albums-container",children:[Object(b.jsxs)("div",{className:"albums-content",children:[Object(b.jsx)("h2",{children:"Looking for music?"}),Object(b.jsx)("p",{children:"Start listening to the best new releases."}),Object(b.jsx)("button",{children:"LAUNCH WEB PLAYER"})]}),Object(b.jsxs)("div",{className:"albums-cards-container",children:[Object(b.jsxs)("div",{className:"album",children:[Object(b.jsx)("img",{alt:"",src:"images/travis-scott.jpg"}),Object(b.jsxs)("div",{className:"album-info",children:[Object(b.jsx)("h2",{children:"FRANCHISE (feat. Young Thug & M.I.A.)"}),Object(b.jsx)("h4",{children:"Travis Scott"}),Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"PLAY NOW"})]})]}),Object(b.jsxs)("div",{className:"album",children:[Object(b.jsx)("img",{alt:"",src:"images/zayn.jpg"}),Object(b.jsxs)("div",{className:"album-info",children:[Object(b.jsx)("h2",{children:"Better"}),Object(b.jsx)("h4",{children:"ZAYN"}),Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"PLAY NOW"})]})]}),Object(b.jsxs)("div",{className:"album",children:[Object(b.jsx)("img",{alt:"",src:"images/joji.jpg"}),Object(b.jsxs)("div",{className:"album-info",children:[Object(b.jsx)("h2",{children:"Nectar"}),Object(b.jsx)("h4",{children:"Joji"}),Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"PLAY NOW"})]})]}),Object(b.jsxs)("div",{className:"album",children:[Object(b.jsx)("img",{alt:"",src:"images/jennifer-lopez.jpg"}),Object(b.jsxs)("div",{className:"album-info",children:[Object(b.jsx)("h2",{children:"Pa Ti + Lonely"}),Object(b.jsx)("h4",{children:"Jennifer Lopez"}),Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"PLAY NOW"})]})]}),Object(b.jsxs)("div",{className:"album",children:[Object(b.jsx)("img",{alt:"",src:"images/machine-gun-kelly.jpg"}),Object(b.jsxs)("div",{className:"album-info",children:[Object(b.jsx)("h2",{children:"Tickets To My Downfall"}),Object(b.jsx)("h4",{children:"Machine Gun Kelly"}),Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"PLAY NOW"})]})]}),Object(b.jsxs)("div",{className:"album",children:[Object(b.jsx)("img",{alt:"",src:"images/chris-stapleton.jpg"}),Object(b.jsxs)("div",{className:"album-info",children:[Object(b.jsx)("h2",{children:"Cold"}),Object(b.jsx)("h4",{children:"Chris Stapleton"}),Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"PLAY NOW"})]})]})]})]})})]})},H=function(){return Object(b.jsx)(b.Fragment,{children:Object(b.jsx)("footer",{className:"footer",children:Object(b.jsxs)("nav",{className:"footer-nav",children:[Object(b.jsx)("div",{className:"logo-footer",children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:Object(b.jsx)("img",{alt:"",src:"images/spotify-logo.svg"})})}),Object(b.jsxs)("div",{className:"top-links",children:[Object(b.jsx)("div",{className:"company-links",children:Object(b.jsxs)("ul",{children:[Object(b.jsx)("li",{children:"COMPANY"}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"About"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"Jobs"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"For the Record"})})]})}),Object(b.jsx)("div",{className:"communities-links",children:Object(b.jsxs)("ul",{children:[Object(b.jsx)("li",{children:"COMMUNITIES"}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"For artists"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"Developers"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"Advertising"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"Investors"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"Vendors"})})]})}),Object(b.jsx)("div",{className:"useful-links",children:Object(b.jsxs)("ul",{children:[Object(b.jsx)("li",{children:"USEFUL LINKS"}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"Help"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"Web Player"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"Free Mobile App"})})]})})]}),Object(b.jsx)("div",{className:"social-icons",children:Object(b.jsxs)("ul",{children:[Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:Object(b.jsx)("img",{alt:"",src:"images/instagram-icon.svg"})})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:Object(b.jsx)("img",{alt:"",src:"images/twitter-icon.svg"})})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:Object(b.jsx)("img",{alt:"",src:"images/facebook-icon.svg"})})})]})}),Object(b.jsx)("div",{className:"country",children:Object(b.jsxs)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:[Object(b.jsx)("span",{children:"USA"}),Object(b.jsx)("img",{alt:"",src:"images/us.svg"})]})}),Object(b.jsxs)("div",{className:"bottom-links",children:[Object(b.jsxs)("ul",{children:[Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"Legal"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"Privacy Center"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"Privacy Policy"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"Cookies"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"About Ads"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"https://www.spotify.com/us/",target:"_blank",rel:"noreferrer",children:"Additional CA Privacy Disclosures"})})]}),Object(b.jsx)("span",{children:"\xa9 2020 Spotify AB"})]})]})})})},J=(s(140),s(141),s(142),s(143),s(144),s(145),function(){return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(Y,{}),Object(b.jsx)(q,{}),Object(b.jsx)(H,{})]})});function G(){var e=Object(y.f)().pathname;return Object(c.useEffect)((function(){window.scrollTo(0,0)}),[e]),null}var Z=new URLSearchParams(window.location.search).get("code"),K=p.a.div(R||(R=Object(a.a)(["\n  /* max-width: 2000px; */\n  margin: 0 auto;\n  padding: 0 22px;\n  @media (max-width: 500px) {\n    padding: 0;\n  }\n"])));var V=function(){return Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)(T.a,{children:[Object(b.jsx)(G,{}),Z?Object(b.jsx)(K,{children:Object(b.jsx)(B,{code:Z})}):Object(b.jsx)(b.Fragment,{children:Object(b.jsx)(J,{})})]})})};n.a.render(Object(b.jsx)(i.a.StrictMode,{children:Object(b.jsx)(V,{})}),document.getElementById("root"))},50:function(e,t,s){},51:function(e,t,s){}},[[146,1,2]]]);
//# sourceMappingURL=main.b16a9d7d.chunk.js.map