import Vue from "vue";
import Vuex from "vuex";
import customer from "./modules/customer";
import orders from "./modules/orders";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		customer,
		orders,
	},
});
