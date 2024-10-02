<template>
  <div
    :class="`class-student-${this.$store.state.mood}-${this.$store.state.language}-${this.view_style}`"
    @click="GoToStudent(this.student_data._id)"
  >
    <!-- avatar -->
    <img :src="this.student_data.avatar" alt="avatar" />

    <h2>{{ this.student_data.name }}</h2>
  </div>
</template>

<script>
export default {
  name: "student-component",
  props: {
    student_data: Object,
    view_style: String,
  },
  methods: {
    GoToStudent(id) {
      // add the student id after new page link
      window.location = `/student/${id}`;
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";
// darck style
.class-student-darck-English-list {
  width: 100%;
  height: 90px;
  margin: 5px 0%;
  border-radius: 10px;
  display: flex;
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

  h2 {
    width: 100%;
    color: $font-light;
  }
}

.class-student-darck-English-list:hover {
  box-shadow: 0 0 5px $black;
}

.class-student-darck-English-window-restore {
  @extend .class-student-darck-English-list;
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

  h2 {
    width: 100%;
    color: $font-light;
  }
}

.class-student-darck-English-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style

// light style
.class-student-light-English-list {
  @extend .class-student-darck-English-list;
  background-color: $card-light;

  h2 {
    width: 100%;
    color: $font-darck;
  }
}

.class-student-light-English-list:hover {
  box-shadow: 0 0 5px $black;
}

.class-student-light-English-window-restore {
  @extend .class-student-darck-English-window-restore;
  width: 45%;
  margin: 10px 2%;
  height: auto;
  flex-wrap: wrap;
  background-color: $card-light;

  h2 {
    width: 100%;
    color: $font-darck;
  }
}

.class-student-light-English-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style

// darck style
.class-student-darck-Arabic-list {
  @extend .class-student-darck-English-list;
}

.class-student-darck-Arabic-list:hover {
  box-shadow: 0 0 5px $black;
}

.class-student-darck-Arabic-window-restore {
  @extend .class-student-darck-English-window-restore;
}

.class-student-darck-Arabic-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style

// light style
.class-student-light-Arabic-list {
  @extend .class-student-light-English-list;
  background-color: $card-light;
}

.class-student-light-Arabic-list:hover {
  box-shadow: 0 0 5px $black;
}

.class-student-light-Arabic-window-restore {
  @extend .class-student-darck-English-window-restore;
  background-color: $card-light;
  width: 45%;
  margin: 10px 2%;
  height: auto;
  flex-wrap: wrap;
}

.class-student-light-Arabic-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style
</style>
