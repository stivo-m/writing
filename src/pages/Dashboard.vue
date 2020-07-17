<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>store</md-icon>
          </template>

          <template slot="content">
            <p class="category">Unpaid Orders</p>
            <h3 class="title">
              2
              <small>Orders</small>
            </h3>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>content_copy</md-icon>
          </template>

          <template slot="content">
            <p class="category">Pending Orders</p>
            <h3 class="title">
              3
              <small>Orders</small>
            </h3>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="red">
          <template slot="header">
            <md-icon>info_outline</md-icon>
          </template>

          <template slot="content">
            <p class="category">Revision Orders</p>
            <h3 class="title">
              0
              <small>Orders</small>
            </h3>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="blue">
          <template slot="header">
            <i class="fas fa-check"></i>
          </template>

          <template slot="content">
            <p class="category">Total Orders</p>
            <h3 class="title">
              25
              <small>Done</small>
            </h3>
          </template>
        </stats-card>
      </div>

      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Unpaid Orders</h4>
            <p class="category">Unpaid Orders are not available to our writers</p>
          </md-card-header>
          <md-card-content>
            <md-table v-model="unpaid">
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Title">{{ item.title }}</md-table-cell>
                <md-table-cell md-label="Pages">{{ item.pages }}</md-table-cell>
                <md-table-cell md-label="Cost">{{ item.price }}</md-table-cell>
                <md-table-cell md-label="Actions">
                  <md-button :to="'/view/' + item.id" class="md-raised md-success md-sm">View</md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="red">
            <h4 class="title">Revision Orders</h4>
            <p class="category">These orders are under revision by our writers.</p>
          </md-card-header>
          <md-card-content>
            <md-table v-model="revisions">
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Title">{{ item.title }}</md-table-cell>
                <md-table-cell md-label="Pages">{{ item.pages }}</md-table-cell>
                <md-table-cell md-label="Cost">{{ item.price }}</md-table-cell>
                <md-table-cell md-label="Actions">
                  <md-button :to="'/view/' + item.id" class="md-raised md-success md-sm">View</md-button>
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
import { StatsCard } from "@/components";
import { mapGetters } from "vuex";

export default {
  components: {
    StatsCard
  },

  data() {
    return {
      revisions: [],
      unpaid: []
    };
  },
  computed: {
    ...mapGetters(["getRevisions", "getUnpaid"])
  },

  created() {
    this.revisions = this.getRevisions;
    this.unpaid = this.getUnpaid;
  }
};
</script>
