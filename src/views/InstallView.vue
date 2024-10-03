<template>
  <div
    :class="`install-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <!-- small nav component   -->
    <SmallNavComponentVue />
    <!-- small nav component   -->
    <!-- sid bar component   -->
    <SidBarComponentVue />
    <!-- sid bar component   -->
    <!-- loading animation component   -->
    <LoadingComponentVue />
    <!-- loading animation component   -->
    <div :class="this.open_cont == 'open' ? 'cont-open' : 'cont-close'">
      <div class="logo-cont">
        <!-- school logo  -->
        <img src="../assets/logo.png" alt="logo" />
        <h2>School</h2>
        <!-- school logo  -->
      </div>
      <!-- install message  -->
      <p class="message">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.install_page.message
            : this.$store.state.Arabic.install_page.message
        }}
      </p>
      <!-- install message  -->

      <!-- school logo  -->
      <button @click="install">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.install_page.btn_text
            : this.$store.state.Arabic.install_page.btn_text
        }}
      </button>

      <p class="notes">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.install_page.note
            : this.$store.state.Arabic.install_page.note
        }}
        {{ new Date().getFullYear() }}
      </p>
    </div>
  </div>
</template>

<script>
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";

export default {
  name: "install-app-page",
  data() {
    return {
      deferredPrompt: null,
      open_cont: "close",
    };
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    LoadingComponentVue,
  },
  mounted() {
    // window.addEventListener("beforeinstallprompt", (event) => {
    //   event.preventDefault();
    //   this.deferredPrompt = event;
    // });

    // to add smooth animation to page
    setTimeout(async () => {
      this.open_cont = "open";
    }, 500);
  },
  methods: {
    install() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        this.deferredPrompt = null;
      }
    },
  },
};
</script>

<style lang="scss">
@import "../Sass/varibels/variables";

// darck and light English
.install-page-darck-English {
  width: 100%;
  height: 100vh;
  background-color: $body-darck;
  direction: ltr;

  .cont-open {
    width: 50%;
    height: 100%;
    margin: auto;
    padding: 5% 10px 5% 10px;
    transition-duration: 0.5s;
    opacity: 1;
    position: relative;
    @media (max-width: $phone) {
      width: 100%;
    }

    .logo-cont {
      width: 90%;
      height: auto;
      margin: 10px 5%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      // school system logo
      img {
        width: 100px;
        height: 100px;
        @media (max-width: $phone) {
          margin-top: 20%;
        }
      }

      h2 {
        width: 100%;
        margin: 20px 0px;
        text-align: center;
        color: $font-light;
      }
    }

    // message
    .message {
      width: 100%;
      height: auto;
      padding: 5px;
      border-radius: 5px;
      margin: 20px 0%;
      text-align: center;
      color: $font-light;
      font-size: $x-small;
    }

    // install button
    button {
      // padding: 10px 20px;
      width: 30%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      background-color: $green;
      color: $font-light;
      cursor: pointer;
      margin: 20px 35%;
    }

    .notes {
      width: 90%;
      margin: auto;
      text-align: center;
      color: $font-light;
      font-size: $xx-small;
      position: absolute;
      bottom: 3%;
      left: 5%;
    }
  }

  .cont-close {
    @extend .cont-open;
    padding: 20% 10px 5% 10px;
    opacity: 0;
  }
}

