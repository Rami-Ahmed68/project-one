<template>
  <div
    :class="`choose-class-${this.$store.state.mood}-${this.$store.state.language}-${this.$store.state.choose_class_status}`"
  >
    <div class="header">
      <h3>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.choose_class_form.title
            : this.$store.state.Arabic.choose_class_form.title
        }}
      </h3>
      <icon icon="xmark" @click="CloseForm" />
    </div>

    <div class="search">
      <input
        v-model="this.class_id"
        type="text"
        :placeholder="
          this.$store.state.language == `English`
            ? this.$store.state.English.choose_class_form.placeholder
            : this.$store.state.Arabic.choose_class_form.placeholder
        "
      />
      <button @click="GetClass">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.choose_class_form.button
            : this.$store.state.Arabic.choose_class_form.button
        }}
      </button>
    </div>

    <div class="cards">
      <h4>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.choose_class_form.section_title
            : this.$store.state.Arabic.choose_class_form.section_title
        }}
      </h4>

      <div class="card" v-if="this.$store.state.geted_class">
        <img :src="this.$store.state.geted_class.cover" alt="cover" />

        <div class="info">
          <h3>{{ this.$store.state.geted_class.title }}</h3>

          <p>🏫🪜🎚️ : {{ this.$store.state.geted_class.class_level }}</p>

          <p>📚📖📑 : {{ this.$store.state.geted_class.subject }}</p>

          <p v-if="this.$store.state.geted_class">
            🏚️💯🔝 : {{ this.$store.state.geted_class.home_works.length }}
          </p>

          <p v-if="this.$store.state.geted_class">
            👨‍🎓 : {{ this.$store.state.geted_class.students.length }}
          </p>
        </div>

        <!-- add button  -->
        <button @click="selectClass">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.choose_class_form.select
              : this.$store.state.Arabic.choose_class_form.select
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
  name: "choose-class",
  data() {
    return {
      // class id
      class_id: "",
    };
  },
  methods: {
    // Get Teacher by id
    async GetClass() {
      // to start the loading animation
      this.$store.state.loading = "open";

      await axios
        .get(this.$store.state.APIs.classes.get_one, {
          params: {
            class_id: this.class_id.split("/")[1],
          },
        })
        .then((response) => {
          // to stope the loading animation
          this.$store.state.loading = "close";

          // set the geted class to class data in store
          this.$store.state.geted_class = response.data.class_data;
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // to emptying the geted_class in store
          this.$store.state.geted_class = "";

          // open the error from
          this.$store.state.error_form_status = "open";

          // set the error message to error message in store
          this.$store.state.error_message = error.response.data.message;
        });
    },

    // select class
    async selectClass() {
      this.$store.state.choosed_class = this.$store.state.geted_class;
    },

    // close form
    CloseForm() {
      // to emptyin the geted class in store
      this.$store.state.geted_class = "";

      // to close the form
      this.$store.commit("ChooseClass");

      // to emptying the class id var in data
      this.class = "";
    },
  },
};
</script>

<style lang="scss">
@import "../../../../../Sass/varibels/variables";

// darck  and light English style
.choose-class-darck-English-open {
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

        .editor {
          @extend p;
          background-color: $green;
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

.choose-class-darck-English-close {
  @extend .choose-class-darck-English-open;
  top: -50%;
  opacity: 0;
}

.choose-class-light-English-open {
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

        .editor {
          @extend p;
          background-color: $green;
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

.choose-class-light-English-close {
  @extend .choose-class-light-English-open;
  top: -50%;
  opacity: 0;
}
// darck  and light English style

// darck  and light Arabic style
.choose-class-darck-Arabic-open {
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

        .editor {
          @extend p;
          background-color: $green;
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

.choose-class-darck-Arabic-close {
  @extend .choose-class-darck-Arabic-open;
  top: -50%;
  opacity: 0;
}

.choose-class-light-Arabic-open {
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

        .editor {
          @extend p;
          background-color: $green;
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

.choose-class-light-Arabic-close {
  @extend .choose-class-light-Arabic-open;
  top: -50%;
  opacity: 0;
}
// darck  and light Arabic style
</style>
