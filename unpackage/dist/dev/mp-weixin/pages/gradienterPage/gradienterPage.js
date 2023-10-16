"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      top: 180,
      left: 180,
      backgroundColor: "#000000",
      regionBG: "#e72323",
      isOnAccelerometerChange: true,
      x: 0,
      y: 0,
      z: 0,
      alpha: 0,
      beta: 0
    };
  },
  // 使用示例
  onLoad(options) {
    let that = this;
    common_vendor.index.startGyroscope({
      interval: "normal",
      success() {
        common_vendor.index.onAccelerometerChange(function(res) {
          if (!that.isOnAccelerometerChange) {
            return;
          }
          let x = (res.x * 180).toFixed(2);
          let y = -(res.y * 180).toFixed(2);
          let z = (res.z * 180).toFixed(2);
          let top = 180 + Number(y);
          let left = 180 + Number(x);
          let xg = x / 9.8;
          let yg = y / 9.8;
          let zg = z / 9.8;
          that.alpha = (180 - Math.abs(Math.atan2(yg, zg) * 180 / Math.PI)).toFixed(2);
          that.beta = Math.abs(Math.atan2(xg, Math.sqrt(yg * yg + zg * zg)) * 180 / Math.PI).toFixed(2);
          that.top = top;
          that.left = left;
          that.x = x;
          that.y = y;
          that.z = z;
          if (top > 180 && top < 190 && left > 180 && left < 190) {
            that.regionBG = "#82ec82";
          } else {
            that.regionBG = "#e72323";
          }
        });
      }
    });
  },
  onUnload() {
    this.isOnAccelerometerChange = false;
    common_vendor.index.stopAccelerometer();
    common_vendor.index.stopGyroscope();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.alpha),
    b: common_vendor.t($data.beta),
    c: common_vendor.s("background:" + $data.regionBG),
    d: common_vendor.s("background:" + $data.backgroundColor + ";top:" + $data.top + "rpx;left:" + $data.left + "rpx;")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Data/Code/Project/mine/frontEnd/uni-app-ruler/ruler/pages/gradienterPage/gradienterPage.vue"]]);
wx.createPage(MiniProgramPage);
