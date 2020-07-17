<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
          <md-card>
            <md-card-header data-background-color="green">
              <h4 class="title">Pending Orders</h4>
              <p class="category">Here is a list of all pending orders</p>
            </md-card-header>
            <md-card-content>
              <md-table v-model="orders">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
                  <md-table-cell md-label="Title">{{ item.title }}</md-table-cell>
                  <md-table-cell md-label="Pages">{{ item.pages }}</md-table-cell>
                  <md-table-cell md-label="Cost">{{ item.price }}</md-table-cell>
                  <md-table-cell md-label="Actions">
                    <md-button :to="'/view/' + item.id" class="md-raised md-success md-sm">View</md-button>

                    <md-button class="md-raised md-warning md-sm">Edit</md-button>
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </md-card-content>
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      orders: []
    };
  },

  computed: {
    ...mapGetters(["getPending"])
  },

  created() {
    this.orders = this.getPending;
  }
};
</script>
