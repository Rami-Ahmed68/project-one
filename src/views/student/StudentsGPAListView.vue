<template>
  <div
    :class="`gpa-list-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <SmallNavComponent />
    <SidBarComponent />
    <ErrorComponent />
    <LoadingComponent />
    <div :class="this.status ? 'open-cont' : 'close-cont'">
      <!-- header -->
      <div class="header">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.show_user_gpa_page.title
            : this.$store.state.Arabic.show_user_gpa_page.title
        }}
      </div>
      <!-- header -->

      <!-- section -->
      <div
        class="section"
        v-if="
          this.$store.state.show_user.data &&
          this.$store.state.show_user.data.List_of_modifiers.length > 0
        "
      >
        <!-- line  -->
        <div
          class="line"
          v-for="(line, index) in this.$store.state.show_user.data
            .List_of_modifiers"
          :key="index"
        >
          <h3>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.show_user_gpa_page.gpa
                : this.$store.state.Arabic.show_user_gpa_page.gpa
            }}
            {{ line.total_gpa }}
          </h3>

          <p>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.show_user_gpa_page.points
                : this.$store.state.Arabic.show_user_gpa_page.points
            }}
            {{ line.points }}
          </p>

          <p>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.show_user_gpa_page.exams
                : this.$store.state.Arabic.show_user_gpa_page.exams
            }}
            {{ line.finished_exams }}
          </p>

          <p>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.show_user_gpa_page.date
                : this.$store.state.Arabic.show_user_gpa_page.date
            }}
            {{ line.date }}
          </p>
        </div>
        <!-- line  -->
      </div>

      <!-- default message  -->
      <div
        class="default_message"
        v-if="
          this.$store.state.show_user.data &&
          this.$store.state.show_user.data.List_of_modifiers.length == 0
        "
      >
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.show_user_gpa_page.default_message
            : this.$store.state.Arabic.show_user_gpa_page.default_message
        }}
      </div>
      <!-- default message  -->
      <!-- section -->
    </div>

    <ScrollTopComponent :scroll_page="this.scroll_page" />
  </div>
</template>

<script>
//? importing the components
import axios from "axios";
import LoadingComponent from "@/components/global/LoadingComponent.vue";
import SmallNavComponent from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponent from "@/components/global/SidBarComponent.vue";
import ScrollTopComponent from "@/components/global/ScrollTopComponent.vue";
import ErrorComponent from "@/components/global/ErrorComponent.vue";

