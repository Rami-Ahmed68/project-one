<template>
  <div
    :class="`create-class-${this.$store.state.mood}-${this.$store.state.language}-${this.status}`"
  >
    <!-- header -->
    <div class="header">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_class.page_title
          : this.$store.state.Arabic.create_class.page_title
      }}
    </div>
    <!-- header -->

    <div class="form">
      <!-- cover container  -->
      <div
        :class="`cover-cont`"
        @click="this.$store.commit('Change_cover_form_status')"
      >
        <img
          :src="
            this.$store.state.selected_cover ? this.readerFile() : this.cover
          "
          alt=""
        />
      </div>
      <!-- cover container  -->

      <!-- title  -->
      <label for="title">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_class.title
          : this.$store.state.Arabic.create_class.title
      }}</label>

      <input
        id="title"
        v-model="this.title"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.create_class.title_placeholder
            : this.$store.state.Arabic.create_class.title_placeholder
        "
      />
      <!-- title  -->

      <!-- note  -->
      <label for="note">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_class.note
          : this.$store.state.Arabic.create_class.note
      }}</label>

      <textarea
        name=""
        id="note"
        v-model="this.note"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.create_class.note_placeholder
            : this.$store.state.Arabic.create_class.note_placeholder
        "
      ></textarea>
      <!-- note  -->

      <!-- subject  -->
      <label
        for="subject"
        v-if="
          this.$store.state.user &&
          this.$store.state.user.user_type != 'teacher'
        "
        >{{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_class.subject
            : this.$store.state.Arabic.create_class.subject
        }}</label
      >

      <select
        name=""
        id="subject"
        v-model="this.subject"
        v-if="
          this.$store.state.user &&
          this.$store.state.user.user_type != 'teacher'
        "
      >
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

      <!-- class level  -->
      <label
        for="class_level"
        v-if="
          this.$store.state.user &&
          this.$store.state.user.user_type != 'teacher'
        "
        >{{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_class.class_level
            : this.$store.state.Arabic.create_class.class_level
        }}</label
      >

      <select
        name=""
        id="class_level"
        v-model="this.class_level"
        v-if="
          this.$store.state.user &&
          this.$store.state.user.user_type != 'teacher'
        "
      >
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

      <!-- teacher  -->
      <label for="" v-if="this.$store.state.user.user_type != 'teacher'">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_class.teachers_section_title
            : this.$store.state.Arabic.create_class.teachers_section_title
        }}</label
      >

      <!-- choosed teacher container -->
      <div
        class="teacher-cont"
        v-if="this.$store.state.user.user_type != 'teacher'"
      >
        <icon icon="plus" @click="this.$store.commit(`ChooseTeacher`)" />
        <div class="teacher" v-if="this.$store.state.choosed_teacher">
          <!-- avatar  -->
          <img
            :src="this.$store.state.choosed_teacher.avatar"
            alt="Image"
            @click="GoTeacher(this.$store.state.choosed_teacher._id)"
          />
          <!-- avatar  -->

          <!-- info cont  -->

          <div
            class="info"
            @click="GoTeacher(this.$store.state.choosed_teacher._id)"
          >
            <h3>{{ this.$store.state.choosed_teacher.name }}</h3>

            <p>
              ⚧️ : {{ this.$store.state.choosed_teacher.gender }}
              {{
                this.$store.state.choosed_teacher.gender == "male" ? "🚹" : "🚺"
              }}
            </p>

            <p v-if="this.$store.state.choosed_teacher.classes">
              🏛️ : {{ this.$store.state.choosed_teacher.classes.length }}
            </p>

            <p>{{ this.$store.state.choosed_teacher.gender }}</p>

            <p v-if="this.$store.state.choosed_teacher.editor" class="editor">
              {{ this.$store.state.choosed_teacher.editor ? "editor" : null }}
            </p>

            <p>⭐ : {{ this.$store.state.choosed_teacher.rate }}</p>

            <p>📚📖📑 : {{ this.$store.state.choosed_teacher.subject }}</p>

            <p>🏫🪜🎚️ : {{ this.$store.state.choosed_teacher.class_level }}</p>
          </div>
          <!-- info cont  -->

          <!-- remove the choosed teacher  -->
          <button @click="RemoveTeacher">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.create_class.remove_button
                : this.$store.state.Arabic.create_class.remove_button
            }}
          </button>
          <!-- remove the choosed teacher  -->
        </div>
      </div>
      <!-- choosed teacher container -->
      <!-- teacher  -->

      <button @click="CreateClass">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_class.button
            : this.$store.state.Arabic.create_class.button
        }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Math from "../../../assets/classes covers/Math.jpg";
