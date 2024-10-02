<template>
  <div
    :class="`choose-children-${this.$store.state.mood}-${this.$store.state.language}-${this.$store.state.choose_children_status}`"
  >
    <div class="header">
      <h3>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.choose_children_form.title
            : this.$store.state.Arabic.choose_children_form.title
        }}
      </h3>
      <icon icon="xmark" @click="CloseForm" />
    </div>

    <div class="search">
      <input
        v-model="this.student_id"
        type="text"
        :placeholder="
          this.$store.state.language == `English`
            ? this.$store.state.English.choose_children_form.placeholder
            : this.$store.state.Arabic.choose_children_form.placeholder
        "
      />
      <button @click="GetStudent">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.choose_children_form.button
            : this.$store.state.Arabic.choose_children_form.button
        }}
      </button>
    </div>

    <div class="cards">
      <h4>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.choose_children_form.section_title
            : this.$store.state.Arabic.choose_children_form.section_title
        }}
      </h4>

      <div class="card" v-if="this.$store.state.geted_student">
        <img :src="this.$store.state.geted_student.avatar" alt="avatar" />

        <div class="info">
          <h3>{{ this.$store.state.geted_student.name }}</h3>

          <p>
            ⚧️ : {{ this.$store.state.geted_student.gender }}
            {{ this.$store.state.geted_student.gender == "male" ? "🚹" : "🚺" }}
          </p>
          <p v-if="this.$store.state.geted_student.class">
            {{ this.$store.state.geted_student.class.length }}
          </p>
          <p>🏫🪜🎚️ : {{ this.$store.state.geted_student.class_level }}</p>
          <p>📆 : {{ this.$store.state.geted_student.birth_date }}</p>
          <p>📝📑🔖 : {{ this.$store.state.geted_student.finished_exams }}</p>
          <p>📍 : {{ this.$store.state.geted_student.points }}</p>
          <p>📌 : {{ this.$store.state.geted_student.total_gpa }}</p>
        </div>

        <!-- add button  -->
        <button @click="addChild">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.choose_children_form.add_button
              : this.$store.state.Arabic.choose_children_form.add_button
          }}
        </button>
        <!-- add button -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "choose-children",
  data() {
    return {
      // student id
      student_id: "",
    };
  },
  methods: {
    // Get Student by id
    async GetStudent() {
      // to start the loading animation
      this.$store.state.loading = "open";

      await axios
        .get(this.$store.state.APIs.students.get_one, {
          params: {
            student_id: this.student_id.split("/")[1],
          },
        })
        .then((response) => {
          // to stope the loading animation
          this.$store.state.loading = "close";

          // set the geted student to student data in store
          this.$store.state.geted_student = response.data.user_data;
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // to emptying the geted_student in store
          this.$store.state.geted_student = "";

          // open the error from
          this.$store.state.error_form_status = "open";

          // set the error message to error message in store
          this.$store.state.error_message = error.response.data.message;
        });
    },

    // add the child
    addChild() {
      // find and check to exists studnet in array
      const existingStudent = this.$store.state.choosed_children.find(
        (student) => student._id === this.$store.state.geted_student._id
      );

      if (!existingStudent) {
        // add the student
        this.$store.state.choosed_children.push({
          name: this.$store.state.geted_student.name,
          avatar: this.$store.state.geted_student.avatar,
          _id: this.$store.state.geted_student._id,
        });
      }
    },

    // close form
    CloseForm() {
      // to emptyin thegeted student in store
      this.$store.state.geted_student = "";

      // to close the form
      this.$store.commit("ChooseChildren");

      // to emptying the student idvar in data
      this.student_id = "";
    },
  },
};
</script>

