<template>
  <div
    :class="`delete-form-${this.$store.state.mood}-${this.$store.state.language}-${this.$store.state.remove_food_form_dash_status}`"
  >
    <div class="header">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.remove_food_form_dash.title
          : this.$store.state.Arabic.remove_food_form_dash.title
      }}
    </div>

    <button class="delete" @click="DeleteFood">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.remove_food_form_dash.remove
          : this.$store.state.Arabic.remove_food_form_dash.remove
      }}
    </button>

    <button
      class="cancel"
      @click="this.$store.commit(`OpenOrCloseDeleteFoodForm`)"
    >
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.remove_food_form_dash.cancel
          : this.$store.state.Arabic.remove_food_form_dash.cancel
      }}
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "verify-delete-admin",
  data() {
    return {};
  },
  methods: {
    // delete plan method
    async DeleteFood() {
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
        data = {
          super_admin_id: this.$store.state.user.user._id,
          food_id: this.$store.state.food_id_for_delete,
        };
      } else if (this.$store.state.user.user_type == "admin") {
        data = {
          admin_id: this.$store.state.user.user._id,
          food_id: this.$store.state.food_id_for_delete,
        };
      }

      try {
        await axios
          .delete(
            this.$store.state.user.user_type == "super"
              ? this.$store.state.APIs.food.super.delete
              : this.$store.state.APIs.food.admin.delete,
            { data, headers }
          )
          .then(() => {
            // to stop the loading animation
            this.$store.state.loading = "close";

            // close the verify delete parent form
            this.$store.commit("OpenOrCloseDeleteFoodForm");

            // update the active component in dash
            // this.$store.state.activeactive_component_in_dash = "foods";
            window.location.reload();
          })
          .catch((error) => {
            // to stop the loading animation
            this.$store.state.loading = "close";

            // close the verify delete parent form
            this.$store.commit("OpenOrCloseDeleteFoodForm");

            // to set the reqeust's error message to error message var in store
            this.$store.state.error_message = error.response.data.message;

            // to open the error form
            this.$store.state.error_form_status = "open";
          });
      } catch (error) {
        // to stop the loading animation
        this.$store.state.loading = "close";

        // close the verify delete parent form
        this.$store.commit("OpenOrCloseDeleteFoodForm");

        // to set the reqeust's error message to error message var in store
        this.$store.state.error_message = error.response.data.message;

        // to open the error form
        this.$store.state.error_form_status = "open";
      }
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

.delete-form-light-Arabic-close {
  @extend .delete-form-light-Arabic-open;
  top: -50%;
  z-index: -50;
}
// darck and light Arabic style
</style>
