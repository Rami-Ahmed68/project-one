<template>
  <div
    :class="`update-question-${this.$store.state.mood}-${this.$store.state.language}-${this.status}`"
  >
    <!-- header  -->
    <div class="header">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_question.page_title
          : this.$store.state.Arabic.update_question.page_title
      }}
    </div>
    <!-- header  -->

    <div class="images">
      <!-- section heade  -->
      <div class="head">
        <label for="images">
          <icon icon="plus" />
        </label>
        <p>
          {{
            this.$store.state.question_data_for_update.images.length +
            this.$store.state.new_question_images.length
          }}/5
        </p>
        <input type="file" id="images" ref="images" multiple />
      </div>
      <!-- section heade  -->

      <!-- images section  -->
      <div class="images-section">
        <img
          v-for="(path, index) in this.images"
          :key="index"
          :src="path"
          alt="image"
          @click="DeleteNewImage(index)"
        />

        <img
          v-for="(path, index) in this.$store.state.question_data_for_update
            .images"
          :key="index"
          :src="path"
          alt="image"
          @click="DeleteImage(index, path)"
        />
      </div>
      <!-- images section  -->
    </div>

    <!-- form section  -->
    <div class="form">
      <!-- title  -->
      <label for="title">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_question.title
          : this.$store.state.Arabic.update_question.title
      }}</label>

      <input
        type="text"
        id="title"
        v-model="this.title"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.update_question.title_placeholder
            : this.$store.state.Arabic.update_question.title_placeholder
        "
      />
      <!-- title  -->

      <!-- description  -->
      <label for="description">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_question.description
          : this.$store.state.Arabic.update_question.description
      }}</label>

      <textarea
        name=""
        id="description"
        v-model="this.description"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.update_question.description_placeholder
            : this.$store.state.Arabic.update_question.description_placeholder
        "
      ></textarea>
      <!-- description  -->

      <!-- note  -->
      <label for="note">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_question.note
            : this.$store.state.Arabic.update_question.note
        }}
      </label>

      <textarea
        name=""
        id="note"
        v-model="this.note"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.update_question.note_placeholder
            : this.$store.state.Arabic.update_question.note_placeholder
        "
      ></textarea>
      <!-- note  -->

      <!-- points  -->
      <label for="points">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_question.points
            : this.$store.state.Arabic.update_question.points
        }}
      </label>

      <input
        type="number"
        id="points"
        v-model="this.points"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.update_question.points_placeholder
            : this.$store.state.Arabic.update_question.points_placeholder
        "
      />
      <!-- points  -->

      <!-- repated  -->
      <label for="repated">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_question.repated
            : this.$store.state.Arabic.update_question.repated
        }}
      </label>

      <input
        type="text"
        id="repated"
        v-model="this.date"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.update_question.repated_placeholder
            : this.$store.state.Arabic.update_question.repated_placeholder
        "
      />

      <!-- repated date'd container  -->
      <div class="repated-cont">
        <!-- section heade  -->
        <div class="head">
          <icon icon="plus" @click="AddDate" />
          <span>{{ this.repated.length }}</span>
        </div>
        <p v-for="(date, index) in this.repated" :key="index">{{ date }}</p>
        <!-- section heade  -->
      </div>
      <!-- repated date'd container  -->
      <!-- repated  -->

      <!-- level  -->
      <label for="level">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_question.level
            : this.$store.state.Arabic.update_question.level
        }}
      </label>

      <select name="" id="level" v-model="this.level">
        <option
          v-for="(level, index) in this.$store.state.questions_level_list"
          :key="index"
          :value="level.value"
        >
          {{
            this.$store.state.language == "English"
              ? level.English
              : level.Arabic
          }}
        </option>
      </select>
      <!-- level  -->

      <!-- class_level  -->
      <label
        for="class_level"
        v-if="
          (this.$store.state.user &&
            this.$store.state.user.user_type == 'super') ||
          this.$store.state.user.user_type == 'admin'
        "
      >
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_question.class_level
            : this.$store.state.Arabic.update_question.class_level
        }}
      </label>

      <select
        name=""
        id="class_level"
        v-model="this.class_level"
        v-if="
          (this.$store.state.user &&
            this.$store.state.user.user_type == 'super') ||
          this.$store.state.user.user_type == 'admin'
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
      <!-- class_level  -->

      <!-- options cont  -->
      <label for="options">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_question.options
            : this.$store.state.Arabic.update_question.options
        }}
      </label>

      <div class="options-cont">
        <!-- section heade  -->
        <div class="head">
          <icon
            icon="plus"
            @click="this.$store.commit('ChangeAddOptionFormStatus')"
          />
          <span>{{ this.$store.state.question_options.length }}</span>
        </div>
        <div
          class="option"
          v-for="(option, index) in this.$store.state.question_options"
          :key="index"
          @click="DeleteOption(index)"
        >
          <p>{{ option.value }}</p>
          |
          <p>{{ option.answer }}</p>
          |
          <button class="delete">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.update_question.delete
                : this.$store.state.Arabic.update_question.delete
            }}
          </button>
        </div>
        <!-- section heade  -->
      </div>
      <!-- options cont  -->

      <!-- button  -->
      <button @click="UpdateQuestion">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_question.button
            : this.$store.state.Arabic.update_question.button
        }}
      </button>
      <!-- button  -->
    </div>
    <!-- form section  -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "update-question-component",
  data() {
    return {
      // page status
      status: "close",
      // title
      title: this.$store.state.question_data_for_update.title,
      // description
      description: this.$store.state.question_data_for_update.description
        ? this.$store.state.question_data_for_update.description
        : "",
      // note
      note: this.$store.state.question_data_for_update.note
        ? this.$store.state.question_data_for_update.note
        : "",
      // points
      points: this.$store.state.question_data_for_update.points,
      // repated
      repated: this.$store.state.question_data_for_update.repated
        ? this.$store.state.question_data_for_update.repated
        : [],
      // level
      level: this.$store.state.question_data_for_update.level,
      // class level
      class_level: this.$store.state.question_data_for_update.class_level,
      // options
      options: this.$store.state.question_data_for_update.options,
      // api
      api: "",
      // images's array
      images: [],
      // APIS
      APIS: {},
      // date
      date: "",
      // form data
      formData: "",
    };
  },
  mounted() {
    setTimeout(() => {
      this.status = "open";
    }, 500);
    //  call to the handleFileChange method on select any image
    this.$refs.images.addEventListener("change", this.handleFileChange);
  },
  components: {},
  methods: {
    // select the api type by subject name
    SelectApi() {
      switch (this.$store.state.question_subject_type_for_update) {
        case "Math":
          this.APIS = this.$store.state.APIs.subjects_questions.math;
          break;

        case "English":
          this.APIS = this.$store.state.APIs.subjects_questions.english;
          break;

        case "Arabic":
          this.APIS = this.$store.state.APIs.subjects_questions.arabic;
          break;

        case "French":
          this.APIS = this.$store.state.APIs.subjects_questions.french;
          break;

        case "Islam":
          this.APIS = this.$store.state.APIs.subjects_questions.islam;
          break;

        case "History":
          this.APIS = this.$store.state.APIs.subjects_questions.history;
          break;

        case "Philosophy":
          this.APIS = this.$store.state.APIs.subjects_questions.philosophy;
          break;

        case "Physics":
          this.APIS = this.$store.state.APIs.subjects_questions.physics;
          break;

        case "Sciences":
          this.APIS = this.$store.state.APIs.subjects_questions.sciences;
          break;

        case "Geography":
          this.APIS = this.$store.state.APIs.subjects_questions.geography;
          break;

        case "Chemistry":
          this.APIS = this.$store.state.APIs.subjects_questions.chemistry;
          break;

        case "Alwatania":
          this.APIS = this.$store.state.APIs.subjects_questions.alwatania;
          break;
      }
    },

    // update the question
    async UpdateQuestion() {
      // to create a new form data
      this.formData = new FormData();

      // call to seelct api type method
      this.SelectApi();

      // to start the loading
      this.$store.state.loading = "open";

      // craete headers
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // update the api
      if (this.$store.state.user.user_type == "super") {
        // update the api
        this.api = this.APIS.super.update;

        // add the super admin id to form data
        this.formData.append("super_admin_id", this.$store.state.user.user._id);
      } else if (this.$store.state.user.user_type == "admin") {
        // update the api
        this.api = this.APIS.admin.update;

        // add the admin id to form data
        this.formData.append("admin_id", this.$store.state.user.user._id);
      } else if (this.$store.state.user.user_type == "teacher") {
        // update the api
        this.api = this.APIS.teacher.update;

        // add the teacher id to form data
        this.formData.append("teacher_id", this.$store.state.user.user._id);
      }

      // add the question id
      this.formData.append(
        "question_id",
        this.$store.state.question_data_for_update._id
      );

      // add the title
      if (this.$store.state.question_data_for_update.title != this.title) {
        this.formData.append("title", this.title);
      }

      // add the description
      if (
        this.$store.state.question_data_for_update.description !=
        this.description
      ) {
        this.formData.append("description", this.description);
      }

      // add the note
      if (
        this.note != this.$store.state.question_data_for_update.note &&
        this.note != ""
      ) {
        this.formData.append("note", this.note);
      }

      // add the points
      if (this.$store.state.question_data_for_update.points != this.points) {
        this.formData.append("points", this.points);
      }

      // add the level
      if (this.level != this.$store.state.question_data_for_update.level) {
        this.formData.append("level", this.level);
      }

      // add the class level
      if (
        this.class_level !=
        this.$store.state.question_data_for_update.class_level
      ) {
        this.formData.append("class_level", this.class_level);
      }

      // add the repated array
      if (this.repated != []) {
        this.formData.append(
          "repated",
          JSON.stringify(Array.from(this.repated))
        );
      }

      // add the options to form data
      if (this.$store.state.question_options.length > 0) {
        this.formData.append(
          "options",
          JSON.stringify(this.$store.state.question_options)
        );
      }

      // add images for delete array to formData
      if (this.$store.state.question_images_for_delete.length > 0) {
        this.formData.append(
          "images_for_delete",
          JSON.stringify(
            Array.from(this.$store.state.question_images_for_delete)
          )
        );
      }

      // add the new images to form data
      if (this.$store.state.new_question_images.length > 0) {
        for (const file of this.$store.state.new_question_images) {
          this.formData.append("images", file, file.name);
        }
      }

      await axios
        .put(this.api, this.formData, { headers })
        .then(() => {
          // to stop the loading
          this.$store.state.loading = "close";

          // update the active component in store
          if (this.$store.state.question_subject_type_for_update == "Math") {
            this.$store.state.active_component_in_dash = "math-questions";
          } else if (
            this.$store.state.question_subject_type_for_update == "English"
          ) {
            this.$store.state.active_component_in_dash = "english-questions";
          } else if (
            this.$store.state.question_subject_type_for_update == "Arabic"
          ) {
            this.$store.state.active_component_in_dash = "arabic-questions";
          } else if (
            this.$store.state.question_subject_type_for_update == "French"
          ) {
            this.$store.state.active_component_in_dash = "french-questions";
          } else if (
            this.$store.state.question_subject_type_for_update == "Islam"
          ) {
            this.$store.state.active_component_in_dash = "islam-questions";
          } else if (
            this.$store.state.question_subject_type_for_update == "History"
          ) {
            this.$store.state.active_component_in_dash = "history-questions";
          } else if (
            this.$store.state.question_subject_type_for_update == "Philosophy"
          ) {
            this.$store.state.active_component_in_dash = "philosophy-questions";
          } else if (
            this.$store.state.question_subject_type_for_update == "Physics"
          ) {
            this.$store.state.active_component_in_dash = "physics-questions";
          } else if (
            this.$store.state.question_subject_type_for_update == "Sciences"
          ) {
            this.$store.state.active_component_in_dash = "sciences-questions";
          } else if (
            this.$store.state.question_subject_type_for_update == "Geography"
          ) {
            this.$store.state.active_component_in_dash = "geography-questions";
          } else if (
            this.$store.state.question_subject_type_for_update == "Chemistry"
          ) {
            this.$store.state.active_component_in_dash = "chemistry-questions";
          } else if (
            this.$store.state.question_subject_type_for_update == "Alwatania"
          ) {
            this.$store.state.active_component_in_dash = "alwatania-questions";
          }

          // emptying the data
          this.title = "";
          this.description = "";
          this.note = "";
          this.points = "";
          this.repated = [];
          this.level = "easy";
          this.class_level = "First_grade";
          this.subject_type = "math";
          this.$store.state.question_options = [];
          this.$store.state.new_question_images = [];
        })
        .catch((error) => {
          // to stop the loading
          this.$store.state.loading = "close";

          // open the error from
          this.$store.state.error_form_status = "open";

          // set the error message to error message in store
          this.$store.state.error_message = error.response.data.message;
        });
    },

    // delete trhe image from images cont
    DeleteImage(index, path) {
      // to delete the clicked image
      this.$store.state.question_data_for_update.images.splice(index, 1);

      // to add the deleted image's path in images_for_delete
      this.$store.state.question_images_for_delete.push(path);
    },

    // delete the new image on click
    DeleteNewImage(index) {
      this.images.splice(index, 1);
    },

    // delete option method
    DeleteOption(index) {
      this.$store.state.question_options.splice(index, 1);
    },

    // add the date to repated array method
    AddDate() {
      // add the date to repated array
      if (this.date != "") {
        this.repated.push(this.date);
      }

      // emptying the date var
      this.date = "";
    },

    // to set the new selectedimages
    handleFileChange(event) {
      if (event.target.files.length <= 5) {
        // emptying the images array to delete all last paths
        this.images = [];

        this.$store.state.new_question_images = Array.from(event.target.files);

        // call to reader files method
        this.readerFiles();
      } else {
        // open the error from
        this.$store.state.error_form_status = "open";

        // set the error message to error message in store
        this.$store.state.error_message = {
          english: "Sorry, You can not select more than 5 images ...",
          arabic: "... عذرا  لا يمكنك اختيار اكثر من 5 صور",
        };
      }
    },

    // to reade the selected images
    async readerFiles() {
      // looping to read all selecetd images
      for (const image of this.$store.state.new_question_images) {
        const reader = new FileReader();

        const promise = new Promise((resolve) => {
          reader.onload = (e) => {
            resolve(e.target.result);
          };

          reader.readAsDataURL(image);
        });

        // add the promise results to images array
        this.images.push(await promise);
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English Style
.update-question-darck-English-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 1% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  // header
  .header {
    width: 100%;
    height: auto;
    padding: 5px 0px;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    color: $font-light;
  }

  .images {
    width: 100%;
    height: 200px;
    border-radius: 5px;
    background-color: $card-darck;
    overflow-y: scroll;
    margin: 10px 0px;

    .head {
      width: 98%;
      height: 30px;
      margin: 10px 1%;
      position: relative;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;

      input {
        display: none;
      }

      svg {
        position: absolute;
        right: 5px;
        top: 0px;
        padding: 5px;
        border-radius: 3px;
        background-color: $blue;
        color: $font-light;
        cursor: pointer;
      }

      p {
        color: $font-light;
        position: absolute;
        left: 5px;
        top: 5px;
      }
    }

    // images section
    .images-section {
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;
      padding: 0px 1%;

      img {
        max-width: 200px;
        max-height: 200px;
        border-radius: 5px;
        margin: 5px;
        cursor: pointer;
      }
    }
  }

  .images::-webkit-scrollbar {
    width: 0px;
  }

  // form section style
  .form {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    label {
      width: 100%;
      height: auto;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      color: $font-light;
      margin: 10px 0px;
    }

    input {
      width: 100%;
      height: 40px;
      padding: 0px 10px;
      outline: none;
      border: none;
      border-radius: 5px;
      margin: 10px 0px;
      background-color: $body-light;
    }

    .repated-cont {
      width: 100%;
      height: 100px;
      border-radius: 5px;
      background-color: $card-darck;
      overflow-y: scroll;
      margin: 10px 0px;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;

      .head {
        width: 98%;
        height: 30px;
        margin: 10px 1%;
        position: relative;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;

        svg {
          position: absolute;
          right: 5px;
          top: 0px;
          padding: 5px;
          border-radius: 3px;
          background-color: $green;
          color: $font-light;
          cursor: pointer;
        }

        span {
          color: $font-light;
          position: absolute;
          left: 5px;
          top: 5px;
        }
      }

      p {
        padding: 3px;
        font-size: $x-small;
        color: $font-light;
        border-radius: 3px;
        margin: 3px;
        background-color: $note-darck;
      }
    }

    .repated-cont::-webkit-scrollbar {
      width: 0px;
    }

    textarea {
      width: 100%;
      height: 120px;
      border: none;
      outline: none;
      border-radius: 5px;
      padding: 5px 10px;
      resize: none;
      background-color: $body-light;
    }

    select {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      background-color: $body-light;
    }

    .options-cont {
      width: 100%;
      height: 200px;
      border-radius: 5px;
      background-color: $card-darck;
      overflow-y: scroll;
      margin: 10px 0px;

      .head {
        width: 98%;
        height: 30px;
        margin: 10px 1%;
        position: relative;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;

        input {
          display: none;
        }

        svg {
          position: absolute;
          right: 5px;
          top: 0px;
          padding: 5px;
          border-radius: 3px;
          background-color: $green;
          color: $font-light;
          cursor: pointer;
        }

        span {
          color: $font-light;
          position: absolute;
          left: 5px;
          top: 5px;
        }
      }

      .option {
        width: 98%;
        height: 40px;
        border-radius: 5px;
        margin: 5px 1%;
        background-color: $message-darck;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: $font-light;

        .delete {
          padding: 7px 15px;
          border-radius: 5px;
          cursor: pointer;
          color: $font-light;
          border: none;
          outline: none;
          background-color: $red;
        }
      }
    }

    .options-cont::-webkit-scrollbar {
      width: 0px;
    }

    button {
      padding: 10px 20px;
      border-radius: 5px;
      border: none;
      outline: none;
      margin: 10px 0px;
      background-color: $green;
      color: $font-light;
      cursor: pointer;
    }
  }
}

.update-question-darck-English-open::-webkit-scrollbar {
  width: 0px;
}

.update-question-darck-English-close {
  @extend .update-question-darck-English-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.update-question-light-English-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 1% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  // header
  .header {
    width: 100%;
    height: auto;
    padding: 5px 0px;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
    color: $font-darck;
  }

  .images {
    width: 100%;
    height: 200px;
    border-radius: 5px;
    background-color: $card-light;
    overflow-y: scroll;
    margin: 10px 0px;

    .head {
      width: 98%;
      height: 30px;
      margin: 10px 1%;
      position: relative;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;

      input {
        display: none;
      }

      svg {
        position: absolute;
        right: 5px;
        top: 0px;
        padding: 5px;
        border-radius: 3px;
        background-color: $blue;
        color: $font-light;
        cursor: pointer;
      }

      p {
        color: $font-darck;
        position: absolute;
        left: 5px;
        top: 5px;
      }
    }

    // images section
    .images-section {
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;
      padding: 0px 1%;

      img {
        max-width: 200px;
        max-height: 200px;
        border-radius: 5px;
        margin: 5px;
        cursor: pointer;
      }
    }
  }

  .images::-webkit-scrollbar {
    width: 0px;
  }

  // form section style
  .form {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    label {
      width: 100%;
      height: auto;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      color: $font-darck;
      margin: 10px 0px;
    }

    input {
      width: 100%;
      height: 40px;
      padding: 0px 10px;
      outline: none;
      border: none;
      border-radius: 5px;
      margin: 10px 0px;
      background-color: $message-light;
    }

    .repated-cont {
      width: 100%;
      height: 100px;
      border-radius: 5px;
      background-color: $card-light;
      overflow-y: scroll;
      margin: 10px 0px;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;

      .head {
        width: 98%;
        height: 30px;
        margin: 10px 1%;
        position: relative;
        border: 1px solid;
        border-color: transparent transparent $border-darck transparent;

        svg {
          position: absolute;
          right: 5px;
          top: 0px;
          padding: 5px;
          border-radius: 3px;
          background-color: $green;
          color: $font-light;
          cursor: pointer;
        }

        span {
          color: $font-darck;
          position: absolute;
          left: 5px;
          top: 5px;
        }
      }

      p {
        padding: 3px;
        font-size: $x-small;
        color: $font-darck;
        border-radius: 3px;
        margin: 3px;
        background-color: $note-light;
      }
    }

    .repated-cont::-webkit-scrollbar {
      width: 0px;
    }

    textarea {
      width: 100%;
      height: 120px;
      border: none;
      outline: none;
      border-radius: 5px;
      padding: 5px 10px;
      resize: none;
      background-color: $message-light;
    }

    select {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      background-color: $message-light;
    }

    .options-cont {
      width: 100%;
      height: 200px;
      border-radius: 5px;
      background-color: $card-light;
      overflow-y: scroll;
      margin: 10px 0px;

      .head {
        width: 98%;
        height: 30px;
        margin: 10px 1%;
        position: relative;
        border: 1px solid;
        border-color: transparent transparent $border-darck transparent;

        input {
          display: none;
        }

        svg {
          position: absolute;
          right: 5px;
          top: 0px;
          padding: 5px;
          border-radius: 3px;
          background-color: $green;
          color: $font-light;
          cursor: pointer;
        }

        span {
          color: $font-darck;
          position: absolute;
          left: 5px;
          top: 5px;
        }
      }

      .option {
        width: 98%;
        height: 40px;
        border-radius: 5px;
        margin: 5px 1%;
        background-color: $message-light;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: $font-darck;

        .delete {
          padding: 7px 15px;
          border-radius: 5px;
          cursor: pointer;
          border: none;
          outline: none;
          color: $font-light;
          background-color: $red;
        }
      }
    }

    .options-cont::-webkit-scrollbar {
      width: 0px;
    }

    button {
      padding: 10px 20px;
      border-radius: 5px;
      border: none;
      outline: none;
      margin: 10px 0px;
      background-color: $green;
      color: $font-light;
      cursor: pointer;
    }
  }
}

.update-question-light-English-open::-webkit-scrollbar {
  width: 0px;
}

.update-question-light-English-close {
  @extend .update-question-darck-English-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}
// darck and light English Style

// darck and light Arabic Style
.update-question-darck-Arabic-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 1% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: rtl;

  // header
  .header {
    width: 100%;
    height: auto;
    padding: 5px 0px;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    color: $font-light;
  }

  .images {
    width: 100%;
    height: 200px;
    border-radius: 5px;
    background-color: $card-darck;
    overflow-y: scroll;
    margin: 10px 0px;

    .head {
      width: 98%;
      height: 30px;
      margin: 10px 1%;
      position: relative;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;

      input {
        display: none;
      }

      svg {
        position: absolute;
        right: 5px;
        top: 0px;
        padding: 5px;
        border-radius: 3px;
        background-color: $blue;
        color: $font-light;
        cursor: pointer;
      }

      p {
        color: $font-light;
        position: absolute;
        left: 5px;
        top: 5px;
      }
    }

    // images section
    .images-section {
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;
      padding: 0px 1%;

      img {
        max-width: 200px;
        max-height: 200px;
        border-radius: 5px;
        margin: 5px;
        cursor: pointer;
      }
    }
  }

  .images::-webkit-scrollbar {
    width: 0px;
  }

  // form section style
  .form {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    label {
      width: 100%;
      height: auto;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      color: $font-light;
      margin: 10px 0px;
    }

    input {
      width: 100%;
      height: 40px;
      padding: 0px 10px;
      outline: none;
      border: none;
      border-radius: 5px;
      margin: 10px 0px;
      background-color: $body-light;
    }

    .repated-cont {
      width: 100%;
      height: 100px;
      border-radius: 5px;
      background-color: $card-darck;
      overflow-y: scroll;
      margin: 10px 0px;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;

      .head {
        width: 98%;
        height: 30px;
        margin: 10px 1%;
        position: relative;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;

        svg {
          position: absolute;
          right: 5px;
          top: 0px;
          padding: 5px;
          border-radius: 3px;
          background-color: $green;
          color: $font-light;
          cursor: pointer;
        }

        span {
          color: $font-light;
          position: absolute;
          left: 5px;
          top: 5px;
        }
      }

      p {
        padding: 3px;
        font-size: $x-small;
        color: $font-light;
        border-radius: 3px;
        margin: 3px;
        background-color: $note-darck;
      }
    }

    .repated-cont::-webkit-scrollbar {
      width: 0px;
    }

    textarea {
      width: 100%;
      height: 120px;
      border: none;
      outline: none;
      border-radius: 5px;
      padding: 5px 10px;
      resize: none;
      background-color: $body-light;
    }

    select {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      background-color: $body-light;
    }

    .options-cont {
      width: 100%;
      height: 200px;
      border-radius: 5px;
      background-color: $card-darck;
      overflow-y: scroll;
      margin: 10px 0px;

      .head {
        width: 98%;
        height: 30px;
        margin: 10px 1%;
        position: relative;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;

        input {
          display: none;
        }

        svg {
          position: absolute;
          right: 5px;
          top: 0px;
          padding: 5px;
          border-radius: 3px;
          background-color: $green;
          color: $font-light;
          cursor: pointer;
        }

        span {
          color: $font-light;
          position: absolute;
          left: 5px;
          top: 5px;
        }
      }

      .option {
        width: 98%;
        height: 40px;
        border-radius: 5px;
        margin: 5px 1%;
        background-color: $message-darck;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: $font-light;

        .delete {
          padding: 7px 15px;
          border-radius: 5px;
          cursor: pointer;
          border: none;
          outline: none;
          color: $font-light;
          background-color: $red;
        }
      }
    }

    .options-cont::-webkit-scrollbar {
      width: 0px;
    }

    button {
      padding: 10px 20px;
      border-radius: 5px;
      border: none;
      outline: none;
      margin: 10px 0px;
      background-color: $green;
      color: $font-light;
      cursor: pointer;
    }
  }
}

.update-question-darck-Arabic-open::-webkit-scrollbar {
  width: 0px;
}

.update-question-darck-Arabic-close {
  @extend .update-question-darck-Arabic-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.update-question-light-Arabic-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 1% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: rtl;

  // header
  .header {
    width: 100%;
    height: auto;
    padding: 5px 0px;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
    color: $font-darck;
  }

  .images {
    width: 100%;
    height: 200px;
    border-radius: 5px;
    background-color: $card-light;
    overflow-y: scroll;
    margin: 10px 0px;

    .head {
      width: 98%;
      height: 30px;
      margin: 10px 1%;
      position: relative;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;

      input {
        display: none;
      }

      svg {
        position: absolute;
        right: 5px;
        top: 0px;
        padding: 5px;
        border-radius: 3px;
        background-color: $blue;
        color: $font-light;
        cursor: pointer;
      }

      p {
        color: $font-darck;
        position: absolute;
        left: 5px;
        top: 5px;
      }
    }

    // images section
    .images-section {
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;
      padding: 0px 1%;

      img {
        max-width: 200px;
        max-height: 200px;
        border-radius: 5px;
        margin: 5px;
        cursor: pointer;
      }
    }
  }

  .images::-webkit-scrollbar {
    width: 0px;
  }

  // form section style
  .form {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    label {
      width: 100%;
      height: auto;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      color: $font-darck;
      margin: 10px 0px;
    }

    input {
      width: 100%;
      height: 40px;
      padding: 0px 10px;
      outline: none;
      border: none;
      border-radius: 5px;
      margin: 10px 0px;
      background-color: $message-light;
    }

    .repated-cont {
      width: 100%;
      height: 100px;
      border-radius: 5px;
      background-color: $card-light;
      overflow-y: scroll;
      margin: 10px 0px;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;

      .head {
        width: 98%;
        height: 30px;
        margin: 10px 1%;
        position: relative;
        border: 1px solid;
        border-color: transparent transparent $border-darck transparent;

        svg {
          position: absolute;
          right: 5px;
          top: 0px;
          padding: 5px;
          border-radius: 3px;
          background-color: $green;
          color: $font-light;
          cursor: pointer;
        }

        span {
          color: $font-darck;
          position: absolute;
          left: 5px;
          top: 5px;
        }
      }

      p {
        padding: 3px;
        font-size: $x-small;
        color: $font-darck;
        border-radius: 3px;
        margin: 3px;
        background-color: $note-light;
      }
    }

    .repated-cont::-webkit-scrollbar {
      width: 0px;
    }

    textarea {
      width: 100%;
      height: 120px;
      border: none;
      outline: none;
      border-radius: 5px;
      padding: 5px 10px;
      resize: none;
      background-color: $message-light;
    }

    select {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      background-color: $message-light;
    }

    .options-cont {
      width: 100%;
      height: 200px;
      border-radius: 5px;
      background-color: $card-light;
      overflow-y: scroll;
      margin: 10px 0px;

      .head {
        width: 98%;
        height: 30px;
        margin: 10px 1%;
        position: relative;
        border: 1px solid;
        border-color: transparent transparent $border-darck transparent;

        input {
          display: none;
        }

        svg {
          position: absolute;
          right: 5px;
          top: 0px;
          padding: 5px;
          border-radius: 3px;
          background-color: $green;
          color: $font-light;
          cursor: pointer;
        }

        span {
          color: $font-darck;
          position: absolute;
          left: 5px;
          top: 5px;
        }
      }

      .option {
        width: 98%;
        height: 40px;
        border-radius: 5px;
        margin: 5px 1%;
        background-color: $message-light;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: $font-darck;

        .delete {
          padding: 7px 15px;
          border-radius: 5px;
          cursor: pointer;
          border: none;
          outline: none;
          color: $font-light;
          background-color: $red;
        }
      }
    }

    .options-cont::-webkit-scrollbar {
      width: 0px;
    }

    button {
      padding: 10px 20px;
      border-radius: 5px;
      border: none;
      outline: none;
      margin: 10px 0px;
      background-color: $green;
      color: $font-light;
      cursor: pointer;
    }
  }
}

.update-question-light-Arabic-open::-webkit-scrollbar {
  width: 0px;
}

.update-question-light-Arabic-close {
  @extend .update-question-darck-Arabic-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}
// darck and light Arabic Style
</style>
