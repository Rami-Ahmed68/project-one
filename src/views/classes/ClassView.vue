<template>
  <div
    :class="`class-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <LoadingComponentVue />
    <ErrorComponentVue />
    <SidBarComponentVue />
    <CopyMessageComponentVue />
    <div :class="this.status ? 'open-cont' : 'close-cont'">
      <SmallNavComponentVue />
      <NoteComponentVue
        v-if="this.$store.state.class.note"
        :note="this.$store.state.class.note"
      />

      <!-- class cover -->
      <img :src="this.$store.state.class.cover" alt="cover" class="cover" />

      <!-- teacher avatar  -->
      <router-link
        :to="`/teacher/${this.$store.state.class.teacher._id}`"
        class="teacher"
        v-if="this.$store.state.class.teacher"
      >
        <img
          :src="
            this.$store.state.class.teacher
              ? this.$store.state.class.teacher.avatar
              : null
          "
          alt="teacher avatar"
          class="avatar"
        />
        <h3>{{ this.$store.state.class.teacher.name }}</h3>
      </router-link>

      <!-- class title -->
      <h1>{{ this.$store.state.class.title }}</h1>

      <!-- class id  -->
      <CopyIdComponentVue
        :Id_data="{ id: this.$store.state.class._id, object_type: 'C' }"
      />

      <!-- join & levae button -->
      <JoinAndLeaveBtnComponentVue
        v-if="
          this.$store.state.user &&
          this.$store.state.user.user_type == 'student'
        "
        :class_id="this.$route.params.id"
      />
      <!-- join & levae to button -->

      <!-- class level -->
      <p id="info">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.class_page.class_level
            : this.$store.state.Arabic.class_page.class_level
        }}
        {{ this.$store.state.class.class_level }}
      </p>
      <!-- class level -->

      <!-- class subject -->
      <p id="info">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.class_page.class_subject
            : this.$store.state.Arabic.class_page.class_subject
        }}
        {{ this.$store.state.class.subject }}
      </p>
      <!-- class subject -->

      <!-- student length  -->
      <p
        id="info-link"
        v-if="this.$store.state.class.students"
        @click="ChangeSection('students')"
      >
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.class_page.section_title.student
            : this.$store.state.Arabic.class_page.section_title.student
        }}
        {{ this.$store.state.class.students.length }}
      </p>
      <!-- student length  -->

      <!-- home works length  -->
      <p
        id="info-link"
        v-if="this.$store.state.class.home_works"
        @click="ChangeSection('home_works')"
      >
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.class_page.section_title.home_work
            : this.$store.state.Arabic.class_page.section_title.home_work
        }}
        {{ this.$store.state.class.home_works.length }}
      </p>
      <!-- home works length  -->

      <!-- author -->
      <div class="author">
        <h3>
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.class_page.created_by
              : this.$store.state.Arabic.class_page.created_by
          }}
        </h3>
        <!-- created by  -->
        <router-link
          :to="
            this.$store.state.class.created_by_type == 'admin' ||
            this.$store.state.class.created_by_type == 'super'
              ? `/admin/${this.$store.state.class.created_by._id}`
              : `/teacher/${this.$store.state.class.created_by._id}`
          "
          v-if="this.$store.state.class.created_by"
        >
          <img
            :src="this.$store.state.class.created_by.avatar"
            alt="teacher avatar"
            class="avatar"
          />
          <h5>{{ this.$store.state.class.created_by.name }}</h5>
        </router-link>
      </div>
      <!-- author -->

      <!-- home works conatiner  -->
      <h4 v-if="this.section_type == 'home_works'">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.class_page.section_title.home_work
            : this.$store.state.Arabic.class_page.section_title.home_work
        }}
        <icon
          v-if="
            this.$store.state.class.home_works &&
            this.$store.state.class.home_works.length > 0
          "
          :icon="this.view_style"
          @click="ChangeIconStyle"
        />
      </h4>

      <div class="home-works" v-if="this.section_type == 'home_works'">
        <p
          v-if="
            this.$store.state.class.home_works &&
            this.$store.state.class.home_works.length == 0
          "
          class="result-message"
        >
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.class_page.result_messages
                  .home_work_message
              : this.$store.state.Arabic.class_page.result_messages
                  .home_work_message
          }}
        </p>
        <HomeWorkInClassPageComponent
          v-for="(HW, index) in this.$store.state.class.home_works"
          :key="index"
          :home_work="HW"
          :view_style="this.view_style"
        />
      </div>
      <!-- home works conatiner  -->

      <!-- students conatiner  -->
      <h4 v-if="this.section_type == 'students'">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.class_page.section_title.student
            : this.$store.state.Arabic.class_page.section_title.student
        }}
        <icon
          v-if="
            this.$store.state.class.students &&
            this.$store.state.class.students.length > 0
          "
          :icon="this.view_style"
          @click="ChangeIconStyle"
        />
      </h4>

      <div class="students" v-if="this.section_type == 'students'">
        <p
          v-if="
            this.$store.state.class.students &&
            this.$store.state.class.students.length == 0
          "
          class="result-message"
        >
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.class_page.result_messages.students
              : this.$store.state.Arabic.class_page.result_messages.students
          }}
        </p>

        <!-- student componenet -->
        <StudentComponentVue
          v-for="(student, index) in this.$store.state.class.students"
          :key="index"
          :student_data="student"
          :view_style="this.view_style"
        />
      </div>
      <!-- students conatiner  -->

      <!-- footer component  -->
      <FooterComponentVue />
      <!--  scroll to scomponent  -->
    </div>
    <ScrollTopComponentVue :scroll_page="this.scroll_page" />
  </div>
