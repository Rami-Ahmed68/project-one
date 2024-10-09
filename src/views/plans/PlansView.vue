<template>
  <div
    :class="`plans-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <SmallNavComponentVue />
    <SidBarComponentVue />
    <LoadingComponentVue />
    <ErrorComponentVue />

    <div :class="this.status ? 'cont-open' : 'cont-close'">
      <!-- page title -->
      <h3 class="page-title">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.plans_page.page_title
            : this.$store.state.Arabic.plans_page.page_title
        }}
      </h3>
      <!-- page title -->

      <!-- search component  -->
      <SearchINputComponentVue />
      <!-- search component  -->

      <!-- results cont  -->
      <div class="results-cont">
        <!-- results headers  -->
        <div class="results-heade">
          <p>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.plans_page.results_message
                : this.$store.state.Arabic.plans_page.results_message
            }}
          </p>
          <icon :icon="this.view_style" @click="ChangeIconStyle" />
        </div>
        <!-- results headers  -->

        <div class="plans-cont">
          <PlanInPlansPageComponentVue
            v-for="(plan_data, index) in this.$store.state.plans"
            :key="index"
            :view_style="this.view_style"
            :Plan_data="plan_data"
          />
        </div>
      </div>
      <!-- results cont  -->
    </div>

    <!-- scroll to top component  -->
    <ScrollTopComponentVue :scroll_page="this.scroll_page" />
    <!-- scroll to top component  -->
  </div>
</template>

<script>
//? importing components
// importing components
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import SearchINputComponentVue from "@/components/plan/SearchINputComponent.vue";
import PlanInPlansPageComponentVue from "@/components/plan/PlanInPlansPageComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import axios from "axios";

export default {
  name: "plans-page",
  data() {
    return {
      // plans view style
      view_style: "list",
      // limit of plans
      limit: 20,
      // page of plans in data base
      page: 1,
      // to open or close the scrollTp button
      scroll_page: 0,
      // open or close the compoenet
      status: false,
    };
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    LoadingComponentVue,
    ErrorComponentVue,
    SearchINputComponentVue,
    PlanInPlansPageComponentVue,
    ScrollTopComponentVue,
  },
  mounted() {
    setTimeout(() => {
      // to start the loading animation
      this.$store.state.loading = "open";
    }, 100);

    // call to handel method on window scroll
    window.addEventListener("scroll", this.handelScroll);

    // call to get plans method
    this.GetPlans();
  },
  methods: {
    //? get to plans method
    async GetPlans() {
      await axios
        .get(this.$store.state.APIs.plans.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          // open the page conatiner
          this.status = true;

          // set the plans data from response to plans array in store to open the page's cont like smooth
          this.$store.state.plans = response.data.plans_data;

          // to stope the loading animation
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

    async GetMorePlans() {
      await axios
        .get(this.$store.state.APIs.plans.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          // set the plans data from response to plans array in store to open the page's cont like smooth
          this.$store.state.plans = [
            ...this.$store.state.plans,
            ...response.data.plans_data,
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

    // change the style view type
    ChangeIconStyle() {
      this.view_style = this.view_style == "list" ? "window-restore" : "list";
    },

    // handelScroll
    handelScroll() {
      // update the scroll page
      this.scroll_page = window.scrollY;

      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 600
      ) {
        // to change the page
        this.page += 1;

        // call to get more plans method to get more plans
        this.GetMorePlans();
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English style
.plans-page-darck-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: ltr;

  // open container style to open it smooth
  .cont-open {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 10% 0px 10px 0px;
    transition-duration: 0.5s;
    opacity: 1;

    @media (max-width: $phone) {
      width: 100%;
      height: auto;
      padding: 20% 0px 10px 0px;
    }

    // page title
    .page-title {
      width: 90%;
      height: auto;
      margin: 10px 5%;
      padding: 5px 0px;
      color: $font-light;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
    }

    // results container style
    .results-cont {
      width: 90%;
      height: auto;
      margin: 10px auto;

      // results section header
      .results-heade {
        width: 100%;
        height: auto;
        padding: 5px 0px;
        margin: 10px 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;

        p {
          color: $font-light;
        }

        // elemnts view icon
        svg {
          padding: 5px;
          border: 1px solid $border-light;
          border-radius: 5px;
          color: $font-light;
          cursor: pointer;
        }
      }

      // plans container style
      .plans-cont {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
      }
    }
  }

  // closed cont style
  .cont-close {
    @extend .cont-open;
    padding: 20% 0px 10px 0px;
    transition-duration: 0.5s;
    opacity: 0;
    @media (max-width: $phone) {
      padding: 40% 0% 0% 0%;
    }
  }
}

.plans-page-light-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  direction: ltr;

  // open container style to open it smooth
  .cont-open {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 10% 0px 10px 0px;
    transition-duration: 0.5s;
    opacity: 1;

    @media (max-width: $phone) {
      width: 100%;
      height: auto;
      padding: 20% 0px 10px 0px;
    }

    // page title
    .page-title {
      width: 90%;
      height: auto;
      margin: 10px 5%;
      padding: 5px 0px;
      color: $font-darck;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
    }

    // results container style
    .results-cont {
      width: 90%;
      height: auto;
      margin: 10px auto;

      // results section header
      .results-heade {
        width: 100%;
        height: auto;
        padding: 5px 0px;
        margin: 10px 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid;
        border-color: transparent transparent $border-darck transparent;

        p {
          color: $font-darck;
        }

        // elemnts view icon
        svg {
          padding: 5px;
          border: 1px solid $border-darck;
          border-radius: 5px;
          color: $font-darck;
          cursor: pointer;
        }
      }

      // plans container style
      .plans-cont {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
      }
    }
  }

  // closed cont style
  .cont-close {
    @extend .cont-open;
    padding: 20% 0px 10px 0px;
    transition-duration: 0.5s;
    opacity: 0;
    @media (max-width: $phone) {
      padding: 40% 0% 0% 0%;
    }
  }
}
// darck and light English style

// darck and light Arabic style
.plans-page-darck-Arabic {
  @extend .plans-page-darck-English;
  direction: rtl;
}

.plans-page-light-Arabic {
  @extend .plans-page-light-English;
  @extend .plans-page-darck-Arabic;
  direction: rtl;
}
// darck and light Arabic style
</style>
