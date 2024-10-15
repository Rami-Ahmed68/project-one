<template>
  <div
    :class="`food-compoenent-${this.$store.state.mood}-${this.$store.state.language}-${this.view_style}`"
    @click="this.GetFood(this.food_data._id)"
  >
    <!-- cover  -->
    <img
      v-if="this.food_data.images && this.food_data.images.length > 0"
      :src="this.food_data.images[0]"
      alt="cover"
    />
    <!-- cover  -->

    <div class="info">
      <!-- title  -->
      <h4>{{ this.food_data.title }}</h4>
      <!-- title  -->

      <!-- description  -->
      <p v-if="this.food_data.created_at">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.food_compoenet.created_at
            : this.$store.state.Arabic.food_compoenet.created_at
        }}
        {{ this.food_data.created_at.split("T")[0] }}
      </p>
      <!-- description  -->

      <!-- number of images  -->
      <p v-if="this.food_data.images">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.food_compoenet.images
            : this.$store.state.Arabic.food_compoenet.images
        }}
        {{ this.food_data.images.length }}
      </p>
      <!-- number of images  -->
    </div>
  </div>
</template>

<script>
export default {
  name: "food-compoenet",
  data() {
    return {};
  },
  props: {
    food_data: Object,
    view_style: String,
  },
  components: {},
  mounted() {},
  methods: {
    // get to food page on click method
    GetFood(id) {
      window.location = `/food/${id}`;
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck style
.food-compoenent-darck-English-list {
  width: 90%;
  height: 90px;
  margin: 5px 5%;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  background-color: $card-darck;
  transition-duration: 0.5s;
  cursor: pointer;

  // admin avatar
  img {
    width: 80px;
    height: 80px;
    margin: 5px;
    border-radius: 5px;
  }

  .info {
    width: 80%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0px 5px;

    // admin name
    h4 {
      width: 100%;
      color: $font-light;
    }

    p {
      color: $font-light;
      max-width: 90%;
      height: auto;
      margin: 2px 1%;
      font-size: $x-small;
      padding: 2px;
      border-radius: 3px;
      background-color: $note-darck;
    }

    // admin color
    .admin {
      background-color: green;
      color: $font-light;
    }

    // supper admin color
    .super-admin {
      background-color: red;
      color: $font-light;
    }
  }
}

.food-compoenent-darck-English-list:hover {
  box-shadow: 0 0 5px $black;
}

.food-compoenent-darck-English-window-restore {
  @extend .food-compoenent-darck-English-list;
  width: 45%;
  height: auto;
  margin: 10px 2%;
  flex-wrap: wrap;

  // admin avatar
  img {
    width: 96%;
    height: 160px;
    margin: 2%;
    border-radius: 10px;
  }

  .info {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0px 5px 5px 5px;

    // admin name
    h4 {
      width: 100%;
      color: $font-light;
    }

    p {
      color: $font-light;
      max-width: 90%;
      height: auto;
      margin: 1px 2%;
      font-size: $x-small;
      padding: 2px;
      border-radius: 3px;
      background-color: $note-darck;
    }
  }
}

.food-compoenent-darck-English-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style

// light style
.food-compoenent-light-English-list {
  @extend .food-compoenent-darck-English-list;
  background-color: $card-light;

  .info {
    // admin name
    h4 {
      color: $font-darck;
    }

    p {
      color: $font-darck;
      background-color: $note-light;
    }
  }
}

.food-compoenent-light-English-list:hover {
  box-shadow: 0 0 5px $black;
}

.food-compoenent-light-English-window-restore {
  @extend .food-compoenent-darck-English-window-restore;
  width: 45%;
  margin: 10px 2%;
  height: auto;
  flex-wrap: wrap;
  background-color: $card-light;

  .info {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0px 5px 5px 5px;

    // admin name
    h4 {
      width: 100%;
      color: $font-darck;
    }

    p {
      color: $font-darck;
      background-color: $note-light;
    }
  }
}

.food-compoenent-light-English-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style

// darck style
.food-compoenent-darck-Arabic-list {
  @extend .food-compoenent-darck-English-list;
}

.food-compoenent-darck-Arabic-list:hover {
  box-shadow: 0 0 5px $black;
}

.food-compoenent-darck-Arabic-window-restore {
  @extend .food-compoenent-darck-English-window-restore;
}

.food-compoenent-darck-Arabic-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style

// light style
.food-compoenent-light-Arabic-list {
  @extend .food-compoenent-light-English-list;
  background-color: $card-light;

  .info {
    // admin name
    h4 {
      color: $font-darck;
    }

    p {
      color: $font-darck;
      background-color: $note-light;
    }
  }
}

.food-compoenent-light-Arabic-list:hover {
  box-shadow: 0 0 5px $black;
}

.food-compoenent-light-Arabic-window-restore {
  @extend .food-compoenent-darck-English-window-restore;
  background-color: $card-light;
  width: 45%;
  margin: 10px 2%;
  height: auto;
  flex-wrap: wrap;

  .info {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0px 5px 5px 5px;

    // admin name
    h4 {
      width: 100%;
      color: $font-darck;
    }

    p {
      color: $font-darck;
      background-color: $note-light;
    }
  }
}

.food-compoenent-light-Arabic-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style
</style>
