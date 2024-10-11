<template>
  <div
    :class="`plans-cont-${this.$store.state.mood}-${this.$store.state.language}-${this.status}`"
    @scroll="handleScroll"
  >
    <!-- header  -->
    <div class="header">
      <h3>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.plans_component.title
            : this.$store.state.Arabic.plans_component.title
        }}
      </h3>

      <div class="count">
        {{ this.plans_count }}
      </div>
    </div>
    <!-- header  -->

    <!-- messages container  -->
    <div class="plans-container">
      <p class="default_message" v-if="this.$store.state.plans.length == 0">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.plans_component.default_message
            : this.$store.state.Arabic.plans_component.default_message
        }}
      </p>
      <PlanInPlansPageComponentDash
        v-for="(plan_data, index) in this.$store.state.plans"
        :key="index"
        :Plan_data="plan_data"
      />
    </div>
    <!-- messages container  -->
  </div>
</template>

<script>
import axios from "axios";
import PlanInPlansPageComponentDash from "@/components/plan/PlanInPlansPageComponentDash.vue";
export default {
  name: "message-component",
  data() {
    return {
      // plans count
      plans_count: 0,
      // to open the component smooth
      status: "close",
      // page of documents
      page: 1,
    };
  },
  mounted() {
    // call to get plans count
    this.GetPLansCount();

    // call to the get plans method
    this.GetPlans();
  },
  components: {
    // MessageInDashComponenet,
    PlanInPlansPageComponentDash,
  },
  methods: {
    // get classes count
    async GetPLansCount() {
      await axios
        .get(this.$store.state.APIs.plans.get_count)
        .then((response) => {
          // set the classes count from response to the class count in data
          this.plans_count = response.data.Plans_count;
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },

    // get plans method
    async GetPlans() {
      // to start the loading
      this.$store.state.loading = "open";

      await axios
        .get(this.$store.state.APIs.plans.get_all, {
          params: {
            page: this.page,
            limit: this.limit,
          },
        })
        .then((response) => {
          // to stop the loading
          this.$store.state.loading = "close";

          // to open the componenet smooth
          this.status = "open";

          // set the messages data from response to messages array in store
          this.$store.state.plans = response.data.plans_data;

          // to stop the loading animation
          this.$store.state.loading = "close";
        })
        .catch((error) => {
          // to open the componenet smooth
          this.status = "open";

          // to stop the loading animation
          this.$store.state.loading = "close";

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },

    // get more plans method
    async GetMorePlans() {
      await axios
        .get(this.$store.state.APIs.plans.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          // set the plans data from response to plans array in store
          this.$store.state.plans = [
            ...this.$store.state.plans,
            ...response.data.plans_data,
          ];
        })
        .catch((error) => {
          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },

    // handel scroll method
    handleScroll(event) {
      this.scroll_page = event.target.scrollTop;
      // check if the window height is donw
      if (this.scroll_page > 100) {
        this.scroll_page = window.scrollY;

        // to change page
        this.page += 1;

        // call to Get More plans method
        this.GetMorePlans();
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../../Sass/varibels/variables";
// darck and light English messages component style
.plans-cont-darck-English-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  @media (min-width: $phone) {
    padding: 5px;
  }

  .header {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0px;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    color: $font-light;

    h3 {
      width: 90%;
      height: 100%;
    }

    .count {
      width: auto;
      height: 100%;
      font-size: $x-small;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  }

  .plans-container {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;

    @media (min-width: $phone) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }

    .default_message {
      width: 100%;
      height: auto;
      padding: 5px 0px;
      color: $font-light;
      margin: 10px 0px;
      padding: 5px;
      border-radius: 5px;
      background-color: $message-darck;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin: 50px 0px;
    }
  }
}

.plans-cont-darck-English-open::-webkit-scrollbar {
  width: 0px;
}

.plans-cont-darck-English-close {
  @extend .plans-cont-darck-English-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.plans-cont-light-English-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  @media (min-width: $phone) {
    padding: 5px;
  }

  .header {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0px;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
    color: $font-darck;

    h3 {
      width: 90%;
      height: 100%;
    }

    .count {
      width: auto;
      height: 100%;
      font-size: $x-small;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  }

  .plans-container {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    @media (min-width: $phone) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }

    .default_message {
      width: 100%;
      height: auto;
      padding: 5px 0px;
      color: $font-darck;
      margin: 10px 0px;
      padding: 5px;
      border-radius: 5px;
      background-color: $message-light;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin: 50px 0px;
    }
  }
}

.plans-cont-light-English-open::-webkit-scrollbar {
  width: 0px;
}

.plans-cont-light-English-close {
  @extend .plans-cont-darck-English-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

// darck and light English messages component style

// darck and light Arabic messages component style
.plans-cont-darck-Arabic-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: rtl;

  @media (min-width: $phone) {
    padding: 5px;
  }

  .header {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0px;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    color: $font-light;

    h3 {
      width: 90%;
      height: 100%;
    }

    .count {
      width: auto;
      height: 100%;
      font-size: $x-small;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  }

  .plans-container {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    @media (min-width: $phone) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }

    .default_message {
      width: 100%;
      height: auto;
      padding: 5px 0px;
      color: $font-light;
      margin: 10px 0px;
      padding: 5px;
      border-radius: 5px;
      background-color: $message-darck;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin: 50px 0px;
    }
  }
}

.plans-cont-darck-Arabic-open::-webkit-scrollbar {
  width: 0px;
}

.plans-cont-darck-Arabic-close {
  @extend .plans-cont-darck-Arabic-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.plans-cont-light-Arabic-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: rtl;

  @media (min-width: $phone) {
    padding: 5px;
  }

  .header {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0px;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
    color: $font-darck;

    h3 {
      width: 90%;
      height: 100%;
    }

    .count {
      width: auto;
      height: 100%;
      font-size: $x-small;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  }

  .plans-container {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    @media (min-width: $phone) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }

    .default_message {
      width: 100%;
      height: auto;
      padding: 5px 0px;
      color: $font-darck;
      margin: 10px 0px;
      padding: 5px;
      border-radius: 5px;
      background-color: $message-light;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin: 50px 0px;
    }
  }
}

.plans-cont-light-Arabic-open::-webkit-scrollbar {
  width: 0px;
}

.plans-cont-light-Arabic-close {
  @extend .plans-cont-darck-Arabic-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}
// darck and light Arabic messages component style
</style>
