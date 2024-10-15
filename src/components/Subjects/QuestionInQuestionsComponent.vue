<template>
  <div
    :class="`question-cont-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <img
      :src="this.question_data.images[0]"
      @click="GetQuestion"
      v-if="this.question_data.images && this.question_data.images.length > 0"
      alt="Image"
    />

    <!-- level color  -->
    <div :class="`level-${this.question_data.level}`"></div>
    <!-- level color  -->

    <!-- info container  -->
    <div class="info" @click="GetQuestion">
      <!-- title  -->
      <h3>
        {{ this.question_data.title }}
      </h3>
      <!-- title  -->

      <!-- class level -->
      <p>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.question_component.class_level
            : this.$store.state.Arabic.question_component.class_level
        }}
        {{ this.question_data.class_level }}sdf
      </p>
      <!-- class level -->

      <!-- points -->
      <p>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.question_component.points
            : this.$store.state.Arabic.question_component.points
        }}
        {{ this.question_data.points }}
      </p>
      <!-- points -->

      <!-- created_at -->
      <p v-if="this.question_data.created_at">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.question_component.created_at
            : this.$store.state.Arabic.question_component.created_at
        }}
        {{ this.question_data.created_at.split("T")[1] }}
      </p>
      <!-- created_at -->

      <!-- repated -->
      <div class="repated-cont" v-if="this.question_data.repated">
        <p>
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.question_component.repated
              : this.$store.state.Arabic.question_component.repated
          }}
        </p>
        <span v-for="(date, index) in this.question_data.repated" :key="index">
          {{ date }}
        </span>
      </div>
      <!-- repated -->
    </div>
    <!-- info container  -->

    <!-- buttons container  -->
    <div
      class="buttons"
      v-if="
        (this.$store.state.user &&
          this.$store.state.user.user_type == 'super') ||
        this.$store.state.user.user_type == 'admin' ||
        (this.$store.state.user.user_type == 'teacher' &&
          this.$store.state.user.user.subject == this.subject_type)
      "
    >
      <!-- update -->
      <button class="update" @click="GoToUpdateQuestion">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.question_component.update
            : this.$store.state.Arabic.question_component.update
        }}
      </button>
      <!-- update -->

      <!-- delete -->
      <button class="delete" @click="DeleteQuestion">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.question_component.delete
            : this.$store.state.Arabic.question_component.delete
        }}
      </button>
      <!-- delete -->
    </div>
    <!-- buttons container  -->
  </div>
</template>

