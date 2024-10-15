<template>
  <div
    :class="`delete-form-${this.$store.state.mood}-${this.$store.state.language}-${this.$store.state.delete_question_form_status}`"
  >
    <div class="header">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.delete_question_form.title
          : this.$store.state.Arabic.delete_question_form.title
      }}
    </div>

    <!-- delete question button  -->
    <button class="delete" @click="DeleteQuestion">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.delete_question_form.delete
          : this.$store.state.Arabic.delete_question_form.delete
      }}
    </button>
    <!-- delete question button  -->

    <!-- cancel button  -->
    <button
      class="cancel"
      @click="this.$store.commit('OpenOrCloseDeleteQuestionForm')"
    >
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.delete_question_form.cancel
          : this.$store.state.Arabic.delete_question_form.cancel
      }}
    </button>
    <!-- cancel button  -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "verify-delete-question",
  data() {
    return {
      // APIS
      APIS: "",
      // api
      api: "",
    };
  },
  methods: {
    // select the api type by subject name
    SelectApi() {
      switch (this.$store.state.question_subject_type_for_delete) {
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

    // delete question method
    async DeleteQuestion() {
      // call to select APIS method
      this.SelectApi();

      // to start the loading animation
      this.$store.state.loading = "open";

      // create headers
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // create body data
      let data;

      // check if the user is super
      if (this.$store.state.user.user_type == "super") {
        // set the api
        this.api = this.APIS.super.delete;

        // update the body data
        data = {
          super_admin_id: this.$store.state.user.user._id,
          question_id: this.$store.state.question_id_for_delete,
        };
      } else if (this.$store.state.user.user_type == "admin") {
        // set the api
        this.api = this.APIS.admin.delete;

        // update the body data
        data = {
          admin_id: this.$store.state.user.user._id,
          question_id: this.$store.state.question_id_for_delete,
        };
      } else if (this.$store.state.user.user_type == "teacher") {
        // set the api
        this.api = this.APIS.teacher.delete;

        // update the body data
        data = {
          teacher_id: this.$store.state.user.user._id,
          question_id: this.$store.state.question_id_for_delete,
        };
      }
      await axios
        .delete(this.api, { data, headers })
        .then(() => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // close the verify delete student form
          this.$store.commit("OpenOrCloseDeleteQuestionForm");

          window.location.reload();
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // close the verify delete student form
          this.$store.commit("OpenOrCloseDeleteQuestionForm");

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },
  },
};
</script>
