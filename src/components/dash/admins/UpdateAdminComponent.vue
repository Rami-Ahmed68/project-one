<template>
  <div
    :class="`up-admin-${this.status}-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <AvatarFormComponentVue />
    <div class="header">
      <h3>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_admin.title
            : this.$store.state.Arabic.update_admin.title
        }}
      </h3>
    </div>

    <div class="form">
      <!-- avatar container  -->
      <div
        :class="`avatar-cont-${this.$store.state.theme}`"
        @click="this.$store.commit('Change_avatar_form_status')"
      >
        <img
          :src="
            this.$store.state.selectd_images.length > 0
              ? this.readerFile()
              : this.avatar
          "
          alt=""
        />
      </div>
      <!-- avatar container  -->

      <!-- name  -->
      <label for="name">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_admin.name
          : this.$store.state.Arabic.update_admin.name
      }}</label>

      <input type="text" placeholder="name" v-model="this.name" id="name" />
      <!-- name  -->

      <!-- password  -->
      <label for="password">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_admin.password
          : this.$store.state.Arabic.update_admin.password
      }}</label>

      <div class="password">
        <input
          :type="this.password_type"
          :placeholder="
            this.$store.state.language == 'English'
              ? this.$store.state.English.update_admin.password_placeholder
              : this.$store.state.Arabic.update_admin.password_placeholder
          "
          v-model="this.password"
          id="password"
        />
        <icon icon="eye" @click="ChangeInputType" />
      </div>
      <!-- password  -->

      <!-- Phone Number  -->
      <label for="phone">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_admin.phone_number
            : this.$store.state.Arabic.update_admin.phone_number
        }}
      </label>

      <input
        type="text"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.update_admin.phone_placeholder
            : this.$store.state.Arabic.update_admin.phone_placeholder
        "
        v-model="this.phone_number"
        id="phone"
      />
      <!-- Phone Number  -->

      <!-- gender  -->
      <label for="gender">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_admin.gender
            : this.$store.state.Arabic.update_admin.gender
        }}</label
      >

      <select name="" id="gender" v-model="gender">
        <option value="male">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.update_admin.male
              : this.$store.state.Arabic.create_admin.male
          }}
        </option>
        <option value="female">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.create_admin.female
              : this.$store.state.Arabic.create_admin.female
          }}
        </option>
      </select>
      <!-- gender  -->

      <!-- admin's Permissions  -->
      <label for="Permissions">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_admin.admin_access
            : this.$store.state.Arabic.update_admin.admin_access
        }}</label
      >

      <select name="" id="Permissions" v-model="Permissions">
        <option value="true">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.update_admin.admin
              : this.$store.state.Arabic.update_admin.admin
          }}
        </option>
        <option value="false">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.update_admin.not_admin
              : this.$store.state.Arabic.update_admin.not_admin
          }}
        </option>
      </select>
      <!-- admin's Permissions  -->

      <!-- update button  -->
      <button @click="UpdateAdmin">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_admin.button
            : this.$store.state.Arabic.update_admin.button
        }}
      </button>
      <!-- update button  -->
    </div>
  </div>
</template>

