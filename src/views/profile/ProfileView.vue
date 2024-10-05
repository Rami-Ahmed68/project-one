<template>
  <div
    :class="`profile-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <LoadingComponentVue />
    <SidBarComponentVue />
    <SmallNavComponentVue />
    <ErrorComponentVue />
    <CopyMessageComponentVue />
    <div :class="this.status ? 'cont-open' : 'cont-close'">
      <!-- section one container  -->
      <div class="section-one">
        <!-- avatar  -->
        <div :class="`avatar-${this.$store.state.theme}`">
          <img
            :src="this.$store.state.profile.avatar"
            alt="avatar"
            class="avatar-img"
          />
        </div>
        <!-- avatar  -->
        <router-link
          class="update-icon"
          :to="
            this.$store.state.user
              ? `/updateProfile/${this.$store.state.user.user._id}`
              : ''
          "
          >⚙️</router-link
        >

        <div class="info">
          <!-- name  -->
          <h2>
            {{ this.$store.state.profile.name }}
          </h2>
          <!-- name  -->

          <!-- points  -->
          <h3 v-if="this.$store.state.user.user_type == 'student'">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.profile.points
                : this.$store.state.Arabic.profile.points
            }}
            {{ this.$store.state.profile.points }}
          </h3>
          <!-- points  -->

          <!-- GPA  -->
          <h3 v-if="this.$store.state.user.user_type == 'student'">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.profile.gpa
                : this.$store.state.Arabic.profile.gpa
            }}
            {{ this.$store.state.profile.total_gpa }}
          </h3>
          <!-- GPA  -->
        </div>

        <div class="notes">
          <!-- exams  -->
          <p v-if="this.$store.state.user.user_type == 'student'">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.profile.exams
                : this.$store.state.Arabic.profile.exams
            }}
            {{ this.$store.state.profile.finished_exams }}
          </p>
          <!-- exams  -->

          <!-- rate  -->
          <p
            v-if="
              this.$store.state.user &&
              this.$store.state.user.user_type == 'teacher'
            "
          >
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.profile.rate
                : this.$store.state.Arabic.profile.rate
            }}
            {{ this.$store.state.profile.rate }}
          </p>
          <!-- rate  -->

          <!-- gender  -->
          <p>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.profile.gender
                : this.$store.state.Arabic.profile.gender
            }}
            {{ this.$store.state.profile.gender }}
          </p>
          <!-- gender  -->

          <!-- class level  -->
          <p
            v-if="
              this.$store.state.user.user_type == 'student' ||
              this.$store.state.user.user_type == 'teacher'
            "
          >
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.profile.class_level
                : this.$store.state.Arabic.profile.class_level
            }}
            {{ this.$store.state.profile.class_level }}
          </p>
          <!-- class level  -->

          <!-- joind at  -->
          <p v-if="this.$store.state.profile.joind_at">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.profile.joind_at
                : this.$store.state.Arabic.profile.joind_at
            }}
            {{ this.$store.state.profile.joind_at.split("T")[0] }}
          </p>
          <!-- joind at  -->

          <!-- Phone Number  -->
          <p v-if="this.$store.state.profile.phone_number">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.profile.phone
                : this.$store.state.Arabic.profile.phone
            }}
            {{ this.$store.state.profile.phone_number }}
          </p>
          <!-- Phone Number  -->
        </div>

        <!--  copy id component   -->
        <CopyIdComponentVue
          :Id_data="{
            object_type:
              this.$store.state.user.user_type == 'super'
                ? 'SA'
                : this.$store.state.user.user_type == 'admin'
                ? 'A'
                : this.$store.state.user.user_type == 'student'
                ? 'S'
                : this.$store.state.user.user_type == 'teacher'
                ? 'T'
                : this.$store.state.user.user_type == 'parent'
                ? 'Pa'
                : '',
            id: this.$store.state.profile._id,
          }"
        />
        <!--  copy id component   -->

        <!--  about me  -->
        <span class="content" v-if="this.$store.state.profile.about_me">
          {{ this.$store.state.profile.about_me }}
        </span>
        <!--  about me  -->

        <!-- medals in English language  -->
        <div class="medals" v-if="this.$store.state.user_type == 'student'">
          <span>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.profile.medals
                : this.$store.state.Arabic.profile.medals
            }}
          </span>

          <!-- add the medals by gpa -->
          <p
            v-for="(medal, index) in this.$store.state.medals"
            :key="index"
            :id="medal.id"
          >
            {{
              this.$store.state.profile.total_gpa >= medal.gpa
                ? this.$store.state.language == "English"
                  ? medal.English
                  : medal.Arabic
                : "🔒"
            }}
          </p>
        </div>
        <!-- medals in English language  -->

        <!-- medals in Arabic language  -->
      </div>
      <!-- section one container  -->

      <!-- add plans here    -->

      <!-- section tow container  -->
      <div
        class="section-tow"
        v-if="
          this.$store.state.user.user_type == 'student' ||
          this.$store.state.user.user_type == 'teacher'
        "
      >
        <div class="title">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.profile.classes_cont.title
              : this.$store.state.Arabic.profile.classes_cont.title
          }}
        </div>

        <!-- default message  -->
        <p
          class="default_message"
          v-if="
            this.$store.state.profile.classes &&
            this.$store.state.profile.classes.length == 0
          "
        >
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.profile.default_message_classes
              : this.$store.state.Arabic.profile.default_message_classes
          }}
        </p>
        <!-- default message  -->

        <!-- class component  -->
        <ClassComponentVue
          v-for="(class_data, index) in this.$store.state.profile.classes"
          :key="index"
          :class_data="class_data"
        />
        <!-- class component  -->

        <router-link
          to="/my/classes"
          v-if="
            this.$store.state.profile.classes &&
            this.$store.state.profile.classes.length > 0
          "
        >
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.profile.classes_cont.title
              : this.$store.state.Arabic.profile.classes_cont.title
          }}
          <icon icon="arrow-right" />
        </router-link>
      </div>
      <!-- section tow container  -->

      <!-- section three container  -->
      <div
        class="section-tow"
        v-if="
          this.$store.state.user.user_type == 'student' ||
          this.$store.state.user.user_type == 'teacher'
        "
      >
        <div class="title">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.profile.plans_cont.title
              : this.$store.state.Arabic.profile.plans_cont.title
          }}
        </div>

        <!-- default message  -->
        <p
          class="default_message"
          v-if="
            this.$store.state.profile.my_plans &&
            this.$store.state.profile.my_plans.length == 0
          "
        >
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.profile.default_message_plans
              : this.$store.state.Arabic.profile.default_message_plans
          }}
        </p>
        <!-- default message  -->

        <!-- plan component  -->
        <PlanInProfilePageCompoeneVue
          v-for="(plan_data, index) in this.$store.state.profile.my_plans"
          :key="index"
          :plan_data="plan_data"
        />
        <!-- class component  -->

        <router-link
          to="/my/plans"
          v-if="
            this.$store.state.profile.my_plans &&
            this.$store.state.profile.my_plans.length > 0
          "
        >
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.profile.plans_cont.title
              : this.$store.state.Arabic.profile.plans_cont.title
          }}
          <icon icon="arrow-right" />
        </router-link>
      </div>
      <!-- section three container  -->

      <!-- section for container  -->
      <div
        class="section-tow"
        v-if="this.$store.state.user.user_type == 'parent'"
      >
        <div class="title">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.profile.children
              : this.$store.state.Arabic.profile.children
          }}
        </div>

        <!-- default message  -->
        <p
          class="default_message"
          v-if="
            this.$store.state.profile.children &&
            this.$store.state.profile.children.length == 0
          "
        >
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.profile.default_message_children
              : this.$store.state.Arabic.profile.default_message_children
          }}
        </p>
        <!-- default message  -->

        <!-- student component  -->
        <StudentInStudentsComponent
          v-for="(student_data, index) in this.$store.state.profile.children"
          :key="index"
          :student_data="student_data"
          :view_style="`list`"
        />
        <!-- student component  -->
      </div>
      <!-- section for container  -->
    </div>

    <!-- scroll to top compoenent  -->
    <ScrollTopComponentVue :scroll_page="this.scroll_page" />
    <!-- scroll to top compoe nent  -->
  </div>
