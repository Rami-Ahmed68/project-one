<template>
  <div
    :class="`teacher-plans-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <!-- loading component  -->
    <LoadingComponent />
    <!-- loading component  -->

    <!-- Small nav component  -->
    <SmallNavComponent />
    <!-- Small nav component  -->

    <!-- Sid Bar component  -->
    <SidBarComponent />
    <!-- Sid Bar component  -->

    <!-- Error component  -->
    <ErrorComponent />
    <!-- Error component  -->

    <div :class="`${this.status}-cont`">
      <!-- page title  -->
      <div class="page-title">
        <h3>
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.teacher_classes_plans_page.plans
              : this.$store.state.Arabic.teacher_classes_plans_page.plans
          }}
        </h3>

        <icon :icon="this.view_style" @click="changeIcon" />
      </div>
      <!-- page title  -->

      <!-- classes container -->
      <div class="plans-cont">
        <div class="results">
          <PlanInPlansPageComponent
            v-for="(plan_data, index) in this.$store.state.my_plans"
            :key="index"
            :Plan_data="plan_data"
            :view_style="this.view_style"
          />
        </div>
      </div>

      <!-- scrpll to top component  -->
      <ScrollTopComponent :scroll_page="this.scroll_page" />
      <!-- scrpll to top component  -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ScrollTopComponent from "@/components/global/ScrollTopComponent.vue";
