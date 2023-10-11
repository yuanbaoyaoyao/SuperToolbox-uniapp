"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const _sfc_main = {
  data() {
    return {
      routers: [
        // {
        // 	url: "/pages/rulerPage/rulerPage",
        // 	name: "尺子"
        // },
        {
          url: "/pages/protractorPage/protractorPage",
          name: "量角器"
        },
        {
          url: "/pages/compassPage/compassPage",
          name: "指南针"
        },
        {
          url: "/pages/gradienterPage/gradienterPage",
          name: "水平仪"
        },
        // {
        // 	url: "/pages/decibelMeterPage/decibelMeterPage",
        // 	name: "分贝仪"
        // },
        {
          url: "/pages/altitudePage/altitudePage",
          name: "经纬度/位置"
        },
        {
          url: "/pages/drawingBoardPage/drawingBoardPage",
          name: "画板"
        }
      ]
    };
  },
  onLoad() {
  },
  onReady() {
    common_vendor.index.getSystemInfo({
      success: function(res) {
        const platform = res.platform.toLowerCase();
        store_index.store.commit("setPlatform", platform);
      },
      fail: function(error) {
        console.log("error:", error);
      }
    });
  },
  methods: {
    handleClickRouter(index) {
      common_vendor.index.navigateTo({
        url: this.routers[index].url
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.routers, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: index,
        c: common_vendor.o(($event) => $options.handleClickRouter(index), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Data/Code/Project/mine/frontEnd/uni-app-ruler/ruler/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
