<template>
  <button @click="StartRate" v-if="this.$store.state.rate_status == true">
    {{
      this.$store.state.language == "English"
        ? this.$store.state.English.dash_teachers_component.start_rate
        : this.$store.state.Arabic.dash_teachers_component.start_rate
    }}
  </button>
  <button @click="StartRate" v-if="this.$store.state.rate_status == false">
    {{
      this.$store.state.language == "English"
        ? this.$store.state.English.dash_teachers_component.stop_rate
        : this.$store.state.Arabic.dash_teachers_component.stop_rate
    }}
  </button>
</template>

<script>
import axios from "axios";
export default {
  name: "start-rate-button",
  mounted() {},
  methods: {
    // start rate method
    async StartRate() {
      // to start the loading animation
      this.$store.state.loading = "open";

      // create headers
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // create data
      let data;

      if (this.$store.state.user.user_type === "super") {
        data = {
          super_admin_id: this.$store.state.user.user._id,
          rate_status: this.$store.state.rate_status,
        };
      } else if (this.$store.state.user.user_type === "admin") {
        data = {
          admin_id: this.$store.state.user.user._id,
          rate_status: this.$store.state.rate_status,
        };
      }

      await axios
        .put(
          this.$store.state.user.user_type == "admin"
            ? this.$store.state.APIs.admins.start_rate
            : this.$store.state.APIs.super.start_rate,
          data,
          { headers }
        )
        .then(() => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          this.$store.state.rate_status = !this.$store.state.rate_status;
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // open the error from
          this.$store.state.error_form_status = "open";

          // set the error message to error message in store
          this.$store.state.error_message = error.response.data.message;
        });
    },
  },
};
</script>