.install-page-light-English {
  width: 100%;
  height: 100vh;
  background-color: $body-light;
  direction: ltr;

  .cont-open {
    width: 50%;
    height: 100%;
    margin: auto;
    padding: 5% 10px 5% 10px;
    transition-duration: 0.5s;
    opacity: 1;
    position: relative;
    @media (max-width: $phone) {
      width: 100%;
    }

    .logo-cont {
      width: 90%;
      height: auto;
      margin: 10px 5%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      // school system logo
      img {
        width: 100px;
        height: 100px;
        @media (max-width: $phone) {
          margin-top: 20%;
        }
      }

      h2 {
        width: 100%;
        margin: 20px 0px;
        text-align: center;
        color: $font-darck;
      }
    }

    // message
    .message {
      width: 100%;
      height: auto;
      padding: 5px;
      border-radius: 5px;
      margin: 20px 0%;
      text-align: center;
      color: $font-darck;
      font-size: $x-small;
    }

    // install button
    button {
      // padding: 10px 20px;
      width: 30%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      background-color: $green;
      color: $font-light;
      cursor: pointer;
      margin: 20px 35%;
    }

    .notes {
      width: 90%;
      margin: auto;
      text-align: center;
      color: $font-darck;
      font-size: $xx-small;
      position: absolute;
      bottom: 3%;
      left: 5%;
    }
  }

  .cont-close {
    @extend .cont-open;
    padding: 20% 10px 5% 10px;
    opacity: 0;
  }
}
// darck and light English

// darck and light Arabic
.install-page-darck-Arabic {
  width: 100%;
  height: 100vh;
  background-color: $body-darck;
  direction: rtl;

  .cont-open {
    width: 50%;
    height: 100%;
    margin: auto;
    padding: 5% 10px 5% 10px;
    transition-duration: 0.5s;
    opacity: 1;
    position: relative;
    @media (max-width: $phone) {
      width: 100%;
    }

    .logo-cont {
      width: 90%;
      height: auto;
      margin: 10px 5%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      // school system logo
      img {
        width: 100px;
        height: 100px;
        @media (max-width: $phone) {
          margin-top: 20%;
        }
      }

      h2 {
        width: 100%;
        margin: 20px 0px;
        text-align: center;
        color: $font-light;
      }
    }

    // message
    .message {
      width: 100%;
      height: auto;
      padding: 5px;
      border-radius: 5px;
      margin: 20px 0%;
      text-align: center;
      color: $font-light;
      font-size: $x-small;
    }

    // install button
    button {
      // padding: 10px 20px;
      width: 30%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      background-color: $green;
      color: $font-light;
      cursor: pointer;
      margin: 20px 35%;
    }

    .notes {
      width: 90%;
      margin: auto;
      text-align: center;
      color: $font-light;
      font-size: $xx-small;
      position: absolute;
      bottom: 3%;
      left: 5%;
    }
  }

  .cont-close {
    @extend .cont-open;
    padding: 20% 10px 5% 10px;
    opacity: 0;
  }
}

.install-page-light-Arabic {
  width: 100%;
  height: 100vh;
  background-color: $body-light;
  direction: rtl;

  .cont-open {
    width: 50%;
    height: 100%;
    margin: auto;
    padding: 5% 10px 5% 10px;
    transition-duration: 0.5s;
    opacity: 1;
    position: relative;
    @media (max-width: $phone) {
      width: 100%;
    }

    .logo-cont {
      width: 90%;
      height: auto;
      margin: 10px 5%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      // school system logo
      img {
        width: 100px;
        height: 100px;
        @media (max-width: $phone) {
          margin-top: 20%;
        }
      }

      h2 {
        width: 100%;
        margin: 20px 0px;
        text-align: center;
        color: $font-darck;
      }
    }

    // message
    .message {
      width: 100%;
      height: auto;
      padding: 5px;
      border-radius: 5px;
      margin: 20px 0%;
      text-align: center;
      color: $font-darck;
      font-size: $x-small;
    }

    // install button
    button {
      // padding: 10px 20px;
      width: 30%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      background-color: $green;
      color: $font-light;
      cursor: pointer;
      margin: 20px 35%;
    }

    .notes {
      width: 90%;
      margin: auto;
      text-align: center;
      color: $font-darck;
      font-size: $xx-small;
      position: absolute;
      bottom: 3%;
      left: 5%;
    }
  }

  .cont-close {
    @extend .cont-open;
    padding: 20% 10px 5% 10px;
    opacity: 0;
  }
}
// darck and light Arabic
</style>
