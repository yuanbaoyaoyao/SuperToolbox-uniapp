"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      effects: ["抖动", "正常"],
      speeds: ["静止", "0.5倍", "正常", "1.5倍", "2倍"],
      nowFontSize: 400,
      fontColor: "#ffe8cd",
      bgColor: "#000",
      nowEffect: "抖动",
      nowSpeed: "正常",
      nowAnimationDuration: "5s",
      nowAnimationName: "aniMove",
      nowBoxAnimationName: "aniShake",
      nowActiveItem: "",
      isShowBarrage: false,
      barrage: null,
      showClearIcon: false,
      inputClearValue: "",
      isShowPopup: false,
      color: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
      },
      rgba: {
        r: 100,
        g: 187,
        b: 227,
        a: 1
      }
    };
  },
  methods: {
    rgbaToHex(r, g, b, a) {
      const red = r.toString(16).padStart(2, "0");
      const green = g.toString(16).padStart(2, "0");
      const blue = b.toString(16).padStart(2, "0");
      const alpha = Math.round(a * 255).toString(16).padStart(2, "0").slice(2);
      return `#${alpha}${red}${green}${blue}`;
    },
    handleSetEffect(item) {
      this.nowEffect = item;
      this.nowBoxAnimationName = "aniShake";
      if (this.nowEffect == "正常") {
        this.nowBoxAnimationName = "";
      }
    },
    handleSetSpeed(item) {
      this.nowSpeed = item;
      this.nowAnimationName = "aniMove";
      switch (this.nowSpeed) {
        case "静止":
          this.nowAnimationName = "";
          break;
        case "0.5倍":
          this.nowAnimationDuration = "10s";
          break;
        case "正常":
          this.nowAnimationDuration = "5s";
          break;
        case "1.5倍":
          this.nowAnimationDuration = "3.3s";
          break;
        case "2倍":
          this.nowAnimationDuration = "2.5s";
          break;
      }
    },
    sliderChange(e) {
      this.nowFontSize = e.detail.value;
    },
    handleShowPopup() {
      this.isShowPopup = true;
    },
    handleClosePopup() {
      this.isShowPopup = false;
    },
    open(item) {
      this.nowActiveItem = item;
      this.$refs.colorPicker.open();
    },
    confirm(e) {
      this.rgba = e.rgba;
      if (this.nowActiveItem == "字体颜色") {
        this.fontColor = this.rgbaToHex(this.rgba.r, this.rgba.g, this.rgba.b, this.rgba.a);
      } else if (this.nowActiveItem == "背景颜色") {
        this.bgColor = this.rgbaToHex(this.rgba.r, this.rgba.g, this.rgba.b, this.rgba.a);
      }
    },
    handleChangeTextValue(e) {
      this.barrage = e;
    },
    handleShowBarrage() {
      this.isShowBarrage = true;
    },
    handleQuiteBarrage() {
      this.isShowBarrage = false;
      this.$nextTick(() => {
        this.$refs.defaultInput.setInputValueFirst(this.barrage);
      });
    },
    handleReturn() {
      common_vendor.index.navigateBack();
    }
  }
};
if (!Array) {
  const _easycom_defaultInput2 = common_vendor.resolveComponent("defaultInput");
  const _easycom_t_color_picker2 = common_vendor.resolveComponent("t-color-picker");
  (_easycom_defaultInput2 + _easycom_t_color_picker2)();
}
const _easycom_defaultInput = () => "../../components/defaultInput/defaultInput.js";
const _easycom_t_color_picker = () => "../../components/t-color-picker/t-color-picker.js";
if (!Math) {
  (_easycom_defaultInput + _easycom_t_color_picker)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.handleReturn && $options.handleReturn(...args)),
    b: !$data.isShowBarrage
  }, !$data.isShowBarrage ? {
    c: common_vendor.sr("defaultInput", "1f90c14a-0"),
    d: common_vendor.o($options.handleChangeTextValue),
    e: common_vendor.p({
      placeholder: "请输入弹幕"
    }),
    f: common_vendor.o((...args) => $options.handleShowPopup && $options.handleShowPopup(...args)),
    g: common_vendor.o((...args) => $options.handleShowBarrage && $options.handleShowBarrage(...args))
  } : {
    h: common_vendor.t($data.barrage),
    i: $data.nowFontSize + "rpx",
    j: $data.fontColor,
    k: $data.nowAnimationDuration,
    l: $data.nowAnimationName,
    m: common_vendor.o((...args) => $options.handleQuiteBarrage && $options.handleQuiteBarrage(...args)),
    n: $data.bgColor,
    o: $data.nowBoxAnimationName
  }, {
    p: common_vendor.sr("colorPicker", "1f90c14a-1"),
    q: common_vendor.o($options.confirm),
    r: common_vendor.p({
      color: $data.color
    }),
    s: $data.isShowPopup
  }, $data.isShowPopup ? {
    t: common_vendor.o((...args) => $options.handleClosePopup && $options.handleClosePopup(...args)),
    v: common_vendor.o((...args) => $options.handleClosePopup && $options.handleClosePopup(...args)),
    w: $data.fontColor,
    x: common_vendor.o(($event) => $options.open("字体颜色")),
    y: $data.bgColor,
    z: common_vendor.o(($event) => $options.open("背景颜色")),
    A: common_vendor.f($data.effects, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.o(($event) => $options.handleSetEffect(item), index),
        c: index,
        d: $data.nowEffect == item ? "1rpx solid black" : ""
      };
    }),
    B: common_vendor.f($data.speeds, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.o(($event) => $options.handleSetSpeed(item), index),
        c: index,
        d: $data.nowSpeed == item ? "1rpx solid black" : ""
      };
    }),
    C: $data.nowFontSize,
    D: common_vendor.o((...args) => $options.sliderChange && $options.sliderChange(...args)),
    E: common_vendor.o((...args) => $options.handleClosePopup && $options.handleClosePopup(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Data/Code/Project/mine/frontEnd/uni-app-ruler/ruler/subPackages/handheldBarragePage/handheldBarragePage.vue"]]);
wx.createPage(MiniProgramPage);
