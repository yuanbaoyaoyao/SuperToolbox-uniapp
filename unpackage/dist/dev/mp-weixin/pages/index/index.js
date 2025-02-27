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
          url: "/subPackages/protractorPage/protractorPage",
          name: "量角器",
          icon: "/static/index/protractor.svg"
        },
        {
          url: "/subPackages/compassPage/compassPage",
          name: "指南针",
          icon: "/static/index/compass.svg"
        },
        {
          url: "/subPackages/gradienterPage/gradienterPage",
          name: "水平仪",
          icon: "/static/index/gradienter.svg"
        },
        // {
        // 	url: "/pages/decibelMeterPage/decibelMeterPage",
        // 	name: "分贝仪"
        // },
        {
          url: "/subPackages/altitudePage/altitudePage",
          // name: "经纬度/位置",
          name: "经纬度",
          icon: "/static/index/position.svg"
        },
        {
          url: "/subPackages/drawingBoardPage/drawingBoardPage",
          name: "画板",
          icon: "/static/index/drawingBoard.svg"
        },
        {
          url: "/subPackages/qrCodeGenPage/qrCodeGenPage",
          name: "二维码生成器",
          icon: "/static/index/qrCodeGen.svg"
        },
        {
          url: "/subPackages/qrCodeIdPage/qrCodeIdPage",
          name: "二维码扫描器",
          icon: "/static/index/qrCodeId.svg"
        },
        {
          url: "/subPackages/amountCapitalPage/amountCapitalPage",
          name: "金额转大写",
          icon: "/static/index/amountCapital.svg"
        },
        {
          url: "/subPackages/handheldBarragePage/handheldBarragePage",
          name: "手持弹幕",
          icon: "/static/index/handheldBarrage.svg"
        },
        {
          url: "/subPackages/randomShakerPage/randomShakerPage",
          name: "随机摇号器",
          icon: "/static/index/randomShaker.svg"
        },
        {
          url: "/subPackages/gridDiagram/gridDiagram",
          name: "九宫格切图",
          icon: "/static/index/gridDiagram.svg"
        },
        {
          url: "/subPackages/fullScreenClockPage/fullScreenClockPage",
          name: "全屏时钟",
          icon: "/static/index/fullScreenClock.svg"
        },
        {
          url: "/subPackages/wonderfulFonts/wonderfulFonts",
          name: "奇妙字体",
          icon: "/static/index/wonderfulFonts.svg"
        },
        {
          url: "/subPackages/pdfWatermark/pdfWatermark",
          name: "pdf添加水印",
          icon: "/static/index/pdfWatermark.svg"
        }
        // {
        // 	url: "/pages/pictureSubtitlePage/pictureSubtitlePage",
        // 	name: "图片字幕叠加",
        // 	icon: "/static/index/pictureSubtitle.svg"
        // },
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
        store_index.store.commit("setScreenWidth", res.screenWidth);
        store_index.store.commit("setScreenHeight", res.screenHeight);
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
        a: item.icon,
        b: common_vendor.t(item.name),
        c: index,
        d: common_vendor.o(($event) => $options.handleClickRouter(index), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Data/Code/Project/mine/frontEnd/uniapp/uni-app-ruler/ruler/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
