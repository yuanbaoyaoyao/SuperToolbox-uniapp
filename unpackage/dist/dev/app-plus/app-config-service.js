
  ;(function(){
  let u=void 0,isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
  const __uniConfig = {"pages":[],"globalStyle":{"backgroundColor":"#F8F8F8","navigationBar":{"backgroundColor":"#F8F8F8","titleText":"小匠工具箱","type":"default","titleColor":"#000000"},"isNVue":false},"nvue":{"compiler":"uni-app","styleCompiler":"uni-app","flex-direction":"column"},"renderer":"auto","appname":"ruler","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":true},"compilerVersion":"3.96","entryPagePath":"pages/index/index","entryPageQuery":"","realEntryPagePath":"","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"tabBar":{"position":"bottom","color":"#7A7E83","selectedColor":"#000000","borderStyle":"black","blurEffect":"none","fontSize":"10px","iconWidth":"24px","spacing":"3px","height":"50px","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"/static/home_unchecked.png","selectedIconPath":"/static/home.png","text":"主页"},{"pagePath":"pages/moreAppPage/moreAppPage","iconPath":"/static/more_app_unchecked.png","selectedIconPath":"/static/more_app.png","text":"更多"}],"selectedIndex":0,"shown":true},"locales":{},"darkmode":false,"themeConfig":{}};
  const __uniRoutes = [{"path":"pages/index/index","meta":{"isQuit":true,"isEntry":true,"isTabBar":true,"tabBarIndex":0,"navigationBar":{"titleText":"小匠工具箱","type":"default"},"isNVue":false}},{"path":"pages/moreAppPage/moreAppPage","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":1,"enablePullDownRefresh":false,"navigationBar":{"titleText":"更多应用","type":"default"},"isNVue":false}},{"path":"subPackages/protractorPage/protractorPage","meta":{"enablePullDownRefresh":false,"titleNView":false,"navigationBar":{"type":"default","style":"custom"},"isNVue":false}},{"path":"subPackages/gradienterPage/gradienterPage","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"水平仪","type":"default"},"isNVue":false}},{"path":"subPackages/compassPage/compassPage","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"指南针","type":"default"},"isNVue":false}},{"path":"subPackages/altitudePage/altitudePage","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"经纬度","type":"default"},"isNVue":false}},{"path":"subPackages/drawingBoardPage/drawingBoardPage","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"画板","type":"default"},"isNVue":false}},{"path":"subPackages/qrCodeGenPage/qrCodeGenPage","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"二维码生成器","type":"default"},"isNVue":false}},{"path":"subPackages/qrCodeIdPage/qrCodeIdPage","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"二维码扫描器","type":"default"},"isNVue":false}},{"path":"subPackages/amountCapitalPage/amountCapitalPage","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"金额转大写","type":"default"},"isNVue":false}},{"path":"subPackages/handheldBarragePage/handheldBarragePage","meta":{"enablePullDownRefresh":false,"titleNView":false,"navigationBar":{"titleText":"","type":"default","style":"custom"},"isNVue":false}},{"path":"subPackages/randomShakerPage/randomShakerPage","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"随机摇号器","type":"default"},"isNVue":false}},{"path":"subPackages/gridDiagram/gridDiagram","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"九宫格切图","type":"default"},"isNVue":false}},{"path":"subPackages/fullScreenClockPage/fullScreenClockPage","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"subPackages/wonderfulFonts/wonderfulFonts","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"奇妙文字","type":"default"},"isNVue":false}},{"path":"subPackages/pdfWatermark/pdfWatermark","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"pdf添加水印","type":"default"},"isNVue":false}}].map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute));
  __uniConfig.styles=[];//styles
  __uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  __uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:16})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:u,window:u,document:u,frames:u,self:u,location:u,navigator:u,localStorage:u,history:u,Caches:u,screen:u,alert:u,confirm:u,prompt:u,fetch:u,XMLHttpRequest:u,WebSocket:u,webkit:u,print:u}}}}); 
  })();
  