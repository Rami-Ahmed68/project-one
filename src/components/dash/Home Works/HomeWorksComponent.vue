<template>
  <div
    :class="`section-cont-${this.status}-${this.$store.state.mood}-${this.$store.state.language}`"
    @scroll="handleScroll"
  >
    <!-- header  -->
    <div class="header">
      <h3>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.home_works_in_dash.page_title
            : this.$store.state.Arabic.home_works_in_dash.page_title
        }}
      </h3>
      <div class="count">
        {{ this.home_works_count }}
      </div>
    </div>
    <!-- header  -->

    <div class="cards-section">
      <HomeWorkComponent
        v-for="(home_work, index) in this.$store.state.home_works"
        :key="index"
        :home_work="home_work"
        :view_style="this.view_style"
      />
    </div>
  </div>
</template>

<script>
import HomeWorkComponent from "@/components/homeWorks/HomeWorkComponent.vue";
import axios from "axios";
export default {
  name: "home-work-component",
  data() {
    return {
      // status
      status: "close",
      // limit of home works's documents
      limit: 20,
      // page of home works's documents
      page: 1,
      // view_style
      view_style: "window-restore",
      // home works count
      home_works_count: 0,
    };
  },
  mounted() {
    // call to get home works count method
    this.GetHomeWorksCount();

    // call to get home works method
    this.GetHomeWorks();
  },
  components: {
    HomeWorkComponent,
  },
  methods: {
    // get home works count method
    async GetHomeWorksCount() {
      await axios
        .get(this.$store.state.APIs.home_works.get_count)
        .then((response) => {
          console.log(response);
          // set the home works count from response to the home works count in data
          this.home_works_count = response.data.home_work_count;
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },

    // get home works method
    async GetHomeWorks() {
      // to start the loading
      this.$store.state.loading = "open";

      await axios
        .get(this.$store.state.APIs.home_works.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((Response) => {
          // to stop the loading
          this.$store.state.loading = "close";

          // to open the page
          this.status = "open";

          // set the home works data from response to home_works array in store
          this.$store.state.home_works = Response.data.home_works_data;
        })
        .catch((error) => {
          // to stop the loading
          this.$store.state.loading = "close";

          // to open the page
          this.status = "open";

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },

    // get more home works method
    async GetMoreHomeWorks() {
      await axios
        .get(this.$store.state.APIs.home_works.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          // set the home works data from response to home works array in store
          this.$store.state.home_works = [
            ...this.$store.state.home_works,
            ...response.data.home_works_data,
          ];
        })
        .catch((error) => {
          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },

    // handel scroll method
    handleScroll(event) {
      this.scroll_page = event.target.scrollTop;
      // check if the window height is donw
      if (this.scroll_page > 350) {
        this.scroll_page = window.scrollY;

        // to change page
        this.page += 1;

        // call to Get More HomeWorks method
        this.GetMoreHomeWorks();
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../../Sass/varibels/variables";

// darck and light English style
.section-cont-open-darck-English {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  @media (min-width: $phone) {
    padding: 5px;
  }

  .header {
    width: 100%;
    padding: 5px 0px;
    margin: 0px 0px 10px 0px;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;

    h3 {
      color: $font-light;
    }

    .count {
      width: auto;
      height: 100%;
      font-size: $x-small;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  }

  .cards-section {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
  }
}

.section-cont-open-darck-English::-webkit-scrollbar {
  width: 0px;
}

.section-cont-close-darck {
  @extend .section-cont-open-darck-English;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.section-cont-open-light-English {
  @extend .section-cont-open-darck-English;
  .header {
    // header title
    border-color: transparent transparent $border-darck transparent;
    h3 {
      color: $font-darck;
    }

    .count {
      width: auto;
      height: 100%;
      font-size: $x-small;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  }
}

.section-cont-close-light {
  @extend .section-cont-open-light-English;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.section-cont-open-light-English::-webkit-scrollbar {
  width: 0px;
}
// darck and light English style

// darck and light Arabic style
.section-cont-open-darck-Arabic {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: rtl;

  @media (min-width: $phone) {
    padding: 5px;
  }

  .header {
    width: 100%;
    padding: 5px 0px;
    margin: 0px 0px 10px 0px;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;

    h3 {
      color: $font-light;
    }

    .count {
      width: auto;
      height: 100%;
      font-size: $x-small;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  }

  .cards-section {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
  }
}

.section-cont-open-darck-Arabic::-webkit-scrollbar {
  width: 0px;
}

.section-cont-close-darck {
  @extend .section-cont-open-darck-Arabic;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.section-cont-open-light-Arabic {
  @extend .section-cont-open-darck-Arabic;
  .header {
    // header title
    border-color: transparent transparent $border-darck transparent;
    h3 {
      color: $font-darck;
    }

    .count {
      width: auto;
      height: 100%;
      font-size: $x-small;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  }
}

.section-cont-close-light {
  @extend .section-cont-open-light-Arabic;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.section-cont-open-light-Arabic::-webkit-scrollbar {
  width: 0px;
}
// darck and light Arabic style
</style>