export default {
  data() {
    return {
      // scroll_page
      scroll_page: 0,
      // status
      status: false,
    };
  },
  components: {
    SmallNavComponent,
    SidBarComponent,
    ScrollTopComponent,
    ErrorComponent,
    LoadingComponent,
  },
  mounted() {
    // to open the loading
    setTimeout(() => {
      this.$store.state.loading = "open";
    }, 200);

    // call to get the student data method
    this.GetStudent();

    // handel scroll
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // get student method
    async GetStudent() {
      await axios
        .get(this.$store.state.APIs.students.get_one, {
          params: {
            student_id: this.$route.params.id,
          },
        })
        .then((response) => {
          // update the status to open the cont
          this.status = true;

          // to stop the loading animation
          this.$store.state.loading = "close";

          // set the student data to Show user var in store
          this.$store.state.show_user = {
            type: "student",
            data: response.data.user_data,
          };
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
    handleScroll() {
      // to start scroll to top component
      this.scroll_page = window.scrollY;
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English style
.gpa-list-page-darck-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: ltr;

  .open-cont {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 10% 0px 10px 0px;
    opacity: 1;
    transition-duration: 0.5s;

    @media (max-width: $phone) {
      padding: 20% 0px 10px 0px;
      width: 100%;
    }

    .header {
      width: 90%;
      height: auto;
      padding: 5px 0px;
      margin: 5px 5%;
      color: $font-light;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
    }

    .section {
      width: 90%;
      height: auto;
      margin: 5px 5%;

      .line {
        width: 100%;
        min-height: 50px;
        border-radius: 5px;
        background-color: $note-darck;
        margin: 5px 0%;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;

        h3 {
          width: 90%;
          margin: 5px 5px;
          height: auto;
          color: $font-light;
        }

        p {
          padding: 3px;
          border-radius: 3px;
          margin: 3px;
          background-color: $message-darck;
          color: $font-light;
          font-size: $x-small;
        }
      }

      .default_message {
        width: 90%;
        height: auto;
        padding: 5px;
        border-radius: 5px;
        margin: 5px 5%;
        font-size: $small;
        display: flex;
        justify-content: center;
        align-items: center;

        @media (max-width: $phone) {
          font-size: $x-small;
        }

        background-color: $note-darck;
        color: $font-light;
      }
    }
  }

  .close-cont {
    @extend .open-cont;
    padding: 30% 0px 0px 0px;
    opacity: 0;
    transition-duration: 0.5s;
  }
}

.gpa-list-page-light-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  direction: ltr;

  .open-cont {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 10% 0px 10px 0px;
    opacity: 1;
    transition-duration: 0.5s;

    @media (max-width: $phone) {
      padding: 20% 0px 10px 0px;
      width: 100%;
    }

    .header {
      width: 90%;
      height: auto;
      padding: 5px 0px;
      margin: 5px 5%;
      color: $font-darck;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
    }

    .section {
      width: 90%;
      height: auto;
      margin: 5px 5%;

      .line {
        width: 100%;
        min-height: 50px;
        border-radius: 5px;
        background-color: $note-light;
        margin: 5px 0%;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;

        h3 {
          width: 90%;
          margin: 5px 5px;
          height: auto;
          color: $font-darck;
        }

        p {
          padding: 3px;
          border-radius: 3px;
          margin: 3px;
          background-color: $message-light;
          color: $font-darck;
          font-size: $x-small;
        }
      }

      .default_message {
        width: 90%;
        height: auto;
        padding: 5px;
        border-radius: 5px;
        margin: 5px 5%;
        font-size: $small;
        display: flex;
        justify-content: center;
        align-items: center;

        @media (max-width: $phone) {
          font-size: $x-small;
        }

        background-color: $note-light;
        color: $font-darck;
      }
    }
  }

  .close-cont {
    @extend .open-cont;
    padding: 30% 0px 0px 0px;
    opacity: 0;
    transition-duration: 0.5s;
  }
}
// darck and light English style

// darck and light Arabic style
.gpa-list-page-darck-Arabic {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: rtl;

  .open-cont {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 10% 0px 10px 0px;
    opacity: 1;
    transition-duration: 0.5s;

    @media (max-width: $phone) {
      padding: 20% 0px 10px 0px;
      width: 100%;
    }

    .header {
      width: 90%;
      height: auto;
      padding: 5px 0px;
      margin: 5px 5%;
      color: $font-light;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
    }

    .section {
      width: 90%;
      height: auto;
      margin: 5px 5%;

      .line {
        width: 100%;
        min-height: 50px;
        border-radius: 5px;
        background-color: $note-darck;
        margin: 5px 0%;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;

        h3 {
          width: 90%;
          margin: 5px 5px;
          height: auto;
          color: $font-light;
        }

        p {
          padding: 3px;
          border-radius: 3px;
          margin: 3px;
          background-color: $message-darck;
          color: $font-light;
          font-size: $x-small;
        }
      }

      .default_message {
        width: 90%;
        height: auto;
        padding: 5px;
        border-radius: 5px;
        margin: 5px 5%;
        font-size: $small;
        display: flex;
        justify-content: center;
        align-items: center;

        @media (max-width: $phone) {
          font-size: $x-small;
        }

        background-color: $note-darck;
        color: $font-light;
      }
    }
  }

  .close-cont {
    @extend .open-cont;
    padding: 30% 0px 0px 0px;
    opacity: 0;
    transition-duration: 0.5s;
  }
}

.gpa-list-page-light-Arabic {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  direction: rtl;

  .open-cont {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 10% 0px 10px 0px;
    opacity: 1;
    transition-duration: 0.5s;

    @media (max-width: $phone) {
      padding: 20% 0px 10px 0px;
      width: 100%;
    }

    .header {
      width: 90%;
      height: auto;
      padding: 5px 0px;
      margin: 5px 5%;
      color: $font-darck;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
    }

    .section {
      width: 90%;
      height: auto;
      margin: 5px 5%;

      .line {
        width: 100%;
        min-height: 50px;
        border-radius: 5px;
        background-color: $note-light;
        margin: 5px 0%;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;

        h3 {
          width: 90%;
          margin: 5px 5px;
          height: auto;
          color: $font-darck;
        }

        p {
          padding: 3px;
          border-radius: 3px;
          margin: 3px;
          background-color: $message-light;
          color: $font-darck;
          font-size: $x-small;
        }
      }

      .default_message {
        width: 90%;
        height: auto;
        padding: 5px;
        border-radius: 5px;
        margin: 5px 5%;
        font-size: $small;
        display: flex;
        justify-content: center;
        align-items: center;

        @media (max-width: $phone) {
          font-size: $x-small;
        }

        background-color: $note-light;
        color: $font-darck;
      }
    }
  }

  .close-cont {
    @extend .open-cont;
    padding: 30% 0px 0px 0px;
    opacity: 0;
    transition-duration: 0.5s;
  }
}
// darck and light Arabic style
</style>
