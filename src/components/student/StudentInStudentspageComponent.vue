<template>
  <div
    :class="`students-student-dash-${this.$store.state.mood}-${this.$store.state.language}-${this.view_style}`"
  >
    <!-- student avatar  -->
    <img
      :src="this.student_data.avatar"
      alt="avatar"
      @click="GetToStudent(this.student_data._id)"
    />
    <!-- student avatar  -->

    <div class="info" @click="GetToStudent(this.student_data._id)">
      <!-- student name  -->
      <h3>{{ this.student_data.name }}</h3>
      <!-- student name  -->

      <!-- student classes length  -->
      <p v-if="this.student_data.classes">
        🏛️ : {{ this.student_data.classes.length }}
      </p>
      <!-- student classes length  -->

      <!-- student classes length  -->
      <p>
        ⚧️ : {{ this.student_data.gender }}
        {{ this.student_data.gender == "male" ? "🚹" : "🚺" }}
      </p>
      <!-- student classes length  -->

      <!-- student points -->
      <p>📍 : {{ this.student_data.points }}</p>
      <!-- student points  -->

      <!-- student total_gpa -->
      <p>📌 : {{ this.student_data.total_gpa }}</p>
      <!-- student total_gpa  -->

      <!-- student class lavel -->
      <p>🏫🪜🎚️ : {{ this.student_data.class_level }}</p>
      <!-- student class lavel  -->
    </div>

    <div
      class="buttons"
      v-if="
        (this.Dash && this.$store.state.user.user_type == 'admin') ||
        this.$store.state.user.user_type == 'super'
      "
    >
      <!-- admins buttons -->
      <button @click="GoToUpdateStudent">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.dash_teachers_component.update
            : this.$store.state.Arabic.dash_teachers_component.update
        }}
      </button>
      <button @click="DeleteStudent">
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
    student_data: Object,
    view_style: String,
    Dash: Boolean,
  },
  components: {},
  methods: {
    GetToStudent(id) {
      window.location = `/student/${id}`;
    },

    // delete Student
    DeleteStudent() {
      // update student id for delete in store
      this.$store.state.student_id_for_delete = this.student_data._id;

      console.log(this.$store.state.delete_student_form_status);

      // open the delete admin form verify
      this.$store.commit("OpenOrCloseDeleteStudentForm");
    },

    // Go update student
    GoToUpdateStudent() {
      // update the student_id_for_update var in store
      this.$store.state.student_for_update = this.student_data;

      // update the active component name
      this.$store.state.active_component_in_dash = "update-student";
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";
// darck style
.students-student-dash-darck-English-list {
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
      color: #ffffff;
      cursor: pointer;
      background-color: #008fe2;
    }
  }
}

.students-student-dash-darck-English-list:hover {
  box-shadow: 0 0 5px $black;
}
// darck style

// light style
.students-student-dash-light-English-list {
  @extend .students-student-dash-darck-English-list;
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

.students-student-dash-light-English-list:hover {
  box-shadow: 0 0 5px $black;
}
// darck style

// darck style
.students-student-dash-darck-Arabic-list {
  @extend .students-student-dash-darck-English-list;
  direction: rtl;
}

.students-student-dash-darck-Arabic-list:hover {
  box-shadow: 0 0 5px $black;
}
// darck style

// light style
.students-student-dash-light-Arabic-list {
  @extend .students-student-dash-light-English-list;
  background-color: $card-light;
  direction: rtl;

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

.students-student-dash-light-Arabic-list:hover {
  box-shadow: 0 0 5px $black;
}
// darck style
</style>