<script>
import AvatarFormComponentVue from "@/components/global/forms/AvatarFormComponent.vue";
import axios from "axios";
export default {
  name: "update-admin-component",
  data() {
    return {
      status: "close",
      // name
      name: this.$store.state.admin_for_update
        ? this.$store.state.admin_for_update.name
        : "",
      // password
      password: "",
      // phone number
      phone_number: this.$store.state.admin_for_update
        ? this.$store.state.admin_for_update.phone_number
        : "",
      // gender
      gender: this.$store.state.admin_for_update
        ? this.$store.state.admin_for_update.gender
        : "",
      // delete avatar
      delete_avatar: "",
      // Permissions
      Permissions: this.$store.state.admin_for_update.is_admin ? true : false,
      // password input type
      password_type: "password",
      // default avatar
      avatar: this.$store.state.admin_for_update.avatar,
      // form data
      formData: "",
    };
  },
  components: {
    AvatarFormComponentVue,
  },
  mounted() {
    setTimeout(() => {
      this.status = "open";
    }, 500);
  },
  methods: {
    // update admin method
    async UpdateAdmin() {
      // to create a new form data
      this.formData = new FormData();

      // to start the loading animation
      this.$store.state.loading = "open";

      // create header
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // add the super admin id to form data
      this.formData.append("super_admin_id", this.$store.state.user.user._id);

      // add the admin id to the form data
      this.formData.append("admin_id", this.$store.state.admin_for_update._id);

      // add the name to form data
      if (this.name != this.$store.state.admin_for_update.name) {
        this.formData.append("name", this.name);
      }

      // add the phone number to form data
      if (
        this.phone_number != this.$store.state.admin_for_update.phone_number
      ) {
        this.formData.append("phone_number", this.phone_number);
      }

      // add the gender to form data
      if (this.gender != this.$store.state.admin_for_update.gender) {
        this.formData.append("gender", this.gender);
      }

      // add the password to form data
      if (this.password != "") {
        this.formData.append("password", this.password);
      }

      // add the the new avatar to form data
      if (this.$store.state.selectd_images.length > 0) {
        for (const file of this.$store.state.selectd_images) {
          this.formData.append("avatar", file, file.name);
        }
      }

      // add the admin's Permissions
      if (this.Permissions != this.$store.state.admin_for_update.is_admin) {
        this.formData.append("is_admin", this.Permissions);
      }

      // add the delete avatar filed
      if (
        this.$store.state.delete_avatar == "true" ||
        this.$store.state.selectd_images.length > 0
      ) {
        // add the delete avatar state from store to formData
        this.formData.append("delete_avatar", this.$store.state.delete_avatar);
      }

      await axios
        .put(this.$store.state.APIs.admins.super.update, this.formData, {
          headers,
        })
        .then(() => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // emptying the selecetd images array from store
          this.$store.state.selectd_images = [];

          // emptying the admin for update in store
          this.$store.state.admin_for_update = "";

          // open the admins component
          this.$store.state.active_component_in_dash = "admins";
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // open the error from
          this.$store.state.error_form_status = "open";

          // set the error message to error message in store
          this.$store.state.error_message = error.response.data.message;
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
@import "../../../Sass/varibels/variables";

// darck and light English style
.up-admin-open-darck-English {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  // component header style
  .header {
    width: 100%;
    height: auto;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;

    h3 {
      color: $font-light;
    }
  }

  .form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    // blue avatar cont
    .avatar-cont-blue {
      width: 100px;
      height: 100px;
      border-radius: 5px;
      margin: 20px 0px 0px 0px;
      cursor: pointer;
      background: linear-gradient(to top, $first-blue, $second-blue);

      img {
        width: 90%;
        height: 90%;
        margin: 5%;
        border-radius: 5px;
      }
    }

    // orange avatar cont
    .avatar-cont-orange {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-orange, $second-orange);
    }

    // pink avatar cont
    .avatar-cont-pink {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-pink, $second-pink);
    }

    // green avatar cont
    .avatar-cont-green {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-green, $second-green);
    }

    // input's labels
    label {
      width: 100%;
      height: auto;
      padding: 5px 0px;
      margin: 10px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      color: $font-light;
    }

    // input style
    input {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      padding: 0px 10px;
      margin: 10px 0px;
      background-color: $body-light;
    }

    // password's conatiner
    .password {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: $body-light;
      padding: 0px 10px;

      input {
        width: 80%;
        height: 100%;
        outline: none;
        border: none;
        padding: 0px;
      }

      svg {
        transition-duration: 0.5s;
        cursor: pointer;
      }

      svg:hover {
        color: $blue;
      }
    }

    // gender and Permissions list style
    select {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      margin: 10px 0px;
      background-color: $body-light;
      padding: 0px 10px;
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      outline: none;
      color: $font-light;
      background-color: $green;
      cursor: pointer;
    }
  }
}

.up-admin-open-darck-English::-webkit-scrollbar {
  width: 0px;
}

.up-admin-close-darck-English {
  @extend .up-admin-open-darck-English;
  opacity: 0;
  padding: 30% 5px 5px 5px;
}

.up-admin-open-light-English {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  // component header style
  .header {
    width: 100%;
    height: auto;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;

    h3 {
      color: $font-darck;
    }
  }

  .form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    // blue avatar cont
    .avatar-cont-blue {
      width: 100px;
      height: 100px;
      border-radius: 5px;
      margin: 20px 0px 0px 0px;
      cursor: pointer;
      background: linear-gradient(to top, $first-blue, $second-blue);

      img {
        width: 90%;
        height: 90%;
        margin: 5%;
        border-radius: 5px;
      }
    }

    // orange avatar cont
    .avatar-cont-orange {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-orange, $second-orange);
    }

    // pink avatar cont
    .avatar-cont-pink {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-pink, $second-pink);
    }

    // green avatar cont
    .avatar-cont-green {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-green, $second-green);
    }

    // input's labels
    label {
      width: 100%;
      height: auto;
      padding: 5px 0px;
      margin: 10px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      color: $font-darck;
    }

    // input style
    input {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      padding: 0px 10px;
      margin: 10px 0px;
      background-color: $message-light;
    }

    // password's conatiner
    .password {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: $message-light;
      padding: 0px 10px;

      input {
        width: 80%;
        height: 100%;
        outline: none;
        border: none;
        padding: 0px;
      }

      svg {
        transition-duration: 0.5s;
        cursor: pointer;
      }

      svg:hover {
        color: $blue;
      }
    }

    // gender and Permissions list style
    select {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      margin: 10px 0px;
      background-color: $message-light;
      padding: 0px 10px;
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      outline: none;
      color: $font-light;
      background-color: $green;
      cursor: pointer;
    }
  }
}

