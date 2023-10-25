"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/protractorPage/protractorPage.js";
  "./pages/rulerPage/rulerPage.js";
  "./pages/gradienterPage/gradienterPage.js";
  "./pages/compassPage/compassPage.js";
  "./pages/decibelMeterPage/decibelMeterPage.js";
  "./pages/altitudePage/altitudePage.js";
  "./pages/drawingBoardPage/drawingBoardPage.js";
  "./pages/moreAppPage/moreAppPage.js";
  "./pages/qrCodeGenPage/qrCodeGenPage.js";
  "./pages/qrCodeIdPage/qrCodeIdPage.js";
  "./pages/amountCapitalPage/amountCapitalPage.js";
  "./pages/handheldBarragePage/handheldBarragePage.js";
  "./pages/randomShakerPage/randomShakerPage.js";
  "./pages/gridDiagram/gridDiagram.js";
  "./pages/fullScreenClockPage/fullScreenClockPage.js";
  "./pages/wonderfulFonts/wonderfulFonts.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Data/Code/Project/mine/frontEnd/uni-app-ruler/ruler/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
