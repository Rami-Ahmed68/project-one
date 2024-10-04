<template>
  <div
    :class="`home-work-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <SidBarComponentVue />
    <LoadingComponentVue />
    <CopyMessageComponentVue />
    <ErrorComponentVue />
    <div :class="this.status ? 'open-cont' : 'close-cont'">
      <SmallNavComponentVue />

      <div class="page-title">
        <!-- page title  -->
        <h4>
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.home_work_page.page_title
              : this.$store.state.Arabic.home_work_page.page_title
          }}
        </h4>
        <!-- page title  -->

        <p v-if="this.$store.state.home_work.created_at">
          {{ this.$store.state.home_work.created_at.split("T")[0] }} : 📆
        </p>
      </div>

      <!-- cover container  -->
      <div class="cover-cont">
        <!-- cover  -->
        <img
          :src="this.$store.state.home_work.images[0]"
          alt="cover"
          v-if="
            this.$store.state.home_work.images &&
            this.$store.state.home_work.images.length > 0
          "
          class="cover"
        />

        <!-- note component  -->
        <NoteComponentVue
          v-if="
            this.$store.state.home_work.note &&
            this.$store.state.home_work.note != null
          "
          :note="this.$store.state.home_work.note"
        />
        <!-- note component  -->
      </div>

      <!-- title  -->
      <h2 class="title">{{ this.$store.state.home_work.title }}</h2>

      <!-- subject  -->
      <p class="subject">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.home_work_page.subject
            : this.$store.state.Arabic.home_work_page.subject
        }}
        {{ this.$store.state.home_work.subject }}
      </p>
      <!-- subject  -->

      <!-- description  -->
      <p class="description">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.home_work_page.description
            : this.$store.state.Arabic.home_work_page.description
        }}
        {{ this.$store.state.home_work.description }}
      </p>
      <!-- description  -->

      <!-- copy id component  -->
      <CopyIdComponentVue
        :Id_data="{ id: this.$store.state.home_work._id, object_type: 'H' }"
      />

      <!-- images container  -->
      <div class="images-cont">
        <div class="images-heade">
          <h4>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.home_work_page.images_title
                : this.$store.state.Arabic.home_work_page.images_title
            }}
          </h4>
          <p
            v-if="
              this.$store.state.home_work.images &&
              this.$store.state.home_work.images.length > 1
            "
          >
            {{ this.$store.state.home_work.images.length }}
          </p>
        </div>
        <img
          v-for="(image, index) in this.$store.state.home_work.images"
          :key="index"
          :src="image"
          alt="image"
          class="image"
        />

        <!-- no any image result message  -->
        <p
          class="result-message"
          v-if="
            this.$store.state.home_work.images &&
            this.$store.state.home_work.images.length == 0
          "
        >
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.home_work_page.result_message
              : this.$store.state.Arabic.home_work_page.result_message
          }}
        </p>
      </div>
      <!-- images container  -->

      <!-- author -->
      <div class="author">
        <h4>
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.home_work_page.created_by
              : this.$store.state.Arabic.home_work_page.created_by
          }}
        </h4>
        <router-link
          :to="
            this.$store.state.home_work.created_by_type == 'admin'
              ? `/admin/${this.$store.state.home_work.created_by._id}`
              : `/teacher/${this.$store.state.home_work.created_by._id}`
          "
        >
          <img
            v-if="this.$store.state.home_work.created_by"
            :src="this.$store.state.home_work.created_by.avatar"
            alt="avatar"
          />

          <h3 v-if="this.$store.state.home_work.created_by">
            {{ this.$store.state.home_work.created_by.name }}
          </h3>
        </router-link>
      </div>
      <!-- author -->

      <!-- footer component  -->
      <FooterComponentVue />
      <!-- footer component  -->

      <!-- level nion  -->
      <div :class="`level-${this.$store.state.home_work.level}`"></div>

      <!-- scroll to top component  -->
      <ScrollTopComponentVue :scroll_page="this.scroll_page" />
      <!-- scroll to top component  -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import CopyIdComponentVue from "@/components/global/CopyIdComponent.vue";