<style lang="scss">
@import "../../../../../Sass/varibels/variables";
// darck  and light English style
.choose-children-darck-English-open {
  width: 70%;
  height: 50%;
  position: fixed;
  top: 25%;
  left: 15%;
  border-radius: 10px;
  background-color: $body-darck;
  box-shadow: 0 0 10px $black;
  transition-duration: 0.5s;
  opacity: 1;

  @media (max-width: $phone) {
    width: 90%;
    height: 30%;
    top: 35%;
    left: 5%;
  }

  .header {
    width: 100%;
    height: 20%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;

    h3 {
      width: 100%;
      height: auto;
      color: $font-light;
      text-align: center;
    }

    svg {
      position: absolute;
      right: 20px;
      top: 20px;
      font-size: $x-large;
      color: $font-light;
      transition-duration: 0.5s;
      cursor: pointer;

      @media (max-width: $phone) {
        right: 10px;
        top: 10px;
      }
    }

    svg:hover {
      color: $blue;
    }
  }

  .search {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    input {
      width: 80%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      padding-left: 10px;
      @media (max-width: $phone) {
        width: 70%;
      }
    }

    button {
      padding: 10px 20px;
      border: none;
      outline: none;
      color: $font-light;
      background-color: $green;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  .cards {
    width: 98%;
    height: 55%;
    margin: 0% 1%;
    border-radius: 5px;
    background-color: $card-darck;

    h4 {
      width: 98%;
      height: 30px;
      margin: 1%;
      padding: 5px 0px;
      color: $font-light;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
    }

    .card {
      width: 98%;
      height: 100px;
      margin: 3% 1% 1% 1%;
      border-radius: 5px;
      background-color: $body-darck;
      border-radius: 5px;
      display: flex;
      justify-content: start;
      align-items: center;

      img {
        width: 90px;
        height: 90px;
        border-radius: 5px;
        margin: 0px 5px;
      }

      .info {
        width: 70%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        margin: 0px 5px;

        h3 {
          width: 100%;
          height: auto;
          color: $font-light;
        }

        p {
          padding: 3px;
          border-radius: 3px;
          color: $font-light;
          background-color: $card-darck;
          font-size: $x-small;
          margin: 3px;

          @media (max-width: $phone) {
            font-size: $xx-small;
            margin: 1px;
          }
        }
      }

      button {
        padding: 7px 15px;
        border-radius: 5px;
        background-color: $green;
        cursor: pointer;
        color: $font-light;
        border: none;
        outline: none;
        margin: 0px 5px;
      }
    }
  }
}

.choose-children-darck-English-close {
  @extend .choose-children-darck-English-open;
  top: -50%;
  opacity: 0;
}

.choose-children-light-English-open {
  width: 70%;
  height: 50%;
  position: fixed;
  top: 25%;
  left: 15%;
  border-radius: 10px;
  background-color: $body-light;
  box-shadow: 0 0 10px $black;
  transition-duration: 0.5s;
  opacity: 1;

  @media (max-width: $phone) {
    width: 90%;
    height: 30%;
    top: 35%;
    left: 5%;
  }

  .header {
    width: 100%;
    height: 20%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;

    h3 {
      width: 100%;
      height: auto;
      color: $font-darck;
      text-align: center;
    }

    svg {
      position: absolute;
      right: 20px;
      top: 20px;
      font-size: $x-large;
      color: $font-darck;
      transition-duration: 0.5s;
      cursor: pointer;

      @media (max-width: $phone) {
        right: 10px;
        top: 10px;
      }
    }

    svg:hover {
      color: $blue;
    }
  }

  .search {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    input {
      width: 80%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      padding-left: 10px;
      @media (max-width: $phone) {
        width: 70%;
      }
    }

    button {
      padding: 10px 20px;
      border: none;
      outline: none;
      color: $font-light;
      background-color: $green;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  .cards {
    width: 98%;
    height: 55%;
    margin: 0% 1%;
    border-radius: 5px;
    background-color: $card-light;

    h4 {
      width: 98%;
      height: 30px;
      margin: 1%;
      padding: 5px 0px;
      color: $font-darck;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
    }

    .card {
      width: 98%;
      height: 100px;
      margin: 3% 1% 1% 1%;
      border-radius: 5px;
      background-color: $body-light;
      border-radius: 5px;
      display: flex;
      justify-content: start;
      align-items: center;

      img {
        width: 90px;
        height: 90px;
        border-radius: 5px;
        margin: 0px 5px;
      }

      .info {
        width: 70%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        margin: 0px 5px;

        h3 {
          width: 100%;
          height: auto;
          color: $font-darck;
        }

        p {
          padding: 3px;
          border-radius: 3px;
          color: $font-darck;
          background-color: $card-light;
          font-size: $x-small;
          margin: 3px;

          @media (max-width: $phone) {
            font-size: $xx-small;
            margin: 1px;
          }
        }
      }

      button {
        padding: 7px 15px;
        border-radius: 5px;
        background-color: $green;
        cursor: pointer;
        color: $font-light;
        border: none;
        outline: none;
        margin: 0px 5px;
      }
    }
  }
}

.choose-children-light-English-close {
  @extend .choose-children-light-English-open;
  top: -50%;
  opacity: 0;
}
// darck  and light English style

// darck  and light Arabic style
.choose-children-darck-Arabic-open {
  width: 70%;
  height: 50%;
  position: fixed;
  top: 25%;
  left: 15%;
  border-radius: 10px;
  background-color: $body-darck;
  box-shadow: 0 0 10px $black;
  transition-duration: 0.5s;
  opacity: 1;

  @media (max-width: $phone) {
    width: 90%;
    height: 30%;
    top: 35%;
    left: 5%;
  }

  .header {
    width: 100%;
    height: 20%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;

    h3 {
      width: 100%;
      height: auto;
      color: $font-light;
      text-align: center;
    }

    svg {
      position: absolute;
      right: 20px;
      top: 20px;
      font-size: $x-large;
      color: $font-light;
      transition-duration: 0.5s;
      cursor: pointer;

      @media (max-width: $phone) {
        right: 10px;
        top: 10px;
      }
    }

    svg:hover {
      color: $blue;
    }
  }

  .search {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    input {
      width: 80%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      padding-left: 10px;
      @media (max-width: $phone) {
        width: 70%;
      }
    }

    button {
      padding: 10px 20px;
      border: none;
      outline: none;
      color: $font-light;
      background-color: $green;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  .cards {
    width: 98%;
    height: 55%;
    margin: 0% 1%;
    border-radius: 5px;
    background-color: $card-darck;

    h4 {
      width: 98%;
      height: 30px;
      margin: 1%;
      padding: 5px 0px;
      color: $font-light;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
    }

    .card {
      width: 98%;
      height: 100px;
      margin: 3% 1% 1% 1%;
      border-radius: 5px;
      background-color: $body-darck;
      border-radius: 5px;
      display: flex;
      justify-content: start;
      align-items: center;

      img {
        width: 90px;
        height: 90px;
        border-radius: 5px;
        margin: 0px 5px;
      }

      .info {
        width: 70%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        margin: 0px 5px;

        h3 {
          width: 100%;
          height: auto;
          color: $font-light;
        }

        p {
          padding: 3px;
          border-radius: 3px;
          color: $font-light;
          background-color: $card-darck;
          font-size: $x-small;
          margin: 3px;

          @media (max-width: $phone) {
            font-size: $xx-small;
            margin: 1px;
          }
        }
      }

      button {
        padding: 7px 15px;
        border-radius: 5px;
        background-color: $green;
        cursor: pointer;
        color: $font-light;
        border: none;
        outline: none;
        margin: 0px 5px;
      }
    }
  }
}

.choose-children-darck-Arabic-close {
  @extend .choose-children-darck-Arabic-open;
  top: -50%;
  opacity: 0;
}

.choose-children-light-Arabic-open {
  width: 70%;
  height: 50%;
  position: fixed;
  top: 25%;
  left: 15%;
  border-radius: 10px;
  background-color: $body-light;
  box-shadow: 0 0 10px $black;
  transition-duration: 0.5s;
  opacity: 1;

  @media (max-width: $phone) {
    width: 90%;
    height: 30%;
    top: 35%;
    left: 5%;
  }

  .header {
    width: 100%;
    height: 20%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;

    h3 {
      width: 100%;
      height: auto;
      color: $font-darck;
      text-align: center;
    }

    svg {
      position: absolute;
      right: 20px;
      top: 20px;
      font-size: $x-large;
      color: $font-darck;
      transition-duration: 0.5s;
      cursor: pointer;

      @media (max-width: $phone) {
        right: 10px;
        top: 10px;
      }
    }

    svg:hover {
      color: $blue;
    }
  }

  .search {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    input {
      width: 80%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      padding-left: 10px;
      @media (max-width: $phone) {
        width: 70%;
      }
    }

    button {
      padding: 10px 20px;
      border: none;
      outline: none;
      color: $font-light;
      background-color: $green;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  .cards {
    width: 98%;
    height: 55%;
    margin: 0% 1%;
    border-radius: 5px;
    background-color: $card-light;

    h4 {
      width: 98%;
      height: 30px;
      margin: 1%;
      padding: 5px 0px;
      color: $font-darck;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
    }

    .card {
      width: 98%;
      height: 100px;
      margin: 3% 1% 1% 1%;
      border-radius: 5px;
      background-color: $body-light;
      border-radius: 5px;
      display: flex;
      justify-content: start;
      align-items: center;

      img {
        width: 90px;
        height: 90px;
        border-radius: 5px;
        margin: 0px 5px;
      }

      .info {
        width: 70%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        margin: 0px 5px;

        h3 {
          width: 100%;
          height: auto;
          color: $font-darck;
        }

        p {
          padding: 3px;
          border-radius: 3px;
          color: $font-darck;
          background-color: $card-light;
          font-size: $x-small;
          margin: 3px;

          @media (max-width: $phone) {
            font-size: $xx-small;
            margin: 1px;
          }
        }
      }

      button {
        padding: 7px 15px;
        border-radius: 5px;
        background-color: $green;
        cursor: pointer;
        color: $font-light;
        border: none;
        outline: none;
        margin: 0px 5px;
      }
    }
  }
}

.choose-children-light-Arabic-close {
  @extend .choose-children-light-Arabic-open;
  top: -50%;
  opacity: 0;
}
// darck  and light Arabic style
</style>
