const state = {
	myOrders: [
		{
			id: 1,
			title: "Dakota Rice",
			price: "$36,738",
			pages: "3 Pages",
			deadline: "Oud-Turnhout",
			status: "completed",
		},

		{
			id: 2,
			title: "Dakota Rice",
			price: "$36,738",
			pages: "3 Pages",
			deadline: "Oud-Turnhout",
			status: "pending",
		},

		{
			id: 3,
			title: "Dakota Rice",
			price: "$36,738",
			pages: "3 Pages",
			deadline: "Oud-Turnhout",
			status: "pending",
		},
	],
	orderInView: {},
	customer: {
		id: "2025",
		name: "Dakota Rice",
		email: "maichstivo254@gmail.com",
		country: "Niger",
	},
	isAuthenticated: false,
	isAuthenticating: false,
};
const getters = {
	getPending: (state) =>
		state.myOrders.filter((item) => item.status == "pending"),
	getCompleted: (state) =>
		state.myOrders.filter((item) => item.status == "completed"),
	getRevisions: (state) =>
		state.myOrders.filter((item) => item.status == "revision"),
	getUnpaid: (state) =>
		state.myOrders.filter((item) => item.status == "unpaid"),

	getOrderInView: (state) => state.orderInView,
	getCustomerDetails: (state) => state.customer,
	getAuthStatus: (state) => state.isAuthenticated,
	getAuthState: (state) => state.isAuthenticating,
};
const actions = {
	// get order details
	getOrder: async ({ commit }, id) => {
		let order = state.myOrders.find((item) => item.id == id);

		commit("setOrder", order);
	},
};
const mutations = {
	newOrder: (state, orders) => state.myOrders.push(orders),
	setOrder: (state, order) => (state.orderInView = order),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
