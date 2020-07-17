<template>
	<md-card>
		<md-card-header :data-background-color="dataBackgroundColor">
			<h4 class="title">Confirm Order</h4>
			<p class="category">Please confirm the order details</p>
		</md-card-header>

		<md-card-content>
			<md-list>
				<md-list-item class="md-inset">
					<div class="md-list-item-text">
						<span>
							<small>Title</small>
						</span>
						<span>{{ confirmOrder.title }}</span>
					</div>
				</md-list-item>

				<md-list-item class="md-inset">
					<div class="md-list-item-text">
						<span>
							<small>Pages</small>
						</span>
						<span>{{ confirmOrder.pages }} Pages</span>
					</div>
				</md-list-item>

				<md-list-item class="md-inset">
					<div class="md-list-item-text">
						<span>
							<small>Sources</small>
						</span>
						<span>{{ confirmOrder.sources }}</span>
					</div>
				</md-list-item>

				<md-list-item class="md-inset">
					<div class="md-list-item-text">
						<span>
							<small>Subject</small>
						</span>
						<span>{{ confirmOrder.subject }}</span>
					</div>
				</md-list-item>

				<md-list-item class="md-inset">
					<div class="md-list-item-text">
						<span>
							<small>Level</small>
						</span>
						<span>{{ confirmOrder.level }}</span>
					</div>
				</md-list-item>

				<md-list-item class="md-inset">
					<div class="md-list-item-text">
						<span>
							<small>Type</small>
						</span>
						<span>{{ confirmOrder.type }}</span>
					</div>
				</md-list-item>

				<md-list-item class="md-inset">
					<div class="md-list-item-text">
						<span>
							<small>Format</small>
						</span>
						<span>{{ confirmOrder.format }}</span>
					</div>
				</md-list-item>

				<md-list-item class="md-inset">
					<div class="md-list-item-text">
						<span>
							<small>Deadline</small>
						</span>
						<span
							>{{ new Date(confirmOrder.dateDeadline).toLocaleDateString() }} at
							{{ confirmOrder.timeDeadline }}</span
						>
					</div>
				</md-list-item>

				<md-list-item class="md-inset">
					<div class="md-list-item-text">
						<span>
							<small>Instructions</small>
						</span>
						<p>{{ confirmOrder.instructions }}</p>
					</div>
				</md-list-item>

				<md-list-item class="md-inset">
					<div class="md-list-item-text">
						<span>
							<small>Order Files</small>
						</span>
						<p>{{ confirmOrder.files }}</p>
					</div>
				</md-list-item>

				<md-list-item class="md-inset">
					<div class="md-list-item-text">
						<div class="md-layout">
							<div
								class="md-layout-item md-size-40 md-small-size-100 text-center"
							>
								<md-button
									class="md-raised md-success text-center"
									@click="proceed()"
									>Pay ${{ confirmOrder.price }}</md-button
								>
							</div>

							<div
								class="md-layout-item md-size-40 md-small-size-100 text-center"
							>
								<md-button
									@click="goBack()"
									class="md-raised md-danger text-center"
									>Go Back</md-button
								>
							</div>
						</div>
					</div>
				</md-list-item>
			</md-list>
		</md-card-content>
	</md-card>
</template>

<script>
	import { mapGetters, mapActions } from "vuex";
	export default {
		name: "OrderConfirm",
		props: {
			dataBackgroundColor: {
				type: String,
				default: "green",
			},
			continue: Promise,
			back: Promise,
		},

		data() {
			return {
				confirmOrder: {},
			};
		},

		computed: {
			...mapGetters(["getNewOrderDetails"]),
		},

		async created() {
			if (localStorage.getItem("newOrder")) {
				this.confirmOrder = await JSON.parse(localStorage.getItem("newOrder"));
				return;
			}
			this.confirmOrder = await this.getNewOrderDetails;
		},

		methods: {
			...mapActions(["setSteps", "setUnpaid"]),

			async proceed() {
				await this.setSteps(3);
				this.continue;

				//save order data in local storage
				//remove the order data from local storage once payment is completed
				localStorage.setItem(
					"newOrder",
					JSON.stringify(await this.getNewOrderDetails),
				);
				await this.setUnpaid();

				this.notifyVue("top", "right", "success");
			},

			async goBack() {
				localStorage.removeItem("newOrder");
				await this.setUnpaid();
				await this.setSteps(1);
				this.continue;
			},

			notifyVue(verticalAlign, horizontalAlign, color) {
				this.$notify({
					message: "Successfully Confirmed! Redirecting to payment.",
					icon: "add_alert",
					horizontalAlign: horizontalAlign,
					verticalAlign: verticalAlign,
					type: color,
				});
			},
		},
	};
</script>
