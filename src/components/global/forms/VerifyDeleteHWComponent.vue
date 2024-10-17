<template>
  <div
    id="testtt"
    :class="`verify-delete-hw-${this.$store.state.mood}-${this.$store.state.delete_hw_form_status}-${this.$store.state.language}`"
  >
    <h3 class="header">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.delete_hw_form.message
          : this.$store.state.Arabic.delete_hw_form.message
      }}
    </h3>
    <button class="delete" @click="deleteHW">Delete</button>
    <button class="cancel" @click="this.$store.commit('OpenOrCloseDeleteHW')">
      Cancel
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "verify-delete-home-work-form",
  data() {
    return {
      api: "",
      body: "",
    };
  },
  mounted() {
    if (this.$store.state.user.user_type == "super") {
      this.api = this.$store.state.APIs.home_works.super.delete;
    } else if (this.$store.state.user.user_type == "admin") {
      this.api = this.$store.state.APIs.home_works.admin.delete;
    } else if (this.$store.state.user.user_type == "teacher") {
      this.api = this.$store.state.APIs.home_works.teacher.delete;
    }
  },
  props: {
    home_work_id: String,
  },
  methods: {
    SelectBody() {
      if (this.$store.state.user.user_type == "super") {
        this.body = {
          super_admin_id: this.$store.state.user.user._id,
          home_work_id: this.$store.state.home_work._id,
        };
      } else if (this.$store.state.user.user_type == "admin") {
        this.body = {
          admin_id: this.$store.state.user.user._id,
          home_work_id: this.$store.state.home_work._id,
        };
      } else if (this.$store.state.user.user_type == "teacher") {
        this.body = {
          teacher_id: this.$store.state.user.user._id,
          home_work_id: this.$store.state.home_work._id,
        };
      }
    },

    // delete home work method
    async deleteHW() {
      // to start the loading animation
      this.$store.state.loading = "open";

      // to close confirm form
      this.$store.state.delete_hw_form_status = "close";

      // call to select the body method
      this.SelectBody();

      // create headers
      const config = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      try {
        await axios
          .delete(this.api, { data: this.body, headers: config })
          .then(() => {
            // to stope the loading animation
            this.$store.state.loading = "close";

            // to remove the class data from store to reload whene send user to class page
            this.$store.state.class = "";

            // send the user to class page
            window.location = `/class/${this.$store.state.home_work.class_id._id}`;
          })
          .catch((error) => {
            // to stope the loading animation
            this.$store.state.loading = "close";

            // to set the error message to error message var in store
            this.$store.state.error_message = error.response.data.message;

            // to open the error from
            this.$store.state.error_form_status = "open";
          });
      } catch (error) {
        // to set the error message to error message var in store
        this.$store.state.error_message = error.response.data.message;

        // to open the error from
        this.$store.state.error_form_status = "open";
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../../Sass/varibels/variables";

// darck and light English style
.verify-delete-hw-darck-open-English {
  width: 60%;
  height: 30%;
  backdrop-filter: blur(70px);
  border-radius: 10px;
  position: absolute;
  top: 35%;
  left: 20%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  transition-duration: 0.5s;
  z-index: 50;
  box-shadow: 0 0 10px $black;

  @media (max-width: $phone) {
    height: 20%;
    width: 90%;
    left: 5%;
    top: 40%;
  }

  .header {
    width: 100%;
    height: 20%;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    color: $font-light;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -2%;
  }

  .delete {
    padding: 10px 20px;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: $red;
    color: $font-light;
  }

  .cancel {
    padding: 10px 20px;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: $green;
    color: $font-light;
  }
}

#testtt {
  background-color: red;
}

.delete-form-darck-English-close {
  @extend .verify-delete-hw-darck-open-English;
  top: -50%;
  z-index: -50;
}

.verify-delete-hw-light-close-English {
  width: 60%;
  height: 30%;
  backdrop-filter: blur(70px);
  border-radius: 10px;
  position: absolute;
  top: 35%;
  left: 20%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  transition-duration: 0.5s;
  z-index: 50;
  box-shadow: 0 0 10px $black;

  @media (max-width: $phone) {
    height: 20%;
    width: 90%;
    left: 5%;
    top: 40%;
  }

  .header {
    width: 100%;
    height: 20%;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
    color: $font-darck;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -2%;
  }

  .delete {
    padding: 10px 20px;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: $red;
    color: $font-light;
  }

  .cancel {
    padding: 10px 20px;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: $green;
    color: $font-light;
  }
}

.verify-delete-hw-light-close-English {
  @extend .verify-delete-hw-light-close-English;
  top: -50%;
  z-index: -50;
}
// darck and light English style

// darck and light Arabic style
.verify-delete-hw-darck-open-Arabic {
  width: 60%;
  height: 30%;
  backdrop-filter: blur(70px);
  border-radius: 10px;
  position: absolute;
  top: 35%;
  left: 20%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  transition-duration: 0.5s;
  z-index: 50;
  box-shadow: 0 0 10px $black;

  @media (max-width: $phone) {
    height: 20%;
    width: 90%;
    left: 5%;
    top: 40%;
  }

  .header {
    width: 100%;
    height: 20%;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    color: $font-light;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -2%;
  }

  .delete {
    padding: 10px 20px;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: $red;
    color: $font-light;
  }

  .cancel {
    padding: 10px 20px;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: $green;
    color: $font-light;
  }
}

.verify-delete-hw-darck-close-Arabic {
  @extend .verify-delete-hw-darck-open-Arabic;
  top: -50%;
  z-index: -50;
}

.verify-delete-hw-light-open-Arabic {
  width: 60%;
  height: 30%;
  backdrop-filter: blur(70px);
  border-radius: 10px;
  position: absolute;
  top: 35%;
  left: 20%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  transition-duration: 0.5s;
  z-index: 50;
  box-shadow: 0 0 10px $black;

  @media (max-width: $phone) {
    height: 20%;
    width: 90%;
    left: 5%;
    top: 40%;
  }

  .header {
    width: 100%;
    height: 20%;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
    color: $font-darck;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -2%;
  }

  .delete {
    padding: 10px 20px;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: $red;
    color: $font-light;
  }

  .cancel {
    padding: 10px 20px;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: $green;
    color: $font-light;
  }
}

.verify-delete-hw-light-close-Arabic {
  @extend .verify-delete-hw-darck-open-Arabic;
  top: -50%;
  z-index: -50;
}
// darck and light Arabic style
</style>
