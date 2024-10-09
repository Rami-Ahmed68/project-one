<template>
  <div
    :class="`create-student-${this.$store.state.mood}-${this.$store.state.language}-${this.status}`"
  >
    <div class="header">
      <h3>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_student.title
            : this.$store.state.Arabic.create_student.title
        }}
      </h3>
    </div>

    <div class="form">
      <!-- admin avatar -->
      <div :class="`avatar-${this.$store.state.theme}`">
        <label for="avatar" id="avatar-label">
          <input
            type="file"
            id="avatar"
            ref="avatar"
            @change="onImageSelected"
          />
          <img
            :src="
              this.$store.state.selectd_images.length > 0
                ? this.readerFile()
                : this.avatar
            "
            alt=""
          />
        </label>
      </div>
      <!-- admin avatar -->

      <!-- name  -->
      <label for="name">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_student.name
          : this.$store.state.Arabic.create_student.name
      }}</label>

      <input
        type="text"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.create_student.name_placeholder
            : this.$store.state.Arabic.create_student.name_placeholder
        "
        v-model="this.name"
        id="name"
      />
      <!-- name  -->

      <!-- emaile  -->
      <label for="email">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_student.email
          : this.$store.state.Arabic.create_student.email
      }}</label>

      <input
        type="email"
        id="email"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.update_student.email_placeholder
            : this.$store.state.Arabic.update_student.email_placeholder
        "
        v-model="this.email"
      />
      <!-- emaile  -->

      <!-- password  -->
      <label for="password">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_student.password
          : this.$store.state.Arabic.create_student.password
      }}</label>

      <div class="password">
        <input
          :type="this.password_type"
          :placeholder="
            this.$store.state.language == 'English'
              ? this.$store.state.English.create_student.password_placeholder
              : this.$store.state.Arabic.create_student.password_placeholder
          "
          v-model="this.password"
          id="password"
        />
        <icon icon="eye" @click="ChangeInputType" />
      </div>
      <!-- password  -->

      <label for="about_me">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_student.about_me
          : this.$store.state.Arabic.create_student.about_me
      }}</label>

      <textarea
        v-model="this.about_me"
        id="about_me"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.create_student.about_me_placeholder
            : this.$store.state.Arabic.create_student.about_me_placeholder
        "
      ></textarea>

      <!-- birth date  -->
      <label for="birth_date">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_student.birth_date
            : this.$store.state.Arabic.create_student.birth_date
        }}
      </label>

      <input
        type="text"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.create_student.birth_date_placeholder
            : this.$store.state.Arabic.create_student.birth_date_placeholder
        "
        v-model="this.birth_date"
        id="birth_date"
      />
      <!-- birth date  -->

      <!-- Phone Number  -->
      <label for="phone">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_student.phone_number
            : this.$store.state.Arabic.create_student.phone_number
        }}
      </label>

      <input
        type="text"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.create_student.phone_placeholder
            : this.$store.state.Arabic.create_student.phone_placeholder
        "
        v-model="this.phone_number"
        id="phone"
      />
      <!-- Phone Number  -->

      <!-- class level  -->
      <label for="class_level">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_student.class_level
            : this.$store.state.Arabic.create_student.class_level
        }}</label
      >

      <select name="" id="class_level" v-model="class_level">
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
      <!-- class level  -->

      <!-- gender  -->
      <label for="gender">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_student.gender
            : this.$store.state.Arabic.create_student.gender
        }}</label
      >

      <select name="" id="gender" v-model="gender">
        <option value="male">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.create_student.male
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

      <!-- update button  -->
      <button @click="CreateStudent">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_student.button
            : this.$store.state.Arabic.create_student.button
        }}
      </button>
      <!-- update button  -->
    </div>
  </div>
</template>