import CopyMessageComponentVue from "@/components/global/CopyMessageComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
// import ClassComponentVue from "@/components/class/ClassComponent.vue";
import FooterComponentVue from "@/components/global/FooterComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import NoteComponentVue from "@/components/global/NoteComponent.vue";

export default {
  name: "home-work-page",
  data() {
    return {
      home_work_id: this.$route.params.id,
      scroll_page: 0,
      // open or close the compoenet
      status: false,
    };
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    LoadingComponentVue,
    CopyIdComponentVue,
    CopyMessageComponentVue,
    ErrorComponentVue,
    // ClassComponentVue,
    FooterComponentVue,
    ScrollTopComponentVue,
    NoteComponentVue,
  },
  mounted() {
    setTimeout(() => {
      // to start the loading animation
      this.$store.state.loading = "open";
    }, 100);

    // call get home work method
    this.GetHomeWork();

    // call scroll method on scroll
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // get the home work method
    async GetHomeWork() {
      try {
        axios
          .get(
            `${this.$store.state.APIs.home_works.get_one}?home_work_id=${this.home_work_id}`
          )
          .then((response) => {
            // open the page conatiner
            this.status = true;

            // set the home work data to home work data var in stor
            this.$store.state.home_work = response.data.home_work_data;

            // to stop the loading animation
            this.$store.state.loading = "close";
          })
          .catch((error) => {
            // to stop the loading animation
            this.$store.state.loading = "close";

            // set the error message to the error message in store
            this.$store.state.error_message = error.response.data.message;

            // to open the error form
            this.$store.state.error_form_status = "open";
          });
      } catch (error) {
        // to stop the loading animation
        this.$store.state.loading = "close";

        // set the error message to the error message in store
        this.$store.state.error_message = error.response.data.message;

        // to open the error form
        this.$store.state.error_form_status = "open";
      }
    },

    // fo to class on click
    GoToClass(id) {
      window.location = `/class/${id}`;
    },

    // scroll method
    handleScroll() {
      this.scroll_page = window.scrollY;
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English Style
.home-work-page-darck-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: ltr;

  // open conatiner style
  .open-cont {
    width: 50%;
    height: auto;
    margin: auto;
    transition-duration: 0.5s;
    padding: 7% 0px 5% 0px;
    opacity: 1;
    position: relative;

    @media (max-width: $phone) {
      padding: 15% 0px 5% 0px;
      width: 100%;
    }

    // page title style
    .page-title {
      width: 80%;
      height: auto;
      margin: auto;
      padding: 5px 0px;
      color: $font-light;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: $x-small;
      }
    }

    // cover conatiner style
    .cover-cont {
      width: 80%;
      min-height: 30px;
      border-radius: 5px;
      margin: 5% 5% 5% 10%;
      cursor: pointer;
      padding: 5px;
      position: relative;

      // cover
      .cover {
        width: 100%;
        height: auto;
        border-radius: 10px;
        cursor: pointer;
      }

      // note component
      #note-English-cont {
        position: absolute;
        top: 15px;
        left: 15px;
      }
    }

    // title
    .title {
      width: 80%;
      height: auto;
      margin: 5% 5% 0% 10%;
      color: $font-light;
    }

    // description
    .description {
      width: 80%;
      height: auto;
      margin: 5% 10% 5% 10%;
      color: $font-light;
    }

    // copy id component
    .copy-id-darck-English {
      width: 80%;
      margin: -2% 10% 0% 10%;
    }

    // subject style
    .subject {
      width: 80%;
      height: auto;
      margin: 5% 10%;
      color: $font-light;
    }

    .section-title {
      width: 80%;
      margin: 5% 0% 5% 10%;
      color: $font-light;
      height: auto;
      padding: 5px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
    }

    // images images conatiner
    .images-cont {
      width: 80%;
      height: auto;
      margin: 2% 0% 2% 10%;
      // background-color: green;

      .images-heade {
        width: 100%;
        height: 40px;
        margin: 15px 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;

        h4 {
          width: 60%;
          height: auto;
          padding: 5px 0px;
          color: $font-light;
          margin: 20px 0px;
        }

        p {
          width: auto;
          height: auto;
          color: $font-light;
        }
      }

      img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        margin: 5px 0%;
        cursor: pointer;
      }

      .result-message {
        width: 100%;
        height: auto;
        text-align: center;
        color: $font-light;
      }
    }

    // card
    .class-darck {
      width: 80%;
      height: auto;
      margin-left: 10%;
      background-color: $card-darck;
      cursor: pointer;
      border-radius: 10px;
      display: flex;
      flex-wrap: wrap;
      transition-duration: 0.5s;

      // cover
      img {
        width: 70px;
        height: 70px;
        border-radius: 5px;
        margin: 5px;
      }

      h2 {
        width: auto;
        margin: -7% 0% 0% 2%;
        font-size: $medium;
      }
    }

    .class-darck:hover {
      background-color: $border-darck;
    }

    // author container style
    .author {
      width: 80%;
      height: auto;
      // background-color: green;
      margin: 2% 0% 2% 10%;

      // section title
      h4 {
        width: 100%;
        height: auto;
        color: $font-light;
        padding: 5px 0px;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;
      }

      // link
      a {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: start;
        align-items: center;
        text-decoration: none;
        background-color: $card-darck;
        border-radius: 10px;
        padding: 5px;
        margin: 5% 0%;
        transition-duration: 0.5s;

        // author avatar
        img {
          width: 70px;
          height: 70px;
          border-radius: 5px;
        }

        // author name
        h3 {
          width: auto;
          color: $font-light;
          margin: -7% 0% 0% 5%;
        }
      }

      a:hover {
        background-color: $border-darck;
      }
    }

    .footer-darck-English {
      width: 80%;
      margin-left: 10%;
    }

    // level hard nion
    .level-hard {
      width: 5px;
      height: 80%;
      background-color: $hard;
      border-radius: 2px;
      box-shadow: 0 0 5px $hard;
      position: fixed;
      left: 5%;
      top: 10%;
      transition-duration: 0.5s;
      @media (max-width: $phone) {
        height: 90%;
        top: 8%;
      }

      @media (min-width: $tablet) {
        position: absolute;
        height: 90%;
        top: 5%;
      }
    }

    // level normal nion
    .level-normal {
      @extend .level-hard;
      background-color: $normal;
      box-shadow: 0 0 5px $normal;
    }

    // level easy nion
    .level-easy {
      @extend .level-hard;
      background-color: $easy;
      box-shadow: 0 0 5px $easy;
    }
  }

  // close conatiner style
  .close-cont {
    @extend .open-cont;
    padding: 20% 0px 5% 0px;
    opacity: 0;

    // level hard nion
    .level-hard {
      margin-left: -20%;
      transition-duration: 0.5s;
    }
  }
}