</template>

<script>
import axios from "axios";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import NoteComponentVue from "@/components/global/NoteComponent.vue";
import HomeWorkInClassPageComponent from "@/components/homeWorks/HomeWorkInClassPageComponent.vue";
import CopyIdComponentVue from "@/components/global/CopyIdComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import CopyMessageComponentVue from "@/components/global/CopyMessageComponent.vue";
import FooterComponentVue from "@/components/global/FooterComponent.vue";
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import JoinAndLeaveBtnComponentVue from "@/components/global/buttons/JoinAndLeaveBtnComponent.vue";
import StudentComponentVue from "@/components/student/StudentComponent.vue";

export default {
  name: "class-page",
  data() {
    return {
      class_data: "",
      view_style: "list",
      scroll_page: 0,
      section_type: "home_works",
      // open or close the compoenet
      status: false,
    };
  },
  mounted() {
    setTimeout(() => {
      // to start the loading animation
      this.$store.state.loading = "open";
    }, 100);

    // check if the class svaed in store or not
    if (!this.$store.state.class) {
      this.GetClass();
    }

    // call the handleScroll method on scrol window
    window.addEventListener("scroll", this.handleScroll);
  },
  components: {
    LoadingComponentVue,
    ErrorComponentVue,
    SidBarComponentVue,
    NoteComponentVue,
    HomeWorkInClassPageComponent,
    CopyIdComponentVue,
    ScrollTopComponentVue,
    CopyMessageComponentVue,
    FooterComponentVue,
    SmallNavComponentVue,
    JoinAndLeaveBtnComponentVue,
    StudentComponentVue,
  },
  methods: {
    // change icon style
    ChangeIconStyle() {
      this.view_style = this.view_style == "list" ? "window-restore" : "list";
      console.log(this.view_style);
    },

    // get class method
    async GetClass() {
      await axios
        .get(
          `${this.$store.state.APIs.classes.get_one}?class_id=${this.$route.params.id}`
        )
        .then((response) => {
          // open the page conatiner
          this.status = true;

          // set the class data from response to class var in store
          this.$store.state.class = response.data.class_data;
          console.log(response.data);
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });

      // to stop the loading animation
      this.$store.state.loading = "close";
    },

    // scroll method
    handleScroll() {
      this.scroll_page = window.scrollY;
    },

    // Change section
    ChangeSection(type) {
      this.section_type = type;
      console.log(this.section_type);
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// english
.class-page-darck-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  position: relative;
  direction: ltr;

  .open-cont {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    transition-duration: 1s;
    padding: 5% 0px 5% 0px;
    opacity: 1;
    position: relative;
    @media (max-width: $phone) {
      padding: 15% 0px 5% 0px;
    }

    @media (max-width: $phone) {
      width: 100%;
    }

    #note-English-cont {
      position: absolute;
      z-index: 50;
      margin: 2% 0% 0% 7%;
    }

    // cover
    .cover {
      width: 90%;
      max-height: 400px;
      border-radius: 10px;
      margin-left: 5%;
    }

    // note component
    .note-darck-English {
      position: absolute;
      left: 7%;
      margin-top: 2%;
    }

    .teacher {
      width: 90%;
      height: auto;
      margin-left: 5%;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;
      margin-top: -10%;
      padding: 10px;
      text-decoration: none;

      // teacher avatar
      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        @media (max-width: $phone) {
          width: 70px;
          height: 70px;
        }
      }

      // teacher name
      h3 {
        width: auto;
        color: $font-light;
        margin: 7% 0% 0% 5%;
      }
    }

    // author aontainer
    .author {
      width: 90%;
      margin: 5%;
      height: 100px;
      overflow: hidden;
      color: $font-light;

      // created by section title
      h3 {
        width: 50%;
        height: auto;
      }

      // author link
      a {
        display: flex;
        justify-content: start;
        align-items: center;
        text-decoration: none;
        margin: 3% 2%;
        border-radius: 5px;
        padding: 5px;
        background-color: $card-darck;

        // author avatar
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 10px;
        }

        // author name
        h5 {
          margin-left: 2%;
          color: $font-light;
        }
      }
    }

    // title
    h1 {
      width: 90%;
      height: auto;
      margin-left: 5%;
      color: $font-light;
    }

    // home works && students
    #info {
      max-width: 80%;
      height: auto;
      margin: 10px 0px 0px 5%;
      color: $font-light;
    }

    #info-link {
      max-width: 80%;
      height: auto;
      cursor: pointer;
      margin: 10px 0px 0px 5%;
      color: $blue;
      user-select: none;
    }

    // section title
    h4 {
      color: $font-light;
      width: 90%;
      padding: 5px 0px;
      margin: auto;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      display: flex;
      justify-content: space-between;

      // home works style icon
      svg {
        padding: 5px;
        border: 1px solid $border-light;
        border-radius: 5px;
        cursor: pointer;
      }
    }

    // home works container
    .home-works {
      width: 90%;
      height: auto;
      margin: 5%;
      display: flex;
      flex-wrap: wrap;

      .result-message {
        width: 90%;
        height: auto;
        text-align: center;
        color: $font-light;
        margin: 15% 5% 0% 5%;
      }
    }

    .students {
      width: 90%;
      height: auto;
      margin: 5%;
      display: flex;
      flex-wrap: wrap;
      .result-message {
        width: 90%;
        height: auto;
        text-align: center;
        color: $font-light;
        margin: 15% 5% 0% 5%;
      }
    }

    // students container
  }

  .close-cont {
    @extend .open-cont;

    @media (max-width: $phone) {
      width: 100%;
      padding-top: 40%;
    }

    width: 50%;
    min-height: 100vh;
    margin: auto;
    transition-duration: 1s;
    padding-top: 20%;
    opacity: 0;
  }
}

