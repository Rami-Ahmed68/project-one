<template>
  <div
    :class="`sidbar-${this.$store.state.mood}-${this.$store.state.sidBar}-${this.$store.state.language}`"
  >
    <!-- close icon  -->
    <div class="close-icon" @click="this.$store.commit('changeSidBarStatus')">
      <icon icon="arrow-left" />
    </div>
    <!-- close icon  -->

    <!-- profile  -->
    <div class="profile">
      <img
        class="avatar"
        :src="this.$store.state.user ? this.$store.state.user.user.avatar : ''"
        alt=""
      />
      <!-- user name  -->
      <h4>
        {{ this.$store.state.user ? this.$store.state.user.user.name : null }}
      </h4>
      <!-- user name  -->

      <!-- user id  -->
      <CopyIdComponentVue />
      <!-- user id  -->
    </div>
    <!-- profile  -->
    <!-- profile  -->

    <!-- pages title  -->
    <h3 class="title">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.language.pages
          : this.$store.state.Arabic.language.pages
      }}
    </h3>

    <!-- links list -->
    <ul>
      <li
        @click="this.$store.commit('changeSidBarStatus')"
        v-for="(link, index) in this.$store.state.Links"
        :key="index"
        :class="
          link.access.includes(this.$store.state.user.user_type)
            ? 'show'
            : 'hidden'
        "
      >
        <router-link v-if="link.path" :to="`${link.path}`"
          >{{
            this.$store.state.language == "English"
              ? link.English_title
              : link.Arabic_title
          }}
          <icon icon="arrow-right" />
        </router-link>

        <a v-else :href="`${link.url}`">
          {{
            this.$store.state.language == "English"
              ? link.English_title
              : link.Arabic_title
          }}
          <icon icon="arrow-right" />
        </a>
      </li>

      <li class="show">
        <a :href="`${this.$store.state.developer.url}`"
          >{{
            this.$store.state.language == "English"
              ? this.$store.state.developer.English
              : this.$store.state.developer.Arabic
          }}
          <icon icon="arrow-right" />
        </a>
      </li>
    </ul>
    <!-- links list -->

    <h3 class="title">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.language.title
          : this.$store.state.Arabic.language.title
      }}
    </h3>

    <ul :class="`Language-${this.$store.state.language_list_state}`">
      <p @click="this.$store.commit('changelanguage_list_state')">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.language.english
            : this.$store.state.Arabic.language.arabic
        }}
        <icon icon="arrow-down" />
      </p>
      <li @click="changeLanguage('Arabic')">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.language.arabic
            : this.$store.state.Arabic.language.arabic
        }}
        <img src="../../assets/Arabic_icon.png" alt="" />
      </li>

      <li @click="changeLanguage('English')">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.language.english
            : this.$store.state.Arabic.language.english
        }}
        <img src="../../assets/English_icon.png" alt="" />
      </li>
    </ul>

    <h3 class="title">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.theme
          : this.$store.state.Arabic.theme
      }}
    </h3>
    <ul class="themes">
      <li class="blue" @click="selectTheme('blue')"></li>
      <li class="pink" @click="selectTheme('pink')"></li>
      <li class="orange" @click="selectTheme('orange')"></li>
      <li class="green" @click="selectTheme('green')"></li>
    </ul>

    <h3 class="title">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.mood
          : this.$store.state.Arabic.mood
      }}
    </h3>
    <div
      :class="`mood-cont-${this.$store.state.mood}`"
      @click="this.$store.commit('changeMood')"
    >
      <div class="mood-hand">
        <icon icon="moon" v-if="this.$store.state.mood == 'darck'" />
        <icon icon="sun" v-if="this.$store.state.mood == 'light'" />
      </div>
    </div>

    <!-- log out button  -->
    <button
      class="log-out"
      v-if="this.$store.state.user"
      @click="this.$store.dispatch('LogOut')"
    >
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.log_out
          : this.$store.state.Arabic.log_out
      }}
    </button>
    <!-- log out button  -->

    <!-- log in button  -->
    <button
      class="log-in"
      v-if="!this.$store.state.user"
      @click="this.GoToLogIn"
    >
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.log_in
          : this.$store.state.Arabic.log_in
      }}
    </button>
    <!-- log in button  -->
  </div>
