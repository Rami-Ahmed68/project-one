<template>
  <div
    :class="`parents-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <!-- small nav bar component  -->
    <SmallNavComponentVue />
    <!-- small nav bar component  -->

    <!-- sidbar component  -->
    <SidBarComponentVue />
    <!-- sidbar component  -->

    <!-- loading animation component  -->
    <LoadingComponentVue />
    <!-- loading animation component  -->

    <!-- error form component  -->
    <ErrorComponentVue />
    <!-- error form component  -->

    <div :class="this.status ? 'cont-open' : 'cont-close'">
      <!-- page title  -->
      <h3 class="page-title">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.parents_page.page_title
            : this.$store.state.Arabic.parents_page.page_title
        }}
      </h3>
      <!-- page title  -->

      <SearchByNameComponentVue />

      <!-- results conatiner  -->
      <div :class="`result-cont-${this.view_style}`">
        <!-- results headers  -->
        <div class="results-heade">
          <p>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.parents_page.results_message
                : this.$store.state.Arabic.parents_page.results_message
            }}
          </p>
          <icon :icon="this.view_style" @click="ChangeIconStyle" />
        </div>
        <!-- results headers  -->

        <!-- admin component   -->
        <parentInParentsPageComponentVue
          v-for="(parent_data, index) in this.$store.state.parents"
          :key="index"
          :parent_data="parent_data"
          :view_style="this.view_style"
        />
        <!-- admin component   -->
      </div>
    </div>

    <ScrollTopComponentVue :scroll_page="this.scroll_page" />
  </div>
</template>

<script>
import axios from "axios";
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import SearchByNameComponentVue from "@/components/parent/SearchINputComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import parentInParentsPageComponentVue from "@/components/parent/parentInParentsPageComponent.vue";

export default {
  name: "admin-page",
  data() {
    return {
      view_style: "list",
      limit: 20,
      page: 1,
      scroll_page: 0,
      // open or close the compoenet
      status: false,
    };
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    LoadingComponentVue,
    SearchByNameComponentVue,
    ScrollTopComponentVue,
    ErrorComponentVue,
    parentInParentsPageComponentVue,
  },
  mounted() {
    setTimeout(() => {
      // to start the loading animation
      this.$store.state.loading = "open";
    }, 100);
    // call the get parents method on load the page
    this.GetParents();

    // handel scroll
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // get parents method
    async GetParents() {
      await axios
        .get(this.$store.state.APIs.parents.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          // open the page conatiner
          this.status = true;

          // to stop the loading animation
          this.$store.state.loading = "close";

          // set the parents data from response to parents array in store
          this.$store.state.parents = response.data.parents_data;
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

    // get more parents method
    async GetMoreParents() {
      await axios
        .get(this.$store.state.APIs.parents.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          // set the parents data from response to parents array in store
          this.$store.state.parents = [
            ...this.$store.state.parents,
            ...response.data.parents_data,
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

    // handleScroll
    handleScroll() {
      // update the scroll page
      this.scroll_page = window.scrollY;

      // check if the window height is donw
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 600
      ) {
        // to change page
        this.page += 1;

        // call the get more parents method to get more parents
        this.GetMoreParents();
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English style
.parents-darck-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: ltr;

  .cont-open {
    width: 50%;
    height: auto;
    margin: auto;
    transition-duration: 0.5s;
    padding: 10% 0% 0% 0%;
    opacity: 1;
    @media (max-width: $phone) {
      padding: 20% 0% 0% 0%;
      width: 100%;
    }

    // page title style
    .page-title {
      width: 90%;
      height: auto;
      margin: 10px 5%;
      padding: 5px 0px;
      color: $font-light;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
    }

    // result cont style
    .result-cont-list {
      width: 100%;
      min-height: 80vh;
      padding: 10px 0px;
    }

    // result cont style
    .result-cont-window-restore {
      @extend .result-cont-list;
      width: 100%;
      min-height: 80vh;
      display: flex;
      flex-wrap: wrap;
    }

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

  .cont-close {
    @extend .cont-open;
    padding: 20% 0% 0% 0%;
    @media (max-width: $phone) {
      padding: 40% 0% 0% 0%;
    }
    opacity: 0;
  }
}

.parents-light-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  direction: ltr;

  .cont-open {
    width: 50%;
    height: auto;
    margin: auto;
    transition-duration: 0.5s;
    padding: 10% 0% 0% 0%;
    opacity: 1;
    @media (max-width: $phone) {
      padding: 20% 0% 0% 0%;
      width: 100%;
    }

    // page title style
    .page-title {
      width: 90%;
      height: auto;
      margin: 10px 5%;
      padding: 5px 0px;
      color: $font-darck;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
    }

    // result cont style
    .result-cont-list {
      width: 100%;
      min-height: 80vh;
      padding: 10px 0px;
    }

    // result cont style
    .result-cont-window-restore {
      @extend .result-cont-list;
      width: 100%;
      min-height: 80vh;
      display: flex;
      flex-wrap: wrap;
    }

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

  .cont-close {
    @extend .cont-open;
    padding: 20% 0% 0% 0%;
    @media (max-width: $phone) {
      padding: 40% 0% 0% 0%;
    }
    opacity: 0;
  }
}
// darck and light English style

// darck and light Arabic style
.parents-darck-Arabic {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: ltr;

  .cont-open {
    width: 50%;
    height: auto;
    margin: auto;
    transition-duration: 0.5s;
    padding: 10% 0% 0% 0%;
    opacity: 1;
    @media (max-width: $phone) {
      padding: 20% 0% 0% 0%;
      width: 100%;
    }

    // page title style
    .page-title {
      width: 90%;
      height: auto;
      margin: 10px 5%;
      padding: 5px 0px;
      color: $font-light;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
    }

    // result cont style
    .result-cont-list {
      width: 100%;
      min-height: 80vh;
      padding: 10px 0px;
    }

    // result cont style
    .result-cont-window-restore {
      @extend .result-cont-list;
      width: 100%;
      min-height: 80vh;
      display: flex;
      flex-wrap: wrap;
    }

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

  .cont-close {
    @extend .cont-open;
    padding: 20% 0% 0% 0%;
    @media (max-width: $phone) {
      padding: 40% 0% 0% 0%;
    }
    opacity: 0;
  }
}

.parents-light-Arabic {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  direction: ltr;

  .cont-open {
    width: 50%;
    height: auto;
    margin: auto;
    transition-duration: 0.5s;
    padding: 10% 0% 0% 0%;
    opacity: 1;
    @media (max-width: $phone) {
      padding: 20% 0% 0% 0%;
      width: 100%;
    }

    // page title style
    .page-title {
      width: 90%;
      height: auto;
      margin: 10px 5%;
      padding: 5px 0px;
      color: $font-darck;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
    }

    // result cont style
    .result-cont-list {
      width: 100%;
      min-height: 80vh;
      padding: 10px 0px;
    }

    // result cont style
    .result-cont-window-restore {
      @extend .result-cont-list;
      width: 100%;
      min-height: 80vh;
      display: flex;
      flex-wrap: wrap;
    }

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

  .cont-close {
    @extend .cont-open;
    padding: 20% 0% 0% 0%;
    @media (max-width: $phone) {
      padding: 40% 0% 0% 0%;
    }
    opacity: 0;
  }
}
// darck and light Arabic style
</style>
