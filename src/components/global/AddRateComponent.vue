<template>
  <div
    :class="`add-rate-${this.$store.state.mood}-${this.$store.state.language}-${this.$store.state.add_rate_form_status}`"
  >
    <div class="header">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.rate_form.header
          : this.$store.state.Arabic.rate_form.header
      }}

      <icon icon="xmark" @click="this.$store.commit('OpenOrCloseAddRate')" />
    </div>

    <!-- stars section  -->
    <div class="form">
      <label for="rate">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.rate_form.label
            : this.$store.state.Arabic.rate_form.label
        }}
      </label>

      <input
        type="number"
        id="rate"
        v-model="this.rate"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.rate_form.placeholder
            : this.$store.state.Arabic.rate_form.placeholder
        "
      />

      <button @click="AdRate">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.rate_form.add
            : this.$store.state.Arabic.rate_form.add
        }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "add-rate-component",
  data() {
    return {
      // status
      status: "close",
      // arte
      rate: "",
    };
  },
  components: {},
  mounted() {
    // to open the component smoothy
    setTimeout(() => {
      this.status = "open";
    }, 200);
  },
  methods: {
    // add rate method
    async AdRate() {
      // to open the loading animation
      this.$store.state.loading = "open";

      // craete headers
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // body data
      const body_data = {
        teacher_id: this.$store.state.teacher_id_for_add_rate,
        student_id: this.$store.state.user.user._id,
        rate: this.rate,
      };

      await axios
        .put(this.$store.state.APIs.students.add_rate, body_data, { headers })
        .then(() => {
          // to open the loading animation
          this.$store.state.loading = "close";

          // to close the form
          this.$store.commit("OpenOrCloseAddRate");
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // to close the form
          this.$store.commit("OpenOrCloseAddRate");

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English style
.add-rate-darck-English-open {
  width: 40%;
  height: 30%;
  border-radius: 10px;
  backdrop-filter: blur(100px);
  box-shadow: 0 0 5px $black;
  position: fixed;
  top: 10%;
  left: 30%;
  z-index: 50;
  transition-duration: 0.5s;
  direction: ltr;
  padding: 5px;

  @media (max-width: $phone) {
    width: 80%;
    left: 10%;
    height: 20%;
  }

  .header {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $font-light;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    position: relative;

    svg {
      position: absolute;
      right: 5px;
      top: 10px;
      font-size: $large;
      color: $font-light;
      cursor: pointer;
    }
  }

  .form {
    width: 100%;
    height: auto;
    margin: 5px 0px 0px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;

    label {
      width: 100%;
      height: 30px;
      padding: 5px 0px;
      margin: 5px 0px;
      color: $font-light;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
    }

    input {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      padding: 0px 10px;
      background-color: $message-light;
    }

    button {
      width: 100%;
      height: 40px;
      margin: 5px 0px;
      border: none;
      outline: none;
      color: $font-light;
      border-radius: 5px;
      cursor: pointer;
      background-color: $green;
    }
  }
}

.add-rate-darck-English-close {
  @extend .add-rate-darck-English-open;
  top: -100%;
}

.add-rate-light-English-open {
  width: 40%;
  height: 30%;
  border-radius: 10px;
  backdrop-filter: blur(100px);
  box-shadow: 0 0 5px $black;
  position: fixed;
  top: 10%;
  left: 30%;
  z-index: 50;
  transition-duration: 0.5s;
  direction: ltr;
  padding: 5px;

  @media (max-width: $phone) {
    width: 80%;
    left: 10%;
    height: 20%;
  }

  .header {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $font-darck;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
    position: relative;

    svg {
      position: absolute;
      right: 5px;
      top: 10px;
      font-size: $large;
      color: $font-darck;
      cursor: pointer;
    }
  }

  .form {
    width: 100%;
    height: auto;
    margin: 5px 0px 0px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;

    label {
      width: 100%;
      height: 30px;
      padding: 5px 0px;
      margin: 5px 0px;
      color: $font-darck;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
    }

    input {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      padding: 0px 10px;
      background-color: $message-light;
    }

    button {
      width: 100%;
      height: 40px;
      margin: 5px 0px;
      border: none;
      outline: none;
      color: $font-light;
      border-radius: 5px;
      cursor: pointer;
      background-color: $green;
    }
  }
}

.add-rate-light-English-close {
  @extend .add-rate-light-English-open;
  top: -100%;
}
// darck and light English style

// darck and light Arabic style
.add-rate-darck-Arabic-open {
  width: 40%;
  height: 30%;
  border-radius: 10px;
  backdrop-filter: blur(100px);
  box-shadow: 0 0 5px $black;
  position: fixed;
  top: 10%;
  left: 30%;
  z-index: 50;
  transition-duration: 0.5s;
  direction: rtl;
  padding: 5px;

  @media (max-width: $phone) {
    width: 80%;
    left: 10%;
    height: 20%;
  }

  .header {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $font-light;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    position: relative;

    svg {
      position: absolute;
      right: 5px;
      top: 10px;
      font-size: $large;
      color: $font-light;
      cursor: pointer;
    }
  }

  .form {
    width: 100%;
    height: auto;
    margin: 5px 0px 0px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;

    label {
      width: 100%;
      height: 30px;
      padding: 5px 0px;
      margin: 5px 0px;
      color: $font-light;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
    }

    input {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      padding: 0px 10px;
      background-color: $message-light;
    }

    button {
      width: 100%;
      height: 40px;
      margin: 5px 0px;
      border: none;
      outline: none;
      color: $font-light;
      border-radius: 5px;
      cursor: pointer;
      background-color: $green;
    }
  }
}

.add-rate-darck-Arabic-close {
  @extend .add-rate-darck-Arabic-open;
  top: -100%;
}

.add-rate-light-Arabic-open {
  width: 40%;
  height: 30%;
  border-radius: 10px;
  backdrop-filter: blur(100px);
  box-shadow: 0 0 5px $black;
  position: fixed;
  top: 10%;
  left: 30%;
  z-index: 50;
  transition-duration: 0.5s;
  direction: rtl;
  padding: 5px;

  @media (max-width: $phone) {
    width: 80%;
    left: 10%;
    height: 20%;
  }

  .header {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $font-darck;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
    position: relative;

    svg {
      position: absolute;
      right: 5px;
      top: 10px;
      font-size: $large;
      color: $font-darck;
      cursor: pointer;
    }
  }

  .form {
    width: 100%;
    height: auto;
    margin: 5px 0px 0px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;

    label {
      width: 100%;
      height: 30px;
      padding: 5px 0px;
      margin: 5px 0px;
      color: $font-darck;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
    }

    input {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      padding: 0px 10px;
      background-color: $message-light;
    }

    button {
      width: 100%;
      height: 40px;
      margin: 5px 0px;
      border: none;
      outline: none;
      color: $font-light;
      border-radius: 5px;
      cursor: pointer;
      background-color: $green;
    }
  }
}

.add-rate-light-Arabic-close {
  @extend .add-rate-light-Arabic-open;
  top: -100%;
}
// darck and light Arabic style
</style>
