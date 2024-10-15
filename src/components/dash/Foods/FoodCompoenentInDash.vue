<template>
  <div
    :class="`food-dash-compoenent-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <!-- cover  -->
    <img
      v-if="this.food_data.images && this.food_data.images.length > 0"
      :src="this.food_data.images[0]"
      alt="cover"
      @click="this.GetFood(this.food_data._id)"
    />
    <!-- cover  -->

    <div class="info" @click="this.GetFood(this.food_data._id)">
      <!-- title  -->
      <h4>{{ this.food_data.title }}</h4>
      <!-- title  -->

      <!-- description  -->
      <p v-if="this.food_data.created_at">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.food_dash_compoenet.created_at
            : this.$store.state.Arabic.food_dash_compoenet.created_at
        }}
        {{ this.food_data.created_at.split("T")[0] }}
      </p>
      <!-- description  -->

      <!-- number of images  -->
      <p v-if="this.food_data.images">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.food_dash_compoenet.images
            : this.$store.state.Arabic.food_dash_compoenet.images
        }}
        {{ this.food_data.images.length }}
      </p>
      <!-- number of images  -->
    </div>

    <!-- delete btn  -->
    <button class="delete" @click="DeleteFood">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.food_dash_compoenet.delete
          : this.$store.state.Arabic.food_dash_compoenet.delete
      }}
    </button>
    <!-- delete btn  -->

    <!-- update btn  -->
    <button class="update" @click="UpdateFood">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.food_dash_compoenet.update
          : this.$store.state.Arabic.food_dash_compoenet.update
      }}
    </button>
    <!-- update btn  -->
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
  },
  components: {},
  mounted() {},
  methods: {
    // get to food page on click method
    GetFood(id) {
      window.location = `/food/${id}`;
    },

    // delete food method
    DeleteFood() {
      // open the verify delete food form
      this.$store.commit(`OpenOrCloseDeleteFoodForm`);

      // set the food's id to food_id_for_delete in store
      this.$store.state.food_id_for_delete = this.food_data._id;
    },

    // update the food method
    UpdateFood() {
      // set the food data to food_data_for_update
      this.$store.state.food_data_for_update = this.food_data;

      // change the active component in dash
      this.$store.state.active_component_in_dash = "update-food";
    },
  },
};
</script>

<style lang="scss">
@import "../../../Sass/varibels/variables";

// darck and light English style
.food-dash-compoenent-darck-English {
  width: 23%;
  max-height: 400px;
  margin: 5px 5px;
  padding: 3px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: center;
  background-color: $card-darck;
  transition-duration: 0.5s;
  cursor: pointer;
  direction: ltr;

  @media (max-width: $phone) {
    width: 45%;
    max-height: 350px;
    margin: 5px 2%;
  }

  // admin avatar
  img {
    width: 98%;
    height: 200px;
    margin: 3px;
    border-radius: 5px;

    @media (max-width: $phone) {
      height: 150px;
      margin: 2px;
    }
  }

  .info {
    width: 100%;
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

      @media (max-width: $phone) {
        font-size: $xx-small;
      }
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

  .delete {
    width: 100%;
    height: 40px;
    color: $font-light;
    outline: none;
    border: none;
    border-radius: 5px;
    margin: 5px 0px;
    background-color: $red;
    cursor: pointer;
  }

  .update {
    @extend .delete;
    background-color: $green;
  }
}

.food-dash-compoenent-darck-English:hover {
  box-shadow: 0 0 5px $black;
}

.food-dash-compoenent-light-English {
  width: 23%;
  max-height: 400px;
  margin: 5px 5px;
  padding: 3px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: center;
  background-color: $card-light;
  transition-duration: 0.5s;
  cursor: pointer;
  direction: ltr;

  @media (max-width: $phone) {
    width: 45%;
    max-height: 350px;
    margin: 5px 2%;
  }

  // admin avatar
  img {
    width: 98%;
    height: 200px;
    margin: 3px;
    border-radius: 5px;

    @media (max-width: $phone) {
      height: 150px;
      margin: 2px;
    }
  }

  .info {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0px 5px;

    // admin name
    h4 {
      width: 100%;
      color: $font-darck;
    }

    p {
      color: $font-darck;
      max-width: 90%;
      height: auto;
      margin: 2px 1%;
      font-size: $x-small;
      padding: 2px;
      border-radius: 3px;
      background-color: $note-light;
      @media (max-width: $phone) {
        font-size: $xx-small;
      }
    }
  }

  .delete {
    width: 100%;
    height: 40px;
    color: $font-light;
    outline: none;
    border: none;
    border-radius: 5px;
    margin: 5px 0px;
    background-color: $red;
    cursor: pointer;
  }

  .update {
    @extend .delete;
    background-color: $green;
  }
}

.food-dash-compoenent-light-English:hover {
  box-shadow: 0 0 5px $black;
}
// darck and light English style

// darck and light Arabic style
.food-dash-compoenent-darck-Arabic {
  width: 23%;
  max-height: 400px;
  margin: 5px 5px;
  padding: 3px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: center;
  background-color: $card-darck;
  transition-duration: 0.5s;
  cursor: pointer;
  direction: rtl;

  @media (max-width: $phone) {
    width: 45%;
    max-height: 350px;
    margin: 5px 2%;
  }

  // admin avatar
  img {
    width: 98%;
    height: 200px;
    margin: 3px;
    border-radius: 5px;

    @media (max-width: $phone) {
      height: 150px;
      margin: 2px;
    }
  }

  .info {
    width: 100%;
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

      @media (max-width: $phone) {
        font-size: $xx-small;
      }
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

  .delete {
    width: 100%;
    height: 40px;
    color: $font-light;
    outline: none;
    border: none;
    border-radius: 5px;
    margin: 5px 0px;
    background-color: $red;
    cursor: pointer;
  }

  .update {
    @extend .delete;
    background-color: $green;
  }
}

.food-dash-compoenent-darck-Arabic:hover {
  box-shadow: 0 0 5px $black;
}

.food-dash-compoenent-light-Arabic {
  width: 23%;
  max-height: 400px;
  margin: 5px 5px;
  padding: 3px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: center;
  background-color: $card-light;
  transition-duration: 0.5s;
  cursor: pointer;
  direction: rtl;

  @media (max-width: $phone) {
    width: 45%;
    max-height: 350px;
    margin: 5px 2%;
  }

  // admin avatar
  img {
    width: 98%;
    height: 200px;
    margin: 3px;
    border-radius: 5px;

    @media (max-width: $phone) {
      height: 150px;
      margin: 2px;
    }
  }

  .info {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0px 5px;

    // admin name
    h4 {
      width: 100%;
      color: $font-darck;
    }

    p {
      color: $font-darck;
      max-width: 90%;
      height: auto;
      margin: 2px 1%;
      font-size: $x-small;
      padding: 2px;
      border-radius: 3px;
      background-color: $note-light;
      @media (max-width: $phone) {
        font-size: $xx-small;
      }
    }
  }

  .delete {
    width: 100%;
    height: 40px;
    color: $font-light;
    outline: none;
    border: none;
    border-radius: 5px;
    margin: 5px 0px;
    background-color: $red;
    cursor: pointer;
  }

  .update {
    @extend .delete;
    background-color: $green;
  }
}

.food-dash-compoenent-light-Arabic:hover {
  box-shadow: 0 0 5px $black;
}
// darck and light Arabic style
</style>
