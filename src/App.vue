<template>
  <router-view></router-view>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["setUnpaid"])
  },

  async created() {
    await this.setUnpaid();
  },

  async mounted() {
    await this.setUnpaid();
  },

  async updated() {
    await this.setUnpaid();
  }
};
</script>

<style>
.md-ripple > span {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  left: 10px !important;
  top: 10px !important;
  z-index: -1;
}

.title {
  font-weight: 300 !important;
}
</style>