.class-page-light-English {
  @extend .class-page-darck-English;
  background-color: $body-light;

  .open-cont {
    .teacher {
      // teacher name
      h3 {
        color: $font-darck;
      }
    }

    .author {
      color: $font-darck;

      h3 {
        color: $font-darck;
      }

      a {
        display: flex;
        justify-content: start;
        align-items: center;
        text-decoration: none;
        margin: 3% 2%;
        border-radius: 5px;
        padding: 5px;
        background-color: $card-light;

        // author avatar
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 10px;
        }

        // author name
        h5 {
          margin-left: 2%;
          color: $font-darck;
        }
      }
    }

    // class id
    .class-id {
      color: $font-darck;
    }

    // title
    h1 {
      color: $font-darck;
    }

    // join blue
    .btn-blue {
      color: $font-light;
    }

    #info {
      color: $font-darck;
    }

    // section title
    h4 {
      color: $font-darck;
      border-color: transparent transparent $border-darck transparent;

      svg {
        border: 1px solid $border-darck;
      }
    }

    // home works
    .home-works {
      .result-message {
        color: $font-darck;
      }
    }

    // students
    .students {
      .result-message {
        color: $font-darck;
      }
    }
  }

  .close-cont {
    @extend .open-cont;
  }
}
// english

// arabic
.class-page-darck-Arabic {
  @extend .class-page-darck-English;
  direction: rtl;

  // opend cont
  .open-cont {
    #note-Arabic-cont {
      position: absolute;
      z-index: 50;
      margin: 2% 7% 0% 0%;
    }

    // cover
    .cover {
      margin-right: 5%;
    }

    // note component
    .note-darck-Arabic {
      position: absolute;
      right: 7%;
      margin-top: 2%;
    }

    .teacher {
      margin-right: 5%;

      // teacher avatar
      .avatar {
        border-radius: 10px;
      }

      // teacher name
      h3 {
        margin: 7% 5% 0% 0%;
      }
    }

    .author {
      a {
        display: flex;
        justify-content: start;
        align-items: center;
        text-decoration: none;
        margin: 1% 2%;
        border-radius: 5px;
        padding: 5px;
        background-color: $card-darck;

        // author avatar
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 10px;
        }

        // author name
        h5 {
          margin-left: 2%;
          color: $font-light;
        }
      }
    }

    // class id
    .class-id {
      margin-right: 5%;
    }

    // title
    h1 {
      margin-right: 5%;
    }

    // join blue
    .btn-blue {
      padding: 7px 20px;
      border: none;
      border-radius: 5px;
      color: $font-light;
      background: linear-gradient(to top, $first-blue, $second-blue);
      cursor: pointer;
      position: absolute;
      right: 75%;
      transition-duration: 0.5s;
    }

    // btn orange
    .btn-orange {
      @extend .btn-blue;
      background: linear-gradient(to top, $first-orange, $second-orange);
    }

    // btn pink
    .btn-pink {
      @extend .btn-blue;
      background: linear-gradient(to top, $first-pink, $second-pink);
    }

    // btn green
    .btn-green {
      @extend .btn-blue;
      background: linear-gradient(to top, $first-green, $second-green);
    }

    // home works && students
    #info {
      margin: 10px 5% 0px 0%;
    }

    #info-link {
      margin: 10px 5% 0px 0%;
    }
  }

  // opend cont
  .close-cont {
    @extend .open-cont;
    @media (max-width: $phone) {
      width: 100%;
    }
    width: 50%;
    min-height: 100vh;
    margin: auto;
    transition-duration: 1s;
    padding-top: 20%;
    opacity: 0;
  }
}