</template>

<script>
// ? importing components
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import CopyIdComponentVue from "@/components/global/CopyIdComponent.vue";
import CopyMessageComponentVue from "@/components/global/CopyMessageComponent.vue";
import ClassComponentVue from "@/components/class/ClassComponent.vue";
import StudentInStudentsComponent from "@/components/student/StudentInStudentsComponent.vue";
import PlanInProfilePageCompoeneVue from "@/components/plan/PlanInProfilePageCompoene.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import axios from "axios";

export default {
  name: "profile-page",
  data() {
    return {
      api: "",
      // open or close the compoenet
      status: false,

      scroll_page: 0,
      // params data
      params: "",
    };
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    LoadingComponentVue,
    ErrorComponentVue,
    CopyMessageComponentVue,
    CopyIdComponentVue,
    ClassComponentVue,
    PlanInProfilePageCompoeneVue,
    ScrollTopComponentVue,
    StudentInStudentsComponent,
  },
  mounted() {
    setTimeout(() => {
      // to start the loading animation
      this.$store.state.loading = "open";
    }, 100);

    // check if the user is loged in
    if (this.$store.state.user == "") {
      //send the user to log in page
      window.location = "/login";
    }

    // check if the user is loged in
    if (this.$store.state.user != "") {
      // cla to get student profile data method
      this.GeProfileData();
    }

    // handel scroll
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    //? select the api
    SelectApi() {
      if (
        this.$store.state.user.user_type == "admin" ||
        this.$store.state.user.user_type == "super"
      ) {
        this.api = this.$store.state.APIs.admins.get_one;
        // update user type in store
        this.$store.state.user_type = "admin";
        // add the admin id to params
        this.params = {
          admin_id: this.$store.state.user.user._id,
        };
      } else if (this.$store.state.user.user_type == "teacher") {
        this.api = this.$store.state.APIs.teachers.get_one;
        // update user type in store
        this.$store.state.user_type = "teacher";
        // add the teacher id to params
        this.params = {
          teacher_id: this.$store.state.user.user._id,
        };
      } else if (this.$store.state.user.user_type == "student") {
        this.api = this.$store.state.APIs.students.get_one;
        // update user type in store
        this.$store.state.user_type = "student";
        // add the student id to params
        this.params = {
          student_id: this.$store.state.user.user._id,
        };
      } else if (this.$store.state.user.user_type == "parent") {
        this.api = this.$store.state.APIs.parents.get_one;
        // update user type in store
        this.$store.state.user_type = "parent";
        // add the parent id to params
        this.params = {
          parent_id: this.$store.state.user.user._id,
        };
      }
    },

    // get to use profile data
    async GeProfileData() {
      // call to select api method
      this.SelectApi();

      await axios
        .get(this.api, {
          params: this.params,
        })
        .then((response) => {
          // open the page conatiner
          this.status = true;

          // set the respons student data to profile in store
          this.$store.state.profile = response.data.user_data;

          // to stop the loading animation
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

// Darck and light English style
.profile-page-darck-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: ltr;

  .cont-open {
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

    // section-one container
    .section-one {
      width: 90%;
      height: auto;
      margin: 10px 5%;
      padding: 5px;
      border-radius: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;
      background-color: $card-darck;
      position: relative;

      // update profile icon
      .update-icon {
        position: absolute;
        top: 5px;
        right: 5px;
        text-decoration: none;
        padding: 3px;
        border-radius: 3px;
        background-color: $note-darck;
      }

      // avatar container blue style
      .avatar-blue {
        width: 150px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        background: linear-gradient(to top, $first-blue, $second-blue);

        @media (max-width: $phone) {
          width: 100px;
          height: 100px;
        }

        // avatar
        .avatar-img {
          width: 90%;
          height: 90%;
          border-radius: 10px;
        }
      }

      // avatar container orange style
      .avatar-orange {
        @extend .avatar-blue;
        background: linear-gradient(to top, $first-orange, $second-orange);
      }

      // avatar container pink style
      .avatar-pink {
        @extend .avatar-blue;
        background: linear-gradient(to top, $first-pink, $second-pink);
      }

      // avatar container green style
      .avatar-green {
        @extend .avatar-blue;
        background: linear-gradient(to top, $first-green, $second-green);
      }

      // info container style
      .info {
        min-width: 60%;
        height: 100%;
        margin: 0px 10px;

        // name
        h2 {
          max-width: 100%;
          height: auto;
          color: $font-light;
        }

        // points
        h3 {
          max-width: 100%;
          height: auto;
          color: $font-light;
        }
      }

      // notes style
      .notes {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        margin: 5px 0px;

        p {
          width: auto;
          height: auto;
          background-color: $note-darck;
          border-radius: 3px;
          padding: 3px;
          color: $font-light;
          font-size: $x-small;
          margin: 3px;
        }

        .editor,
        .admin {
          width: auto;
          height: auto;
          background-color: $green;
          border-radius: 3px;
          padding: 3px;
          color: $font-light;
          font-size: $x-small;
          margin: 3px;
        }

        .supper_admin {
          @extend .editor;
          background-color: $red;
        }
      }

      // copy id component style in profile page
      p {
        padding: 3px;
        max-width: 90%;
        border-radius: 3px;
        background-color: $note-darck;
        margin: 3px;
      }

      // about me
      .content {
        width: 98%;
        height: auto;
        margin: 10px 1%;
        font-size: $small;
        background-color: $note-darck;
        color: $font-light;
        padding: 5px;
        border-radius: 3px;
      }

      // mesals section
      .medals {
        width: 98%;
        height: auto;
        margin: 10px 1%;
        color: $font-light;
        padding: 5px;
        border-radius: 3px;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;

        span {
          width: 98%;
          height: auto;
          margin: 5px 1%;
          padding: 5px 0px;
          color: $font-light;
          border: 1px solid;
          border-color: transparent transparent $border-light transparent;
        }

        p {
          width: auto;
          height: auto;
          font-size: $x-small;
          padding: 3px;
          border-radius: 3px;
          background-color: $note-darck;
          color: $font-light;
        }

        #First-level {
          @extend p;
          background-color: $green;
        }
      }
    }

    // section-tow container style
    .section-tow {
      @extend .section-one;
      margin: 10px 5%;

      // section tow title
      .title {
        width: 98%;
        height: auto;
        margin: 10px 1%;
        color: $font-light;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;
      }

      // link to go my classes
      a {
        width: 100%;
        height: auto;
        padding: 10px 0px;
        color: $blue;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        font-size: $x-small;

        svg {
          margin: 0px 5px;
        }
      }

      .default_message {
        width: 100%;
        margin: 5px 0%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: $small;
        color: $font-light;
        background-color: $note-darck;
      }
    }

    // section for container style
    .section-tow {
      @extend .section-one;
      margin: 10px 5%;

      // section tow title
      .title {
        width: 98%;
        height: auto;
        margin: 10px 1%;
        color: $font-light;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;
      }

      // link to go my classes
      a {
        width: 100%;
        height: auto;
        padding: 10px 0px;
        color: $blue;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        font-size: $x-small;

        svg {
          margin: 0px 5px;
        }
      }

      .default_message {
        width: 100%;
        margin: 5px 5%;
        height: auto;
        text-align: center;
        font-size: $small;
        background-color: none;
        color: $font-light;
      }

      #student {
        width: 100%;
        margin: 5px 0px;
        background-color: $body-darck;
      }
    }
  }

  .cont-close {
    @extend .cont-open;
    padding: 30% 0px 0px 0px;
    opacity: 0;
    transition-duration: 0.5s;
  }
}

.profile-page-light-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  direction: ltr;

  .cont-open {
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

    // section-one container
    .section-one {
      width: 90%;
      height: auto;
      margin: 10px 5%;
      padding: 5px;
      border-radius: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;
      background-color: $card-light;
      position: relative;

      // update profile icon
      .update-icon {
        position: absolute;
        top: 5px;
        right: 5px;
        text-decoration: none;
        padding: 3px;
        border-radius: 3px;
        background-color: $note-light;
      }

      // avatar container blue style
      .avatar-blue {
        width: 150px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        background: linear-gradient(to top, $first-blue, $second-blue);

        @media (max-width: $phone) {
          width: 100px;
          height: 100px;
        }

        // avatar
        .avatar-img {
          width: 90%;
          height: 90%;
          border-radius: 10px;
        }
      }

      // avatar container orange style
      .avatar-orange {
        @extend .avatar-blue;
        background: linear-gradient(to top, $first-orange, $second-orange);
      }

      // avatar container pink style
      .avatar-pink {
        @extend .avatar-blue;
        background: linear-gradient(to top, $first-pink, $second-pink);
      }

      // avatar container green style
      .avatar-green {
        @extend .avatar-blue;
        background: linear-gradient(to top, $first-green, $second-green);
      }

      // info container style
      .info {
        min-width: 60%;
        height: 100%;
        margin: 0px 10px;

        // name
        h2 {
          max-width: 100%;
          height: auto;
          color: $font-darck;
        }

        // points
        h3 {
          max-width: 100%;
          height: auto;
          color: $font-darck;
        }
      }

      // notes style
      .notes {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        margin: 5px 0px;

        p {
          width: auto;
          height: auto;
          background-color: $note-light;
          border-radius: 3px;
          padding: 3px;
          color: $font-darck;
          font-size: $x-small;
          margin: 3px;
        }

        .editor,
        .admin {
          width: auto;
          height: auto;
          background-color: $green;
          border-radius: 3px;
          padding: 3px;
          color: $font-darck;
          font-size: $x-small;
          margin: 3px;
        }

        .supper_admin {
          @extend .editor;
          background-color: $red;
        }
      }

      // copy id component style in profile page
      p {
        padding: 3px;
        max-width: 90%;
        border-radius: 3px;
        background-color: $note-light;
        margin: 3px;
      }

      // about me
      .content {
        width: 98%;
        height: auto;
        margin: 10px 1%;
        font-size: $small;
        background-color: $note-light;
        color: $font-darck;
        padding: 5px;
        border-radius: 3px;
      }

      // mesals section
      .medals {
        width: 98%;
        height: auto;
        margin: 10px 1%;
        color: $font-darck;
        padding: 5px;
        border-radius: 3px;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;

        span {
          width: 98%;
          height: auto;
          margin: 5px 1%;
          padding: 5px 0px;
          color: $font-darck;
          border: 1px solid;
          border-color: transparent transparent $border-darck transparent;
        }

        p {
          width: auto;
          height: auto;
          font-size: $x-small;
          padding: 3px;
          border-radius: 3px;
          background-color: $note-light;
          color: $font-darck;
        }

        #First-level {
          @extend p;
          background-color: $green;
          color: $font-light;
        }
      }
    }

    // section-tow container style
    .section-tow {
      @extend .section-one;
      margin: 10px 5%;

      // section tow title
      .title {
        width: 98%;
        height: auto;
        margin: 10px 1%;
        color: $font-darck;
        border: 1px solid;
        border-color: transparent transparent $border-darck transparent;
      }

      // link to go my classes
      a {
        width: 100%;
        height: auto;
        padding: 10px 0px;
        color: $blue;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        font-size: $x-small;

        svg {
          margin: 0px 5px;
        }
      }

      .default_message {
        width: 100%;
        margin: 5px 0%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: $small;
        color: $font-darck;
        background-color: $note-light;
      }

      #student {
        width: 100%;
        margin: 5px 0px;
        background-color: $body-light;
      }
    }
  }

  .cont-close {
    @extend .cont-open;
    padding: 30% 0px 0px 0px;
    opacity: 0;
    transition-duration: 0.5s;
  }
}
// Darck and light English style

