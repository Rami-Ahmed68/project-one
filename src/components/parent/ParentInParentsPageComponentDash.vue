<template>
  <div
    :class="`parents-parent-${this.$store.state.mood}-${this.$store.state.language}-${this.view_style}`"
  >
    <!-- student avatar  -->
    <img
      :src="this.parents_data.avatar"
      alt="avatar"
      @click="GetToParent(this.parents_data._id)"
    />
    <!-- student avatar  -->

    <div class="info" @click="GetToParent(this.parents_data._id)">
      <!-- parents name  -->
      <h3>{{ this.parents_data.name }}</h3>
      <!-- parents name  -->

      <!-- parents gender length  -->
      <p>
        ⚧️ : {{ this.parents_data.gender }}
        {{ this.parents_data.gender == "male" ? "🚹" : "🚺" }}
      </p>
      <!-- parents gender length  -->

      <!-- parents children length  -->
      <p>👨‍🎓 : {{ this.parents_data.children.length }}</p>
      <!-- parents children length  -->

      <!-- parents joind at  -->
      <p v-if="this.parents_data.created_at">
        📆 : {{ this.parents_data.created_at.split("T")[0] }}
      </p>
      <!-- parents joind at  -->
    </div>

    <div
      class="buttons"
      v-if="
        (this.Dash && !this.$store.state.user.user_type == 'admin') ||
        this.$store.state.user.user_type == 'super'
      "
    >
      <!-- admins buttons -->
      <button @click="GoToUpdateParent">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.dash_teachers_component.update
            : this.$store.state.Arabic.dash_teachers_component.update
        }}
      </button>
      <button @click="DeleteParent">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.dash_teachers_component.delete
            : this.$store.state.Arabic.dash_teachers_component.delete
        }}
      </button>
      <!-- admins buttons -->
    </div>
  </div>
</template>

<script>
export default {
  name: "student-in-students-apge-component",
  data() {
    return {};
  },
  props: {
    parents_data: Object,
    view_style: String,
    Dash: Boolean,
  },
  components: {},
  methods: {
    GetToParent(id) {
      window.location = `/parent/${id}`;
    },

    // delete parent
    DeleteParent() {
      // update student id for delete in store
      this.$store.state.parent_id_for_delete = this.parents_data._id;

      // open the delete admin form verify
      this.$store.commit("OpenOrCloseDeleteParentForm");
    },

    // Go update parent
    GoToUpdateParent() {
      // update the parent_id_for_update var in store
      this.$store.state.parent_for_update = this.parents_data;

      // set the parent children to choosed_children array in store
      this.$store.state.choosed_children = this.parents_data.children;

      // update the active component name
      this.$store.state.active_component_in_dash = "update-parent";
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English style
.parents-parent-darck-English-list {
  width: 98%;
  height: 90px;
  margin: 5px 1%;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  background-color: $card-darck;
  transition-duration: 0.5s;
  cursor: pointer;
  direction: ltr;

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

  .buttons {
    width: 15%;
    height: 100%;
    margin: 0px 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    button {
      width: 100%;
      height: 40%;
      border: none;
      border-radius: 5px;
      color: $font-light;
      cursor: pointer;
      background-color: $blue;
      @media (max-width: $phone) {
        font-size: $xx-small;
      }
    }
  }
}

.parents-parent-darck-English-list:hover {
  box-shadow: 0 0 5px $black;
}
.parents-parent-light-English-list {
  @extend .parents-parent-darck-English-list;
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

.parents-parent-light-English-list:hover {
  box-shadow: 0 0 5px $black;
}
// darck and light English style

// darck and light Arabic style
.parents-parent-darck-Arabic-list {
  width: 98%;
  height: 90px;
  margin: 5px 1%;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  background-color: $card-darck;
  transition-duration: 0.5s;
  cursor: pointer;
  direction: rtl;

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

  .buttons {
    width: 15%;
    height: 100%;
    margin: 0px 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    button {
      width: 100%;
      height: 40%;
      border: none;
      border-radius: 5px;
      color: $font-light;
      cursor: pointer;
      background-color: $blue;
      @media (max-width: $phone) {
        font-size: $xx-small;
      }
    }
  }
}

.parents-parent-darck-Arabic-list:hover {
  box-shadow: 0 0 5px $black;
}
.parents-parent-light-Arabic-list {
  @extend .parents-parent-darck-Arabic-list;
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

.parents-parent-light-Arabic-list:hover {
  box-shadow: 0 0 5px $black;
}
// darck and light Arabic style
</style>