import Arabic from "../../../assets/classes covers/arabic.jpg";
import English from "../../../assets/classes covers/english.jpg";
import French from "../../../assets/classes covers/french.jpg";
import History from "../../../assets/classes covers/history.jpg";
import Philosophy from "../../../assets/classes covers/phalsephe.jpg";
import Physics from "../../../assets/classes covers/physic.jpg";
import Sciences from "../../../assets/classes covers/sinces.jpg";
import Islam from "../../../assets/classes covers/Islam.jpg";
import Geography from "../../../assets/classes covers/gegrophya.jpg";
import Chemistry from "../../../assets/classes covers/chimster.jpg";
import Alwatania from "../../../assets/classes covers/alwataniajpg.jpg";
export default {
  name: "create-class-component",
  data() {
    return {
      status: "close",
      // title
      title: "",
      // note
      note: "",
      // class level
      class_level:
        this.$store.state.user && this.$store.state.user.user_type == "teacher"
          ? this.$store.state.user.user.class_level
          : "First_grade",
      // subject
      subject: "Math",
      // teacher
      teacher: "",
      // covers list
      covers: {
        Math,
        Arabic,
        English,
        French,
        History,
        Philosophy,
        Physics,
        Sciences,
        Islam,
        Geography,
        Chemistry,
        Alwatania,
      },
      // cover
      cover: Math,
      // api
      api: "",
      // form data
      formData: "",
    };
  },
  mounted() {
    // check if the user is teacher add his data to choosed_teacher in store
    if (this.$store.state.user.user_type == "teacher") {
      this.$store.state.choosed_teacher = this.$store.state.user.user;

      // update the class's subject
      this.subject = this.$store.state.user.user.subject;
    }

    // to open the page smooth
    setTimeout(() => {
      this.status = "open";
    }, 500);
  },
  methods: {
    // create class method
    async CreateClass() {
      // create a form data
      this.formData = new FormData();

      // to start the loading animation
      this.$store.state.loading = "open";

      // create header
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // update the api
      if (this.$store.state.user.user_type == "super") {
        // update the api
        this.api = this.$store.state.APIs.classes.super.create;

        // add the super admin id to form data
        this.formData.append("super_admin_id", this.$store.state.user.user._id);

        // add the teacher id
        this.formData.append(
          "teacher_id",
          this.$store.state.choosed_teacher._id
        );
      } else if (this.$store.state.user.user_type == "admin") {
        // update admin
        this.api = this.$store.state.APIs.classes.admin.create;

        // add the admin id to form data
        this.formData.append("admin_id", this.$store.state.user.user._id);

        // add the teacher id
        this.formData.append(
          "teacher_id",
          this.$store.state.choosed_teacher._id
        );
      } else if (this.$store.state.user.user_type == "teacher") {
        // update api
        this.api = this.$store.state.APIs.classes.teacher.create;

        // add the teacher id to form data
        this.formData.append("teacher_id", this.$store.state.user.user._id);
      }

      // add the title
      this.formData.append("title", this.title);

      // add the note
      this.formData.append("note", this.note);

      // add the subject
      this.formData.append("subject", this.subject);

      // add the class level
      this.formData.append("class_level", this.class_level);

      // add the cover
      if (this.$store.state.selected_cover) {
        // create a new array from selected cover in store
        let cover = Array.from(this.$store.state.selected_cover);
        for (const file of cover) {
          this.formData.append("cover", file, file.name);
        }
      }

      await axios
        .post(this.api, this.formData, {
          headers,
        })
        .then(() => {
          // to stop the loading
          this.$store.state.loading = "close";

          // emptying the choosed teacher
          this.$store.state.choosed_teacher = "";

          // change the active componenet in store
          this.$store.state.active_component_in_dash = "classes";
        })
        .catch((error) => {
          // to stop the loading
          this.$store.state.loading = "close";

          // open the error form
          this.$store.state.error_form_status = "open";

          // set the error message to error message in store
          this.$store.state.error_message = error.response.data.message;
        });
    },

    // reader selecetd image
    readerFile() {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.cover = e.target.result;
      };

      reader.readAsDataURL(this.$store.state.selected_cover[0]);

      // return the cover to use the ass a path in cover image
      return this.cover;
    },

    // remove the choosed teacher method
    RemoveTeacher() {
      this.$store.state.choosed_teacher = "";
    },

    // go to teacher method
    GoTeacher(id) {
      window.location = `/teacher/${id}`;
    },
  },
  watch: {
    // watch the cover on change
    subject(newCover) {
      // update the cover
      this.cover = this.covers[newCover];
    },
  },
};
</script>

<style lang="scss">
@import "../../../Sass/varibels/variables";