.home-work-page-light-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  direction: ltr;

  // open conatiner style
  .open-cont {
    width: 50%;
    height: auto;
    margin: auto;
    transition-duration: 0.5s;
    padding: 7% 0px 5% 0px;
    opacity: 1;
    position: relative;

    @media (max-width: $phone) {
      padding: 15% 0px 5% 0px;
      width: 100%;
    }

    // page title style
    .page-title {
      width: 80%;
      height: auto;
      margin: auto;
      padding: 5px 0px;
      color: $font-darck;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        font-size: $x-small;
      }
    }

    // cover conatiner style
    .cover-cont {
      width: 80%;
      min-height: 30px;
      border-radius: 5px;
      margin: 5% 5% 5% 10%;
      cursor: pointer;
      padding: 5px;
      position: relative;

      // cover
      .cover {
        width: 100%;
        height: auto;
        border-radius: 10px;
        cursor: pointer;
      }

      // note component
      #note-English-cont {
        position: absolute;
        top: 15px;
        left: 15px;
      }
    }

    // title
    .title {
      width: 80%;
      height: auto;
      margin: 5% 5% 0% 10%;
      color: $font-darck;
    }

    // description
    .description {
      width: 80%;
      height: auto;
      margin: 5% 10% 5% 10%;
      color: $font-darck;
    }

    // copy id component
    .copy-id-light-English {
      width: 80%;
      margin: -2% 10% 0% 10%;
    }

    // subject style
    .subject {
      width: 80%;
      height: auto;
      margin: 5% 10%;
      color: $font-darck;
    }

    .section-title {
      width: 80%;
      margin: 5% 0% 5% 10%;
      color: $font-darck;
      height: auto;
      padding: 5px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
    }

    // images images conatiner
    .images-cont {
      width: 80%;
      height: auto;
      margin: 2% 0% 2% 10%;
      // background-color: green;

      .images-heade {
        width: 100%;
        height: 40px;
        margin: 15px 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid;
        border-color: transparent transparent $border-darck transparent;

        h4 {
          width: 60%;
          height: auto;
          padding: 5px 0px;
          color: $font-darck;
          margin: 20px 0px;
        }

        p {
          width: auto;
          height: auto;
          color: $font-darck;
        }
      }

      img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        margin: 5px 0%;
        cursor: pointer;
      }

      .result-message {
        width: 100%;
        height: auto;
        text-align: center;
        color: $font-darck;
      }
    }

    // card
    .class-darck {
      width: 80%;
      height: auto;
      margin-left: 10%;
      background-color: $card-darck;
      cursor: pointer;
      border-radius: 10px;
      display: flex;
      flex-wrap: wrap;
      transition-duration: 0.5s;

      // cover
      img {
        width: 70px;
        height: 70px;
        border-radius: 5px;
        margin: 5px;
      }

      h2 {
        width: auto;
        margin: -7% 0% 0% 2%;
        font-size: $medium;
      }
    }

    .class-darck:hover {
      background-color: $border-light;
    }

    // author container style
    .author {
      width: 80%;
      height: auto;
      // background-color: green;
      margin: 2% 0% 2% 10%;

      // section title
      h4 {
        width: 100%;
        height: auto;
        color: $font-darck;
        padding: 5px 0px;
        border: 1px solid;
        border-color: transparent transparent $border-darck transparent;
      }

      // link
      a {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: start;
        align-items: center;
        text-decoration: none;
        background-color: $card-light;
        border-radius: 10px;
        padding: 5px;
        margin: 5% 0%;
        transition-duration: 0.5s;

        // author avatar
        img {
          width: 70px;
          height: 70px;
          border-radius: 5px;
        }

        // author name
        h3 {
          width: auto;
          color: $font-darck;
          margin: -7% 0% 0% 5%;
        }
      }

      a:hover {
        background-color: $border-darck;
      }
    }

    .footer-light-English {
      width: 80%;
      margin-left: 10%;
    }

    // level hard nion
    .level-hard {
      width: 5px;
      height: 80%;
      background-color: $hard;
      border-radius: 2px;
      box-shadow: 0 0 5px $hard;
      position: fixed;
      left: 5%;
      top: 10%;
      transition-duration: 0.5s;
      @media (max-width: $phone) {
        height: 90%;
        top: 8%;
      }

      @media (min-width: $tablet) {
        position: absolute;
        height: 90%;
        top: 5%;
      }
    }

    // level normal nion
    .level-normal {
      @extend .level-hard;
      background-color: $normal;
      box-shadow: 0 0 5px $normal;
    }

    // level easy nion
    .level-easy {
      @extend .level-hard;
      background-color: $easy;
      box-shadow: 0 0 5px $easy;
    }
  }

  // close conatiner style
  .close-cont {
    @extend .open-cont;
    padding: 20% 0px 5% 0px;
    opacity: 0;

    // level hard nion
    .level-hard {
      margin-left: -20%;
      transition-duration: 0.5s;
    }
  }
}
// darck and light English Style