// Darck and light Arabic style
.profile-page-darck-Arabic {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: rtl;

  .cont-open {
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

    // section-one container
    .section-one {
      width: 90%;
      height: auto;
      margin: 10px 5%;
      padding: 5px;
      border-radius: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;
      background-color: $card-darck;
      position: relative;

      // update profile icon
      .update-icon {
        position: absolute;
        top: 5px;
        left: 5px;
        text-decoration: none;
        padding: 3px;
        border-radius: 3px;
        background-color: $note-darck;
      }

      // avatar container blue style
      .avatar-blue {
        width: 150px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        background: linear-gradient(to top, $first-blue, $second-blue);

        @media (max-width: $phone) {
          width: 100px;
          height: 100px;
        }

        // avatar
        .avatar-img {
          width: 90%;
          height: 90%;
          border-radius: 10px;
        }
      }

      // avatar container orange style
      .avatar-orange {
        @extend .avatar-blue;
        background: linear-gradient(to top, $first-orange, $second-orange);
      }

      // avatar container pink style
      .avatar-pink {
        @extend .avatar-blue;
        background: linear-gradient(to top, $first-pink, $second-pink);
      }

      // avatar container green style
      .avatar-green {
        @extend .avatar-blue;
        background: linear-gradient(to top, $first-green, $second-green);
      }

      // info container style
      .info {
        min-width: 60%;
        height: 100%;
        margin: 0px 10px;

        // name
        h2 {
          max-width: 100%;
          height: auto;
          color: $font-light;
        }

        // points
        h3 {
          max-width: 100%;
          height: auto;
          color: $font-light;
        }
      }

      // notes style
      .notes {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        margin: 5px 0px;

        p {
          width: auto;
          height: auto;
          background-color: $note-darck;
          border-radius: 3px;
          padding: 3px;
          color: $font-light;
          font-size: $x-small;
          margin: 3px;
        }

        .editor,
        .admin {
          width: auto;
          height: auto;
          background-color: $green;
          border-radius: 3px;
          padding: 3px;
          color: $font-light;
          font-size: $x-small;
          margin: 3px;
        }

        .supper_admin {
          @extend .editor;
          background-color: $red;
        }
      }

      // copy id component style in profile page
      p {
        padding: 3px;
        max-width: 90%;
        border-radius: 3px;
        background-color: $note-darck;
        margin: 3px;
      }

      // about me
      .content {
        width: 98%;
        height: auto;
        margin: 10px 1%;
        font-size: $small;
        background-color: $note-darck;
        color: $font-light;
        padding: 5px;
        border-radius: 3px;
      }

      // mesals section
      .medals {
        width: 98%;
        height: auto;
        margin: 10px 1%;
        color: $font-light;
        padding: 5px;
        border-radius: 3px;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;

        span {
          width: 98%;
          height: auto;
          margin: 5px 1%;
          padding: 5px 0px;
          color: $font-light;
          border: 1px solid;
          border-color: transparent transparent $border-light transparent;
        }

        p {
          width: auto;
          height: auto;
          font-size: $x-small;
          padding: 3px;
          border-radius: 3px;
          background-color: $note-darck;
          color: $font-light;
        }

        #First-level {
          @extend p;
          background-color: $green;
        }
      }
    }

    // section-tow container style
    .section-tow {
      @extend .section-one;
      margin: 10px 5%;

      // section tow title
      .title {
        width: 98%;
        height: auto;
        margin: 10px 1%;
        color: $font-light;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;
      }

      // link to go my classes
      a {
        width: 100%;
        height: auto;
        padding: 10px 0px;
        color: $blue;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        font-size: $x-small;

        svg {
          margin: 0px 5px;
        }
      }

      .default_message {
        width: 100%;
        margin: 5px 0%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: $small;
        color: $font-light;
        background-color: $note-darck;
      }
    }
  }

  .cont-close {
    @extend .cont-open;
    padding: 30% 0px 0px 0px;
    opacity: 0;
    transition-duration: 0.5s;
  }
}

