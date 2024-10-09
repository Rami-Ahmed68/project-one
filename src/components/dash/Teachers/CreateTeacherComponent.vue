<template>
  <div
    :class="`craete-admin-${this.$store.state.mood}-${this.$store.state.language}-${this.status}`"
  >
    <!-- component title  -->
    <div class="header">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_teacher.title
          : this.$store.state.Arabic.create_teacher.title
      }}
    </div>
    <!-- component title  -->

    <!-- form data container  -->
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
      <label for="name">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_teacher.name
            : this.$store.state.Arabic.create_teacher.name
        }}</label
      >
      <input
        type="text"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.create_teacher.name_placeholder
            : this.$store.state.Arabic.create_teacher.name_placeholder
        "
        id="name"
        v-model="this.name"
      />
      <!-- name  -->

      <!-- email  -->
      <label for="email">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_teacher.email
            : this.$store.state.Arabic.create_teacher.email
        }}</label
      >
      <input
        type="email"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.create_teacher.email_placeholder
            : this.$store.state.Arabic.create_teacher.email_placeholder
        "
        id="email"
        v-model="this.email"
      />
      <!-- email  -->

      <!-- password  -->
      <label for="password">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_teacher.password
            : this.$store.state.Arabic.create_teacher.password
        }}</label
      >
      <div class="password">
        <input
          :type="this.password_type"
          :placeholder="
            this.$store.state.language == 'English'
              ? this.$store.state.English.create_teacher.password_placeholder
              : this.$store.state.Arabic.create_teacher.password_placeholder
          "
          id="password"
          v-model="this.password"
        />
        <icon icon="eye" @click="ChangeInputType" />
      </div>
      <!-- password  -->

      <!-- phone number  -->
      <label for="phone-number">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_teacher.phone_number
            : this.$store.state.Arabic.create_teacher.phone_number
        }}</label
      >
      <input
        type="text"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.create_teacher.phone_placeholder
            : this.$store.state.Arabic.create_teacher.phone_placeholder
        "
        id="phone-number"
        v-model="this.phone"
      />
      <!-- phone number  -->

      <!-- subject  -->
      <label for="subject">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_teacher.subject
            : this.$store.state.Arabic.create_teacher.subject
        }}</label
      >

      <select name="" id="subject" v-model="subject">
        <option
          v-for="(subject, index) in this.$store.state.subjects_list"
          :key="index"
          :value="subject.English"
        >
          {{
            this.$store.state.language == "English"
              ? subject.English
              : subject.Arabic
          }}
        </option>
      </select>
      <!-- subject  -->

      <!-- subject  -->
      <label for="class_level">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_teacher.class_level
            : this.$store.state.Arabic.create_teacher.class_level
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
      <!-- subject  -->

      <!-- gender  -->
      <label for="gender">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_teacher.gender
            : this.$store.state.Arabic.create_teacher.gender
        }}</label
      >

      <select name="" id="gender" v-model="gender">
        <option value="male">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.create_teacher.male
              : this.$store.state.Arabic.create_teacher.male
          }}
        </option>
        <option value="female">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.create_teacher.female
              : this.$store.state.Arabic.create_teacher.female
          }}
        </option>
      </select>
      <!-- gender  -->

      <!-- admin's Permissions  -->
      <label for="Permissions">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_teacher.teacher_access
            : this.$store.state.Arabic.create_teacher.teacher_access
        }}</label
      >

      <select name="" id="Permissions" v-model="Permissions">
        <option value="true">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.create_teacher.editor
              : this.$store.state.Arabic.create_teacher.editor
          }}
        </option>
        <option value="false">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.create_teacher.not_editor
              : this.$store.state.Arabic.create_teacher.not_editor
          }}
        </option>
      </select>
      <!-- admin's Permissions  -->

      <!-- createing button  -->
      <button @click="CreateTeacher">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_teacher.button
            : this.$store.state.Arabic.create_teacher.button
        }}
      </button>
      <!-- createing button  -->
    </div>
    <!-- form data container  -->
  </div>
</template>

<script>
import axios from "axios";
import Female_icon from "../../../assets/femal-default-icon.png";
import Male_icon from "../../../assets/male-default-icon.png";

