<template>
  <div
    :class="`admins-admin-${this.$store.state.mood}-${this.$store.state.language}-${this.view_style}`"
  >
    <!-- admin avatar  -->
    <img
      :src="this.admin_data.avatar"
      alt="cover"
      @click="getToaAmin(this.admin_data._id)"
    />
    <!-- admin avatar  -->

    <div class="info" @click="getToaAmin(this.admin_data._id)">
      <!-- admin name  -->
      <h3>{{ this.admin_data.name }}</h3>
      <!-- admin name  -->
      <!-- admin level  -->
      <p
        v-if="this.admin_data.is_admin"
        :class="this.admin_data.is_admin == true ? 'admin' : null"
      >
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.admin_component.admin
            : this.$store.state.Arabic.admin_component.admin
        }}
      </p>
      <!-- admin level  -->
      <!-- admin level  -->
      <p
        v-if="this.admin_data.is_supper_admin"
        :class="this.admin_data.is_supper_admin == true ? 'super-admin' : null"
      >
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.admin_component.supper_admin
            : this.$store.state.Arabic.admin_component.supper_admin
        }}
      </p>
      <!-- admin level  -->
      <!-- admin gender  -->
      <p>
        ⚧️ : {{ this.admin_data.gender }}
        {{ this.admin_data.gender == "male" ? "🚹" : "🚺" }}
      </p>
      <!-- admin gender  -->
      <!-- admin joind at  -->
      <p>📆 : {{ this.admin_data.joind_at.split("T")[0] }}</p>
      <!-- admin joind at  -->
    </div>

    <div
      class="buttons"
      v-if="this.Dash && this.$store.state.user.user_type == 'super'"
    >
      <!-- admins buttons -->
      <button @click="GoToUpdateAdmi">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.dash_admins_component.update
            : this.$store.state.Arabic.dash_admins_component.update
        }}
      </button>
      <button @click="DeleteAdmin">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.dash_admins_component.delete
            : this.$store.state.Arabic.dash_admins_component.delete
        }}
      </button>
      <!-- admins buttons -->
    </div>
  </div>
</template>

<script>
export default {
  name: "admin-in-admins-apge-component",
  data() {
    return {};
  },
  props: {
    admin_data: Object,
    view_style: String,
    Dash: Boolean,
  },
  components: {},
  methods: {
    getToaAmin(id) {
      window.location = `/admin/${id}`;
    },

    // delete admin
    DeleteAdmin() {
      // update admin id for delete in store
      this.$store.state.admin_id_for_delete = this.admin_data._id;

      // open the delete admin form verify
      this.$store.commit("OpenOrCloseDeleteAdminForm");
    },

    // open and update the activ component in dash
    GoToUpdateAdmi() {
      // update the admin_id_for_update var in store
      this.$store.state.admin_for_update = this.admin_data;

      // update the active component name
      this.$store.state.active_component_in_dash = "update-admin";
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English style
.admins-admin-darck-English-list {
  width: 98%;
  height: 90px;
  margin: 5px 1%;
  border-radius: 10px;
  display: flex;
  justify-content: start;
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

.admins-admin-darck-English-list:hover {
  box-shadow: 0 0 5px $black;
}
.admins-admin-light-English-list {
  @extend .admins-admin-darck-English-list;
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

.admins-admin-light-English-list:hover {
  box-shadow: 0 0 5px $black;
}
// darck and light English style

// darck and light Arabic style
.admins-admin-darck-Arabic-list {
  width: 98%;
  height: 90px;
  margin: 5px 1%;
  border-radius: 10px;
  display: flex;
  justify-content: start;
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

.admins-admin-darck-Arabic-list:hover {
  box-shadow: 0 0 5px $black;
}
.admins-admin-light-Arabic-list {
  @extend .admins-admin-darck-Arabic-list;
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

.admins-admin-light-Arabic-list:hover {
  box-shadow: 0 0 5px $black;
}
// darck and light Arabic style
</style>
