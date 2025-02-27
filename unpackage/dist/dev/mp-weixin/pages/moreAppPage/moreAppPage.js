"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      appList: [{
        appIcon: "/static/moreApp/holiday_balance.png",
        appName: "我的假日",
        appDesc: "下一个假日，假期余额。为大家提供简洁美观的使用体验。"
      }],
      isShowPopup: false
    };
  },
  methods: {
    handleShowPopup() {
      this.isShowPopup = true;
    },
    handleClosePopup() {
      this.isShowPopup = false;
    },
    handleToMiniProgram(miniInfo) {
      common_vendor.index.navigateToMiniProgram({
        appId: "wx627c724a69f59702",
        path: "pages/legalHolidays/legalHolidays",
        // 不填默认首页
        extraData: {},
        success(res) {
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.handleShowPopup && $options.handleShowPopup(...args)),
    b: common_vendor.f($data.appList, (item, index, i0) => {
      return {
        a: item.appIcon,
        b: common_vendor.t(item.appName),
        c: common_vendor.t(item.appDesc),
        d: common_vendor.o(($event) => $options.handleToMiniProgram(item))
      };
    }),
    c: $data.isShowPopup
  }, $data.isShowPopup ? {
    d: common_vendor.o((...args) => $options.handleClosePopup && $options.handleClosePopup(...args)),
    e: common_vendor.o((...args) => $options.handleClosePopup && $options.handleClosePopup(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Data/Code/Project/mine/frontEnd/uniapp/uni-app-ruler/ruler/pages/moreAppPage/moreAppPage.vue"]]);
wx.createPage(MiniProgramPage);
