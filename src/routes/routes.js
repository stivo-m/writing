import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import HomeLayout from "@/pages/Layout/HomeLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import Settings from "@/pages/Settings.vue";
import Completed from "@/pages/Completed.vue";
import Pending from "@/pages/Pending.vue";
import AddOrder from "@/pages/addOrder.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import ViewOrder from "@/pages/View.vue";

import Landing from "@/pages/Landing.vue";

const routes = [
	{
		path: "/",
		component: DashboardLayout,
		redirect: "/dashboard",
		children: [
			{
				path: "dashboard",
				name: "Dashboard",
				component: Dashboard,
			},
			{
				path: "settings",
				name: "Settings Page",
				component: Settings,
			},
			{
				path: "completed",
				name: "Completed Orders",
				component: Completed,
			},
			{
				path: "pending",
				name: "Pending Orders",
				component: Pending,
			},
			{
				path: "Add",
				name: "Add Order",
				component: AddOrder,
			},

			{
				path: "View/:id",
				name: "View Order",
				component: ViewOrder,
			},
			{
				path: "maps",
				name: "Maps",
				meta: {
					hideFooter: true,
				},
				component: Maps,
			},
			{
				path: "notifications",
				name: "Notifications",
				component: Notifications,
			},
		],
	},

	{
		path: "/welcome",
		component: Landing,
	},
];

export default routes;
