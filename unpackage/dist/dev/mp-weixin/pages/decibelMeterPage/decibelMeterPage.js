"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      decibel: 0
      // 分贝大小
    };
  },
  onLoad() {
    const recorderManager = common_vendor.index.getRecorderManager();
    recorderManager.start({
      sampleRate: 8e3,
      numberOfChannels: 1,
      encodeBitRate: 48e3,
      frameSize: 5
    });
    recorderManager.onFrameRecorded((res) => {
      const frameBuffer = new Int8Array(res.frameBuffer);
      const decibel = this.calculateDecibel(frameBuffer);
      this.decibel = decibel.toFixed(2);
    });
  },
  methods: {
    // 计算分贝大小
    calculateDecibel(frameBuffer) {
      console.log("frameBuffer:", frameBuffer);
      let sum = 0;
      for (let i = 0; i < frameBuffer.length; i++) {
        sum += frameBuffer[i] * frameBuffer[i];
      }
      console.log("summmmmmmmmm:", sum);
      const rms = Math.sqrt(sum / frameBuffer.length);
      const decibel = 20 * Math.log10(rms);
      return decibel;
    }
  },
  onUnload() {
    const recorderManager = common_vendor.index.getRecorderManager();
    recorderManager.stop();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.decibel)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Data/Code/Project/mine/frontEnd/uni-app-ruler/ruler/pages/decibelMeterPage/decibelMeterPage.vue"]]);
wx.createPage(MiniProgramPage);
