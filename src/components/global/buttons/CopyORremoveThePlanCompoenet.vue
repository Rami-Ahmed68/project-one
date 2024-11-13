<template>
  <button
    @click="CopyPlan"
    :class="`btn-${this.$store.state.theme}`"
    v-if="this.method_type == 'copy'"
  >
    {{
      this.$store.state.language == "English"
        ? this.$store.state.English.plan_page.buttons.copy
        : this.$store.state.Arabic.plan_page.buttons.remove
    }}
  </button>

  <button
    @click="RemovePlan"
    :class="`btn-${this.$store.state.theme}`"
    v-if="this.method_type == 'remove'"
  >
    {{
      this.$store.state.language == "Arabic"
        ? this.$store.state.Arabic.plan_page.buttons.copy
        : this.$store.state.English.plan_page.buttons.remove
    }}
  </button>
</template>

<script>
import axios from "axios";

export default {
  name: "copy-remove-plan-compoenent",
  data() {
    return {
      // check if the plan's studenst or teachers array is has a user id
      method_type:
        this.$store.state.user.user.my_plans &&
        this.$store.state.user.user.my_plans.includes(this.plan_id)
          ? "remove"
          : "copy",

      // body data
      body_data: "",

      // headers
      headers: { Authorization: `Bearer ${this.$store.state.user.token}` },
    };
  },
  props: {
    plan_id: String,
  },
  methods: {
    // copy the plan method
    async CopyPlan() {
      // to start the loading animation
      this.$store.state.loading = "open";

      // craete headers
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // check if the user type is student or teacher
      if (this.$store.state.user.user_type == "student") {
        // update body data
        this.body_data = {
          student_id: this.$store.state.user.user._id,
          plan_id: this.$store.state.plan._id,
          method_type: this.method_type,
        };
      } else if (this.$store.state.user.user_type == "teacher") {
        // update body data
        this.body_data = {
          teacher_id: this.$store.state.user.user._id,
          plan_id: this.$store.state.plan._id,
          method_type: this.method_type,
        };
      }

      await axios
        .put(
          this.$store.state.user.user_type == "student"
            ? this.$store.state.APIs.plans.student.copyORremove
            : this.$store.state.APIs.plans.teacher.copyORremove,
          this.body_data,
          { headers }
        )
        .then((response) => {
          console.log(response);
          // check if the user's my_plans array is has plan id
          if (!this.$store.state.user.user.my_plans.includes(this.plan_id)) {
            // add the plan id to user plans array
            this.$store.state.user.user.my_plans.push(this.plan_id);
          }

          // update the user data in localStorage
          window.localStorage.setItem(
            "Ss-user",
            JSON.stringify(this.$store.state.user)
          );

          // update the method type
          this.method_type = "remove";

          // set the plan to plan var in store
          this.$store.state.plan = response.data.plan_data;

          // to stop the loading animation
          this.$store.state.loading = "close";
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // set the error message to error message in store
          this.$store.state.error_message = error.response.data.message;

          // open the error form
          this.$store.state.error_form_status = "open";
        });
    },

    // remove the plan method
    async RemovePlan() {
      // to start the loading animation
      this.$store.state.loading = "open";

      // craete headers
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // check if the user type is student or teacher
      if (this.$store.state.user.user_type == "student") {
        // update body data
        this.body_data = {
          student_id: this.$store.state.user.user._id,
          plan_id: this.$store.state.plan._id,
          method_type: this.method_type,
        };
      } else if (this.$store.state.user.user_type == "teacher") {
        // update body data
        this.body_data = {
          teacher_id: this.$store.state.user.user._id,
          plan_id: this.$store.state.plan._id,
          method_type: this.method_type,
        };
      }

      await axios
        .put(
          this.$store.state.user.user_type == "student"
            ? this.$store.state.APIs.plans.student.copyORremove
            : this.$store.state.APIs.plans.teacher.copyORremove,
          this.body_data,
          { headers }
        )
        .then((response) => {
          // delete the plan id from user plans
          this.$store.state.user.user.my_plans =
            this.$store.state.user.user.my_plans.filter(
              (id) => id != this.plan_id
            );

          // update the user data in localStorage
          window.localStorage.setItem(
            "Ss-user",
            JSON.stringify(this.$store.state.user)
          );

          // update method type
          this.method_type = "copy";

          // set the plan to plan var in store
          this.$store.state.plan = response.data.plan_data;

          // to stop the loading animation
          this.$store.state.loading = "close";
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // set the error message to error message in store
          this.$store.state.error_message = error.response.data.message;

          // open the error form
          this.$store.state.error_form_status = "open";
        });
    },
  },
};
</script>

<style lang="scss">
@import "../../../Sass//varibels/variables";

// join blue
.btn-blue {
  padding: 7px 20px;
  border: none;
  border-radius: 5px;
  color: $font-light;
  background: linear-gradient(to top, $first-blue, $second-blue);
  cursor: pointer;
  position: absolute;
  right: 5%;
  transition-duration: 0.5s;
}

// btn orange
.btn-orange {
  @extend .btn-blue;
  background: linear-gradient(to top, $first-orange, $second-orange);
}

// btn pink
.btn-pink {
  @extend .btn-blue;
  background: linear-gradient(to top, $first-pink, $second-pink);
}

// btn green
.btn-green {
  @extend .btn-blue;
  background: linear-gradient(to top, $first-green, $second-green);
}
</style>