export default {
  name: "create-admin-component",
  data() {
    return {
      status: "close",
      // admin name
      name: "",
      // admin email
      email: "",
      // admin password
      password: "",
      // admin gender
      gender: "male",
      // phone number
      phone: "",
      // admin Permissions
      Permissions: true,
      // password input type
      password_type: "password",
      // class level
      class_level: "First_grade",
      // subject
      subject: "Math",
      // avatar
      avatar: this.gender === "male" ? Female_icon : Male_icon,
      // / form data to add all new admin data in it ande send it in request
      formData: "",
    };
  },
  components: {},
  mounted() {
    // to call OnImageSelected method on select any image
    this.$refs.avatar.addEventListener("change", this.onImageSelected);

    setTimeout(() => {
      this.status = "open";
    }, 500);
  },
  methods: {
    // change the passworpassword input type
    ChangeInputType() {
      this.password_type =
        this.password_type == "password" ? "text" : "password";
    },

    // create teacher
    async CreateTeacher() {
      // to create a new form data
      this.formData = new FormData();

      // to start the loading animation
      this.$store.state.loading = "open";

      // create the super admin headers
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // add the teacher name to form data
      this.formData.append("name", this.name);

      // add the new teacher email to form data
      this.formData.append("email", this.email);

      // add the new teacher password to form data
      this.formData.append("password", this.password);

      // add the new teacher gender to form data
      this.formData.append("gender", this.gender);

      // add the new teacher phone to form data
      this.formData.append("phone_number", this.phone);

      // add the new teacher Permissions to form data
      this.formData.append("editor", this.Permissions);

      // check who want update the teacher account
      if (this.$store.state.user.user_type == "super") {
        // add the super admin id to form data
        this.formData.append("super_admin_id", this.$store.state.user.user._id);
      } else if (this.$store.state.user.user_type == "admin") {
        // add the admin id to form data
        this.formData.append("admin_id", this.$store.state.user.user._id);
      }

      // add the subject to form data
      this.formData.append("subject", this.subject);

      // add the class level to form data
      this.formData.append("class_level", this.class_level);

      // check if the selected images array in stor has any image
      if (this.$store.state.selectd_images.length > 0) {
        // add all images as array in formData
        for (let file of this.$store.state.selectd_images) {
          this.formData.append("avatar", file, file.name);
        }
      }

      await axios
        .post(
          this.$store.state.user.user_type == "super"
            ? this.$store.state.APIs.teachers.super.create
            : this.$store.state.APIs.teachers.admin.create,
          this.formData,
          {
            headers,
          }
        )
        .then(() => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // empting the selected images array in store
          this.$store.state.selectd_images = [];

          // reload the page after created the teacher's account
          window.location.reload();
        })
        .catch((error) => {
          // emptying the data
          this.name = "";
          this.email = "";
          this.password = "";
          this.gender = "male";
          this.phone = "";
          this.Permissions = true;
          this.class_level = "First_grade";
          this.subject = "Math";
          this.formData = new FormData();
          this.avatar = Male_icon;
          // empting the selected images array in store
          this.$store.state.selectd_images = [];

          // to stop the loading animation
          this.$store.state.loading = "close";

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
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
.craete-teacher-darck-English-open {
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

.craete-teacher-darck-English-close {
  @extend .craete-teacher-darck-English-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.craete-teacher-darck-English-open::-webkit-scrollbar {
  width: 0px;
}

.craete-teacher-light-English-open {
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

.craete-teacher-light-English-close {
  @extend .craete-teacher-light-English-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.craete-teacher-light-English-open::-webkit-scrollbar {
  width: 0px;
}
// darck and light English style

// darck and light Arabic style
.craete-teacher-darck-Arabic-open {
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

.craete-teacher-darck-Arabic-close {
  @extend .craete-teacher-darck-Arabic-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.craete-teacher-darck-Arabic-open::-webkit-scrollbar {
  width: 0px;
}

.craete-teacher-light-Arabic-open {
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

.craete-teacher-light-Arabic-close {
  @extend .craete-teacher-light-Arabic-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.craete-teacher-light-Arabic-open::-webkit-scrollbar {
  width: 0px;
}

// darck and light Arabic style
</style>
