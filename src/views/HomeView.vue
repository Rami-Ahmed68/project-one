<template>
  <div :class="`home-${this.$store.state.mood}`">
    <div class="cont">
      <LoadingComponentVue />
      <ErrorComponentVue />
      <SidBarComponentVue />
      <NavComponentVue />
      <!-- classes section  -->
      <h3 class="section-title">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.home.classes.title
            : this.$store.state.Arabic.home.classes.title
        }}

        <!-- classes page link  -->
        <router-link to="/classes"
          >{{
            this.$store.state.language == "English"
              ? this.$store.state.English.home.classes.link
              : this.$store.state.Arabic.home.classes.link
          }}
          <icon icon="arrow-right" />
        </router-link>
      </h3>
      <div
        :class="`classes-${
          this.$store.state.classes.length > 0 ? 'open' : 'close'
        }`"
      >
        <div class="boxs-cont">
          <swiper class="parallax-slider" parallax grabCursor Navigation>
            <swiper-slide
              v-for="(class_data, index) in this.$store.state.classes"
              :key="index"
            >
              <ClassComponentVue
                :class_data="class_data"
                @click="GoToClass(class_data._id)"
              />
            </swiper-slide>
          </swiper>
        </div>
      </div>

      <!-- teachers section  -->
      <h3 class="section-title">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.home.teachers.title
            : this.$store.state.Arabic.home.teachers.title
        }}

        <!-- teachers page link  -->
        <router-link to="/teachers"
          >{{
            this.$store.state.language == "English"
              ? this.$store.state.English.home.teachers.link
              : this.$store.state.Arabic.home.teachers.link
          }}
          <icon icon="arrow-right" />
        </router-link>
      </h3>

      <div
        :class="`teachers-${
          this.$store.state.teachers.length > 0 ? 'open' : 'close'
        }`"
      >
        <div class="boxs-cont">
          <swiper class="parallax-slider" parallax grabCursor Navigation>
            <swiper-slide
              v-for="(teacher_data, index) in this.$store.state.teachers"
              :key="index"
            >
              <TeacherComponentVue
                :teacher_data="teacher_data"
                @click="GetTeacher(teacher_data._id)"
              />
            </swiper-slide>
          </swiper>
        </div>
      </div>

      <!-- teachers section  -->
      <h3 class="section-title">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.home.admins.title
            : this.$store.state.Arabic.home.admins.title
        }}

        <!-- teachers page link  -->
        <router-link to="/admins"
          >{{
            this.$store.state.language == "English"
              ? this.$store.state.English.home.admins.link
              : this.$store.state.Arabic.home.admins.link
          }}
          <icon icon="arrow-right" />
        </router-link>
      </h3>

      <div
        :class="`teachers-${
          this.$store.state.admins.length > 0 ? 'open' : 'close'
        }`"
      >
        <div class="boxs-cont">
          <swiper class="parallax-slider" parallax grabCursor Navigation>
            <swiper-slide
              v-for="(admin_data, index) in this.$store.state.admins"
              :key="index"
            >
              <AdminComponentVue
                :admin_data="admin_data"
                @click="GetAdmin(admin_data._id)"
              />
            </swiper-slide>
          </swiper>
        </div>
      </div>

      <!-- footer component  -->
      <FooterComponentVue />
      <!-- footer component  -->

      <ScrollTopComponentVue :scroll_page="this.scroll_page" />
    </div>
  </div>
</template>

<script>
//? importing the components
import { Navigation, Parallax } from "swiper";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

import NavComponentVue from "@/components/global/NavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import ClassComponentVue from "@/components/class/ClassComponent.vue";
import TeacherComponentVue from "@/components/teacher/TeacherComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import AdminComponentVue from "@/components/admin/AdminComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import FooterComponentVue from "@/components/global/FooterComponent.vue";
import axios from "axios";

// SwiperCore.use([Navigation, Parallax]);

export default {
  name: "HomeView",
  data() {
    return {
      // to use and work the swiper libbery
      modules: [Navigation, Parallax],
      parallaxSwiperWidth: 0,
      scroll_page: 0,
    };
  },
  components: {
    SidBarComponentVue,
    NavComponentVue,
    ClassComponentVue,
    LoadingComponentVue,
    ErrorComponentVue,
    Swiper,
    SwiperSlide,
    TeacherComponentVue,
    AdminComponentVue,
    ScrollTopComponentVue,
    FooterComponentVue,
  },
  mounted() {
    // call to get classes method
    this.GetClasses();

    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // get classes
    async GetClasses() {
      // to start the loading animation
      this.$store.state.loading = "open";

      await axios
        .get(this.$store.state.APIs.classes.get_all)
        .then((response) => {
          // set the response to classes in store
          this.$store.state.classes = response.data.classes_data;
        })
        .catch((error) => {
          // set the error message to the error_message in store
          this.$store.state.erorr_message = error;

          // open the error form
          this.$store.state.error_form_status = "open";
        });

      // get teachers method
      this.GetTeachers();
    },

    // get teachers
    async GetTeachers() {
      // get teachers request
      await axios
        .get(this.$store.state.APIs.teachers.get_all)
        .then((response) => {
          // set the response to classes in store
          this.$store.state.teachers = response.data.teachers_data;
        })
        .catch((error) => {
          // set the error message to the error_message in store
          this.$store.state.erorr_message = error;

          // open the error form
          this.$store.state.error_form_status = "open";
        });

      this.GetAdmins();
    },

    // get classes
    async GetAdmins() {
      // get teachers request
      await axios
        .get(this.$store.state.APIs.admins.get_all)
        .then((response) => {
          // set the response to classes in store
          this.$store.state.admins = response.data.admins_data;
        })
        .catch((error) => {
          // set the error message to the error_message in store
          this.$store.state.erorr_message = error;

          // open the error form
          this.$store.state.error_form_status = "open";
        });

      // to stop the loading animation
      this.$store.state.loading = "close";
    },

    // move to class page and pass the class id in params
    GoToClass(id) {
      window.location = `/class/${id}`;
    },

    // move the teacher page and pass the teacher id in params
    GetTeacher(id) {
      window.location = `/teacher/${id}`;
    },

    // move the admin page and pass the admin id in params
    GetAdmin(id) {
      window.location = `/admin/${id}`;
    },

    // scroll method
    handleScroll() {
      this.scroll_page = window.scrollY;
    },
  },
};
</script>

<style lang="scss">
@import "../Sass/varibels/variables";

.home-darck {
  width: 100%;
  min-height: 110vh;
  background-color: $body-darck;

  .cont {
    width: 50%;
    height: 100%;
    margin: auto;
    overflow-x: hidden;
    padding: 10px;
    @media (max-width: $phone) {
      width: 100%;
    }

    @media (min-width: $phone) and (max-width: $tablet) {
      width: 80%;
    }

    @media (min-width: $laptop) {
      width: 50%;
    }

    .section-title {
      width: 90%;
      height: auto;
      margin: auto;
      color: $font-light;
      border: 0.5px solid;
      border-color: transparent transparent $body-light transparent;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      padding: 10px 0px;
      // background-color: greenyellow;

      a {
        width: 30%;
        height: auto;
        color: $blue;
        font-size: $x-small;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        svg {
          transition-duration: 0.5s;
          margin-left: 5px;
        }
      }
      a:hover {
        svg {
          margin-right: -10px;
        }
      }
    }

    // classes section style
    .classes-open {
      width: 100%;
      height: 300px;
      margin: 20px 0px;
      position: relative;
      transition-duration: 0.5s;
      opacity: 1;

      .boxs-cont {
        width: 80%;
        height: auto;
        background: orange;

        .swiper-wrapper {
          width: auto;
          height: 300px;
          // background-color: blue;
          // overflow: hidden;
          display: flex;
          justify-content: space-around;
          align-items: center;
          // white-space: nowrap;
          position: absolute;
          @media (max-width: $phone) {
            height: 250px;
          }

          .swiper-slide {
            width: 30%;
            height: 100%;
            // background-color: rebeccapurple;
            display: flex;
            margin-left: 10px;
            justify-content: center;
            // ali
            // background-color: red
          }
        }
      }
    }

    .classes-close {
      @extend .classes-open;
      opacity: 0;
    }

    // teachers section style
    .teachers-open {
      width: 100%;
      height: 120px;
      margin: 20px 0px;
      position: relative;
      transition-duration: 0.5s;
      opacity: 1;

      .boxs-cont {
        width: 80%;
        height: auto;

        .swiper-wrapper {
          width: auto;
          height: auto;
          display: flex;
          justify-content: space-around;
          align-items: center;
          position: absolute;

          .swiper-slide {
            width: 30%;
            height: 100%;
            display: flex;
            margin-left: 10px;
            justify-content: center;
          }
        }
      }
    }
  }

  .cont::-webkit-scrollbar {
    width: 0px;
  }
}

.home-light {
  @extend .home-darck;
  background-color: $body-light;
  .cont {
    .section-title {
      color: $font-darck;
      border-color: transparent transparent $body-darck transparent;
    }
  }
}
</style>
