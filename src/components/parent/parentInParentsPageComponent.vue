<template>
  <div
    :class="`parents-parent-home-${this.$store.state.mood}-${this.$store.state.language}-${this.view_style}`"
    @click="getToaAmin(this.parent_data._id)"
  >
    <!-- admin avatar  -->
    <img :src="this.parent_data.avatar" alt="avatar" />
    <!-- admin avatar  -->

    <div class="info">
      <!-- admin name  -->
      <h3>{{ this.parent_data.name }}</h3>
      <!-- admin name  -->

      <!-- parent gender  -->
      <p>
        ⚧️ : {{ this.parent_data.gender }}
        {{ this.parent_data.gender == "male" ? "🚹" : "🚺" }}
      </p>
      <!-- parent gender  -->

      <!-- parent's children  -->
      <p>👶🧒👱‍♂️ : {{ this.parent_data.children.length }}</p>
      <!-- parent's children  -->

      <p v-if="this.parent_data.created_at">
        📆 : {{ this.parent_data.created_at.split("T")[0] }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "parent-in-parents-apge-component",
  data() {
    return {};
  },
  props: {
    parent_data: Object,
    view_style: String,
  },
  components: {},
  methods: {
    getToaAmin(id) {
      window.location = `/parent/${id}`;
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck style
.parents-parent-home-darck-English-list {
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
    h3 {
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

.parents-parent-home-darck-English-list:hover {
  box-shadow: 0 0 5px $black;
}

.parents-parent-home-darck-English-window-restore {
  @extend .parents-parent-home-darck-English-list;
  width: 45%;
  margin: 10px 2%;
  height: auto;
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
    h3 {
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

.parents-parent-home-darck-English-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style

// light style
.parents-parent-home-light-English-list {
  @extend .parents-parent-home-darck-English-list;
  background-color: $card-light;

  .info {
    // admin name
    h3 {
      color: $font-darck;
    }

    p {
      color: $font-darck;
      background-color: $note-light;
    }
  }
}

.parents-parent-home-light-English-list:hover {
  box-shadow: 0 0 5px $black;
}

.parents-parent-home-light-English-window-restore {
  @extend .parents-parent-home-darck-English-window-restore;
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
    h3 {
      width: 100%;
      color: $font-darck;
    }

    p {
      color: $font-darck;
      background-color: $note-light;
    }
  }
}

.parents-parent-home-light-English-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style

// darck style
.parents-parent-home-darck-Arabic-list {
  @extend .parents-parent-home-darck-English-list;
}

.parents-parent-home-darck-Arabic-list:hover {
  box-shadow: 0 0 5px $black;
}

.parents-parent-home-darck-Arabic-window-restore {
  @extend .parents-parent-home-darck-English-window-restore;
}

.parents-parent-home-darck-Arabic-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style

// light style
.parents-parent-home-light-Arabic-list {
  @extend .parents-parent-home-light-English-list;
  background-color: $card-light;

  .info {
    // admin name
    h3 {
      color: $font-darck;
    }

    p {
      color: $font-darck;
      background-color: $note-light;
    }
  }
}

.parents-parent-home-light-Arabic-list:hover {
  box-shadow: 0 0 5px $black;
}

.parents-parent-home-light-Arabic-window-restore {
  @extend .parents-parent-home-darck-English-window-restore;
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
    h3 {
      width: 100%;
      color: $font-darck;
    }

    p {
      color: $font-darck;
      background-color: $note-light;
    }
  }
}

.parents-parent-home-light-Arabic-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style
</style>
