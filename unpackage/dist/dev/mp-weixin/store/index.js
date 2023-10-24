"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state: {
    platform: "",
    screenWidth: "",
    screenHeight: ""
  },
  mutations: {
    setPlatform(state, platform) {
      state.platform = platform;
    },
    setScreenWidth(state, screenWidth) {
      state.screenWidth = screenWidth;
    },
    setScreenHeight(state, screenHeight) {
      state.screenHeight = screenHeight;
    }
  },
  getters: {
    platform(state) {
      return state.platform;
    },
    screenWidth(state) {
      return state.screenWidth;
    },
    screenHeight(state) {
      return state.screenHeight;
    }
  }
});
exports.store = store;
