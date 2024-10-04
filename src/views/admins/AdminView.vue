<template>
  <div
    :class="`show-admin-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <SmallNavComponentVue />
    <SidBarComponentVue />
    <ErrorComponentVue />
    <ScrollTopComponentVue />
    <LoadingComponentVue />
    <CopyMessageComponentVue />

    <div :class="this.status ? 'cont-open' : 'cont-close'">
      <!-- section one container  -->
      <div class="section-one" v-if="this.$store.state.show_user.data">
        <!-- avatar  -->
        <div :class="`avatar-${this.$store.state.theme}`">
          <img
            :src="this.$store.state.show_user.data.avatar"
            alt="avatar"
            class="avatar-img"
          />
        </div>

        <router-link
          v-if="
            this.$store.state.user.user_type == 'super' ||
            this.$store.state.user.user._id ==
              this.$store.state.show_user.data._id
          "
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
            {{ this.$store.state.show_user.data.name }}
          </h2>
          <!-- name  -->
        </div>

        <div class="notes">
          <!-- gender  -->
          <p>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.show_user_page.gender
                : this.$store.state.Arabic.show_user_page.gender
            }}
            {{ this.$store.state.show_user.data.gender }}
          </p>
          <!-- gender  -->

          <!-- admin  || super admin-->
          <p class="admin" v-if="this.$store.state.show_user.data.is_admin">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.admin_component.admin
                : this.$store.state.Arabic.admin_component.admin
            }}
          </p>

          <p
            class="supper_admin"
            v-if="this.$store.state.show_user.data.is_supper_admin"
          >
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.admin_component.supper_admin
                : this.$store.state.Arabic.admin_component.supper_admin
            }}
          </p>
          <!-- admin  || super admin-->

          <!-- joind at  -->
          <p v-if="this.$store.state.show_user.data.joind_at">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.show_user_page.joind_at
                : this.$store.state.Arabic.show_user_page.joind_at
            }}
            {{ this.$store.state.show_user.data.joind_at.split("T")[0] }}
          </p>
          <!-- joind at  -->

          <!-- Phone Number  -->
          <p v-if="this.$store.state.show_user.data.phone_number">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.show_user_page.phone
                : this.$store.state.Arabic.show_user_page.phone
            }}
            {{ this.$store.state.show_user.data.phone_number }}
          </p>
          <!-- Phone Number  -->
        </div>

        <!--  copy id component   -->
        <CopyIdComponentVue
          :Id_data="{
            object_type:
              this.$store.state.show_user.data == 'super' ? 'SA' : 'A',
            id: this.$store.state.show_user.data._id,
          }"
        />
        <!--  copy id component   -->

        <!--  about me  -->
        <span class="content" v-if="this.$store.state.show_user.data.about_me">
          {{ this.$store.state.show_user.data.about_me }}
        </span>
        <!--  about me  -->
      </div>
      <!-- section one container  -->

      <!-- add plans here    -->
    </div>

    <!-- scroll to top compoenent  -->
    <ScrollTopComponentVue :scroll_page="this.scroll_page" />
    <!-- scroll to top compoe nent  -->
  </div>
</template>

<script>
//? importing components
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import CopyIdComponentVue from "@/components/global/CopyIdComponent.vue";
import CopyMessageComponentVue from "@/components/global/CopyMessageComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import axios from "axios";

export default {
  name: "admin-page",
  data() {
    return {
      status: false,
      // window scroll
      scroll_page: 0,
    };
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    ErrorComponentVue,
    ScrollTopComponentVue,
    LoadingComponentVue,
    CopyIdComponentVue,
    CopyMessageComponentVue,
  },
  mounted() {
    setTimeout(() => {
      // to start the loading animation
      this.$store.state.loading = "open";
    }, 100);

    // call to get admin method
    this.GetAdmin();

    // handel scroll
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // get teacher method
    async GetAdmin() {
      await axios
        .get(this.$store.state.APIs.admins.get_one, {
          params: {
            admin_id: this.$route.params.id,
          },
        })
        .then((response) => {
          // update the status to open the cont
          this.status = true;

          // to stop the loading animation
          this.$store.state.loading = "close";

          // set the admin data to Show user var in store
          this.$store.state.show_user = {
            type: "admin",
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

// Darck and light English style
.show-admin-darck-English {
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
        margin: 5px 5%;
        height: auto;
        text-align: center;
        font-size: $small;
        background-color: none;
        color: $font-light;
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

.show-admin-light-English {
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
        margin: 5px 5%;
        height: auto;
        text-align: center;
        font-size: $small;
        background-color: none;
        color: $font-darck;
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
.show-admin-darck-Arabic {
  @extend .show-admin-darck-English;
  direction: rtl;
}

.show-admin-light-Arabic {
  @extend .show-admin-light-English;
  direction: rtl;
}
// Darck and light Arabic style
</style>
