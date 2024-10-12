<template>
  <div
    :class="`section-cont-${this.status}-${this.$store.state.mood}-${this.$store.state.language}`"
    @scroll="handleScroll"
  >
    <!-- admins header  -->
    <div class="header">
      <div class="title">
        <h3>
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.dash_students_component.title
              : this.$store.state.Arabic.dash_students_component.title
          }}
        </h3>
        <div class="count">{{ this.students_count }}</div>
      </div>
    </div>
    <!-- admins header  -->

    <div class="cards-section">
      <StudentInStudentsComponent
        v-for="(student_data, index) in this.$store.state.students"
        :key="index"
        :student_data="student_data"
        :view_style="this.view_style"
        :Dash="true"
      />
    </div>
  </div>
</template>

<script>
import StudentInStudentsComponent from "@/components/student/StudentInStudentspageComponent.vue";
import axios from "axios";
export default {
  name: "students-component",
  data() {
    return {
      status: "close",
      // limit of teachers documents
      limit: 20,
      // page of teachers
      page: 1,
      // elements view style
      view_style: "list",
      // students count
      students_count: 0,
    };
  },
  components: {
    StudentInStudentsComponent,
  },
  mounted() {
    // call to the get students count method
    this.GetStudentsCount();

    // call to Get students methdo
    this.GetStudents();
  },
  methods: {
    // get to all students count methods
    async GetStudentsCount() {
      await axios
        .get(this.$store.state.APIs.students.get_count)
        .then((response) => {
          // set the students count to the students count in data
          this.students_count = response.data.students_count;
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

    // get students
    async GetStudents() {
      // to start the loading animation
      this.$store.state.loading = "open";

      await axios
        .get(this.$store.state.APIs.students.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          console.log(response);
          // to stop the loading animation
          this.$store.state.loading = "close";

          // update the status to open the page
          this.status = "open";

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

        // call to Get students method
        this.GetMoreStudents();
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
    height: 40px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;

    p {
      padding: 7px 20px;
      border-radius: 5px;
      color: $font-light;
      background-color: $note-darck;
      margin: 5px;
      font-size: $small;
      @media (max-width: $phone) {
        font-size: $x-small;
        padding: 6px 10px;
      }
    }

    // header title
    .title {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        width: 90%;
        height: auto;
        color: $font-light;
      }

      .count {
        width: auto;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $font-light;
        font-size: $x-small;
        background-color: none;
      }
    }
  }

  .cards-section {
    width: 100%;
    height: auto;
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
  @extend .section-cont-open-darck-English;
  .header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-color: transparent transparent $border-darck transparent;

    // header title
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        color: $font-darck;
      }

      .count {
        width: auto;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: none;
        color: $font-darck;
        font-size: $x-small;
      }
    }
  }
}

.section-cont-close-light {
  @extend .section-cont-open-light-English;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.section-cont-open-light-English::-webkit-scrollbar {
  width: 0px;
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
    height: 40px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;

    p {
      padding: 7px 20px;
      border-radius: 5px;
      color: $font-light;
      background-color: $note-darck;
      margin: 5px;
      font-size: $small;
      @media (max-width: $phone) {
        font-size: $x-small;
        padding: 6px 10px;
      }
    }

    // header title
    .title {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        width: 90%;
        height: auto;
        color: $font-light;
      }

      .count {
        width: auto;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $font-light;
        font-size: $x-small;
        background-color: none;
      }
    }
  }

  .cards-section {
    width: 100%;
    height: auto;
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
  @extend .section-cont-open-darck-Arabic;
  .header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-color: transparent transparent $border-darck transparent;

    // header title
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        color: $font-darck;
      }

      .count {
        width: auto;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: none;
        color: $font-darck;
        font-size: $x-small;
      }
    }
  }
}

.section-cont-close-light {
  @extend .section-cont-open-light-Arabic;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.section-cont-open-light-Arabic::-webkit-scrollbar {
  width: 0px;
}
// darck and light Arabic style
</style>