<script>
import Female_icon from "../../../assets/femal-default-icon.png";
import Male_icon from "../../../assets/male-default-icon.png";
import axios from "axios";
export default {
  name: "update-student-component",
  data() {
    return {
      status: "close",
      // name
      name: "",
      // password
      password: "",
      // phone number
      phone_number: "",
      // gender
      gender: "male",
      // about me
      about_me: "",
      // birth date
      birth_date: "",
      // password input type
      password_type: "password",
      // email
      email: "",
      // default avatar
      avatar: this.gender === "male" ? Female_icon : Male_icon,
      // class level
      class_level: this.$store.state.student_for_update.class_level,
      // form data
      formData: "",
    };
  },
  mounted() {
    setTimeout(() => {
      this.status = "open";
    }, 500);
  },
  methods: {
    // create student method
    async CreateStudent() {
      // to create a new form data
      this.formData = new FormData();

      // to start the loading animation
      this.$store.state.loading = "open";

      // create header
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // check who want update the teacher account
      if (this.$store.state.user.user_type == "super") {
        // add the super admin id to form data
        this.formData.append("super_admin_id", this.$store.state.user.user._id);
      } else if (this.$store.state.user.user_type == "admin") {
        // add the admin id to form data
        this.formData.append("admin_id", this.$store.state.user.user._id);
      }

      // add the name to form data
      if (this.name) {
        this.formData.append("name", this.name);
      }

      // add the email
      if (this.email) {
        this.formData.append("email", this.email);
      }

      // add the phone number to form data
      if (this.phone_number) {
        this.formData.append("phone_number", this.phone_number);
      }

      // add the gender to form data
      if (this.gender) {
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

      // add the class level
      if (this.class_level) {
        this.formData.append("class_level", this.class_level);
      }

      // add about me
      if (this.about_me) {
        this.formData.append("about_me", this.about_me);
      }

      // add birth date
      if (this.birth_date) {
        this.formData.append("birth_date", this.birth_date);
      }

      await axios
        .post(
          this.$store.state.user.user_type == "super"
            ? this.$store.state.APIs.students.super.create
            : this.$store.state.APIs.students.admin.create,
          this.formData,
          {
            headers,
          }
        )
        .then(() => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // emptying the selecetd images array from store
          this.$store.state.selectd_images = [];

          // emptying the choosed children array in store
          this.$store.state.choosed_children = [];

          // emptying the teacher for update in store
          this.$store.state.student_for_update = "";

          // open the teachers component
          this.$store.state.active_component_in_dash = "students";
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // emptying the choosed children array in store
          this.$store.state.choosed_children = [];

          // emptying the choosed children array in store
          this.$store.state.choosed_children = [];

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

    // select the images
    onImageSelected(event) {
      // catch the selected image
      const file = event.target.files[0];

      // emptying the selected images array in store
      this.$store.state.selectd_images = [];

      // add the selected file to selectd_images array in store
      this.$store.state.selectd_images.push(file);
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
.create-student-darck-English-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  .header {
    width: 100%;
    height: 30px;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    color: $font-light;
    margin: 5px 0px;
  }

  .form {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .avatar-blue {
      width: 100px;
      height: 100px;
      border-radius: 7px;
      margin: 10px 0px;
      background: linear-gradient(to top, $first-blue, $second-blue);

      #avatar-label {
        cursor: pointer;
        border: none;
        input {
          display: none;
        }

        img {
          width: 90%;
          height: 90%;
          margin: 5%;
          border-radius: 5px;
        }
      }
    }

    .avatar-orange {
      width: 100px;
      height: 100px;
      border-radius: 7px;
      margin: 10px 0px;
      background: linear-gradient(to top, $first-orange, $second-orange);

      #avatar-label {
        cursor: pointer;
        border: none;
        input {
          display: none;
        }

        img {
          width: 90%;
          height: 90%;
          margin: 5%;
          border-radius: 5px;
        }
      }
    }

    .avatar-pink {
      width: 100px;
      height: 100px;
      border-radius: 7px;
      margin: 10px 0px;
      background: linear-gradient(to top, $first-pink, $second-pink);

      #avatar-label {
        cursor: pointer;
        border: none;
        input {
          display: none;
        }

        img {
          width: 90%;
          height: 90%;
          margin: 5%;
          border-radius: 5px;
        }
      }
    }

    .avatar-green {
      width: 100px;
      height: 100px;
      border-radius: 7px;
      margin: 10px 0px;
      background: linear-gradient(to top, $first-green, $second-green);

      #avatar-label {
        cursor: pointer;
        border: none;
        input {
          display: none;
        }

        img {
          width: 90%;
          height: 90%;
          margin: 5%;
          border-radius: 5px;
        }
      }
    }

    label {
      width: 100%;
      height: 30px;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      color: $font-light;
      padding: 5px 0px;
      margin: 10px 0px;
    }

    input {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      padding-left: 10px;
      background-color: $body-light;
    }

    // about me textarea
    textarea {
      @extend input;
      height: 100px;
      resize: none;
      padding: 10px;
    }

    // password container style
    .password {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: $body-light;
      padding: 0px 5px;

      input {
        outline: none;
        border: none;
      }

      svg {
        transition-duration: 0.5s;
        cursor: pointer;
      }

      svg:hover {
        color: $blue;
      }
    }

    select {
      width: 100%;
      height: 40px;
      margin-bottom: 10px;
      border-radius: 5px;
      border: none;
      outline: none;
      background-color: $body-light;

      option {
        border-radius: 5px;
        height: 20px;
        margin: 10px 0px;
      }
    }

    button {
      padding: 10px 20px;
      border-radius: 5px;
      border: none;
      color: $font-light;
      background-color: $green;
      cursor: pointer;
    }
  }
}

.create-student-darck-English-close {
  @extend .create-student-darck-English-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.create-student-darck-English-open::-webkit-scrollbar {
  width: 0px;
}

.create-student-light-English-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  .header {
    width: 100%;
    height: 30px;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
    color: $font-darck;
    margin: 5px 0px;
  }

  .form {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .avatar-blue {
      width: 100px;
      height: 100px;
      border-radius: 7px;
      margin: 10px 0px;
      background: linear-gradient(to top, $first-blue, $second-blue);

      #avatar-label {
        cursor: pointer;
        border: none;
        input {
          display: none;
        }

        img {
          width: 90%;
          height: 90%;
          margin: 5%;
          border-radius: 5px;
        }
      }
    }

    .avatar-orange {
      width: 100px;
      height: 100px;
      border-radius: 7px;
      margin: 10px 0px;
      background: linear-gradient(to top, $first-orange, $second-orange);

      #avatar-label {
        cursor: pointer;
        border: none;
        input {
          display: none;
        }

        img {
          width: 90%;
          height: 90%;
          margin: 5%;
          border-radius: 5px;
        }
      }
    }

    .avatar-pink {
      width: 100px;
      height: 100px;
      border-radius: 7px;
      margin: 10px 0px;
      background: linear-gradient(to top, $first-pink, $second-pink);

      #avatar-label {
        cursor: pointer;
        border: none;
        input {
          display: none;
        }

        img {
          width: 90%;
          height: 90%;
          margin: 5%;
          border-radius: 5px;
        }
      }
    }

    .avatar-green {
      width: 100px;
      height: 100px;
      border-radius: 7px;
      margin: 10px 0px;
      background: linear-gradient(to top, $first-green, $second-green);

      #avatar-label {
        cursor: pointer;
        border: none;
        input {
          display: none;
        }

        img {
          width: 90%;
          height: 90%;
          margin: 5%;
          border-radius: 5px;
        }
      }
    }
    label {
      width: 100%;
      height: 30px;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      color: $font-darck;
      padding: 5px 0px;
      margin: 10px 0px;
    }

    input {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      padding-left: 10px;
      background-color: $message-light;
    }

    // about me textarea
    textarea {
      @extend input;
      height: 100px;
      resize: none;
      padding: 10px;
    }

    // password container style
    .password {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: $message-light;
      padding: 0px 5px;

      input {
        outline: none;
        border: none;
      }

      svg {
        transition-duration: 0.5s;
        cursor: pointer;
      }

      svg:hover {
        color: $blue;
      }
    }

    select {
      width: 100%;
      height: 40px;
      margin-bottom: 10px;
      border-radius: 5px;
      border: none;
      outline: none;
      background-color: $message-light;

      option {
        border-radius: 5px;
        height: 20px;
        margin: 10px 0px;
      }
    }

    button {
      padding: 10px 20px;
      border-radius: 5px;
      border: none;
      color: $font-light;
      background-color: $green;
      cursor: pointer;
    }
  }
}

