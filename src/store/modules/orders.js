const state = {
	unpaidOrders: {
		count: 0,
		message: "You have unpaid orders!",
	},
	newOrder: {
		step: 1,
		title: "",
		pages: 1,
		sources: "1 Sources",
		subject: "English / Literature",
		level: "University",
		type: "Essay / Outline / Proposal",
		format: "APA",
		dateDeadline: new Date(),
		timeDeadline: new Date().toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		}),
		instructions: "",
		price: 0,
		files: [],
	},

	subjectList: [
		"English / Literature",
		"Social Sciences",
		"Mathematics",
		"Geography",
		"Physical Sciences",
		"Nursing / Medicine",
		"Computer Science",
	],

	academicLevels: ["High School", "College", "University", "Masters", "PhD"],

	academicFormats: ["APA", "MLA", "Havard", "Chicago / Turabian", "Other"],

	academicPaperTypes: [
		"Essay / Outline / Proposal",
		"Literature Review",
		"Research Paper",
		"Thesis",
		"Other",
	],
};
const getters = {
	getNewOrderDetails: (state) => state.newOrder,
	getAcademicLevels: (state) => state.academicLevels,
	getAcademicFormats: (state) => state.academicFormats,
	getAcademicPaperTypes: (state) => state.academicPaperTypes,
	getAcademicSubjects: (state) => state.subjectList,
	getNotifs: (state) => state.unpaidOrders,
};
const actions = {
	//update new order details
	newOrder: async ({ commit }, orderDetails) => {
		commit("setNewOrderDetails", orderDetails);
	},

	setSteps: async ({ commit }, step) => {
		commit("setNewOrderState", step);
	},
	setUnpaid: async ({ commit }) => {
		if (state.newOrder.step == 2 || state.newOrder.step == 3) {
			commit("setUnpaidNotifs", 1);
			return;
		}

		commit("setUnpaidNotifs", 0);
	},

	//update order state
	// newOrder: async ({ commit }, orderState) => {
	// 	commit("setOrder", orderDetails);
	// },
};
const mutations = {
	setNewOrderDetails: (state, order) => (state.newOrder = order),
	setNewOrderState: (state, orderState) => (state.newOrder.step = orderState),
	setUnpaidNotifs: (state, notifs) => (state.unpaidOrders.count = notifs),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