</template>

<script>
import CopyIdComponentVue from "./CopyIdComponent.vue";
export default {
  name: "sid-bar-component",
  data() {
    return {};
  },
  components: {
    CopyIdComponentVue,
  },
  methods: {
    selectTheme(theme) {
      // update theme value in store
      this.$store.state.theme = theme;

      // save the selected theme in Storage
      window.localStorage.setItem("theme", theme);
    },

    changeLanguage(language) {
      // update language value in store
      this.$store.state.language = language;

      // save the selected language in Storage
      window.localStorage.setItem("language", language);
    },

    // go to log in method
    GoToLogIn() {
      window.location = "/login";
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck mood
.sidbar-darck-open-English {
  width: 60%;
  height: 98%;
  backdrop-filter: blur(20px);
  position: fixed;
  left: 0%;
  top: 1%;
  z-index: 100;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
  transition-duration: 0.3s;
  overflow-y: scroll;
  padding: 10px 5px 10px 10px;
  direction: ltr;

  @media (min-width: $phone) {
    width: 30%;
  }

  .close-icon {
    width: 30px;
    height: 30px;
    color: $font-light;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $body-darck;
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
  }

  // profile cont style
  .profile {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    // avatar
    .avatar {
      width: 70px;
      height: 70px;
      border-radius: 10px;
      margin: 10px;
      border: 3px solid $blue;
      user-select: none;
    }

    // name
    h4 {
      width: 50%;
      height: auto;
      margin-left: 10px;
      color: $font-light;
    }
  }

  .title {
    color: $font-light;
  }

  ul {
    width: 100%;
    height: auto;
    padding: 10px 0px;
    .show {
      width: 98%;
      height: 40px;
      background-color: $message-darck;
      border-radius: 5px;
      margin: 1%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 10px;
      cursor: pointer;
      transition-duration: 0.3s;
      border: 1px solid $border-light;
      position: relative;
      a {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        text-decoration: none;
        color: $font-light;
        width: 90%;
      }
      svg {
        color: $font-light;
        position: absolute;
        top: 35%;
        right: 5%;
        transition-duration: 0.3s;
      }
    }
    .show:hover {
      background-color: $body-darck;
      svg {
        right: 3%;
        margin-left: 30px;
        color: $blue;
      }
    }
    .hidden {
      display: none;
    }
  }

  // language list
  .Language-close {
    width: 98%;
    height: 50px;
    outline: none;
    margin-left: 1%;
    border-radius: 5px;
    margin: 10px 0px;
    border: 1px solid $border-light;
    overflow: hidden;
    transition-duration: 0.3s;

    // language option
    li {
      width: 98%;
      height: 40px;
      background-color: $message-darck;
      border-radius: 5px;
      margin: 1%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 10px;
      cursor: pointer;
      transition-duration: 0.3s;
      border: 1px solid $border-light;
      position: relative;
      color: $font-light;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }

    li:hover {
      background-color: $body-darck;
    }

    // language list title
    p {
      width: 98%;
      height: 30px;
      margin: 0% 1% 4% 1%;
      padding: 0px 5px;
      color: $font-light;
      cursor: pointer;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      svg {
        transition-duration: 0.3s;
      }
    }
  }

  .Language-open {
    @extend .Language-close;
    overflow: hidden;
    @media (min-width: $phone) {
      padding: 10px 0px 20px 0px;
      height: 145px;
    }
    height: 140px;
    svg {
      transform: rotate(180deg);
    }
  }

  // themes
  .themes {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    li {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: none;
      list-style-type: none;
      cursor: pointer;
    }

    .blue {
      background: linear-gradient(to top, $first-blue, $second-blue);
    }

    .pink {
      background: linear-gradient(to top, $first-pink, $second-pink);
    }

    .orange {
      background: linear-gradient(to top, $first-orange, $second-orange);
    }

    .green {
      background: linear-gradient(to top, $first-green, $second-green);
    }
  }

  // log  out button custom
  .log-out {
    width: 98%;
    height: 40px;
    margin: 10px 1% 1% 1%;
    cursor: pointer;
    background-color: $red;
    border: none;
    border-radius: 5px;
    color: $font-light;
  }

  // log in button custom
  .log-in {
    width: 98%;
    height: 40px;
    margin: 10px 1% 1% 1%;
    cursor: pointer;
    background-color: $green;
    border: none;
    border-radius: 5px;
    color: $font-light;
  }

  .mood-cont-darck {
    width: 50px;
    height: 30px;
    border-radius: 5px;
    color: $font-light;
    background-color: $body-darck;
    border: 1px solid $border-light;
    cursor: pointer;
    margin: 20px 10px;
    box-shadow: 0 0 5px $black inset;
    transition-duration: 0.3s;
    .mood-hand {
      width: 45%;
      height: 80%;
      margin: 5%;
      border-radius: 5px;
      background-color: $blue;
      display: flex;
      justify-content: center;
      align-items: center;
      transition-duration: 0.3s;
    }
  }
}

.sidbar-darck-close-English {
  @extend .sidbar-darck-open-English;
  transition-duration: 0.3s;
  position: absolute;
  left: -60%;
  overflow: hidden;
}

.sidbar-darck-open-English::-webkit-scrollbar {
  width: 10px;
}

// light mood
.sidbar-light-open-English {
  @extend .sidbar-darck-open-English;

  @media (min-width: $phone) {
    width: 30%;
  }

  .close-icon {
    color: $font-darck;
    background-color: $body-light;
  }

  // profile cont style
  .profile {
    // student name
    h4 {
      color: $font-darck;
    }
  }

  // sections title
  .title {
    color: $font-darck;
  }

  // links list
  ul {
    .show {
      background-color: $message-light;
      border: 1px solid $border-darck;
      a {
        color: $font-darck;
      }
      svg {
        color: $font-darck;
      }
    }
    .show:hover {
      background-color: $body-light;
    }
  }

  // language close style
  .Language-close {
    border: 1px solid $border-darck;
    p {
      color: $font-darck;
    }

    li {
      color: $font-darck;
      background-color: $border-light;
      border: 1px solid $border-darck;
    }

    li:hover {
      background-color: $body-light;
    }
  }

  // language open style
  .Language-open {
    @extend .Language-close;
    height: 140px;
    background-color: $border-light;
    @media (min-width: $phone) {
      height: 145px;
    }
  }

  // log  out button custom
  .log-out {
    color: $font-light;
  }

  .mood-cont-light {
    width: 50px;
    height: 30px;
    border-radius: 5px;
    color: $font-light;
    background-color: $body-light;
    border: 1px solid $border-light;
    cursor: pointer;
    margin: 20px 10px;
    box-shadow: 0 0 5px $black inset;
    transition-duration: 0.3s;
    .mood-hand {
      width: 45%;
      height: 80%;
      margin: 5% 5% 5% 50%;
      border-radius: 5px;
      background-color: $blue;
      display: flex;
      justify-content: center;
      align-items: center;
      transition-duration: 0.3s;
    }
  }
}

.sidbar-light-close-English {
  @extend .sidbar-light-open-English;
  position: absolute;
  left: -60%;
  overflow: hidden;
}

// darck mood
.sidbar-darck-open-Arabic {
  @extend .sidbar-darck-open-English;
  direction: rtl;
  padding: 0px 10px 0px 0px;

  // profile cont style
  .profile {
    direction: ltr;

    h4 {
      color: $font-light;
    }
  }

  ul {
    width: 100%;
    height: auto;
    padding: 10px 0px;
    .show {
      width: 98%;
      height: 40px;
      background-color: $message-darck;
      border-radius: 5px;
      margin: 1%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 10px;
      cursor: pointer;
      transition-duration: 0.3s;
      border: 1px solid $border-light;
      position: relative;
      a {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        text-decoration: none;
        color: $font-light;
        width: 90%;
      }
      svg {
        color: $font-light;
        position: absolute;
        top: 34%;
        right: 86%;
        transform: rotate(180deg);
        transition-duration: 0.3s;
      }
    }
    .show:hover {
      background-color: $body-darck;
      svg {
        right: 90%;
        margin-left: 30px;
        color: $blue;
      }
    }
    .hidden {
      display: none;
    }
  }

  // log  out button custom
  .log-out {
    width: 98%;
    height: 40px;
    margin: 10px 1% 1% 1%;
    cursor: pointer;
    background-color: $red;
    border: none;
    border-radius: 5px;
    color: $font-light;
  }

  .mood-cont-darck {
    width: 50px;
    height: 30px;
    border-radius: 5px;
    color: $font-light;
    background-color: $body-darck;
    border: 1px solid $border-light;
    cursor: pointer;
    margin: 20px 10px;
    box-shadow: 0 0 5px $black inset;
    transition-duration: 0.3s;
    display: flex;
    .mood-hand {
      width: 45%;
      height: 80%;
      margin: 5% 50% 5% 5%;
      border-radius: 5px;
      background-color: $blue;
      display: flex;
      justify-content: center;
      align-items: center;
      transition-duration: 0.3s;
    }
  }
}

.sidbar-darck-close-Arabic {
  @extend .sidbar-darck-open-Arabic;
  transition-duration: 0.3s;
  position: absolute;
  left: -60%;
  overflow: hidden;
}

.sidbar-darck-open-Arabic::-webkit-scrollbar {
  width: 10px;
}

// light mood
.sidbar-light-open-Arabic {
  @extend .sidbar-darck-open-Arabic;

  @media (min-width: $phone) {
    width: 30%;
  }

  .close-icon {
    color: $font-darck;
    background-color: $body-light;
  }

  // profile cont style
  .profile {
    // student name
    h4 {
      color: $font-darck;
    }
  }

  // sections title
  .title {
    color: $font-darck;
  }

  // links list
  ul {
    .show {
      background-color: $message-light;
      border: 1px solid $border-darck;
      a {
        color: $font-darck;
      }
      svg {
        color: $font-darck;
      }
    }
    .show:hover {
      background-color: $body-light;
    }
  }

  // language close style
  .Language-close {
    border: 1px solid $border-darck;
    p {
      color: $font-darck;
    }

    li {
      color: $font-darck;
      background-color: $border-light;
      border: 1px solid $border-darck;
    }

    li:hover {
      background-color: $body-light;
    }
  }

  // language open style
  .Language-open {
    @extend .Language-close;
    height: 140px;
    background-color: $border-light;
    @media (min-width: $phone) {
      height: 145px;
    }
  }

  // log  out button custom
  .log-out {
    color: $font-light;
  }

  .mood-cont-light {
    width: 50px;
    height: 30px;
    border-radius: 5px;
    color: $font-light;
    background-color: $body-light;
    border: 1px solid $border-light;
    cursor: pointer;
    margin: 20px 10px;
    box-shadow: 0 0 5px $black inset;
    transition-duration: 0.3s;
    .mood-hand {
      width: 45%;
      height: 80%;
      margin: 5% 5% 5% 50%;
      border-radius: 5px;
      background-color: $blue;
      display: flex;
      justify-content: center;
      align-items: center;
      transition-duration: 0.3s;
    }
  }
}

.sidbar-light-close-Arabic {
  @extend .sidbar-light-open-Arabic;
  position: absolute;
  left: -60%;
  overflow: hidden;
}
</style>
