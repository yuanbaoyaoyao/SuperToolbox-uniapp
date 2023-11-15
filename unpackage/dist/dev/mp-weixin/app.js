"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/moreAppPage/moreAppPage.js";
  "./subPackages/protractorPage/protractorPage.js";
  "./subPackages/gradienterPage/gradienterPage.js";
  "./subPackages/compassPage/compassPage.js";
  "./subPackages/altitudePage/altitudePage.js";
  "./subPackages/drawingBoardPage/drawingBoardPage.js";
  "./subPackages/qrCodeGenPage/qrCodeGenPage.js";
  "./subPackages/qrCodeIdPage/qrCodeIdPage.js";
  "./subPackages/amountCapitalPage/amountCapitalPage.js";
  "./subPackages/handheldBarragePage/handheldBarragePage.js";
  "./subPackages/randomShakerPage/randomShakerPage.js";
  "./subPackages/gridDiagram/gridDiagram.js";
  "./subPackages/fullScreenClockPage/fullScreenClockPage.js";
  "./subPackages/wonderfulFonts/wonderfulFonts.js";
  "./subPackages/pdfWatermark/pdfWatermark.js";
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
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Data/Code/Project/mine/frontEnd/uniapp/uni-app-ruler/ruler/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