import PlanInPlansPageComponent from "@/components/plan/PlanInPlansPageComponent.vue";
import ErrorComponent from "@/components/global/ErrorComponent.vue";
import LoadingComponent from "@/components/global/LoadingComponent.vue";
import SmallNavComponent from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponent from "@/components/global/SidBarComponent.vue";
export default {
  name: "teacher-plans-page",
  data() {
    return {
      // page scroll
      scroll_page: 0,
      // page status
      status: "close",
      // api
      api: "",
      // view_style
      view_style: "list",
    };
  },
  components: {
    SmallNavComponent,
    SidBarComponent,
    LoadingComponent,
    ErrorComponent,
    PlanInPlansPageComponent,
    ScrollTopComponent,
  },
  mounted() {
    setTimeout(() => {
      // to start the loading animation
      this.$store.state.loading = "open";
    }, 100);

    // to open the page smoothy
    setTimeout(() => {
      this.status = "open";
    }, 500);

    // call to get get my plans method
    this.GetMyPlans();

    // handel scroll
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // get my plans
    async GetMyPlans() {
      // to start the loading animation
      this.$store.state.loading = "open";

      // create params
      let params = {};

      // craete headers
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // select api
      this.api = this.$store.state.APIs.plans.teacher.get_my_plans;
      params.teacher_id = this.$route.params.id;

      // if (this.$store.state.user.user_type == "teacher") {
      // } else if (this.$store.state.user.user_type == "student") {
      //   this.api = this.$store.state.APIs.plans.student.get_my_plans;
      //   params.student_id = this.$store.state.user.user._id;
      // }

      await axios
        .get(
          this.api,
          {
            params,
          },
          { headers }
        )
        .then((response) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // set the plans data to my_plans array in store
          this.$store.state.my_plans = response.data.plans_data;
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

    // handleScroll
    async handleScroll() {
      // check if the window height is donw
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 600
      ) {
        // to change page
        this.page += 1;
      }

      // to start scroll to top component
      this.scroll_page = window.scrollY;
    },

    // change icon method
    changeIcon() {
      this.view_style = this.view_style == "list" ? "window-restore" : "list";
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English style
.teacher-plans-darck-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: ltr;

  // open classes container style
  .open-cont {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 5% 0px 5% 0px;
    opacity: 1;
    transition-duration: 0.5s;
    @media (max-width: $phone) {
      width: 100%;
      padding: 20% 0px 5% 0px;
    }

    // page title style
    .page-title {
      width: 90%;
      margin: 0px 5%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      padding: 5px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;

      h3 {
        width: 90%;
        color: $font-light;
      }

      svg {
        border: 1px solid $border-light;
        color: $font-light;
        cursor: pointer;
        padding: 5px;
        border-radius: 5px;
      }
    }

    // plans conatiner
    .plans-cont {
      width: 90%;
      height: auto;
      margin: 5px 5%;

      // results title
      .results {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding: 5px 0px;
        color: $font-light;
      }
    }
  }

  // close classes container style
  .close-cont {
    @extend .open-cont;
    padding: 20% 0% 0% 0%;
    @media (max-width: $phone) {
      padding: 40% 0% 0% 0%;
    }
    opacity: 0;
  }
}

.teacher-plans-light-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  direction: ltr;

  // open classes container style
  .open-cont {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 5% 0px 5% 0px;
    opacity: 1;
    transition-duration: 0.5s;
    @media (max-width: $phone) {
      width: 100%;
      padding: 20% 0px 5% 0px;
    }

    // page title style
    .page-title {
      width: 90%;
      margin: 0px 5%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      padding: 5px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;

      h3 {
        width: 90%;
        color: $font-darck;
      }

      svg {
        border: 1px solid $border-darck;
        color: $font-darck;
        cursor: pointer;
        padding: 5px;
        border-radius: 5px;
      }
    }

    // plans conatiner
    .plans-cont {
      width: 90%;
      height: auto;
      margin: 5px 5%;

      // results title
      .results {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding: 5px 0px;
        color: $font-darck;
      }
    }
  }

  // close classes container style
  .close-cont {
    @extend .open-cont;
    padding: 20% 0% 0% 0%;
    @media (max-width: $phone) {
      padding: 40% 0% 0% 0%;
    }
    opacity: 0;
  }
}
// darck and light English style

// darck and light Arabic style
.teacher-plans-darck-Arabic {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: rtl;

  // open classes container style
  .open-cont {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 5% 0px 5% 0px;
    opacity: 1;
    transition-duration: 0.5s;
    @media (max-width: $phone) {
      width: 100%;
      padding: 20% 0px 5% 0px;
    }

    // page title style
    .page-title {
      width: 90%;
      margin: 0px 5%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      padding: 5px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;

      h3 {
        width: 90%;
        color: $font-light;
      }

      svg {
        border: 1px solid $border-light;
        color: $font-light;
        cursor: pointer;
        padding: 5px;
        border-radius: 5px;
      }
    }

    // plans conatiner
    .plans-cont {
      width: 90%;
      height: auto;
      margin: 5px 5%;

      // results title
      .results {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding: 5px 0px;
        color: $font-light;
      }
    }
  }

  // close classes container style
  .close-cont {
    @extend .open-cont;
    padding: 20% 0% 0% 0%;
    @media (max-width: $phone) {
      padding: 40% 0% 0% 0%;
    }
    opacity: 0;
  }
}

.teacher-plans-light-Arabic {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  direction: ltr;

  // open classes container style
  .open-cont {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 5% 0px 5% 0px;
    opacity: 1;
    transition-duration: 0.5s;
    @media (max-width: $phone) {
      width: 100%;
      padding: 20% 0px 5% 0px;
    }

    // page title style
    .page-title {
      width: 90%;
      margin: 0px 5%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      padding: 5px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;

      h3 {
        width: 90%;
        color: $font-darck;
      }

      svg {
        border: 1px solid $border-darck;
        color: $font-darck;
        cursor: pointer;
        padding: 5px;
        border-radius: 5px;
      }
    }

    // plans conatiner
    .plans-cont {
      width: 90%;
      height: auto;
      margin: 5px 5%;

      // results title
      .results {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding: 5px 0px;
        color: $font-darck;
      }
    }
  }

  // close classes container style
  .close-cont {
    @extend .open-cont;
    padding: 20% 0% 0% 0%;
    @media (max-width: $phone) {
      padding: 40% 0% 0% 0%;
    }
    opacity: 0;
  }
}
// darck and light Arabic style
</style>
