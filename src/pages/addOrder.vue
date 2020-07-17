<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <OrderForm v-if="step == '1'" :continue="nextStep()" />
        <OrderConfirm v-if="step == '2'" :continue="nextStep()" />
      </div>
    </div>
  </div>
</template>

<script>
import OrderForm from "@/pages/Orders/OrderForm.vue";
import OrderConfirm from "@/pages/Orders/OrderConfirm.vue";
import { mapGetters } from "vuex";
export default {
  name: "edit-order-form",
  components: {
    OrderForm,
    OrderConfirm
  },

  data() {
    return {
      step: null
    };
  },

  computed: {
    ...mapGetters(["getNewOrderDetails"])
  },

  async created() {
    this.step = await this.getNewOrderDetails.step;
  },

  methods: {
    async nextStep() {
      this.step = await this.getNewOrderDetails.step;
    }
  }
};
</script>
<style>
.vue__time-picker input.display-time::input-placeholder::before {
  content: "Time Deadline" !important;
}

.vue__time-picker input.display-time {
  border: none !important;
  padding: 1.5em 0.5em !important;
  font-size: 1em;
}

.vue__time-picker .dropdown {
  width: 15em !important;
  height: 15em !important;
}

.vue__time-picker .dropdown .select-list {
  width: 15em !important;
  height: 15em !important;
}
</style>
