<template>
  <div
    :class="`plans-dash-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <div class="cont" @click="GetToPlan(this.Plan_data._id)">
      <!-- plans title  -->
      <h2>
        {{
          this.Plan_data.title.split("").length > 40
            ? this.Plan_data.title.slice(0, 40) + "..."
            : this.Plan_data.title
        }}
      </h2>
      <!-- plans title  -->
      <p>{{ this.Plan_data.class_level }}</p>
      <p v-if="this.Plan_data.students">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.plan_component.students
            : this.$store.state.Arabic.plan_component.students
        }}
        {{ this.Plan_data.students.length }}
      </p>
      <p v-if="this.Plan_data.teachers">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.plan_component.teachers
            : this.$store.state.Arabic.plan_component.teachers
        }}
        {{ this.Plan_data.teachers.length }}
      </p>
      <p v-if="this.Plan_data.created_at">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.plan_component.created_at
            : this.$store.state.Arabic.plan_component.created_at
        }}
        {{ this.Plan_data.created_at.split("T")[0] }}
      </p>
    </div>

    <!-- remove -->
    <button class="remove" @click="DeletePlan">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.remove_plan_form_dash.remove_btn
          : this.$store.state.Arabic.remove_plan_form_dash.remove_btn
      }}
    </button>
    <!-- remove  -->

    <!-- update  -->
    <button class="update" @click="UpdatePlan">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.remove_plan_form_dash.update
          : this.$store.state.Arabic.remove_plan_form_dash.update
      }}
    </button>
    <!-- update  -->
  </div>
</template>

<script>
export default {
  name: "plans-dash-plan-component",
  props: {
    Plan_data: Object,
  },
  methods: {
    // get to plans on click method
    GetToPlan(id) {
      window.location = `/plan/${id}`;
    },

    // delete plan
    DeletePlan() {
      // open the delete plan verify form
      this.$store.commit("OpenOrCloseDeletePlanForm");

      // set the plan data to plan plan_id_for_delete in store
      this.$store.state.plan_id_for_delete = this.Plan_data._id;
    },

    // go to update plan method
    UpdatePlan() {
      // set the plan data to plan data form update var in store
      this.$store.state.plan_data_for_update = this.Plan_data;

      // change the active component in dash
      this.$store.state.active_component_in_dash = "update-plan";

      // set the plan info to plan info in store
      this.$store.state.plan_info = this.Plan_data.plan_info;
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English style
.plans-dash-darck-English {
  width: 45%;
  height: auto;
  border-radius: 10px;
  background-color: $card-darck;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  margin: 5px 7px;
  transition-duration: 0.5s;
  cursor: pointer;
  direction: ltr;
  @media (min-width: $phone) {
    margin: 5px;
    width: 33%;
  }

  .cont {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    // plan title style
    h2 {
      width: 100%;
      height: auto;
      color: $font-light;
    }

    // notes style
    p {
      width: auto;
      height: auto;
      padding: 3px;
      color: $font-light;
      font-size: $x-small;
      border-radius: 3px;
      margin: 3px;
      background-color: $note-darck;
      @media (max-width: $phone) {
        font-size: $xx-small;
      }
    }
  }
  .remove {
    width: 100%;
    height: 40px;
    border: none;
    outline: none;
    border-radius: 5px;
    color: $font-light;
    background-color: $red;
    margin: 5px;
    cursor: pointer;
  }

  .update {
    @extend .remove;
    background-color: $green;
  }
}

.plans-dash-light-English {
  @extend .plans-dash-darck-English;
  background-color: $card-light;

  .cont {
    // plan title
    h2 {
      color: $font-darck;
    }

    // notes style
    p {
      color: $font-darck;
      background-color: $note-light;
      @media (max-width: $phone) {
        font-size: $xx-small;
      }
    }
  }
}
// darck and light English style

// darck and light Arabic style
.plans-dash-darck-Arabic {
  width: 45%;
  height: auto;
  border-radius: 10px;
  background-color: $card-darck;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  margin: 5px 7px;
  transition-duration: 0.5s;
  cursor: pointer;
  direction: rtl;

  @media (min-width: $phone) {
    margin: 5px;
    width: 33%;
  }

  .cont {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    // plan title style
    h2 {
      width: 100%;
      height: auto;
      color: $font-light;
    }

    // notes style
    p {
      width: auto;
      height: auto;
      padding: 3px;
      color: $font-light;
      font-size: $x-small;
      border-radius: 3px;
      margin: 3px;
      background-color: $note-darck;
      @media (max-width: $phone) {
        font-size: $xx-small;
      }
    }
  }

  .remove {
    width: 100%;
    height: 40px;
    border: none;
    outline: none;
    border-radius: 5px;
    color: $font-light;
    background-color: $red;
    margin: 5px;
    cursor: pointer;
  }

  .update {
    @extend .remove;
    background-color: $green;
  }
}

.plans-dash-light-Arabic {
  @extend .plans-dash-darck-Arabic;
  background-color: $card-light;

  .cont {
    // plan title
    h2 {
      color: $font-darck;
    }

    // notes style
    p {
      color: $font-darck;
      background-color: $note-light;
      @media (max-width: $phone) {
        font-size: $xx-small;
      }
    }
  }
}
// darck and light Arabic style
</style>
