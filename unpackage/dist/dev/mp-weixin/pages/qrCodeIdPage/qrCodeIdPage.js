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
    handleCopy() {
      let that = this;
      common_vendor.index.setClipboardData({
        data: that.result,
        //当前点击的地址
        success: () => {
          common_vendor.index.getClipboardData({
            success: () => {
              common_vendor.index.showToast({
                title: "已复制二维码内容",
                icon: "success"
              });
            }
          });
        }
      });
    },
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
    c: common_vendor.t($data.result),
    d: common_vendor.o((...args) => $options.handleCopy && $options.handleCopy(...args))
  } : {}, {
    e: common_vendor.o((...args) => $options.handleScanQr && $options.handleScanQr(...args)),
    f: $data.result != null
  }, $data.result != null ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Data/Code/Project/mine/frontEnd/uni-app-ruler/ruler/pages/qrCodeIdPage/qrCodeIdPage.vue"]]);
wx.createPage(MiniProgramPage);
