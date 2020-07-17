<template>
	<form @submit="proceed($event)">
		<md-card>
			<md-card-header :data-background-color="dataBackgroundColor">
				<h4 class="title">Add Order</h4>
				<h3 class="category">
					<span class="text-white">Total Price: ${{ price }}</span>
				</h3>
			</md-card-header>

			<md-card-content>
				<div class="md-layout">
					<div class="md-layout-item md-small-size-100 md-size-100">
						<md-field>
							<label>Title</label>
							<md-input v-model="order.title" required type="text"></md-input>
						</md-field>
					</div>
					<div class="md-layout-item md-small-size-100 md-size-50">
						<md-field>
							<label>Pages</label>
							<md-input
								min="1"
								max="150"
								required
								v-model="order.pages"
								@change="updatePrice()"
								type="number"
							></md-input>
						</md-field>
					</div>
					<div class="md-layout-item md-small-size-100 md-size-50">
						<md-field>
							<label>Sources</label>

							<md-select
								v-model="order.sources"
								required
								name="sources"
								id="sources"
								md-dense
							>
								<md-option v-for="index in 20" :key="index" :value="index"
									>{{ index }} Sources</md-option
								>
							</md-select>
						</md-field>
					</div>
					<div class="md-layout-item md-small-size-100 md-size-50">
						<md-field>
							<label>Subject</label>
							<md-select
								v-model="order.subject"
								required
								name="subject"
								id="subject"
								md-dense
							>
								<md-option
									v-for="(sbj, index) in getAcademicSubjects"
									:key="index"
									:value="sbj"
									>{{ sbj }}</md-option
								>
							</md-select>
						</md-field>
					</div>
					<div class="md-layout-item md-small-size-100 md-size-50">
						<md-field>
							<label>Academic Level</label>
							<md-select v-model="order.level" required md-dense>
								<md-option
									v-for="(lvl, index) in getAcademicLevels"
									:key="index"
									:value="lvl"
									>{{ lvl }}</md-option
								>
							</md-select>
						</md-field>
					</div>

					<div class="md-layout-item md-small-size-100 md-size-50">
						<md-field>
							<label>Type of Paper</label>
							<md-select v-model="order.type" required md-dense>
								<md-option
									v-for="(tp, index) in getAcademicPaperTypes"
									:key="index"
									:value="tp"
									>{{ tp }}</md-option
								>
							</md-select>
						</md-field>
					</div>

					<div class="md-layout-item md-small-size-100 md-size-50">
						<md-field>
							<label>Paper Format</label>
							<md-select v-model="order.format" required md-dense>
								<md-option
									v-for="(frmt, index) in getAcademicFormats"
									:key="index"
									:value="frmt"
									>{{ frmt }}</md-option
								>
							</md-select>
						</md-field>
					</div>

					<div class="md-layout-item md-small-size-100 md-size-50">
						<md-datepicker
							@change="updatePrice()"
							v-model="order.dateDeadline"
							required
							:md-open-on-focus="false"
						>
							<label>Select date</label>
						</md-datepicker>
					</div>

					<div class="md-layout-item md-small-size-100 md-size-50">
						<md-field>
							<vue-timepicker
								v-if="order.timeDeadline"
								:placeholder="order.timeDeadline"
								:value="order.timeDeadline"
								:v-model="order.timeDeadline"
								format="hh:mm a"
							></vue-timepicker>
						</md-field>
					</div>

					<div class="md-layout-item md-size-100">
						<md-field>
							<label>Further Instructions</label>
							<md-textarea required v-model="order.instructions"></md-textarea>
						</md-field>
					</div>
					<div class="md-layout-item md-size-100">
						<md-field>
							<label>Upload Files</label>
							<md-file v-model="order.files" multiple />
						</md-field>
					</div>
					<div class="md-layout-item md-size-100 text-right">
						<md-button class="md-raised md-success" type="submit"
							>Continue</md-button
						>
					</div>
				</div>
			</md-card-content>
		</md-card>
	</form>
</template>
<script>
	import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
	import { mapGetters, mapActions } from "vuex";
	import moment from "moment";

	let baseCpp = 7;

	export default {
		name: "OrderForm",
		components: {
			VueTimepicker,
		},
		props: {
			dataBackgroundColor: {
				type: String,
				default: "green",
			},

			continue: Promise,
		},

		computed: {
			...mapGetters([
				"getNewOrderDetails",
				"getAcademicLevels",
				"getAcademicFormats",
				"getAcademicPaperTypes",
				"getAcademicSubjects",
			]),
		},

		data() {
			return {
				order: {},
				price: 0,
			};
		},

		// watch: {
		// 	order: {
		// 		handler: async function(val, oldVal) {
		// 			this.order = await this.getNewOrderDetails;
		// 			this.updatePrice(); // call it in the context of your component object
		// 		},
		// 	},
		// },

		async updated() {
			this.order = await this.getNewOrderDetails;
			this.updatePrice();
		},

		methods: {
			...mapActions(["setSteps"]),

			async proceed(e) {
				e.preventDefault();
				await this.setSteps(2);
				this.continue;
			},

			updatePrice() {
				let currentDate = moment(new Date());
				let futureDate = moment(new Date(this.order.dateDeadline));

				let deadline = futureDate.diff(currentDate, "days");

				if (deadline < 1) {
					baseCpp = 13.5;
				}
				if (deadline == 1) {
					baseCpp = 12.7;
				}
				if (deadline == 2) {
					baseCpp = 8.5;
				}
				if (deadline >= 3) {
					baseCpp = 7;
				}
				//simple pricing
				let orderPrice = baseCpp * this.order.pages;
				this.price = orderPrice;
				this.order.price = orderPrice;
			},
		},

		async created() {
			if (localStorage.getItem("newOrder")) {
				await this.setSteps(2);
				return;
			}
			this.order = await this.getNewOrderDetails;
			this.updatePrice();
		},
	};
</script>
