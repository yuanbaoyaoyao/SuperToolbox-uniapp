"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      latitude: void 0,
      longitude: void 0,
      speed: void 0,
      altitude: void 0
    };
  },
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
    let that = this;
    common_vendor.index.startLocationUpdate({
      success: (res) => {
        common_vendor.index.onLocationChange(function(res2) {
          console.log("resss22222222:", res2);
          console.log("纬度：" + res2.latitude);
          console.log("经度：" + res2.longitude);
          that.latitude = res2.latitude;
          that.longitude = res2.longitude;
          that.altitude = res2.altitude;
          that.speed = res2.speed;
        });
      },
      fail: (err) => console.error("开启小程序接收位置消息失败：", err),
      complete: (msg) => console.log("调用开启小程序接收位置消息 API 完成")
    });
  },
  onHide: function() {
    console.log("App Hide");
    common_vendor.index.stopLocationUpdate();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.longitude),
    b: common_vendor.t($data.latitude)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Data/Code/Project/mine/frontEnd/uni-app-ruler/ruler/pages/altitudePage/altitudePage.vue"]]);
wx.createPage(MiniProgramPage);
