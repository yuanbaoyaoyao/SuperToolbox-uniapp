"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      scanType: null,
      result: null
    };
  },
  methods: {
    handleScanQr() {
      this.scanType = null;
      this.result = null;
      let that = this;
      common_vendor.index.scanCode({
        success: function(res) {
          that.scanType = res.scanType;
          that.result = res.result;
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.result != null
  }, $data.result != null ? {
    b: common_vendor.t($data.scanType),
    c: common_vendor.t($data.result)
  } : {}, {
    d: common_vendor.o((...args) => $options.handleScanQr && $options.handleScanQr(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Data/Code/Project/mine/frontEnd/uni-app-ruler/ruler/pages/qrCodeIdPage/qrCodeIdPage.vue"]]);
wx.createPage(MiniProgramPage);
