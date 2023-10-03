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
        that.drawRoundImage(res.screenHeight);
      }
    });
  },
  methods: {
    drawRoundImage(height) {
      const ctx = common_vendor.index.createCanvasContext("myCanvas");
      ctx.beginPath();
      ctx.arc(10, height / 2, height / 2 - 50, 90 * Math.PI / 180, 270 * Math.PI / 180, true);
      ctx.lineTo(10, height - 50);
      ctx.setStrokeStyle("#333333");
      ctx.stroke();
      ctx.closePath();
      const degrees = 180;
      const tickSpacing = degrees / 180;
      const centerX = 10;
      const centerY = height / 2;
      const radius = height / 2 - 50;
      const centerTextX = 10;
      const centerTextY = height / 2 - 10;
      const textRadius = height / 2 - 85;
      for (let i = 0; i <= degrees; i += tickSpacing) {
        let tickLength = 10;
        if (i % 5 == 0) {
          tickLength = 15;
        }
        if (i % 10 == 0 || i == 0) {
          tickLength = 20;
        }
        const angle = i * Math.PI / 180 - Math.PI / 2;
        const startX = centerX + Math.cos(angle) * (radius - tickLength);
        const startY = centerY + Math.sin(angle) * (radius - tickLength);
        const endX = centerX + Math.cos(angle) * radius;
        const endY = centerY + Math.sin(angle) * radius;
        const textEndX = centerTextX + Math.cos(angle) * textRadius;
        const textEndY = centerTextY + Math.sin(angle) * textRadius;
        if (i % 10 == 0 || i == 0) {
          ctx.setFontSize(12);
          ctx.translate(textEndX, textEndY);
          ctx.rotate(Math.PI / 2);
          ctx.fillText(i, 0, 0);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.setStrokeStyle("#333333");
        ctx.stroke();
        ctx.closePath();
      }
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
