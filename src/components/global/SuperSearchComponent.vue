<template>
  <div
    :class="`super-search-${this.$store.state.theme}-${this.$store.state.language}`"
  >
    <h2>
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.nav.messages.message_one
          : this.$store.state.Arabic.nav.messages.message_one
      }}
    </h2>

    <h5>
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.nav.messages.message_tow
          : this.$store.state.Arabic.nav.messages.message_tow
      }}
    </h5>

    <div class="input-cont">
      <input
        v-model="this.writed_id"
        type="text"
        :placeholder="`${
          this.$store.state.language == 'English'
            ? this.$store.state.English.nav.placeholder
            : this.$store.state.Arabic.nav.placeholder
        }`"
      />

      <button @click="GetDocument">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.nav.button
            : this.$store.state.Arabic.nav.button
        }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "super-search",
  data() {
    return {
      writed_id: "",
    };
  },
  methods: {
    GetDocument() {
      // spliting the id
      let finaly_id = this.writed_id.split("/");

      // select the API
      switch (this.writed_id.split("/")[0]) {
        case "#SA":
          window.location = `/admin/${finaly_id[1]}`;
          break;

        case "#A":
          window.location = `/admin/${finaly_id[1]}`;
          break;

        case "#T":
          window.location = `/teacher/${finaly_id[1]}`;
          break;

        case "#S":
          window.location = `/student/${finaly_id[1]}`;
          break;

        case "#Pa":
          window.location = `/parent/${finaly_id[1]}`;
          break;

        case "#Pl":
          window.location = `/plan/${finaly_id[1]}`;
          break;

        case "#C":
          window.location = `/class/${finaly_id[1]}`;
          break;

        case "#H":
          window.location = `/homeWork/${finaly_id[1]}`;
          break;

        case "#F":
          window.location = `/food/${finaly_id[1]}`;
          break;

        case "#Q":
          window.location = `/qu/${finaly_id[1]}/${finaly_id[2]}`;
          break;
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";
// English style
.super-search-blue-English {
  width: 90%;
  height: auto;
  margin: auto;
  direction: ltr;

  h2 {
    color: $font-light;
    margin: 5px 0px;
  }

  h5 {
    color: $font-light;
  }

  .input-cont {
    width: 100%;
    margin: 10px 0px;
    border-radius: 5px;
    background-color: $font-light;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 5px;
    direction: ltr;

    input {
      width: 80%;
      height: 40px;
      border: none;
      outline: none;
      padding-left: 10px;
    }

    button {
      padding: 5px;
      border: none;
      outline: none;
      border-radius: 5px;
      cursor: pointer;
      background: linear-gradient(to top, $first-blue, $second-blue);
      color: $font-light;
    }
  }
}

.super-search-pink-English {
  @extend .super-search-blue-English;

  .input-cont {
    button {
      background: linear-gradient(to top, $first-pink, $second-pink);
    }
  }
}

.super-search-orange-English {
  @extend .super-search-blue-English;

  .input-cont {
    button {
      background: linear-gradient(to top, $first-orange, $second-orange);
    }
  }
}

.super-search-green-English {
  @extend .super-search-blue-English;

  .input-cont {
    button {
      background: linear-gradient(to top, $first-green, $second-green);
    }
  }
}
// English style

// arabic style
.super-search-blue-Arabic {
  width: 90%;
  height: auto;
  margin: auto;
  direction: rtl;

  h2 {
    color: $font-light;
    margin: 5px 0px;
  }

  h5 {
    color: $font-light;
  }

  .input-cont {
    width: 100%;
    margin: 10px 0px;
    border-radius: 5px;
    background-color: $font-light;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 5px;
    direction: ltr;

    input {
      width: 80%;
      height: 40px;
      border: none;
      outline: none;
      padding-left: 10px;
    }

    button {
      padding: 5px;
      border: none;
      outline: none;
      border-radius: 5px;
      cursor: pointer;
      background: linear-gradient(to top, $first-blue, $second-blue);
      color: $font-light;
    }
  }
}

.super-search-pink-Arabic {
  @extend .super-search-blue-Arabic;

  .input-cont {
    button {
      background: linear-gradient(to top, $first-pink, $second-pink);
    }
  }
}

.super-search-orange-Arabic {
  @extend .super-search-blue-Arabic;

  .input-cont {
    button {
      background: linear-gradient(to top, $first-orange, $second-orange);
    }
  }
}

.super-search-green-Arabic {
  @extend .super-search-blue-Arabic;

  .input-cont {
    button {
      background: linear-gradient(to top, $first-green, $second-green);
    }
  }
}
// arabic style
</style>
