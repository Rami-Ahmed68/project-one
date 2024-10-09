<template>
  <div
    :class="`foods-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <SmallNavComponentVue />
    <SidBarComponentVue />
    <LoadingComponentVue />
    <ScrollTopComponentVue />
    <ErrorComponentVue />

    <div :class="this.status ? 'cont-open' : 'cont-close'">
      <!-- page title  -->
      <h3>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.foods_page.page_title
            : this.$store.state.Arabic.foods_page.page_title
        }}
      </h3>
      <!-- page title  -->

      <!-- search compoenets  -->
      <SearchINputComponentVue />
      <!-- search compoenets  -->

      <div :class="`results-cont-${this.view_style}`">
        <!-- results headers  -->
        <div class="results-heade">
          <p>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.foods_page.results_message
                : this.$store.state.Arabic.foods_page.results_message
            }}
          </p>
          <icon :icon="this.view_style" @click="ChangeIconStyle" />
        </div>
        <!-- results headers  -->

        <FoodCompoenentVue
          v-for="(food_data, index) in this.$store.state.foods"
          :key="index"
          :food_data="food_data"
          :view_style="this.view_style"
        />
      </div>
    </div>

    <ScrollTopComponentVue :scroll_page="this.scroll_page" />
  </div>
</template>

<script>
//? importing compoenents
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import FoodCompoenentVue from "@/components/food/FoodCompoenent.vue";
import SearchINputComponentVue from "@/components/food/SearchINputComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import axios from "axios";

export default {
  name: "foods-page",
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    LoadingComponentVue,
    ScrollTopComponentVue,
    FoodCompoenentVue,
    SearchINputComponentVue,
    ErrorComponentVue,
  },
  data() {
    return {
      scroll_page: 0,
      // page index
      page: 1,
      // limit od classes documents
      limit: 20,
      // elements view style
      view_style: "list",
      // open or close the compoenet
      status: false,
    };
  },
  mounted() {
    setTimeout(() => {
      // to start the loading animation
      this.$store.state.loading = "open";
    }, 100);

    // call the get foods method
    this.GetFoods();

    // call the handleScroll method on scrol window
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // get foods method
    async GetFoods() {
      axios
        .get(this.$store.state.APIs.food.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          // open the page conatiner
          this.status = true;

          // set the foods data from response to food's array in store
          this.$store.state.foods = response.data.foods_data;

          // stop the loading animation
          this.$store.state.loading = "close";
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

    // get more foods method
    async GetMoreFoods() {
      axios
        .get(this.$store.state.APIs.food.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          // set the foods data from response to food's array in store
          this.$store.state.foods = [
            ...this.$store.state.foods,
            ...response.data.foods_data,
          ];
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

    // change view style method
    ChangeIconStyle() {
      this.view_style = this.view_style == "list" ? "window-restore" : "list";
    },

    // scroll method
    async handleScroll() {
      // update the scroll page
      this.scroll_page = window.scrollY;

      // check if the window height is donw
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 600
      ) {
        // to change page
        this.page += 1;

        // call the get more foods method to get more foods
        await this.GetMoreFoods();
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English
.foods-page-darck-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: ltr;

  .cont-open {
    width: 50%;
    min-height: 100v;
    margin: auto;
    transition-duration: 0.5s;
    padding: 10% 0% 5% 0%;
    opacity: 1;

    @media (max-width: $phone) {
      padding: 20% 0% 5% 0%;
      width: 100%;
    }

    // page title
    h3 {
      width: 90%;
      margin: 20px 5%;
      padding: 5px 0px;
      color: $font-light;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
    }

    // results cont style
    .results-cont-list {
      width: 100%;
      min-height: 80vh;
      padding: 10px 0px;

      // result header style
      .results-heade {
        width: 90%;
        height: auto;
        margin: 10px 5%;
        padding: 5px 0px;
        color: $font-light;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;
        display: flex;
        justify-content: space-between;
        align-items: center;

        // elements view style icon
        svg {
          padding: 5px;
          color: $font-light;
          border-radius: 5px;
          border: 1px solid $border-light;
          cursor: pointer;
        }
      }
    }

    .results-cont-window-restore {
      @extend .results-cont-list;
      display: flex;
      justify-content: start;
      flex-wrap: wrap;
    }
  }

  .cont-close {
    @extend .cont-open;
    padding: 20% 0% 5% 0%;
    transition-duration: 0.5s;
    opacity: 0;
    @media (max-width: $phone) {
      padding: 40% 0% 5% 0%;
    }
  }
}

.foods-page-light-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  direction: ltr;

  .cont-open {
    width: 50%;
    min-height: 100v;
    margin: auto;
    transition-duration: 0.5s;
    padding: 10% 0% 5% 0%;
    opacity: 1;

    @media (max-width: $phone) {
      padding: 20% 0% 5% 0%;
      width: 100%;
    }

    // page title
    h3 {
      width: 90%;
      margin: 20px 5%;
      padding: 5px 0px;
      color: $font-darck;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
    }

    // results cont style
    .results-cont-list {
      width: 100%;
      min-height: 80vh;
      padding: 10px 0px;

      // result header style
      .results-heade {
        width: 90%;
        height: auto;
        margin: 10px 5%;
        padding: 5px 0px;
        color: $font-darck;
        border: 1px solid;
        border-color: transparent transparent $border-darck transparent;
        display: flex;
        justify-content: space-between;
        align-items: center;

        // elements view style icon
        svg {
          padding: 5px;
          color: $font-darck;
          border-radius: 5px;
          border: 1px solid $border-darck;
          cursor: pointer;
        }
      }
    }

    .results-cont-window-restore {
      @extend .results-cont-list;
      display: flex;
      justify-content: start;
      flex-wrap: wrap;
    }
  }

  .cont-close {
    @extend .cont-open;
    padding: 20% 0% 5% 0%;
    transition-duration: 0.5s;
    opacity: 0;
    @media (max-width: $phone) {
      padding: 40% 0% 5% 0%;
    }
  }
}
// darck and light English

// darck and light Arabic
.foods-page-darck-Arabic {
  @extend .foods-page-darck-English;
  direction: rtl;
}

.foods-page-light-Arabic {
  @extend .foods-page-light-English;
  direction: rtl;
}
// darck and light Arabic
</style>
