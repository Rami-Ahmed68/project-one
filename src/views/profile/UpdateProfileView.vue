<template>
  <div
    :class="`up-profil-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <SmallNavComponentVue />
    <LoadingComponentVue />
    <SidBarComponentVue />
    <ErrorComponentVue />
    <ScrollTopComponentVue />
    <AvatarFormComponentVue />
    <div :class="this.status ? 'open-cont' : 'close-cont'">
      <input type="file" id="avatar" />

      <!-- avatar section  -->
      <div class="avatar-section">
        <div :class="`avatar-cont-${this.$store.state.theme}`">
          <img
            v-if="this.$store.state.user"
            :src="
              this.$store.state.selectd_images.length > 0
                ? this.readerFile()
                : this.avatar
            "
            alt="avatar"
            @click="this.$store.commit('Change_avatar_form_status')"
          />
        </div>
      </div>
      <!-- avatar section  -->

      <div class="form">
        <!-- name label  -->
        <label for="name">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.update_profile.name
              : this.$store.state.Arabic.update_profile.name
          }}
        </label>
        <!-- name label  -->

        <!-- name input  -->
        <input type="name" v-model="this.name" id="name" />
        <!-- name input  -->

        <!-- about_me label  -->
        <label
          for="about_me"
          v-if="
            this.$store.state.user.user_type != 'admin' &&
            this.$store.state.user.user_type != 'parent' &&
            this.$store.state.user.user_type != 'super'
          "
        >
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.update_profile.about_me
              : this.$store.state.Arabic.update_profile.about_me
          }}</label
        >
        <!-- about_me label  -->

        <!-- about me input  -->
        <textarea
          name=""
          v-if="
            this.$store.state.user.user_type != 'admin' &&
            this.$store.state.user.user_type != 'parent' &&
            this.$store.state.user.user_type != 'super'
          "
          id="about_me"
          :aria-valuemax="this.about_me"
          v-model="this.about_me"
        >
        </textarea>
        <!-- about me input  -->

        <!-- password label  -->
        <label for="password">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.update_profile.password
              : this.$store.state.Arabic.update_profile.password
          }}</label
        >
        <!-- password label  -->

        <!-- password input  -->
        <input type="password" v-model="this.password" />
        <!-- password input  -->

        <!-- phone label  -->
        <label for="phone">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.update_profile.phone
              : this.$store.state.Arabic.update_profile.phone
          }}</label
        >
        <!-- phone label  -->

        <!-- phone input  -->
        <input type="number" v-model="this.phone" />
        <!-- phone input  -->

        <!-- update button  -->
        <button
          :class="`${this.$store.state.theme}`"
          @click="UpdateProfileData"
        >
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.update_profile.button
              : this.$store.state.Arabic.update_profile.button
          }}
        </button>
        <!-- update button  -->
      </div>
    </div>
  </div>
</template>

<script>
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import AvatarFormComponentVue from "@/components/global/forms/AvatarFormComponent.vue";
import axios from "axios";

