<template>
  <div
    :class="`food-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <SmallNavComponentVue />
    <SidBarComponentVue />
    <LoadingComponentVue />
    <ErrorComponentVue />
    <CopyMessageComponent />

    <div :class="this.$store.state.food ? 'cont-open' : 'cont-close'">
      <div class="page-header">
        <!-- page title  -->
        <h3>
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.food_page.page_title
              : this.$store.state.Arabic.food_page.page_title
          }}
        </h3>

        <!-- page title  -->
        <p v-if="this.$store.state.food.created_at">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.food_page.created_at
              : this.$store.state.Arabic.food_page.created_at
          }}
          {{ this.$store.state.food.created_at.split("T")[0] }}
        </p>
      </div>

      <!-- cover  -->
      <img
        v-if="this.$store.state.food.images"
        :src="this.$store.state.food.images[0]"
        alt="cover"
        class="cover"
      />
      <!-- cover  -->

      <!-- title  -->
      <h2>{{ this.$store.state.food.title }}</h2>
      <!-- title  -->

      <!-- description  -->
      <p>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.food_page.description
            : this.$store.state.Arabic.food_page.description
        }}
        {{ this.$store.state.food.description }}
      </p>
      <!-- description  -->

      <!-- copy id component  -->
      <CopyIdComponent
        :Id_data="{ object_type: 'F', id: this.$store.state.food._id }"
      />
      <!-- copy id component  -->

      <!-- images cont  -->
      <div
        class="images-cont"
        v-if="
          this.$store.state.food && this.$store.state.food.images.length > 0
        "
      >
        <div class="header">
          <h3>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.food_page.images
                : this.$store.state.Arabic.food_page.images
            }}
          </h3>
          <p>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.food_page.images_length
                : this.$store.state.Arabic.food_page.images_length
            }}
            {{ this.$store.state.food.images.length }}
          </p>
        </div>

        <img
          v-for="(image, index) in this.$store.state.food.images"
          :key="index"
          :src="image"
          alt="cover"
          class="image"
        />
      </div>
      <!-- images cont  -->

      <!--  footer compoennet  -->
      <FooterComponentVue />
      <!--  footer compoennet  -->
    </div>
    <!--  scroll to top compoennet  -->
    <ScrollTopComponentVue :scroll_page="this.scroll_page" />
    <!--  scroll to top compoennet  -->
  </div>
</template>

<script>
//? importing compoenents
import CopyMessageComponent from "@/components/global/CopyMessageComponent.vue";
import CopyIdComponent from "@/components/global/CopyIdComponent.vue";
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import FooterComponentVue from "@/components/global/FooterComponent.vue";
import axios from "axios";

export default {
  name: "food-page",
  data() {
    return {
      scroll_page: 0,
    };
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    LoadingComponentVue,
    ErrorComponentVue,
    ScrollTopComponentVue,
    FooterComponentVue,
    CopyIdComponent,
    CopyMessageComponent,
  },
  mounted() {
    setTimeout(() => {
      // to start the loading animation
      this.$store.state.loading = "open";
    }, 100);

    // call the get food method
    this.GetFood();

    // call the handleScroll method on scrol window
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    async GetFood() {
      await axios
        .get(this.$store.state.APIs.food.get_one, {
          params: {
            food_id: this.$route.params.id,
          },
        })
        .then((response) => {
          // set the food data from response to food var in store
          this.$store.state.food = response.data.food_data;

          // stop the loading animation
          this.$store.state.loading = "close";
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

    // scroll method
    async handleScroll() {
      this.scroll_page = window.scrollY;
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English style
.food-page-darck-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  position: relative;
  direction: ltr;

  // open style
  .cont-open {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 10% 0% 5% 0%;
    transition-duration: 0.5s;
    opacity: 1;

    @media (max-width: $phone) {
      padding: 20% 0% 5% 0%;
      width: 100%;
    }

    // page header
    .page-header {
      width: 90%;
      height: auto;
      padding: 5px 0px;
      margin: 5px 5%;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        color: $font-light;
      }

      p {
        color: $font-light;
        font-size: $x-small;
      }
    }

    // cover
    .cover {
      width: 90%;
      height: auto;
      border-radius: 10px;
      margin: 5px 5%;
    }

    // food title
    h2 {
      width: 90%;
      height: auto;
      padding: 3px;
      color: $font-light;
      margin: 5px 5%;
    }

    // food description
    p {
      width: 90%;
      height: auto;
      padding: 3px;
      border-radius: 3px;
      color: $font-light;
      font-size: $x-small;
      margin: 5px 5%;
      background-color: $note-darck;
    }

    // images container
    .images-cont {
      width: 90%;
      height: auto;
      margin: 5px 5%;

      .header {
        width: 100%;
        height: auto;
        padding: 5px 0px;
        margin: 10px 0px;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h3 {
          color: $font-light;
        }

        p {
          width: 5%;
          color: $font-light;
          font-size: $x-small;
          text-align: center;
        }
      }

      img {
        width: 100%;
        height: auto;
        border-radius: 10px;
      }
    }
  }

  .cont-close {
    @extend .cont-open;
    padding: 20% 0% 0% 0%;
    opacity: 0;
    @media (max-width: $phone) {
      padding: 40% 0% 0% 0%;
    }
  }
}

.food-page-light-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  position: relative;
  direction: ltr;

  // open style
  .cont-open {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 10% 0% 5% 0%;
    transition-duration: 0.5s;
    opacity: 1;

    @media (max-width: $phone) {
      padding: 20% 0% 5% 0%;
      width: 100%;
    }

    // page header
    .page-header {
      width: 90%;
      height: auto;
      padding: 5px 0px;
      margin: 5px 5%;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        color: $font-darck;
      }

      p {
        color: $font-darck;
        font-size: $x-small;
      }
    }

    // cover
    .cover {
      width: 90%;
      height: auto;
      border-radius: 10px;
      margin: 5px 5%;
    }

    // food title
    h2 {
      width: 90%;
      height: auto;
      padding: 3px;
      color: $font-darck;
      margin: 5px 5%;
    }

    // food description
    p {
      width: 90%;
      height: auto;
      padding: 3px;
      border-radius: 3px;
      color: $font-darck;
      font-size: $x-small;
      margin: 5px 5%;
      background-color: $note-light;
    }

    // images container
    .images-cont {
      width: 90%;
      height: auto;
      margin: 5px 5%;

      .header {
        width: 100%;
        height: auto;
        padding: 5px 0px;
        margin: 10px 0px;
        border: 1px solid;
        border-color: transparent transparent $border-darck transparent;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h3 {
          color: $font-darck;
        }

        p {
          width: 5%;
          color: $font-darck;
          font-size: $x-small;
          text-align: center;
        }
      }

      img {
        width: 100%;
        height: auto;
        border-radius: 10px;
      }
    }
  }

  .cont-close {
    @extend .cont-open;
    padding: 20% 0% 0% 0%;
    opacity: 0;
    @media (max-width: $phone) {
      padding: 40% 0% 0% 0%;
    }
  }
}
// darck and light English style

// darck and light Arabic style
.food-page-darck-Arabic {
  @extend .food-page-darck-English;
  direction: rtl;
}

.food-page-light-Arabic {
  @extend .food-page-light-English;
  direction: rtl;
}
// darck and light Arabic style
</style>