.up-admin-open-light-English::-webkit-scrollbar {
  width: 0px;
}

.up-admin-close-light-English {
  @extend .up-admin-open-darck-English;
  opacity: 0;
  padding: 30% 5px 5px 5px;
}
// darck and light English style

// darck and light Arabic style
.up-admin-open-darck-Arabic {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  // component header style
  .header {
    width: 100%;
    height: auto;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;

    h3 {
      color: $font-light;
    }
  }

  .form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    // blue avatar cont
    .avatar-cont-blue {
      width: 100px;
      height: 100px;
      border-radius: 5px;
      margin: 20px 0px 0px 0px;
      cursor: pointer;
      background: linear-gradient(to top, $first-blue, $second-blue);

      img {
        width: 90%;
        height: 90%;
        margin: 5%;
        border-radius: 5px;
      }
    }

    // orange avatar cont
    .avatar-cont-orange {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-orange, $second-orange);
    }

    // pink avatar cont
    .avatar-cont-pink {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-pink, $second-pink);
    }

    // green avatar cont
    .avatar-cont-green {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-green, $second-green);
    }

    // input's labels
    label {
      width: 100%;
      height: auto;
      padding: 5px 0px;
      margin: 10px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      color: $font-light;
    }

    // input style
    input {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      padding: 0px 10px;
      margin: 10px 0px;
      background-color: $body-light;
    }

    // password's conatiner
    .password {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: $body-light;
      padding: 0px 10px;

      input {
        width: 80%;
        height: 100%;
        outline: none;
        border: none;
        padding: 0px;
      }

      svg {
        transition-duration: 0.5s;
        cursor: pointer;
      }

      svg:hover {
        color: $blue;
      }
    }

    // gender and Permissions list style
    select {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      margin: 10px 0px;
      background-color: $body-light;
      padding: 0px 10px;
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      outline: none;
      color: $font-light;
      background-color: $green;
      cursor: pointer;
    }
  }
}

.up-admin-open-darck-Arabic::-webkit-scrollbar {
  width: 0px;
}

.up-admin-close-darck-Arabic {
  @extend .up-admin-open-darck-Arabic;
  opacity: 0;
  padding: 30% 5px 5px 5px;
}

.up-admin-open-light-Arabic {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  // component header style
  .header {
    width: 100%;
    height: auto;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;

    h3 {
      color: $font-darck;
    }
  }

  .form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    // blue avatar cont
    .avatar-cont-blue {
      width: 100px;
      height: 100px;
      border-radius: 5px;
      margin: 20px 0px 0px 0px;
      cursor: pointer;
      background: linear-gradient(to top, $first-blue, $second-blue);

      img {
        width: 90%;
        height: 90%;
        margin: 5%;
        border-radius: 5px;
      }
    }

    // orange avatar cont
    .avatar-cont-orange {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-orange, $second-orange);
    }

    // pink avatar cont
    .avatar-cont-pink {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-pink, $second-pink);
    }

    // green avatar cont
    .avatar-cont-green {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-green, $second-green);
    }

    // input's labels
    label {
      width: 100%;
      height: auto;
      padding: 5px 0px;
      margin: 10px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      color: $font-darck;
    }

    // input style
    input {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      padding: 0px 10px;
      margin: 10px 0px;
      background-color: $message-light;
    }

    // password's conatiner
    .password {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: $message-light;
      padding: 0px 10px;

      input {
        width: 80%;
        height: 100%;
        outline: none;
        border: none;
        padding: 0px;
      }

      svg {
        transition-duration: 0.5s;
        cursor: pointer;
      }

      svg:hover {
        color: $blue;
      }
    }

    // gender and Permissions list style
    select {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      margin: 10px 0px;
      background-color: $message-light;
      padding: 0px 10px;
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      outline: none;
      color: $font-light;
      background-color: $green;
      cursor: pointer;
    }
  }
}

.up-admin-open-light-Arabic::-webkit-scrollbar {
  width: 0px;
}

.up-admin-close-light-Arabic {
  @extend .up-admin-open-darck-Arabic;
  opacity: 0;
  padding: 30% 5px 5px 5px;
}
// darck and light Arabic style
</style>