<script>
export default {
  name: "question-component",
  data() {
    return {};
  },
  props: {
    question_data: Object,
    subject_type: String,
  },
  methods: {
    // get to question page
    GetQuestion() {
      window.location = `/qu/${this.subject_type}/${this.question_data._id}`;
    },

    // go to update question
    GoToUpdateQuestion() {
      // set the questio data to questio_data_for_update in store
      this.$store.state.question_data_for_update = this.question_data;

      // set the question's subject type
      this.$store.state.question_subject_type_for_update = this.subject_type;

      // set the question's options to questions array in store
      this.$store.state.question_options = this.question_data.options;

      // open the update question component
      this.$store.state.active_component_in_dash = "update-question-component";
    },

    // delete Question method
    DeleteQuestion() {
      // set the question id to question_id_for_delete instore
      this.$store.state.question_id_for_delete = this.question_data._id;

      // set the question type to question_subject_type_for_delete in store to select the api
      this.$store.state.question_subject_type_for_delete = this.subject_type;

      // open the delete question form
      this.$store.commit("OpenOrCloseDeleteQuestionForm");
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English style
.question-cont-darck-English {
  width: 100%;
  height: 110px;
  background-color: $card-darck;
  border-radius: 5px;
  margin: 5px 0px;
  transition-duration: 0.5s;
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
  overflow: hidden;
  direction: ltr;
  position: relative;

  img {
    width: 100px;
    height: 100px;
    margin: 0px 5px 0px 10px;
    border-radius: 5px;

    @media (max-width: $phone) {
      width: 90px;
      height: 90px;
    }
  }

  // hard level color
  .level-hard {
    width: 5px;
    height: 90%;
    position: absolute;
    left: 0px;
    border-radius: 0px 2px 2px 0px;
    background-color: $hard;
    box-shadow: 0 0 10px $hard;
  }

  // hard level color
  .level-normal {
    @extend .level-hard;
    background-color: $normal;
    box-shadow: 0 0 10px $normal;
  }

  // easy level color
  .level-easy {
    @extend .level-hard;
    background-color: $easy;
    box-shadow: 0 0 10px $easy;
  }

  .info {
    max-width: 60%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
    margin: 0px 7px;

    h3 {
      width: 100%;
      height: auto;
      color: $font-light;
    }

    p {
      padding: 3px;
      margin: 3px;
      border-radius: 3px;
      font-size: $x-small;
      background-color: $note-darck;
      color: $font-light;

      @media (max-width: $phone) {
        font-size: $xx-small;
      }
    }

    .repated-cont {
      font-size: $x-small;
      color: $font-light;
      width: 100%;
      height: auto;
      display: flex;
      justify-content: start;
      align-items: center;

      span {
        font-size: $x-small;
        padding: 3px;
        margin: 3px;
        border-radius: 3px;
        background-color: $note-darck;
        color: $font-light;

        @media (max-width: $phone) {
          font-size: $xx-small;
        }
      }

      p {
        padding: 3px;
        margin: 3px;
        border-radius: 3px;
        font-size: $x-small;
        background-color: $note-darck;
        color: $font-light;

        @media (max-width: $phone) {
          font-size: $xx-small;
          margin: 2px;
        }
      }
    }
  }

  .buttons {
    width: 20%;
    height: 100%;
    position: absolute;
    right: 0px;
    top: 0px;
    padding: 5px 5px 0px 0px;

    @media (max-width: $phone) {
      width: 15%;
    }

    .update {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      margin: 5px 0px;
      color: $font-light;
      cursor: pointer;
      background-color: $green;

      @media (max-width: $phone) {
        width: 100%;
        height: 40px;
        font-size: $xx-small;
      }
    }

    .delete {
      @extend .update;
      background-color: $red;
    }
  }
}

.question-cont-light-English {
  width: 100%;
  height: 110px;
  background-color: $card-light;
  border-radius: 5px;
  margin: 5px 0px;
  transition-duration: 0.5s;
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
  overflow: hidden;
  direction: ltr;

  img {
    width: 100px;
    height: 100px;
    margin: 0px 5px 0px 10px;
    border-radius: 5px;

    @media (max-width: $phone) {
      width: 90px;
      height: 90px;
    }
  }

  // hard level color
  .level-hard {
    width: 5px;
    height: 90%;
    position: absolute;
    left: 0px;
    border-radius: 0px 2px 2px 0px;
    background-color: $hard;
    box-shadow: 0 0 10px $hard;
  }

  // hard level color
  .level-normal {
    @extend .level-hard;
    background-color: $normal;
    box-shadow: 0 0 10px $normal;
  }

  // easy level color
  .level-easy {
    @extend .level-hard;
    background-color: $easy;
    box-shadow: 0 0 10px $easy;
  }

  .info {
    max-width: 60%;
    width: auto;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
    margin: 0px 7px;

    h3 {
      width: 100%;
      height: auto;
      color: $font-darck;
    }

    p {
      padding: 3px;
      margin: 3px;
      border-radius: 3px;
      font-size: $x-small;
      background-color: $note-light;
      color: $font-darck;

      @media (max-width: $phone) {
        font-size: $xx-small;
      }
    }

    .repated-cont {
      font-size: $x-small;
      color: $font-darck;
      width: 100%;
      height: auto;
      display: flex;
      justify-content: start;
      align-items: center;

      span {
        font-size: $x-small;
        padding: 3px;
        margin: 3px;
        border-radius: 3px;
        background-color: $note-light;
        color: $font-darck;

        @media (max-width: $phone) {
          font-size: $xx-small;
        }
      }

      p {
        padding: 3px;
        margin: 3px;
        border-radius: 3px;
        font-size: $x-small;
        background-color: $note-light;
        color: $font-darck;

        @media (max-width: $phone) {
          font-size: $xx-small;
          margin: 2px;
        }
      }
    }
  }

  .buttons {
    width: 20%;
    height: 100%;
    position: absolute;
    right: 0px;
    top: 0px;
    padding: 5px 5px 0px 0px;

    @media (max-width: $phone) {
      width: 15%;
    }

    .update {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      margin: 5px 0px;
      color: $font-light;
      cursor: pointer;
      background-color: $green;

      @media (max-width: $phone) {
        width: 100%;
        height: 40px;
        font-size: $xx-small;
      }
    }

    .delete {
      @extend .update;
      background-color: $red;
    }
  }
}
// darck and light English style

// darck and light Arabic style
.question-cont-darck-Arabic {
  width: 100%;
  height: 110px;
  background-color: $card-darck;
  border-radius: 5px;
  margin: 5px 0px;
  transition-duration: 0.5s;
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
  overflow: hidden;
  direction: rtl;
  position: relative;

  img {
    width: 100px;
    height: 100px;
    margin: 0px 5px 0px 10px;
    border-radius: 5px;

    @media (max-width: $phone) {
      width: 90px;
      height: 90px;
    }
  }

  // hard level color
  .level-hard {
    width: 5px;
    height: 90%;
    position: absolute;
    right: 0px;
    border-radius: 2px 0px 0px 2px;
    background-color: $hard;
    box-shadow: 0 0 10px $hard;
  }

  // hard level color
  .level-normal {
    @extend .level-hard;
    background-color: $normal;
    box-shadow: 0 0 10px $normal;
  }

  // easy level color
  .level-easy {
    @extend .level-hard;
    background-color: $easy;
    box-shadow: 0 0 10px $easy;
  }

  .info {
    width: 90%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
    margin: 0px 7px;

    h3 {
      width: 100%;
      height: auto;
      color: $font-light;
    }

    p {
      padding: 3px;
      margin: 3px;
      border-radius: 3px;
      font-size: $x-small;
      background-color: $note-darck;
      color: $font-light;

      @media (max-width: $phone) {
        font-size: $xx-small;
        margin: 2px;
      }
    }

    .repated-cont {
      font-size: $x-small;
      color: $font-light;
      width: 100%;
      height: auto;
      display: flex;
      justify-content: start;
      align-items: center;

      span {
        font-size: $x-small;
        padding: 3px;
        margin: 3px;
        border-radius: 3px;
        background-color: $note-darck;
        color: $font-light;

        @media (max-width: $phone) {
          font-size: $xx-small;
        }
      }

      p {
        padding: 3px;
        margin: 3px;
        border-radius: 3px;
        font-size: $x-small;
        background-color: $note-darck;
        color: $font-light;

        @media (max-width: $phone) {
          font-size: $xx-small;
          margin: 2px;
        }
      }
    }
  }

  .buttons {
    width: 20%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    padding: 0px 0px 5px 5px;

    @media (max-width: $phone) {
      width: 15%;
    }

    .update {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      margin: 5px 0px;
      color: $font-light;
      cursor: pointer;
      background-color: $green;

      @media (max-width: $phone) {
        width: 100%;
        height: 40px;
        font-size: $xx-small;
      }
    }

    .delete {
      @extend .update;
      background-color: $red;
    }
  }
}

.question-cont-light-Arabic {
  width: 100%;
  height: 110px;
  background-color: $card-light;
  border-radius: 5px;
  margin: 5px 0px;
  transition-duration: 0.5s;
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
  overflow: hidden;
  direction: rtl;
  position: relative;

  img {
    width: 100px;
    height: 100px;
    margin: 0px 10px 0px 5px;
    border-radius: 5px;

    @media (max-width: $phone) {
      width: 90px;
      height: 90px;
    }
  }

  // hard level color
  .level-hard {
    width: 5px;
    height: 90%;
    position: absolute;
    right: 0px;
    border-radius: 2px 0px 0px 2px;
    background-color: $hard;
    box-shadow: 0 0 10px $hard;
  }

  // hard level color
  .level-normal {
    @extend .level-hard;
    background-color: $normal;
    box-shadow: 0 0 10px $normal;
  }

  // easy level color
  .level-easy {
    @extend .level-hard;
    background-color: $easy;
    box-shadow: 0 0 10px $easy;
  }

  .info {
    width: 90%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
    margin: 0px 7px;

    h3 {
      width: 100%;
      height: auto;
      color: $font-darck;
    }

    p {
      padding: 3px;
      margin: 3px;
      border-radius: 3px;
      font-size: $x-small;
      background-color: $note-light;
      color: $font-darck;

      @media (max-width: $phone) {
        font-size: $xx-small;
        margin: 2px;
      }
    }

    .repated-cont {
      font-size: $x-small;
      color: $font-darck;
      width: 100%;
      height: auto;
      display: flex;
      justify-content: start;
      align-items: center;

      span {
        font-size: $x-small;
        padding: 3px;
        margin: 3px;
        border-radius: 3px;
        background-color: $note-light;
        color: $font-darck;

        @media (max-width: $phone) {
          font-size: $xx-small;
        }
      }

      p {
        padding: 3px;
        margin: 3px;
        border-radius: 3px;
        font-size: $x-small;
        background-color: $note-light;
        color: $font-darck;

        @media (max-width: $phone) {
          font-size: $xx-small;
          margin: 2px;
        }
      }
    }
  }

  .buttons {
    width: 20%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    padding: 0px 0px 5px 5px;

    @media (max-width: $phone) {
      width: 15%;
    }

    .update {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      margin: 5px 0px;
      color: $font-light;
      cursor: pointer;
      background-color: $green;

      @media (max-width: $phone) {
        width: 100%;
        height: 40px;
        font-size: $xx-small;
      }
    }

    .delete {
      @extend .update;
      background-color: $red;
    }
  }
}
// darck and light Arabic style
</style>