// darck and light English style
.create-class-darck-English-open {
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
    padding: 5px 0px;
    border-color: transparent transparent $border-light transparent;
    color: $font-light;
  }

  .form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .cover-cont {
      width: 100%;
      height: auto;
      margin: 20px 0px;

      img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        cursor: pointer;
      }
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

    textarea {
      width: 100%;
      height: 100px;
      padding: 5px 5px 5px 10px;
      border: none;
      border-radius: 5px;
      outline: none;
      resize: none;
      margin: 10px 0px;
      background-color: $body-light;
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

    .teacher-cont {
      width: 100%;
      height: 120px;
      border-radius: 5px;
      background-color: $card-darck;
      position: relative;
      margin: 5px 0px;
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        position: absolute;
        right: 5px;
        top: 5px;
        padding: 5px;
        border-radius: 3px;
        background-color: $blue;
        color: $font-light;
        cursor: pointer;
      }

      .teacher {
        width: 98%;
        height: auto;
        border-radius: 5px;
        background-color: $body-darck;
        display: flex;
        align-items: center;

        img {
          width: 90px;
          height: 90px;
          border-radius: 5px;
          margin: 3px;
          cursor: pointer;
        }

        .info {
          width: 70%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          margin: 0px 5px;
          cursor: pointer;

          h3 {
            width: 100%;
            height: auto;
            color: $font-light;
          }

          p {
            padding: 3px;
            border-radius: 3px;
            background-color: $card-darck;
            color: $font-light;
            font-size: $x-small;
            margin: 3px;

            @media (max-width: $phone) {
              font-size: $xx-small;
            }
          }

          .editor {
            @extend p;
            background-color: $green;
          }
        }

        button {
          background-color: $red;
          color: $font-light;
          margin: 0px 5px;
          @media (max-width: $phone) {
            padding: 5px 10px;
            font-size: $xx-small;
          }
        }
      }
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      outline: none;
      color: $font-light;
      background-color: $green;
      cursor: pointer;
      margin: 10px 0px;
    }
  }
}

.create-class-darck-English-open::-webkit-scrollbar {
  width: 0px;
}

.create-class-darck-English-close {
  @extend .create-class-darck-English-open;
  opacity: 0;
  padding: 30% 5px 5px 5px;
}

.create-class-light-English-open {
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
    padding: 5px 0px;
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

    .cover-cont {
      width: 100%;
      height: auto;
      margin: 20px 0px;

      img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        cursor: pointer;
      }
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

    textarea {
      width: 100%;
      height: 100px;
      padding: 5px 5px 5px 10px;
      border: none;
      border-radius: 5px;
      outline: none;
      resize: none;
      margin: 10px 0px;
      background-color: $message-light;
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

    .teacher-cont {
      width: 100%;
      height: 120px;
      border-radius: 5px;
      background-color: $message-light;
      position: relative;
      margin: 5px 0px;
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        position: absolute;
        right: 5px;
        top: 5px;
        padding: 5px;
        border-radius: 3px;
        background-color: $blue;
        color: $font-light;
        cursor: pointer;
      }

      .teacher {
        width: 98%;
        height: auto;
        border-radius: 5px;
        background-color: $body-light;
        display: flex;
        align-items: center;

        img {
          width: 90px;
          height: 90px;
          border-radius: 5px;
          margin: 3px;
          cursor: pointer;
        }

        .info {
          width: 70%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          margin: 0px 5px;
          cursor: pointer;

          h3 {
            width: 100%;
            height: auto;
            color: $font-darck;
          }

          p {
            padding: 3px;
            border-radius: 3px;
            background-color: $message-light;
            color: $font-darck;
            font-size: $x-small;
            margin: 3px;

            @media (max-width: $phone) {
              font-size: $xx-small;
            }
          }

          .editor {
            @extend p;
            color: $font-light;
            background-color: $green;
          }
        }

        button {
          background-color: $red;
          color: $font-light;
          margin: 0px 5px;
          @media (max-width: $phone) {
            padding: 5px 10px;
            font-size: $xx-small;
          }
        }
      }
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      outline: none;
      color: $font-light;
      background-color: $green;
      cursor: pointer;
      margin: 10px 0px;
    }
  }
}
// darck and light English style

// darck and light Arabic style
.create-class-darck-Arabic-open {
  @extend .create-class-darck-English-open;
  direction: rtl;
}

.create-class-darck-Arabic-open::-webkit-scrollbar {
  width: 0px;
}

.create-class-darck-Arabic-close {
  @extend .create-class-darck-Arabic-open;
  opacity: 0;
  padding: 30% 5px 5px 5px;
}

.create-class-light-Arabic-open {
  @extend .create-class-light-English-open;
  direction: rtl;
}
// darck and light Arabic style
</style>