.create-student-light-English-close {
  @extend .create-student-light-English-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.create-student-light-English-open::-webkit-scrollbar {
  width: 0px;
}
// darck and light English style

// darck and light Arabic style
.create-student-darck-Arabic-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: rtl;

  .header {
    width: 100%;
    height: 30px;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    color: $font-light;
    margin: 5px 0px;
  }

  .form {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .avatar-blue {
      width: 100px;
      height: 100px;
      border-radius: 7px;
      margin: 10px 0px;
      background: linear-gradient(to top, $first-blue, $second-blue);

      #avatar-label {
        cursor: pointer;
        border: none;
        input {
          display: none;
        }

        img {
          width: 90%;
          height: 90%;
          margin: 5%;
          border-radius: 5px;
        }
      }
    }

    .avatar-orange {
      width: 100px;
      height: 100px;
      border-radius: 7px;
      margin: 10px 0px;
      background: linear-gradient(to top, $first-orange, $second-orange);

      #avatar-label {
        cursor: pointer;
        border: none;
        input {
          display: none;
        }

        img {
          width: 90%;
          height: 90%;
          margin: 5%;
          border-radius: 5px;
        }
      }
    }

    .avatar-pink {
      width: 100px;
      height: 100px;
      border-radius: 7px;
      margin: 10px 0px;
      background: linear-gradient(to top, $first-pink, $second-pink);

      #avatar-label {
        cursor: pointer;
        border: none;
        input {
          display: none;
        }

        img {
          width: 90%;
          height: 90%;
          margin: 5%;
          border-radius: 5px;
        }
      }
    }

    .avatar-green {
      width: 100px;
      height: 100px;
      border-radius: 7px;
      margin: 10px 0px;
      background: linear-gradient(to top, $first-green, $second-green);

      #avatar-label {
        cursor: pointer;
        border: none;
        input {
          display: none;
        }

        img {
          width: 90%;
          height: 90%;
          margin: 5%;
          border-radius: 5px;
        }
      }
    }

    label {
      width: 100%;
      height: 30px;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      color: $font-light;
      padding: 5px 0px;
      margin: 10px 0px;
    }

    input {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      padding-right: 10px;
      background-color: $body-light;
    }

    // about me textarea
    textarea {
      @extend input;
      height: 100px;
      resize: none;
      padding: 10px;
    }

    // password container style
    .password {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: $body-light;
      padding: 0px 5px;

      input {
        outline: none;
        border: none;
      }

      svg {
        transition-duration: 0.5s;
        cursor: pointer;
      }

      svg:hover {
        color: $blue;
      }
    }

    select {
      width: 100%;
      height: 40px;
      margin-bottom: 10px;
      border-radius: 5px;
      border: none;
      outline: none;
      background-color: $body-light;

      option {
        border-radius: 5px;
        height: 20px;
        margin: 10px 0px;
      }
    }

    button {
      padding: 10px 20px;
      border-radius: 5px;
      border: none;
      color: $font-light;
      background-color: $green;
      cursor: pointer;
    }
  }
}

