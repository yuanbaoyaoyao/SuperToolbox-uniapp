"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "ScrollChoose",
  data() {
    return {
      /**
       * 初始值（注意：初始值应在起始值和终止值之间）
       */
      scrollLeft: 0,
      /**
       * 滚动区域起始值（注意：起始值不能大于终止值）
       */
      scrollStart: 0,
      /**
       * 滚动区域终止值
       */
      scrollEnd: 100,
      /**
       * 线间距
       */
      maginL: 5,
      scrollList: [],
      scrollNumList: [],
      scrollWid: "100vw",
      circleX: 0,
      circleY: 0,
      //
      offsetLeft: 0,
      offsetTop: 0
    };
  },
  mounted() {
    this.init();
    common_vendor.index.getSystemInfo({
      success: function(res) {
        console.log("devicePixelRatio:", res.devicePixelRatio);
        console.log("screenWidth:", res.screenWidth);
        console.log("pxtocm:", 1 / res.devicePixelRatio / res.screenWidth * 2.54);
        console.log("resssssssss:", res);
      }
    });
  },
  methods: {
    init() {
      for (let i = this.scrollStart; i < this.scrollEnd + 1; i++) {
        let _line = {};
        if (i % 5 == 0) {
          if (i % 10 == 0) {
            this.scrollNumList.push(i);
            _line.type = "LLine";
          } else {
            _line.type = "MLine";
          }
        } else {
          _line.type = "SLine";
        }
        this.scrollList.push(_line);
      }
      this.scrollWid = common_vendor.index.upx2px(750) + (this.scrollEnd - this.scrollStart) * (this.maginL + 2) + "px";
      if (this.scrollStart % 10 != 0) {
        if (this.scrollStart > 0) {
          this.allNumLeft = (10 - this.scrollStart % 10) * (this.maginL + 2) + common_vendor.index.upx2px(372) + "px";
        } else {
          this.allNumLeft = Math.abs(this.scrollStart % 10) * (this.maginL + 2) + common_vendor.index.upx2px(372) + "px";
        }
      }
    },
    mouseDownHandler(e) {
      this.offsetTop = e.touches[0].pageY;
      this.offsetLeft = e.touches[0].pageX;
    },
    mouseMoveHandler(e) {
      this.offsetTop = e.touches[0].pageY;
      this.offsetLeft = e.touches[0].pageX;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.scrollList, (item, index, i0) => {
      return {
        a: common_vendor.n(item.type),
        b: index
      };
    }),
    b: $data.maginL + "px",
    c: common_vendor.f($data.scrollNumList, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    }),
    d: ($data.maginL + 2) * 10 + "px",
    e: -(($data.maginL + 2) * 5) + "px",
    f: $data.scrollWid,
    g: $data.offsetLeft + "px",
    h: $data.offsetTop + "px",
    i: $data.offsetTop + "px",
    j: common_vendor.o((...args) => $options.mouseDownHandler && $options.mouseDownHandler(...args)),
    k: common_vendor.o((...args) => $options.mouseMoveHandler && $options.mouseMoveHandler(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Data/Code/Project/mine/frontEnd/uni-app-ruler/ruler/pages/rulerPage/rulerPage.vue"]]);
wx.createPage(MiniProgramPage);
