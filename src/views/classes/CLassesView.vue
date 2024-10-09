<template>
  <div
    :class="`classes-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <!-- sidbar component  -->
    <SidBarComponentVue />
    <!-- sidbar component  -->

    <!-- loading component  -->
    <LoadingComponentVue />
    <!-- loading component  -->

    <!-- error form component  -->
    <ErrorComponentVue />
    <!-- error form component  -->

    <div :class="this.status ? `cont-open` : `cont-close`">
      <!-- small nav scomponent  -->
      <SmallNavComponentVue />
      <!-- small nav scomponent  -->

      <!-- page title  -->
      <h3 class="page-title">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.classes_page.page_title
            : this.$store.state.Arabic.classes_page.page_title
        }}
      </h3>
      <!-- page title  -->

      <!-- search by title  -->
      <SearchINputComponentVue />
      <!-- search by title  -->

      <!-- classes container -->
      <div class="classes-cont">
        <p class="results">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.classes_page.results_message
              : this.$store.state.Arabic.classes_page.results_message
          }}
        </p>
        <ClassesPageClassComponentVue
          v-for="(classOb, index) in this.$store.state.classes"
          :key="index"
          :class_data="classOb"
        />
      </div>

      <ScrollTopComponentVue :scroll_page="this.scroll_page" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import SearchINputComponentVue from "@/components/class/SearchINputComponent.vue";
import ClassesPageClassComponentVue from "@/components/class/ClassesPageClassComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";

export default {
  name: "classes-page",
  data() {
    return {
      scroll_page: 0,
      // page index
      page: 1,
      // limit od classes documents
      limit: 20,
      // open or close the compoenet
      status: false,
    };
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    SearchINputComponentVue,
    ClassesPageClassComponentVue,
    LoadingComponentVue,
    ScrollTopComponentVue,
    ErrorComponentVue,
  },
  mounted() {
    setTimeout(() => {
      // open the page conatiner
      this.status = true;
    }, 500);

    setTimeout(() => {
      // to start the loading animation
      this.$store.state.loading = "open";
    }, 100);

    // call the get classes method on load the page
    this.GetCLasses();

    // handel scroll
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // get classes method
    async GetCLasses() {
      await axios
        .get(this.$store.state.APIs.classes.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((Response) => {
          // copy the classes from response and add that to classes array in store
          this.$store.state.classes = Response.data.classes_data;

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

    // get more classes method
    async GetMoreCLasses() {
      await axios
        .get(this.$store.state.APIs.classes.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((Response) => {
          // copy the classes from response and add that to classes array in store
          this.$store.state.classes = [
            ...this.$store.state.classes,
            ...Response.data.classes_data,
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

    // handleScroll
    async handleScroll() {
      // check if the window height is donw
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 600
      ) {
        // to change page
        this.page += 1;

        // call the get more classes method to get more classes
        await this.GetMoreCLasses();
      }

      // to start scroll to top component
      this.scroll_page = window.scrollY;
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck English
.classes-darck-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: ltr;

  // open classes container style
  .cont-open {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 5% 0px 5% 0px;
    opacity: 1;
    transition-duration: 0.5s;

    @media (max-width: $phone) {
      width: 100%;
      padding: 10% 0px 5% 0px;
    }

    // page title style
    .page-title {
      width: 90%;
      margin: 5%;
      padding: 10px 0px;
      color: $font-light;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
    }

    // classes conatiner
    .classes-cont {
      width: 100%;
      height: auto;

      // results title
      .results {
        width: 90%;
        height: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 13% 5%;
        padding: 5px 0px;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;
        color: $font-light;
      }
    }
  }

  // close classes container style
  .cont-close {
    @extend .cont-open;
    padding: 20% 0px 5% 0px;
    transition-duration: 0.5s;
    opacity: 0;
  }
}
// darck English

// light English
.classes-light-English {
  @extend .classes-darck-English;
  background-color: $body-light;

  // open classes container style
  .cont-open {
    // page title style
    .page-title {
      color: $font-darck;
      border-color: transparent transparent $border-darck transparent;
    }

    // classes conatiner
    .classes-cont {
      .results {
        border-color: transparent transparent $border-darck transparent;
        color: $font-darck;

        svg {
          border: 1px solid $border-darck;
        }
      }
    }
  }

  // close classes container style
  .cont-close {
    @extend .cont-open;
    padding: 20% 0px 5% 0px;
    transition-duration: 0.5s;
    opacity: 0;
  }
}
// light English

// darck Arabic
.classes-darck-Arabic {
  @extend .classes-darck-English;
  width: 100%;
  min-height: 100vh;
  direction: rtl;
}
// darck Arabic

// light Arabic
.classes-light-Arabic {
  @extend .classes-light-English;
  background-color: $body-light;
  direction: rtl;

  // open classes container style
  .cont-open {
    // page title style
    .page-title {
      color: $font-darck;
      border-color: transparent transparent $border-darck transparent;
    }

    // classes conatiner
    .classes-cont {
      .results {
        border-color: transparent transparent $border-darck transparent;
        color: $font-darck;

        svg {
          border: 1px solid $border-darck;
        }
      }
    }
  }

  // close classes container style
  .cont-close {
    @extend .cont-open;
    padding: 20% 0px 5% 0px;
    transition-duration: 0.5s;
    opacity: 0;
  }
}
// light Arabic
</style>