// darck and light Arabic Style
.home-work-page-darck-Arabic {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: rtl;

  // open conatiner style
  .open-cont {
    width: 50%;
    height: auto;
    margin: auto;
    transition-duration: 0.5s;
    padding: 7% 0px 5% 0px;
    opacity: 1;
    position: relative;

    @media (max-width: $phone) {
      padding: 15% 0px 5% 0px;
      width: 100%;
    }

    // page title style
    .page-title {
      width: 80%;
      height: auto;
      margin: auto;
      padding: 5px 0px;
      color: $font-light;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: $x-small;
      }
    }

    // cover conatiner style
    .cover-cont {
      width: 80%;
      min-height: 30px;
      border-radius: 5px;
      margin: 5% 10% 5% 5%;
      cursor: pointer;
      padding: 5px;
      position: relative;

      // cover
      .cover {
        width: 100%;
        height: auto;
        border-radius: 10px;
        cursor: pointer;
      }

      // note component
      #note-Arabic-cont {
        position: absolute;
        top: 15px;
        right: 15px;
      }
    }

    // title
    .title {
      width: 80%;
      height: auto;
      margin: 5% 10% 0% 5%;
      color: $font-light;
    }

    // description
    .description {
      width: 80%;
      height: auto;
      margin: 5% 10% 5% 10%;
      // background-color: orangered;
      color: $font-light;
    }

    // copy id component
    .copy-id-darck-Arabic {
      width: 80%;
      margin: -2% 10% 0% 10%;
    }

    // subject style
    .subject {
      width: 80%;
      height: auto;
      margin: 5% 10%;
      color: $font-light;
    }

    .section-title {
      width: 80%;
      margin: 5% 0% 5% 10%;
      color: $font-light;
      height: auto;
      padding: 5px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
    }

    // images images conatiner
    .images-cont {
      width: 80%;
      height: auto;
      margin: 2% 10% 2% 5%;
      // background-color: green;

      .images-heade {
        width: 100%;
        height: 40px;
        margin: 15px 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;

        h4 {
          width: 60%;
          height: auto;
          padding: 5px 0px;
          color: $font-light;
          margin: 20px 0px;
        }

        p {
          width: auto;
          height: auto;
          color: $font-light;
        }
      }

      img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        margin: 5px 0%;
        cursor: pointer;
      }

      .result-message {
        width: 100%;
        height: auto;
        text-align: center;
        color: $font-light;
      }
    }

    // card
    .class-darck {
      width: 80%;
      height: auto;
      margin-right: 10%;
      background-color: $card-darck;
      cursor: pointer;
      border-radius: 10px;
      display: flex;
      flex-wrap: wrap;
      transition-duration: 0.5s;

      // cover
      img {
        width: 70px;
        height: 70px;
        border-radius: 5px;
        margin: 5px;
      }

      h2 {
        width: auto;
        margin: -7% 0% 0% 2%;
        font-size: $medium;
      }
    }

    .class-darck:hover {
      background-color: $border-darck;
    }

    // author container style
    .author {
      width: 80%;
      height: auto;
      margin: 2% 10% 2% 5%;

      // section title
      h4 {
        width: 100%;
        height: auto;
        color: $font-light;
        padding: 5px 0px;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;
      }

      // link
      a {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: start;
        align-items: center;
        text-decoration: none;
        background-color: $card-darck;
        border-radius: 10px;
        padding: 5px;
        margin: 5% 0%;
        transition-duration: 0.5s;

        // author avatar
        img {
          width: 70px;
          height: 70px;
          border-radius: 5px;
        }

        // author name
        h3 {
          width: auto;
          color: $font-light;
          margin: -7% 0% 0% 5%;
        }
      }

      a:hover {
        background-color: $border-darck;
      }
    }

    .footer-darck-Arabic {
      width: 80%;
      margin-right: 10%;
    }

    // level hard nion
    .level-hard {
      width: 5px;
      height: 80%;
      background-color: $hard;
      border-radius: 2px;
      box-shadow: 0 0 5px $hard;
      position: fixed;
      left: 5%;
      top: 10%;
      transition-duration: 0.5s;
      @media (max-width: $phone) {
        height: 90%;
        top: 8%;
      }

      @media (min-width: $tablet) {
        position: absolute;
        height: 90%;
        top: 5%;
      }
    }

    // level normal nion
    .level-normal {
      @extend .level-hard;
      background-color: $normal;
      box-shadow: 0 0 5px $normal;
    }

    // level easy nion
    .level-easy {
      @extend .level-hard;
      background-color: $easy;
      box-shadow: 0 0 5px $easy;
    }
  }

  // close conatiner style
  .close-cont {
    @extend .open-cont;
    padding: 20% 0px 5% 0px;
    opacity: 0;

    // level hard nion
    .level-hard {
      margin-left: -20%;
      transition-duration: 0.5s;
    }
  }
}

