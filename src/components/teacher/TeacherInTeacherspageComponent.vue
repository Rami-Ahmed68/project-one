<template>
  <div
    :class="`teachers-page-teacher-${this.$store.state.mood}-${this.$store.state.language}-${this.view_style}`"
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

// darck style
.teachers-page-teacher-darck-English-list {
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
    .editor {
      background-color: green;
      color: $font-light;
    }
  }
}

.teachers-page-teacher-darck-English-list:hover {
  box-shadow: 0 0 5px $black;
}

.teachers-page-teacher-darck-English-window-restore {
  @extend .teachers-page-teacher-darck-English-list;
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

.teachers-page-teacher-darck-English-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style

// light style
.teachers-page-teacher-light-English-list {
  @extend .teachers-page-teacher-darck-English-list;
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

.teachers-page-teacher-light-English-list:hover {
  box-shadow: 0 0 5px $black;
}

.teachers-page-teacher-light-English-window-restore {
  @extend .teachers-page-teacher-darck-English-window-restore;
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

.teachers-page-teacher-light-English-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style

// darck style
.teachers-page-teacher-darck-Arabic-list {
  @extend .teachers-page-teacher-darck-English-list;
}

.teachers-page-teacher-darck-Arabic-list:hover {
  box-shadow: 0 0 5px $black;
}

.teachers-page-teacher-darck-Arabic-window-restore {
  @extend .teachers-page-teacher-darck-English-window-restore;
}

.teachers-page-teacher-darck-Arabic-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style

// light style
.teachers-page-teacher-light-Arabic-list {
  @extend .teachers-page-teacher-light-English-list;
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

.teachers-page-teacher-light-Arabic-list:hover {
  box-shadow: 0 0 5px $black;
}

.teachers-page-teacher-light-Arabic-window-restore {
  @extend .teachers-page-teacher-darck-English-window-restore;
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

.teachers-page-teacher-light-Arabic-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style
</style>
