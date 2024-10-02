<template>
  <div
    :class="`delete-form-${this.$store.state.mood}-${this.$store.state.language}-${this.$store.state.delete_class_form_status}`"
  >
    <div class="header">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.delete_class_form.title
          : this.$store.state.Arabic.delete_class_form.title
      }}
    </div>

    <button class="delete" @click="DeleteClass">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.delete_class_form.delete
          : this.$store.state.Arabic.delete_class_form.delete
      }}
    </button>
    <button
      class="cancel"
      @click="this.$store.commit('OpenOrCloseDeleteClassForm')"
    >
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.delete_class_form.cancel
          : this.$store.state.Arabic.delete_class_form.cancel
      }}
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "verify-delete-class",
  data() {
    return {
      // api
      api: "",
    };
  },
  methods: {
    // delete class method
    async DeleteClass() {
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
        // select the api
        this.api = this.$store.state.APIs.classes.super.delete;

        // add the data to body
        data = {
          super_admin_id: this.$store.state.user.user._id,
          class_id: this.$store.state.class_id_for_delete,
        };
      } else if (this.$store.state.user.user_type == "admin") {
        // select the api
        this.api = this.$store.state.APIs.classes.admin.delete;

        // add the data to body
        data = {
          admin_id: this.$store.state.user.user._id,
          class_id: this.$store.state.class_id_for_delete,
        };
      } else if (this.$store.state.user.user_type == "teacher") {
        // select the api
        this.api = this.$store.state.APIs.classes.teacher.delete;

        // add the data to body
        data = {
          teacher_id: this.$store.state.user.user._id,
          class_id: this.$store.state.class_id_for_delete,
        };
      }

      await axios
        .delete(
          // this.$store.state.user.user_type == "super"
          //   ? this.$store.state.APIs.classes.super.delete
          //   : this.$store.state.APIs.classes.admin.delete,
          this.api,
          { data, headers }
        )
        .then(() => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // close the verify delete class form
          this.$store.commit("OpenOrCloseDeleteClassForm");

          window.location.reload();
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // close the verify delete class form
          this.$store.commit("OpenOrCloseDeleteClassForm");

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
@import "../../../../../Sass/varibels/variables";

// darck and light English style
.delete-form-darck-English-open {
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

.delete-form-darck-English-close {
  @extend .delete-form-darck-English-open;
  top: -50%;
  z-index: -50;
}

.delete-form-light-English-open {
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

.delete-form-light-English-close {
  @extend .delete-form-light-English-open;
  top: -50%;
  z-index: -50;
}
// darck and light English style

// darck and light Arabic style
.delete-form-darck-Arabic-open {
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

.delete-form-darck-Arabic-close {
  @extend .delete-form-darck-Arabic-open;
  top: -50%;
  z-index: -50;
}

.delete-form-light-Arabic-open {
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

.delete-form-light-Arabic-close {
  @extend .delete-form-light-Arabic-open;
  top: -50%;
  z-index: -50;
}
// darck and light Arabic style
</style>