.create-student-darck-Arabic-close {
  @extend .create-student-darck-Arabic-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.create-student-darck-Arabic-open::-webkit-scrollbar {
  width: 0px;
}

.create-student-light-Arabic-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: rtl;

  .header {
    width: 100%;
    height: 30px;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
    color: $font-darck;
    margin: 5px 0px;
  }

  .form {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .avatar-blue {
      width: 100px;
      height: 100px;
      border-radius: 7px;
      margin: 10px 0px;
      background: linear-gradient(to top, $first-blue, $second-blue);

      #avatar-label {
        cursor: pointer;
        border: none;
        input {
          display: none;
        }

        img {
          width: 90%;
          height: 90%;
          margin: 5%;
          border-radius: 5px;
        }
      }
    }

    .avatar-orange {
      width: 100px;
      height: 100px;
      border-radius: 7px;
      margin: 10px 0px;
      background: linear-gradient(to top, $first-orange, $second-orange);

      #avatar-label {
        cursor: pointer;
        border: none;
        input {
          display: none;
        }

        img {
          width: 90%;
          height: 90%;
          margin: 5%;
          border-radius: 5px;
        }
      }
    }

    .avatar-pink {
      width: 100px;
      height: 100px;
      border-radius: 7px;
      margin: 10px 0px;
      background: linear-gradient(to top, $first-pink, $second-pink);

      #avatar-label {
        cursor: pointer;
        border: none;
        input {
          display: none;
        }

        img {
          width: 90%;
          height: 90%;
          margin: 5%;
          border-radius: 5px;
        }
      }
    }

    .avatar-green {
      width: 100px;
      height: 100px;
      border-radius: 7px;
      margin: 10px 0px;
      background: linear-gradient(to top, $first-green, $second-green);

      #avatar-label {
        cursor: pointer;
        border: none;
        input {
          display: none;
        }

        img {
          width: 90%;
          height: 90%;
          margin: 5%;
          border-radius: 5px;
        }
      }
    }

    label {
      width: 100%;
      height: 30px;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      color: $font-darck;
      padding: 5px 0px;
      margin: 10px 0px;
    }

    input {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      padding-right: 10px;
      background-color: $message-light;
    }

    // about me textarea
    textarea {
      @extend input;
      height: 100px;
      resize: none;
      padding: 10px;
    }

    // password container style
    .password {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: $message-light;
      padding: 0px 5px;

      input {
        outline: none;
        border: none;
      }

      svg {
        transition-duration: 0.5s;
        cursor: pointer;
      }

      svg:hover {
        color: $blue;
      }
    }

    select {
      width: 100%;
      height: 40px;
      margin-bottom: 10px;
      border-radius: 5px;
      border: none;
      outline: none;
      background-color: $message-light;

      option {
        border-radius: 5px;
        height: 20px;
        margin: 10px 0px;
      }
    }

    button {
      padding: 10px 20px;
      border-radius: 5px;
      border: none;
      color: $font-light;
      background-color: $green;
      cursor: pointer;
    }
  }
}

.create-student-light-Arabic-close {
  @extend .create-student-light-Arabic-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.create-student-light-Arabic-open::-webkit-scrollbar {
  width: 0px;
}

// darck and light Arabic style
</style>