export default {
  name: "update-profile",
  data() {
    return {
      status: false,
      // name
      name: this.$store.state.user.user.name,
      // about_me
      about_me: this.$store.state.user.user.about_me,
      // phone
      phone: this.$store.state.user.user.phone_number,
      // password
      password: "",
      // api
      api: "",
      // default avatar
      avatar: this.$store.state.user.user.avatar,
      // form data
      formData: "",
    };
  },
  components: {
    ErrorComponentVue,
    LoadingComponentVue,
    SmallNavComponentVue,
    SidBarComponentVue,
    ScrollTopComponentVue,
    AvatarFormComponentVue,
  },
  mounted() {
    alert(JSON.stringify(this.$store.state.user.user));
    // to open the loading animation
    setTimeout(() => {
      // to start the loading
      this.$store.state.loading = "open";
    }, 100);

    setTimeout(() => {
      this.status = true;

      // to stop the loading
      this.$store.state.loading = "close";
    }, 500);

    // check if the user is loged in
    if (!this.$store.state.user.user) {
      //send the user to log in page
      window.location = "/login";
    }
  },
  methods: {
    // select the api
    SelectApi() {
      if (this.$store.state.user.user_type == "super") {
        this.api = this.$store.state.APIs.super.update;
        // add the user id to form data
        this.formData.append("super_admin_id", this.$store.state.user.user._id);
      } else if (this.$store.state.user.user_type == "admin") {
        this.api = this.$store.state.APIs.admins.update;
        // add the user id to form data
        this.formData.append("admin_id", this.$store.state.user.user._id);
      } else if (this.$store.state.user.user_type == "teacher") {
        this.api = this.$store.state.APIs.teachers.update;
        // add the user id to form data
        this.formData.append("teacher_id", this.$store.state.user.user._id);
      } else if (this.$store.state.user.user_type == "student") {
        this.api = this.$store.state.APIs.students.update;
        // add the user id to form data
        this.formData.append("student_id", this.$store.state.user.user._id);
      } else {
        this.api = this.$store.state.APIs.parents.update;
        // add the user id to form data
        this.formData.append("parent_id", this.$store.state.user.user._id);
      }
    },

    async UpdateProfileData() {
      // to start the loading op click
      this.$store.state.loading = "open";

      // create new form data
      this.formData = new FormData();

      // call to select api method
      this.SelectApi();

      // craete headers
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // add name to form data
      if (this.name && this.name != this.$store.state.user.user.name) {
        this.formData.append("name", this.name);
      }

      // add about me to form data
      if (
        this.about_me &&
        this.about_me != this.$store.state.user.user.about_me
      ) {
        this.formData.append("about_me", this.about_me);
      }

      // add password to form data
      if (
        this.password &&
        this.password != this.$store.state.user.user.password
      ) {
        this.formData.append("password", this.password);
      }

      // add phone to form data
      if (
        this.phone &&
        this.phone != this.$store.state.user.user.phone_number
      ) {
        this.formData.append("phone_number", this.phone);
      }

      if (
        this.$store.state.delete_avatar == "true" ||
        this.$store.state.selectd_images.length > 0
      ) {
        // add the delete avatar state from store to formData
        this.formData.append("delete_avatar", this.$store.state.delete_avatar);
      }

      // check if the selected images array in stor has any image
      if (this.$store.state.selectd_images.length > 0) {
        // add all images as array in formData
        for (let file of this.$store.state.selectd_images) {
          this.formData.append("avatar", file, file.name);
        }
      }

      // send the request
      await axios
        .put(this.api, this.formData, { headers })
        .then((response) => {
          // to stop the loading animation
          this.$store.state.loading = "close";
          console.log(response);
          // getc to old user data from localStorage
          const oldData = JSON.parse(window.localStorage.getItem("Ss-user"));

          // update the user data
          oldData.user = response.data.user_data;

          // save the user data in localStorage
          window.localStorage.setItem("Ss-user", JSON.stringify(oldData));

          // reload the page
          window.location.reload();
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

    // change the input type on click the eye icon
    ChangeInputType() {
      this.password_type =
        this.password_type == "password" ? "text" : "password";
    },

    // reader selecetd image
    readerFile() {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.avatar = e.target.result;
      };

      reader.readAsDataURL(this.$store.state.selectd_images[0]);

      // return the avatar to use the ass a path in avatar image
      return this.avatar;
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/_variables.scss";

// darck and light update profile page
.up-profil-page-darck-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: ltr;

  .open-cont {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 10% 0px 10px 0px;
    transition-duration: 0.5s;
    opacity: 1;

    @media (max-width: $phone) {
      width: 100%;
      height: auto;
      padding: 20% 0px 10px 0px;
    }

    // hideen files input
    #avatar {
      display: none;
    }

    // avatar section
    .avatar-section {
      width: 90%;
      height: auto;
      margin: 5px 5%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      // avatar cont blue
      .avatar-cont-blue {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        background: linear-gradient(to top, $first-blue, $second-blue);

        img {
          width: 90%;
          height: 90%;
          margin: 5%;
          border-radius: 5px;
          cursor: pointer;
        }
      }

      // avatar cont orange
      .avatar-cont-orange {
        @extend .avatar-cont-blue;
        background: linear-gradient(to top, $first-orange, $second-orange);
      }

      // avatar cont green
      .avatar-cont-green {
        @extend .avatar-cont-blue;
        background: linear-gradient(to top, $first-green, $second-green);
      }

      // avatar cont pink
      .avatar-cont-pink {
        @extend .avatar-cont-blue;
        background: linear-gradient(to top, $first-pink, $second-pink);
      }
    }

    // form data section
    .form {
      width: 100%;
      height: auto;
      margin: 10px 0px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      // label style
      label {
        width: 90%;
        height: auto;
        padding: 5px 0px;
        margin: 5px 5%;
        color: $font-light;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;
      }

      // input style
      input,
      select {
        width: 90%;
        height: 40px;
        padding: 5px 0px;
        margin: 5px 5%;
        border: none;
        outline: none;
        padding-left: 10px;
        border-radius: 5px;
      }

      // textarea style
      textarea {
        width: 90%;
        height: 90px;
        border-radius: 5px;
        outline: none;
        padding: 5px 0px 5px 5px;
        margin: 5px 5%;
        resize: none;
      }

      // blue button
      .blue {
        padding: 10px 20px;
        border-radius: 5px;
        margin: 10px 0px;
        border: none;
        outline: none;
        color: $font-light;
        background: linear-gradient(to top, $first-blue, $second-blue);
        cursor: pointer;
      }

      // orange button
      .orange {
        @extend .blue;
        background: linear-gradient(to top, $first-orange, $second-orange);
      }

      // green button
      .green {
        @extend .blue;
        background: linear-gradient(to top, $first-green, $second-green);
      }

      // pink button
      .pink {
        @extend .blue;
        background: linear-gradient(to top, $first-pink, $second-pink);
      }
    }
  }

  // closed cont style
  .close-cont {
    @extend .open-cont;
    padding: 20% 0px 10px 0px;
    transition-duration: 0.5s;
    opacity: 0;
    @media (max-width: $phone) {
      padding: 40% 0% 0% 0%;
    }
  }
}

.up-profil-page-light-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  direction: ltr;

  .open-cont {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 10% 0px 10px 0px;
    transition-duration: 0.5s;
    opacity: 1;

    @media (max-width: $phone) {
      width: 100%;
      height: auto;
      padding: 20% 0px 10px 0px;
    }

    // hideen files input
    #avatar {
      display: none;
    }

    // avatar section
    .avatar-section {
      width: 90%;
      height: auto;
      margin: 5px 5%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      // avatar cont blue
      .avatar-cont-blue {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        background: linear-gradient(to top, $first-blue, $second-blue);

        img {
          width: 90%;
          height: 90%;
          margin: 5%;
          border-radius: 5px;
          cursor: pointer;
        }
      }

      // avatar cont orange
      .avatar-cont-orange {
        @extend .avatar-cont-blue;
        background: linear-gradient(to top, $first-orange, $second-orange);
      }

      // avatar cont green
      .avatar-cont-green {
        @extend .avatar-cont-blue;
        background: linear-gradient(to top, $first-green, $second-green);
      }

      // avatar cont pink
      .avatar-cont-pink {
        @extend .avatar-cont-blue;
        background: linear-gradient(to top, $first-pink, $second-pink);
      }
    }

    // form data section
    .form {
      width: 100%;
      height: auto;
      margin: 10px 0px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      // label style
      label {
        width: 90%;
        height: auto;
        padding: 5px 0px;
        margin: 5px 5%;
        color: $font-darck;
        border: 1px solid;
        border-color: transparent transparent $border-darck transparent;
      }

      // input style
      input,
      select {
        width: 90%;
        height: 40px;
        padding: 5px 0px;
        margin: 5px 5%;
        border: none;
        outline: none;
        padding-left: 10px;
        border-radius: 5px;
      }

      // textarea style
      textarea {
        width: 90%;
        height: 90px;
        border-radius: 5px;
        outline: none;
        padding: 5px 0px 5px 5px;
        margin: 5px 5%;
        resize: none;
      }

      // blue button
      .blue {
        padding: 10px 20px;
        border-radius: 5px;
        margin: 10px 0px;
        border: none;
        outline: none;
        color: $font-light;
        background: linear-gradient(to top, $first-blue, $second-blue);
        cursor: pointer;
      }

      // orange button
      .orange {
        @extend .blue;
        background: linear-gradient(to top, $first-orange, $second-orange);
      }

      // green button
      .green {
        @extend .blue;
        background: linear-gradient(to top, $first-green, $second-green);
      }

      // pink button
      .pink {
        @extend .blue;
        background: linear-gradient(to top, $first-pink, $second-pink);
      }
    }
  }

  // closed cont style
  .close-cont {
    @extend .open-cont;
    padding: 20% 0px 10px 0px;
    transition-duration: 0.5s;
    opacity: 0;
    @media (max-width: $phone) {
      padding: 40% 0% 0% 0%;
    }
  }
}
// darck and light update profile page

// darck and light update profile page
.up-profil-page-darck-Arabic {
  @extend .up-profil-page-darck-English;
  direction: rtl;
}

.up-profil-page-light-Arabic {
  @extend .up-profil-page-light-English;
  direction: rtl;
}
// darck and light update profile page
</style>
