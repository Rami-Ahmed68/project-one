<template>
  <div
    :class="`top-students-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <SidBarComponent />
    <SmallNavComponent />
    <ErrorComponent />
    <LoadingComponent />
    <ScrollTopComponent />

    <div :class="this.status ? 'cont-open' : 'cont-close'">
      <!-- page title  -->
      <h3 class="page-title">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.top_students_page.page_title
            : this.$store.state.Arabic.top_students_page.page_title
        }}
      </h3>
      <!-- page title  -->

      <label for="class_level">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.top_students_page.label
            : this.$store.state.Arabic.top_students_page.label
        }}
      </label>

      <select name="" id="" v-model="this.class_level">
        <option
          v-for="(class_level, index) in this.$store.state.Classes_level_list"
          :key="index"
          :value="class_level.English"
        >
          {{
            this.$store.state.language == "English"
              ? class_level.English
              : class_level.Arabic
          }}
        </option>
      </select>

      <button class="btn" @click="GetTopStudents">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.top_students_page.button
            : this.$store.state.Arabic.top_students_page.button
        }}
      </button>

      <!-- results conatiner  -->
      <div :class="`result-cont-${this.view_style}`">
        <!-- results headers  -->
        <div class="results-heade">
          <p>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.top_students_page.results_message
                : this.$store.state.Arabic.top_students_page.results_message
            }}
          </p>
          <icon :icon="this.view_style" @click="ChangeIconStyle" />
        </div>
        <!-- results headers  -->

        <!-- admin component   -->
        <StudentInStudentspagecomponentVue
          v-for="(student_data, index) in this.$store.state.top_students"
          :key="index"
          :student_data="student_data"
          :view_style="this.view_style"
        />
        <!-- admin component   -->

        <!-- default message  -->
        <p class="default-message" v-if="this.default_message">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.top_students_page.default
              : this.$store.state.Arabic.top_students_page.default
          }}
        </p>
        <!-- default message  -->
      </div>
    </div>
  </div>
</template>

<script>
//? importing the components
import StudentInStudentspagecomponentVue from "@/components/student/StudentInStudentsComponent.vue";
import axios from "axios";
import SmallNavComponent from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponent from "@/components/global/SidBarComponent.vue";
import LoadingComponent from "@/components/global/LoadingComponent.vue";
import ScrollTopComponent from "@/components/global/ScrollTopComponent.vue";
import ErrorComponent from "@/components/global/ErrorComponent.vue";

export default {
  name: "top-students-page",
  data() {
    return {
      // page status
      status: false,
      // class_level
      class_level: "First_grade",
      // cards style
      view_style: "list",
      // default_message
      default_message: false,
    };
  },
  components: {
    StudentInStudentspagecomponentVue,
    SmallNavComponent,
    LoadingComponent,
    SidBarComponent,
    ScrollTopComponent,
    ErrorComponent,
  },
  mounted() {
    setTimeout(() => {
      this.status = true;
    }, 100);
  },
  methods: {
    // get the top students
    async GetTopStudents() {
      // to start the loading animation
      this.$store.state.loading = "open";

      await axios
        .get(this.$store.state.APIs.students.get_top, {
          params: {
            class_level: this.class_level,
          },
        })
        .then((response) => {
          // update the status
          this.status = true;

          // to stop te loading animation
          this.$store.state.loading = "close";

          // set the top students data from response to top students array in store
          this.$store.state.top_students = response.data.students_data;

          // check if the students length is more than 0
          if (response.data.students_data.length > 0) {
            this.default_message = false;
          } else {
            this.default_message = true;
          }
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
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/_variables.scss";

// darck and light English style
.top-students-darck-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: ltr;

  .cont-open {
    width: 50%;
    height: auto;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
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

    label {
      width: 100%;
      height: 30px;
      margin: 5px 5%;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      color: $font-light;
    }

    select {
      width: 90%;
      height: 40px;
      margin: 0px 5%;
      border-radius: 5px;
      outline: none;
      border: none;
      padding: 0px 5px;
      background-color: $card-darck;
      color: $font-light;
    }

    .btn {
      width: 90%;
      height: 40px;
      border-radius: 5px;
      margin: 5px 5%;
      outline: none;
      border: none;
      cursor: pointer;
      color: $font-light;
      background-color: $green;
    }

    .default-message {
      width: 90%;
      height: 40px;
      border-radius: 5px;
      margin: 5px 5%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $card-darck;
      color: $font-light;
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

.top-students-light-English {
  @extend .top-students-darck-English;
  background-color: $body-light;

  .cont-open {
    // page title style
    .page-title {
      color: $font-darck;
      border-color: transparent transparent $border-darck transparent;
    }

    label {
      width: 100%;
      height: 30px;
      margin: 5px 5%;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      color: $font-darck;
    }

    select {
      width: 90%;
      height: 40px;
      margin: 0px 5%;
      border-radius: 5px;
      outline: none;
      border: none;
      padding: 0px 5px;
      background-color: $card-light;
      color: $font-darck;
    }

    .btn {
      width: 90%;
      height: 40px;
      border-radius: 5px;
      margin: 5px 5%;
      outline: none;
      border: none;
      cursor: pointer;
      color: $font-light;
      background-color: $green;
    }

    .default-message {
      width: 90%;
      height: 40px;
      border-radius: 5px;
      margin: 5px 5%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $card-light;
      color: $font-darck;
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
.top-students-darck-Arabic {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: rtl;

  .cont-open {
    width: 50%;
    height: auto;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
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

    label {
      width: 100%;
      height: 30px;
      margin: 5px 5%;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      color: $font-light;
    }

    select {
      width: 90%;
      height: 40px;
      margin: 0px 5%;
      border-radius: 5px;
      outline: none;
      border: none;
      padding: 0px 5px;
      background-color: $card-darck;
      color: $font-light;
    }

    .btn {
      width: 90%;
      height: 40px;
      border-radius: 5px;
      margin: 5px 5%;
      outline: none;
      border: none;
      cursor: pointer;
      color: $font-light;
      background-color: $green;
    }

    .default-message {
      width: 90%;
      height: 40px;
      border-radius: 5px;
      margin: 5px 5%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $card-darck;
      color: $font-light;
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

.top-students-light-Arabic {
  @extend .top-students-darck-Arabic;
  background-color: $body-light;

  .cont-open {
    // page title style
    .page-title {
      color: $font-darck;
      border-color: transparent transparent $border-darck transparent;
    }

    label {
      width: 100%;
      height: 30px;
      margin: 5px 5%;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      color: $font-darck;
    }

    select {
      width: 90%;
      height: 40px;
      margin: 0px 5%;
      border-radius: 5px;
      outline: none;
      border: none;
      padding: 0px 5px;
      background-color: $card-light;
      color: $font-darck;
    }

    .btn {
      width: 90%;
      height: 40px;
      border-radius: 5px;
      margin: 5px 5%;
      outline: none;
      border: none;
      cursor: pointer;
      color: $font-light;
      background-color: $green;
    }

    .default-message {
      width: 90%;
      height: 40px;
      border-radius: 5px;
      margin: 5px 5%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $card-light;
      color: $font-darck;
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
