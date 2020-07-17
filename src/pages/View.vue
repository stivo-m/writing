<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">
              Viewing Order
              <span v-if="order">{{order.id}}</span>
            </h4>
            <p class="category">
              <span v-if="order">Order Status: {{order.status}}</span>
            </p>
          </md-card-header>
          <md-card-content>
            <md-table>
              <md-table-row slot="md-table-row">
                <md-table-cell>
                  <b>Title</b>
                  : {{ order.title }}
                </md-table-cell>

                <md-table-cell>
                  <b>Deadline</b>
                  : {{ order.title }}
                </md-table-cell>

                <md-table-cell></md-table-cell>
              </md-table-row>

              <md-table-row slot="md-table-row">
                <md-table-cell>
                  <b>Pages</b>
                  : {{ order.pages }}
                </md-table-cell>

                <md-table-cell>
                  <b>Type of Paper</b>
                  : {{ order.title }}
                </md-table-cell>
              </md-table-row>

              <md-table-row slot="md-table-row">
                <md-table-cell>
                  <b>Price</b>
                  : {{ order.price }}
                </md-table-cell>

                <md-table-cell>
                  <b>Academic Level</b>
                  : {{ order.title }}
                </md-table-cell>
              </md-table-row>

              <md-table-row slot="md-table-row">
                <md-table-cell>
                  <b>Spacing</b>
                  : {{ order.price }}
                </md-table-cell>

                <md-table-cell>
                  <b>Paper Format</b>
                  : {{ order.title }}
                </md-table-cell>
              </md-table-row>
            </md-table>
            <br />
            <md-table>
              <md-table-row slot="md-table-row">
                <md-table-cell>
                  <!-- {{ order.instructions }} -->

                  <p>
                    <b>Instructions</b>
                    <br />
                    <br />Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed vel enim nihil accusantium provident ipsa assumenda ut tempora explicabo odit magnam ea illum ad labore quas vero ipsum itaque recusandae doloremque dolor officiis, hic, delectus similique. Explicabo dolorem culpa sunt nihil, dignissimos suscipit praesentium. Odit suscipit earum nemo aspernatur nesciunt!
                  </p>
                </md-table-cell>
              </md-table-row>

              <md-table-row slot="md-table-row">
                <md-table-cell>
                  <!-- {{ order.instructions }} -->
                  <p>Orde Files Here</p>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>

      <div class="md-layout-item md-medium-size-100 md-size-33">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Actions</h4>
            <p class="category"></p>
          </md-card-header>
          <md-card-content>
            <md-table>
              <md-table-row slot="md-table-row">
                <md-table-cell>
                  <md-button
                    v-if="order.status  == 'unpaid'"
                    class="md-raised md-success md-sm"
                  >Pay Order</md-button>

                  <md-button
                    v-if="order.status  == 'completed'"
                    class="md-raised md-success md-sm"
                  >Mark Finished</md-button>
                </md-table-cell>
              </md-table-row>

              <md-table-row slot="md-table-row">
                <md-table-cell>
                  <md-button
                    v-if="order.status  != 'finished'"
                    class="md-raised md-warning md-sm"
                  >Edit Order</md-button>

                  <md-button
                    v-if="order.status  == 'completed'"
                    class="md-raised md-danger md-sm"
                  >Request Revision</md-button>

                  <md-button
                    v-if="order.status  == 'pending'"
                    class="md-raised md-danger md-sm"
                  >Cancel Order</md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ViewOrder",
  data() {
    return {
      order: []
    };
  },
  computed: {
    ...mapGetters(["getOrderInView"])
  },
  methods: {
    ...mapActions(["getOrder"])
  },

  async created() {
    let id = this.$route.params.id;
    await this.getOrder(id);
    this.order = await this.getOrderInView;
  }
};
</script>

<style scoped>
p {
  text-align: left !important;
}
</style>