.class-page-light-Arabic {
  @extend .class-page-darck-Arabic;
  background-color: $body-light;

  .open-cont {
    .teacher {
      // teacher name
      h3 {
        color: $font-darck;
      }
    }
    .author {
      color: $font-darck;

      h3 {
        color: $font-darck;
      }

      a {
        display: flex;
        justify-content: start;
        align-items: center;
        text-decoration: none;
        margin: 2% 2%;
        border-radius: 5px;
        padding: 5px;
        background-color: $card-light;

        // author avatar
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 10px;
        }

        // author name
        h5 {
          margin-left: 2%;
          color: $font-darck;
        }
      }
    }

    // class id
    .class-id {
      color: $font-darck;
    }

    // title
    h1 {
      color: $font-darck;
    }

    // join blue
    .btn-blue {
      color: $font-light;
    }

    #info {
      color: $font-darck;
    }

    // section title
    h4 {
      color: $font-darck;
      border-color: transparent transparent $border-darck transparent;

      svg {
        border: 1px solid $border-darck;
      }
    }

    // home works
    .home-works {
      .result-message {
        color: $font-darck;
      }
    }

    // students
    .students {
      .result-message {
        color: $font-darck;
      }
    }
  }

  .close-cont {
    @extend .open-cont;
  }
}
// arabic
</style>
