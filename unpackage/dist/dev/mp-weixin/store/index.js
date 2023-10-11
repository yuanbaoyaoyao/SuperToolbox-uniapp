"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state: {
    platform: ""
  },
  mutations: {
    setPlatform(state, platform) {
      state.platform = platform;
    }
  }
});
exports.store = store;
