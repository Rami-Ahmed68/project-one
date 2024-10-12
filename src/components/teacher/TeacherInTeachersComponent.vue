<template>
  <div
    :class="`teachers-dash-teacher-${this.$store.state.mood}-${this.$store.state.language}-${this.view_style}`"
  >
    <!-- admin avatar  -->
    <img
      :src="this.teacher_data.avatar"
      alt="avatar"
      @click="getToaAmin(this.teacher_data._id)"
    />
    <!-- admin avatar  -->

    <div class="info" @click="getToaAmin(this.teacher_data._id)">
      <!-- admin name  -->
      <h3>{{ this.teacher_data.name }}</h3>
      <!-- admin name  -->

      <!-- teacher's rate -->
      <p>⭐ : {{ this.teacher_data.rate }}</p>
      <!-- teacher's rate  -->

      <!-- teacher's classes length  -->
      <p>🏛️ : {{ this.teacher_data.classes.length }}</p>
      <!-- teacher's classes length  -->

      <!-- teacher's subject -->
      <p>📚📖📑 : {{ this.teacher_data.subject }}</p>
      <!-- teacher's subject  -->

      <!-- teacher's editor -->
      <p
        v-if="this.teacher_data.editor"
        :class="this.teacher_data.editor == true ? 'editor' : null"
      >
        editor
      </p>
      <!-- teacher's editor  -->

      <!-- teacher's class lavel -->
      <p>🏫🪜🎚️ : {{ this.teacher_data.class_level }}</p>
      <!-- teacher's class lavel  -->
    </div>

    <div
      class="buttons"
      v-if="
        (this.Dash && this.$store.state.user.user_type == 'admin') ||
        this.$store.state.user.user_type == 'super'
      "
    >
      <!-- admins buttons -->
      <button @click="GoToUpdateTeacher">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.dash_teachers_component.update
            : this.$store.state.Arabic.dash_teachers_component.update
        }}
      </button>
      <button @click="DeleteTeacher">
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
  name: "admin-in-admins-apge-component",
  data() {
    return {};
  },
  props: {
    teacher_data: Object,
    view_style: String,
    Dash: Boolean,
  },
  components: {},
  methods: {
    getToaAmin(id) {
      window.location = `/teacher/${id}`;
    },

    // delete teacher
    DeleteTeacher() {
      // update teacher id for delete in store
      this.$store.state.teacher_id_for_delete = this.teacher_data._id;

      // open the delete admin form verify
      this.$store.commit("OpenOrCloseDeleteTeacherForm");
    },

    // Go update teacher
    GoToUpdateTeacher() {
      // update the teacher_id_for_update var in store
      this.$store.state.teacher_for_update = this.teacher_data;
      console.log(this.$store.state.teacher_for_update);
      // update the active component name
      this.$store.state.active_component_in_dash = "update-teacher";
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English style
.teachers-dash-teacher-darck-English-list {
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

.teachers-dash-teacher-darck-English-list:hover {
  box-shadow: 0 0 5px $black;
}

.teachers-dash-teacher-light-English-list {
  @extend .teachers-dash-teacher-darck-English-list;
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

.teachers-dash-teacher-light-English-list:hover {
  box-shadow: 0 0 5px $black;
}
// darck and light English style

// darck and light Arabic style
.teachers-dash-teacher-darck-Arabic-list {
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

.teachers-dash-teacher-darck-Arabic-list:hover {
  box-shadow: 0 0 5px $black;
}

.teachers-dash-teacher-light-Arabic-list {
  @extend .teachers-dash-teacher-darck-Arabic-list;
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

.teachers-dash-teacher-light-Arabic-list:hover {
  box-shadow: 0 0 5px $black;
}
// darck and light Arabic style
</style>
