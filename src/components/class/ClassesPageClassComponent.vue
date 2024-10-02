<template>
  <div
    :class="`classes-page-class-${this.$store.state.mood}-${this.$store.state.language}`"
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
        :src="this.class_data.teacher ? this.class_data.teacher.avatar : null"
        alt="avatar"
        class="avatar"
        @click="GoTeacher(this.class_data.teacher._id)"
      />
    </div>
    <!-- cover and teacher avatar cont  -->

    <div class="info">
      <h2>{{ this.class_data.title }}</h2>

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
  </div>
</template>

<script>
export default {
  name: "classes-page-class-component",
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
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English style
.classes-page-class-darck-English {
  width: 90%;
  height: auto;
  margin: 5px 5%;
  cursor: pointer;
  position: relative;
  border-radius: 10px;
  background-color: $card-darck;
  transition-duration: 0.5s;
  direction: ltr;

  // cover
  .cover-cont {
    width: 100%;
    height: auto;
    position: relative;

    // class's cover
    .cover {
      width: 98%;
      height: auto;
      margin: 1%;
      border-radius: 5px;
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
      }
    }
  }

  // info style
  .info {
    width: 96%;
    height: auto;
    margin: 0px 2%;
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
      @media (max-width: $phone) {
        font-size: $xx-small;
        padding: 2px;
      }
    }
  }
}

.classes-page-class-darck-English:hover {
  box-shadow: 0 0 10px $black;
}

.classes-page-class-light-English {
  width: 90%;
  height: auto;
  margin: 5px 5%;
  cursor: pointer;
  position: relative;
  border-radius: 10px;
  background-color: $card-light;
  transition-duration: 0.5s;
  direction: ltr;

  // cover
  .cover-cont {
    width: 100%;
    height: auto;
    position: relative;

    // class's cover
    .cover {
      width: 98%;
      height: auto;
      margin: 1%;
      border-radius: 5px;
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
      }
    }
  }

  // info style
  .info {
    width: 96%;
    height: auto;
    margin: 0px 2%;
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
      @media (max-width: $phone) {
        font-size: $xx-small;
        padding: 2px;
      }
    }
  }
}

.classes-page-class-light-English:hover {
  box-shadow: 0 0 10px $black;
}
// darck and light English style

// darck and light Arabic style
.classes-page-class-darck-Arabic {
  @extend .classes-page-class-darck-English;
  direction: rtl;
}

.classes-page-class-darck-Arabic:hover {
  box-shadow: 0 0 10px $black;
}

.classes-page-class-light-Arabic {
  @extend .classes-page-class-light-English;
  direction: rtl;
}

.classes-page-class-light-Arabic:hover {
  box-shadow: 0 0 10px $black;
}
// darck and light Arabic style
</style>
