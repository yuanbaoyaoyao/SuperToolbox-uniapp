"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  onReady() {
    let that = this;
    common_vendor.index.getSystemInfo({
      success: function(res) {
        console.log("ressssss:", res.screenHeight);
        that.drawRoundImage(res.screenHeight);
      }
    });
  },
  methods: {
    drawRoundImage(height) {
      console.log("heighttttttt:", height);
      const ctx = common_vendor.index.createCanvasContext("myCanvas");
      ctx.beginPath();
      ctx.arc(10, height / 2, height / 2 - 50, 90 * Math.PI / 180, 270 * Math.PI / 180, true);
      ctx.lineTo(10, height - 50);
      ctx.setStrokeStyle("#333333");
      ctx.stroke();
      ctx.closePath();
      ctx.clip();
      ctx.restore();
      ctx.draw();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Data/Code/Project/mine/frontEnd/uni-app-ruler/ruler/pages/protractorPage/protractorPage.vue"]]);
wx.createPage(MiniProgramPage);
