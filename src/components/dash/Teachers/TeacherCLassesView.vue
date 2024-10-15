<template>
  <div
    :class="`section-cont-${this.status}-${this.$store.state.mood}-${this.$store.state.language}`"
    @scroll="handleScroll"
  >
    <div class="header">
      <h3>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.my_classes_page.page_title
            : this.$store.state.Arabic.my_classes_page.page_title
        }}
      </h3>
    </div>

    <div class="classes-cards-section">
      <ClassesPageClassComponentDash
        v-for="(class_data, index) in this.$store.state.my_classes"
        :key="index"
        :class_data="class_data"
      />

      <p v-if="this.class_count.length == 0">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.my_classes_page.default
            : this.$store.state.Arabic.my_classes_page.default
        }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ClassesPageClassComponentDash from "@/components/class/ClassesPageClassComponentDash.vue";
export default {
  name: "teacher-dash-classes-page",
  data() {
    return {
      // page scroll
      scroll_page: 0,
      // page status
      status: "close",
      // api
      api: "",
      // classes count
      class_count: 1,
    };
  },
  components: {
    ClassesPageClassComponentDash,
  },
  mounted() {
    setTimeout(() => {
      // to start the loading animation
      this.$store.state.loading = "open";
    }, 100);

    // call to get get my classes method
    this.GetTeacherClasses();

    // to open the page smoothy
    setTimeout(() => {
      this.status = "open";
    }, 500);
  },
  methods: {
    // get teacher classes
    async GetTeacherClasses() {
      // tostart the loading animation
      this.$store.state.loading = "open";

      // create params
      let params = {};

      // craete headers
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      this.api = this.$store.state.APIs.classes.teacher.get_my_classes;
      params.teacher_id = this.$store.state.user.user._id;

      await axios
        .get(
          this.api,
          {
            params,
          },
          { headers }
        )
        .then((response) => {
          // set the classes count from response to class_count in data section
          this.class_count = response.data.classes_data.length;

          // to stop the loading animation
          this.$store.state.loading = "close";

          // set the plans data to my_classes array in store
          this.$store.state.my_classes = response.data.classes_data;
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
      width: 10%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .classes-cards-section {
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
      width: 10%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .classes-cards-section {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
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