.profile-page-light-Arabic {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  direction: rtl;

  .cont-open {
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

    // section-one container
    .section-one {
      width: 90%;
      height: auto;
      margin: 10px 5%;
      padding: 5px;
      border-radius: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;
      background-color: $card-light;
      position: relative;

      // update profile icon
      .update-icon {
        position: absolute;
        top: 5px;
        left: 5px;
        text-decoration: none;
        padding: 3px;
        border-radius: 3px;
        background-color: $note-light;
      }

      // avatar container blue style
      .avatar-blue {
        width: 150px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        background: linear-gradient(to top, $first-blue, $second-blue);

        @media (max-width: $phone) {
          width: 100px;
          height: 100px;
        }

        // avatar
        .avatar-img {
          width: 90%;
          height: 90%;
          border-radius: 10px;
        }
      }

      // avatar container orange style
      .avatar-orange {
        @extend .avatar-blue;
        background: linear-gradient(to top, $first-orange, $second-orange);
      }

      // avatar container pink style
      .avatar-pink {
        @extend .avatar-blue;
        background: linear-gradient(to top, $first-pink, $second-pink);
      }

      // avatar container green style
      .avatar-green {
        @extend .avatar-blue;
        background: linear-gradient(to top, $first-green, $second-green);
      }

      // info container style
      .info {
        min-width: 60%;
        height: 100%;
        margin: 0px 10px;

        // name
        h2 {
          max-width: 100%;
          height: auto;
          color: $font-darck;
        }

        // points
        h3 {
          max-width: 100%;
          height: auto;
          color: $font-darck;
        }
      }

      // notes style
      .notes {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        margin: 5px 0px;

        p {
          width: auto;
          height: auto;
          background-color: $note-light;
          border-radius: 3px;
          padding: 3px;
          color: $font-darck;
          font-size: $x-small;
          margin: 3px;
        }

        .editor,
        .admin {
          width: auto;
          height: auto;
          background-color: $green;
          border-radius: 3px;
          padding: 3px;
          color: $font-light;
          font-size: $x-small;
          margin: 3px;
        }

        .supper_admin {
          @extend .editor;
          background-color: $red;
        }
      }

      // copy id component style in profile page
      p {
        padding: 3px;
        max-width: 90%;
        border-radius: 3px;
        background-color: $note-light;
        margin: 3px;
      }

      // about me
      .content {
        width: 98%;
        height: auto;
        margin: 10px 1%;
        font-size: $small;
        background-color: $note-light;
        color: $font-darck;
        padding: 5px;
        border-radius: 3px;
      }

      // mesals section
      .medals {
        width: 98%;
        height: auto;
        margin: 10px 1%;
        color: $font-darck;
        padding: 5px;
        border-radius: 3px;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;

        span {
          width: 98%;
          height: auto;
          margin: 5px 1%;
          padding: 5px 0px;
          color: $font-darck;
          border: 1px solid;
          border-color: transparent transparent $border-darck transparent;
        }

        p {
          width: auto;
          height: auto;
          font-size: $x-small;
          padding: 3px;
          border-radius: 3px;
          background-color: $note-light;
          color: $font-darck;
        }

        #First-level {
          @extend p;
          background-color: $green;
          color: $font-light;
        }
      }
    }

    // section-tow container style
    .section-tow {
      @extend .section-one;
      margin: 10px 5%;

      // section tow title
      .title {
        width: 98%;
        height: auto;
        margin: 10px 1%;
        color: $font-darck;
        border: 1px solid;
        border-color: transparent transparent $border-darck transparent;
      }

      // link to go my classes
      a {
        width: 100%;
        height: auto;
        padding: 10px 0px;
        color: $blue;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        font-size: $x-small;

        svg {
          margin: 0px 5px;
        }
      }

      .default_message {
        width: 100%;
        margin: 5px 0%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: $small;
        color: $font-darck;
        background-color: $note-light;
      }
    }
  }

  .cont-close {
    @extend .cont-open;
    padding: 30% 0px 0px 0px;
    opacity: 0;
    transition-duration: 0.5s;
  }
}
// Darck and light Arabic style
</style>
