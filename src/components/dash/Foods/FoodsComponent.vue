<template>
  <div
    :class="`section-cont-${this.status}-${this.$store.state.mood}-${this.$store.state.language}`"
    @scroll="handleScroll"
  >
    <!-- header  -->
    <div class="header">
      <h3>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.foods_component.page_title
            : this.$store.state.Arabic.foods_component.page_title
        }}
      </h3>
      <p>{{ this.foods_count }}</p>
    </div>
    <!-- header  -->

    <!-- foods section  -->
    <div class="foods-cards-section">
      <FoodCompoenentInDash
        v-for="(food_data, index) in this.$store.state.foods"
        :key="index"
        :food_data="food_data"
      />
    </div>
    <!-- foods section  -->
  </div>
</template>

<script>
import axios from "axios";
import FoodCompoenentInDash from "./FoodCompoenentInDash.vue";
export default {
  name: "food-component",
  data() {
    return {
      // page status
      status: "close",
      // limit of foods's documents
      limit: 20,
      // page
      page: 1,
      // count of foods documents
      foods_count: 0,
    };
  },
  mounted() {
    // call to get foods count
    this.FoodsCount();

    setTimeout(() => {
      this.status = "open";
    }, 500);

    // call to get foods method
    this.GetFoods();
  },
  components: {
    FoodCompoenentInDash,
  },
  methods: {
    // get foods count
    async FoodsCount() {
      await axios
        .get(this.$store.state.APIs.food.get_count)
        .then((response) => {
          // set the foods count from response to foods count in data
          this.foods_count = response.data.foods_count;
        })
        .catch((error) => {
          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },

    // get foods method
    async GetFoods() {
      // to start the loading
      this.$store.state.loading = "open";

      await axios
        .get(this.$store.state.APIs.food.get_all, {
          params: {
            page: this.page,
            limit: this.limit,
          },
        })
        .then((response) => {
          // to stop the loading
          this.$store.state.loading = "close";

          // set the foods data from response to foods array in store
          this.$store.state.foods = response.data.foods_data;
        })
        .catch((error) => {
          // to stop the loading
          this.$store.state.loading = "close";

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },

    // get more foods method
    async GetMoreFoods() {
      await axios
        .get(this.$store.state.APIs.food.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          // set the foods data from response to foods array in store
          this.$store.state.foods = [
            ...this.$store.state.foods,
            ...response.data.foods_data,
          ];
        })
        .catch((error) => {
          // to stop the loading
          this.$store.state.loading = "close";

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
      if (this.scroll_page > 350) {
        this.scroll_page = window.scrollY;

        // to change page
        this.page += 1;

        // call to Get More Foods method
        this.GetMoreFoods();
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../../Sass/varibels/variables";

// darck and light English style
.section-cont-open-darck-English {
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
    justify-content: space-between;
    align-items: center;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    color: $font-light;

    .count {
      width: 10%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .foods-cards-section {
    width: 100%;
    height: auto;
    margin: 20px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
  }
}

.section-cont-open-darck-English::-webkit-scrollbar {
  width: 0px;
}

.section-cont-close-darck-English {
  @extend .section-cont-open-darck-English;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.section-cont-open-light-English {
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
    justify-content: space-between;
    align-items: center;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
    color: $font-darck;

    .count {
      width: 10%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .foods-cards-section {
    width: 100%;
    height: auto;
    margin: 20px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
  }
}

.section-cont-open-light-English::-webkit-scrollbar {
  width: 0px;
}

.section-cont-close-light-English {
  @extend .section-cont-open-light-English;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}
// darck and light English style

// darck and light Arabic style
.section-cont-open-darck-Arabic {
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
    justify-content: space-between;
    align-items: center;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    color: $font-light;

    .count {
      width: 10%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .foods-cards-section {
    width: 100%;
    height: auto;
    margin: 20px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
  }
}

.section-cont-open-darck-Arabic::-webkit-scrollbar {
  width: 0px;
}

.section-cont-close-darck-Arabic {
  @extend .section-cont-open-darck-Arabic;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.section-cont-open-light-Arabic {
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
    justify-content: space-between;
    align-items: center;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
    color: $font-darck;

    .count {
      width: 10%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .foods-cards-section {
    width: 100%;
    height: auto;
    margin: 20px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
  }
}

.section-cont-open-light-Arabic::-webkit-scrollbar {
  width: 0px;
}

.section-cont-close-light-Arabic {
  @extend .section-cont-open-light-Arabic;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}
// darck and light Arabic style
</style>