.home-work-page-light-Arabic {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  direction: rtl;

  // open conatiner style
  .open-cont {
    width: 50%;
    height: auto;
    margin: auto;
    transition-duration: 0.5s;
    padding: 7% 0px 5% 0px;
    opacity: 1;
    position: relative;

    @media (max-width: $phone) {
      padding: 15% 0px 5% 0px;
      width: 100%;
    }

    // page title style
    .page-title {
      width: 80%;
      height: auto;
      margin: auto;
      padding: 5px 0px;
      color: $font-darck;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: $x-small;
      }
    }

    // cover conatiner style
    .cover-cont {
      width: 80%;
      min-height: 30px;
      border-radius: 5px;
      margin: 5% 10% 5% 5%;
      cursor: pointer;
      padding: 5px;
      position: relative;

      // cover
      .cover {
        width: 100%;
        height: auto;
        border-radius: 10px;
        cursor: pointer;
      }

      // note component
      #note-Arabic-cont {
        position: absolute;
        top: 15px;
        right: 15px;
      }
    }

    // title
    .title {
      width: 80%;
      height: auto;
      margin: 5% 10% 0% 5%;
      color: $font-darck;
    }

    // description
    .description {
      width: 80%;
      height: auto;
      margin: 5% 10% 5% 10%;
      // background-color: orangered;
      color: $font-darck;
    }

    // copy id component
    .copy-id-light-Arabic {
      width: 80%;
      margin: -2% 10% 0% 10%;
    }

    // subject style
    .subject {
      width: 80%;
      height: auto;
      margin: 5% 10%;
      color: $font-darck;
    }

    .section-title {
      width: 80%;
      margin: 5% 0% 5% 10%;
      color: $font-darck;
      height: auto;
      padding: 5px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
    }

    // images images conatiner
    .images-cont {
      width: 80%;
      height: auto;
      margin: 2% 10% 2% 5%;
      // background-color: green;

      .images-heade {
        width: 100%;
        height: 40px;
        margin: 15px 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid;
        border-color: transparent transparent $border-darck transparent;

        h4 {
          width: 60%;
          height: auto;
          padding: 5px 0px;
          color: $font-darck;
          margin: 20px 0px;
        }

        p {
          width: auto;
          height: auto;
          color: $font-darck;
        }
      }

      img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        margin: 5px 0%;
        cursor: pointer;
      }

      .result-message {
        width: 100%;
        height: auto;
        text-align: center;
        color: $font-darck;
      }
    }

    // author container style
    .author {
      width: 80%;
      height: auto;
      margin: 2% 10% 2% 5%;

      // section title
      h4 {
        width: 100%;
        height: auto;
        color: $font-darck;
        padding: 5px 0px;
        border: 1px solid;
        border-color: transparent transparent $border-darck transparent;
      }

      // link
      a {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: start;
        align-items: center;
        text-decoration: none;
        background-color: $card-light;
        border-radius: 10px;
        padding: 5px;
        margin: 5% 0%;
        transition-duration: 0.5s;

        // author avatar
        img {
          width: 70px;
          height: 70px;
          border-radius: 5px;
        }

        // author name
        h3 {
          width: auto;
          color: $font-darck;
          margin: -7% 0% 0% 5%;
        }
      }

      a:hover {
        background-color: $border-light;
      }
    }

    .footer-light-Arabic {
      width: 80%;
      margin-right: 10%;
    }

    // level hard nion
    .level-hard {
      width: 5px;
      height: 80%;
      background-color: $hard;
      border-radius: 2px;
      box-shadow: 0 0 5px $hard;
      position: fixed;
      left: 5%;
      top: 10%;
      transition-duration: 0.5s;
      @media (max-width: $phone) {
        height: 90%;
        top: 8%;
      }

      @media (min-width: $tablet) {
        position: absolute;
        height: 90%;
        top: 5%;
      }
    }

    // level normal nion
    .level-normal {
      @extend .level-hard;
      background-color: $normal;
      box-shadow: 0 0 5px $normal;
    }

    // level easy nion
    .level-easy {
      @extend .level-hard;
      background-color: $easy;
      box-shadow: 0 0 5px $easy;
    }
  }

  // close conatiner style
  .close-cont {
    @extend .open-cont;
    padding: 20% 0px 5% 0px;
    opacity: 0;

    // level hard nion
    .level-hard {
      margin-left: -20%;
      transition-duration: 0.5s;
    }
  }
}
// darck and light Arabic Style
</style>
