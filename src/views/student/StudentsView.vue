<template>
  <div
    :class="`students-${this.$store.state.mood}-${this.$store.state.language}`"
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
            ? this.$store.state.English.students_page.page_title
            : this.$store.state.Arabic.students_page.page_title
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
                ? this.$store.state.English.students_page.results_message
                : this.$store.state.Arabic.students_page.results_message
            }}
          </p>
          <icon :icon="this.view_style" @click="ChangeIconStyle" />
        </div>
        <!-- results headers  -->

        <!-- admin component   -->
        <StudentInStudentspagecomponentVue
          v-for="(student_data, index) in this.$store.state.students"
          :key="index"
          :student_data="student_data"
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
import SearchByNameComponentVue from "@/components/student/SearchByNameComponent.vue";
import StudentInStudentspagecomponentVue from "@/components/student/StudentInStudentsComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";

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
    StudentInStudentspagecomponentVue,
    ScrollTopComponentVue,
    ErrorComponentVue,
  },
  mounted() {
    setTimeout(() => {
      // to start the loading animation
      this.$store.state.loading = "open";
    }, 100);

    // call the get students method on load the page
    this.GetStudents();

    // handel scroll
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // get students method
    async GetStudents() {
      await axios
        .get(this.$store.state.APIs.students.get_all, {
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

          // set the students data from response to students array in store
          this.$store.state.students = response.data.students_data;
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

    // get more students method
    async GetMoreStudents() {
      await axios
        .get(this.$store.state.APIs.students.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          // set the students data from response to students array in store
          this.$store.state.students = [
            ...this.$store.state.students,
            ...response.data.students_data,
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

        // call the get more students method to get more students
        this.GetMoreStudents();
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English style
.students-darck-English {
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

.students-light-English {
  @extend .students-darck-English;
  background-color: $body-light;

  .cont-open {
    // page title style
    .page-title {
      color: $font-darck;
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
      color: $font-darck;
      width: 90%;
      height: auto;
      margin: 20px 5%;
      padding: 5px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;

      // elements view style icon
      svg {
        color: $font-darck;
        border: 1px solid $border-darck;
      }
    }
  }
}
// darck and light English style

// darck and light Arabic style
.students-darck-Arabic {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: rtl;

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

.students-light-Arabic {
  @extend .students-darck-Arabic;
  background-color: $body-light;

  .cont-open {
    // page title style
    .page-title {
      color: $font-darck;
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
      color: $font-darck;
      width: 90%;
      height: auto;
      margin: 20px 5%;
      padding: 5px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;

      // elements view style icon
      svg {
        color: $font-darck;
        border: 1px solid $border-darck;
      }
    }
  }
}
// darck and light Arabic style
</style>
