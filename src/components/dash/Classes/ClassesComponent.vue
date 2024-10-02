<template>
  <div
    :class="`section-cont-${this.status}-${this.$store.state.mood}-${this.$store.state.language}`"
    @scroll="handleScroll"
  >
    <div class="header">
      <h3>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.dash_classes_component.title
            : this.$store.state.Arabic.dash_classes_component.title
        }}
      </h3>
      <div class="count">
        {{ this.classes_count }}
      </div>
    </div>

    <div class="cards-section">
      <ClassesPageClassComponentDash
        v-for="(class_data, index) in this.$store.state.classes"
        :key="index"
        :class_data="class_data"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ClassesPageClassComponentDash from "../../class/ClassesPageClassComponentDash.vue";
export default {
  name: "classes-component",
  data() {
    return {
      // limit of classes's documents
      limit: 10,
      // page of classes's documents
      page: 1,
      // status var to open th page smoothe
      status: "close",
      // classes count
      classes_count: 0,
      // scroll_page
      scroll_page: 0,
    };
  },
  mounted() {
    // call to get classes count method
    this.GetClassesCount();

    // call to get classes method
    this.GetClasses();
  },
  components: {
    ClassesPageClassComponentDash,
  },
  methods: {
    // get classes count
    async GetClassesCount() {
      await axios
        .get(this.$store.state.APIs.classes.get_count)
        .then((response) => {
          // set the classes count from response to the class count in data
          this.classes_count = response.data.classes_count;
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

    // get classes
    async GetClasses() {
      // to start the loading
      this.$store.state.loading = "open";

      await axios
        .get(this.$store.state.APIs.classes.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((Response) => {
          // to stop the loading
          this.$store.state.loading = "close";

          // update the status var
          this.status = "open";

          // set the classes data from response to classes array in store
          this.$store.state.classes = Response.data.classes_data;
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

    // get more classes method
    async GetMoreClasses() {
      await axios
        .get(this.$store.state.APIs.classes.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          // set the classes data from response to classes array in store
          this.$store.state.classes = [
            ...this.$store.state.classes,
            ...response.data.classes_data,
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

        // call to Get More classes method
        this.GetMoreClasses();
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../../Sass/varibels/variables";

// darck and light classes English component style
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
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    color: $font-light;

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
    justify-content: space-between;
    align-items: center;
  }
}

.section-cont-open-darck-English::-webkit-scrollbar {
  width: 0px;
}

.section-cont-close-darck-English {
  @extend .section-cont-open-darck-English;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.section-cont-open-light-English {
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
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
    color: $font-darck;

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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
}

.section-cont-open-light-English::-webkit-scrollbar {
  width: 0px;
}

.section-cont-close-light-English {
  @extend .section-cont-open-light-English;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}
// darck and light classes English component style

// darck and light classes Arabic component style
.section-cont-open-darck-Arabic {
  @extend .section-cont-open-darck-English;
  direction: rtl;
}

.section-cont-open-darck-Arabic::-webkit-scrollbar {
  width: 0px;
}

.section-cont-close-darck-Arabic {
  @extend .section-cont-open-darck-Arabic;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.section-cont-open-light-Arabic {
  @extend .section-cont-open-light-English;
  direction: rtl;
}

.section-cont-open-light-Arabic::-webkit-scrollbar {
  width: 0px;
}

.section-cont-close-light-Arabic {
  @extend .section-cont-open-light-Arabic;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}
// darck and light classes Arabic component style
</style>
