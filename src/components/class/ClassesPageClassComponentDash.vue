<template>
  <div
    v-if="this.class_data"
    :class="`dash-classes-class-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <!-- cover and teacher avatar cont  -->
    <div class="cover-cont">
      <img
        :src="this.class_data.cover"
        alt="cover"
        class="cover"
        @click="GoToClass(this.class_data._id)"
      />

      <img
        :src="this.class_data.teacher != null && this.class_data.teacher.avatar"
        alt="avatar"
        class="avatar"
        @click="GoTeacher(this.class_data.teacher._id)"
      />
    </div>
    <!-- cover and teacher avatar cont  -->

    <!-- info section  -->
    <div class="info">
      <h2>
        {{
          this.class_data.title.split("").length > 40
            ? this.class_data.title.slice(0, 40) + "..."
            : this.class_data.title
        }}
      </h2>

      <p>📚📖📑 : {{ this.class_data.subject }}</p>
      <p>🏫🪜🎚️ : {{ this.class_data.class_level }}</p>
      <p v-if="this.class_data.home_works">
        🏚️💯🔝 : {{ this.class_data.home_works.length }}
      </p>
      <p v-if="this.class_data.students">
        👨‍🎓 : {{ this.class_data.students.length }}
      </p>
      <p>📆 : {{ this.class_data.created_at.split("T")[0] }}</p>
    </div>
    <!-- info section  -->

    <!-- buttons cont  -->
    <div
      class="buttons"
      v-if="
        this.$store.state.user.user_type == 'super' ||
        this.$store.state.user.user_type == 'admin' ||
        (this.$store.state.user.user_type == 'teacher' &&
          this.$store.state.user.user._id == this.class_data.teacher._id)
      "
    >
      <button class="update" @click="GoToUpdateClass">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.dash_classes_component.update
            : this.$store.state.Arabic.dash_classes_component.update
        }}
      </button>
      <button class="delete" @click="DeleteClass(this.class_data._id)">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.dash_classes_component.delete
            : this.$store.state.Arabic.dash_classes_component.delete
        }}
      </button>
      <!-- buttons cont  -->
    </div>
  </div>
</template>

<script>
export default {
  name: "class-component-in-dash",
  props: {
    class_data: Object,
  },
  data() {
    return {};
  },
  methods: {
    // go to class method
    GoToClass(id) {
      window.location = `/class/${id}`;
    },

    // go to teacher method
    GoTeacher(id) {
      window.location = `/teacher/${id}`;
    },

    // delete class method
    DeleteClass(id) {
      // open the delete class form
      this.$store.commit("OpenOrCloseDeleteClassForm");

      // set the class id to delete_class_form_status in store
      this.$store.state.class_id_for_delete = id;
    },

    // go to update class component
    GoToUpdateClass() {
      // set the class data to class_for_update in store
      this.$store.state.class_for_update = this.class_data;

      // update the choosed teacher in store to show it in teachers conatiner in update class componene
      this.$store.state.choosed_teacher = this.class_data.teacher;

      // update the active component to open the update class component
      this.$store.state.active_component_in_dash = "update-class";
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English style
.dash-classes-class-darck-English {
  width: 100%;
  height: auto;
  margin: 5px 0%;
  cursor: pointer;
  position: relative;
  border-radius: 10px;
  background-color: $card-darck;
  transition-duration: 0.5s;
  direction: ltr;

  @media (min-width: $phone) {
    width: 47%;
    margin: 5px 1%;
    height: auto;
  }

  // cover
  .cover-cont {
    width: 100%;
    max-height: auto;
    position: relative;

    // class's cover
    .cover {
      width: 98%;
      max-height: 400px;
      margin: 1%;
      border-radius: 5px;

      @media (max-width: $phone) {
        max-height: 300px;
      }
    }

    // teacher avatar
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 5px;
      position: absolute;
      bottom: 15px;
      left: 10px;

      @media (min-width: $phone) {
        width: 90px;
        height: 90px;
        bottom: 20px;
        left: 15px;
      }
    }
  }

  // info style
  .info {
    max-width: 98%;
    height: auto;
    margin: 0px 1%;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;

    h2 {
      width: 100%;
      color: $font-light;
    }

    p {
      width: auto;
      color: $font-light;
      font-size: $x-small;
      margin: 2px;
      padding: 3px;
      border-radius: 3px;
      background-color: $note-darck;
      display: flex;

      @media (max-width: $phone) {
        font-size: $xx-small;
        padding: 2px;
      }
    }
  }

  // buttons container style
  .buttons {
    max-width: 98%;
    height: auto;
    margin: 0px 1%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    .update {
      width: 100%;
      height: 40px;
      margin: 5px 0px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      color: $font-light;
      background-color: $green;
    }

    .delete {
      width: 100%;
      height: 40px;
      border: none;
      margin: 5px 0px;
      border-radius: 5px;
      cursor: pointer;
      color: $font-light;
      background-color: $red;
    }
  }
}

.dash-classes-class-darck-English:hover {
  box-shadow: 0 0 10px $black;
}

.dash-classes-class-light-English {
  width: 100%;
  height: auto;
  margin: 5px 0%;
  cursor: pointer;
  position: relative;
  border-radius: 10px;
  background-color: $card-light;
  transition-duration: 0.5s;
  direction: ltr;

  @media (min-width: $phone) {
    width: 47%;
    height: auto;
  }

  // cover
  .cover-cont {
    width: 100%;
    max-height: auto;
    position: relative;

    // class's cover
    .cover {
      width: 98%;
      max-height: 400px;
      margin: 1%;
      border-radius: 5px;

      @media (max-width: $phone) {
        max-height: 300px;
      }
    }

    // teacher avatar
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 5px;
      position: absolute;
      bottom: 15px;
      left: 10px;

      @media (min-width: $phone) {
        width: 90px;
        height: 90px;
        bottom: 20px;
        left: 15px;
      }
    }
  }

  // info style
  .info {
    max-width: 98%;
    height: auto;
    margin: 0px 1%;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;

    h2 {
      width: 100%;
      color: $font-darck;
    }

    p {
      width: auto;
      color: $font-darck;
      font-size: $x-small;
      margin: 2px;
      padding: 3px;
      border-radius: 3px;
      background-color: $note-light;
      display: flex;

      @media (max-width: $phone) {
        font-size: $xx-small;
        padding: 2px;
      }
    }
  }

  // buttons container style
  .buttons {
    max-width: 98%;
    height: auto;
    margin: 0px 1%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    .update {
      width: 100%;
      height: 40px;
      margin: 5px 0px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      color: $font-light;
      background-color: $green;
    }

    .delete {
      width: 100%;
      height: 40px;
      border: none;
      margin: 5px 0px;
      border-radius: 5px;
      cursor: pointer;
      color: $font-light;
      background-color: $red;
    }
  }
}

.dash-classes-class-light-English:hover {
  box-shadow: 0 0 10px $black;
}
// darck and light English style

// darck and light Arabic style
.dash-classes-class-darck-Arabic {
  @extend .dash-classes-class-darck-English;
  direction: rtl;
}

.dash-classes-class-darck-Arabic:hover {
  box-shadow: 0 0 10px $black;
}

.dash-classes-class-light-Arabic {
  @extend .dash-classes-class-light-English;
  direction: rtl;
}

.dash-classes-class-light-Arabic:hover {
  box-shadow: 0 0 10px $black;
}
// darck and light Arabic style
</style>
