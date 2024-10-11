<template>
  <div
    :class="`plans-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <SmallNavComponentVue />
    <SidBarComponentVue />
    <LoadingComponentVue />
    <ErrorComponentVue />
    <CopyMessageComponentVue />
    <div :class="this.$store.state.plan ? 'cont-open' : 'cont-close'">
      <!-- plan title  -->
      <h1>{{ this.$store.state.plan.title }}</h1>
      <!-- plan title  -->
      <!-- plan description  -->
      <div class="description">
        {{ this.$store.state.plan.description }}
      </div>
      <!-- plan description  -->

      <div class="notes-cont">
        <!-- plan class level  -->
        <p>
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.plan_page.class_level
              : this.$store.state.Arabic.plan_page.class_level
          }}
          {{ this.$store.state.plan.class_level }}
        </p>
        <!-- plan class level  -->
        <!-- plan students length  -->
        <p v-if="this.$store.state.plan.students">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.plan_page.students
              : this.$store.state.Arabic.plan_page.students
          }}
          {{ this.$store.state.plan.students.length }}
        </p>
        <!-- plan students length  -->
        <!-- plan teachers length  -->
        <p v-if="this.$store.state.plan.teachers">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.plan_page.teachers
              : this.$store.state.Arabic.plan_page.teachers
          }}
          {{ this.$store.state.plan.teachers.length }}
        </p>
        <!-- plan teachers length  -->
        <!-- plan created at  -->
        <p v-if="this.$store.state.plan.created_at">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.plan_page.created_at
              : this.$store.state.Arabic.plan_page.created_at
          }}
          {{ this.$store.state.plan.created_at.split("T")[0] }}
        </p>
        <!-- plan created at  -->
      </div>

      <!-- copy plan cont  -->
      <div class="plan-btn-cont">
        <!-- copy or delete plan component  -->
        <CopyORremoveThePlanCompoenetVue
          v-if="
            (this.$store.state.user.user &&
              this.$store.state.user.user_type == 'student') ||
            this.$store.state.user.user_type == 'teacher'
          "
          :plan_id="this.$route.params.id"
        />
        <!-- copy or delete plan component  -->

        <!-- copy id compoenent  -->
        <CopyIdComponentVue
          :Id_data="{ object_type: 'Pl', id: this.$store.state.plan._id }"
        />
        <!-- copy id compoenent  -->
      </div>
      <!-- copy plan cont  -->

      <div class="plan-info">
        <div
          class="line"
          v-for="(info, index) in this.$store.state.plan.plan_info"
          :key="index"
        >
          <p class="day">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.plan_page.day
                : this.$store.state.Arabic.plan_page.day
            }}
            {{ info.day }}
          </p>

          <div class="info-cont">
            <div v-for="(subject, index) in info.subjects" :key="index">
              <p class="title">
                {{
                  this.$store.state.language == "English"
                    ? this.$store.state.English.plan_page.subject
                    : this.$store.state.Arabic.plan_page.subject
                }}
                {{ subject.subject }}
              </p>
              |
              <p class="start">
                {{
                  this.$store.state.language == "English"
                    ? this.$store.state.English.plan_page.start
                    : this.$store.state.Arabic.plan_page.start
                }}
                {{ subject.start }}
              </p>
              |
              <p class="end">
                {{
                  this.$store.state.language == "English"
                    ? this.$store.state.English.plan_page.end
                    : this.$store.state.Arabic.plan_page.end
                }}
                {{ subject.end }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- author  -->
      <div
        class="author"
        v-if="this.$store.state.plan"
        @click="GetAdmin(this.$store.state.plan.created_by._id)"
      >
        <!-- author avatar  -->
        <img
          :src="this.$store.state.plan.created_by.avatar"
          alt="avatar"
          class="avatar"
        />
        <!-- author avatar  -->

        <!-- author name -->
        <h3>{{ this.$store.state.plan.created_by.name }}</h3>
        <!-- author name -->
      </div>
      <!-- author  -->
    </div>

    <!-- scroll to top compoenet  -->
    <ScrollTopComponentVue :scroll_page="this.scroll_page" />
    <!-- scroll to top compoenet  -->
  </div>
</template>

<script>
//? importing components
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import CopyIdComponentVue from "@/components/global/CopyIdComponent.vue";
import CopyMessageComponentVue from "@/components/global/CopyMessageComponent.vue";
import CopyORremoveThePlanCompoenetVue from "@/components/global/buttons/CopyORremoveThePlanCompoenet.vue";
import axios from "axios";

export default {
  name: "plan-page",
  data() {
    return {
      // to open or close the scrollTp button
      scroll_page: 0,
    };
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    LoadingComponentVue,
    ErrorComponentVue,
    ScrollTopComponentVue,
    CopyMessageComponentVue,
    CopyIdComponentVue,
    CopyORremoveThePlanCompoenetVue,
  },
  mounted() {
    setTimeout(() => {
      // to start the loading animation
      this.$store.state.loading = "open";
    }, 100);

    // call to get plan method
    this.GetPlan();
  },
  methods: {
    // get to plans method
    async GetPlan() {
      axios
        .get(this.$store.state.APIs.plans.get_one, {
          params: {
            // catch the plan id from url params
            plan_id: this.$route.params.id,
          },
        })
        .then((response) => {
          // to close the loading component
          this.$store.state.loading = "close";

          // set the plan data to plan var in store
          this.$store.state.plan = response.data.plan_data;
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },

    // get admin method
    GetAdmin(id) {
      window.location = `/admin/${id}`;
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English style
.plans-page-darck-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: ltr;

  .cont-open {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 10% 0px 10px 0px;
    transition-duration: 0.5s;
    opacity: 1;

    @media (max-width: $phone) {
      padding: 20% 0% 0% 0%;
      width: 100%;
    }

    // plans title style
    h1 {
      width: 90%;
      height: auto;
      margin: 5px 5%;
      color: $font-light;
    }

    // description
    .description {
      width: 90%;
      height: auto;
      margin: 10px 5%;
      color: $font-light;
    }

    // notes conatiner style
    .notes-cont {
      width: 90%;
      height: auto;
      margin: 10px 5%;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;

      p {
        width: auto;
        height: auto;
        padding: 3px;
        border-radius: 3px;
        color: $font-light;
        font-size: $x-small;
        margin: 3px;
        background-color: $note-darck;
      }
    }

    .plan-btn-cont {
      position: relative;
      width: 100%;
      height: 40px;
      margin: 5px 0%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      direction: ltr;
    }

    .plan-info {
      width: 90%;
      height: auto;
      margin: 10px 5%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      background-color: $body-darck;
      box-shadow: 0 0 5px $black;
      padding: 5px;
      border-radius: 10px;

      .line {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-around;
        padding: 5px;
        margin: 5px 0px;
        position: relative;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;

        .day {
          padding: 5px;
          position: absolute;
          left: 5px;
          top: 5px;
          border-radius: 5px;
          color: $font-light;
          font-size: $small;
          background-color: $note-darck;
        }

        .info-cont {
          width: 100%;
          height: auto;
          border-radius: 5px;
          padding: 5px;
          background-color: $card-darck;
          margin-top: 10%;

          div {
            width: 100%;
            height: auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            padding: 3px;
            border-radius: 3px;
            margin: 5px 0px;
            background-color: $note-darck;

            p {
              margin: 3px;
              color: $font-light;
              font-size: $small;
            }
          }
        }
      }
    }

    .author {
      width: 90%;
      height: 80px;
      margin: 5px 5%;
      padding: 2px 3px;
      border-radius: 5px;
      background-color: $card-darck;
      display: flex;
      justify-content: start;
      align-items: center;
      box-shadow: 0 0 5px $black;
      cursor: pointer;

      img {
        width: 70px;
        height: 74px;
        border-radius: 5px;
      }

      h3 {
        color: $font-light;
        margin: -10px 0px 0px 5px;
      }
    }
  }

  .cont-close {
    @extend .cont-open;
    padding: 20% 0px 10px 0px;
    transition-duration: 0.5s;
    opacity: 0;

    @media (max-width: $phone) {
      padding: 40% 0% 0% 0%;
      width: 100%;
    }
  }
}

.plans-page-light-English {
  @extend .plans-page-darck-English;
  background-color: $body-light;

  .cont-open {
    // plans title style
    h1 {
      color: $font-darck;
    }

    // description
    .description {
      color: $font-darck;
    }

    // notes conatiner style
    .notes-cont {
      p {
        color: $font-darck;
        background-color: $note-light;
      }
    }

    .plan-info {
      background-color: $body-light;

      .line {
        border-color: transparent transparent $border-darck transparent;

        .day {
          color: $font-darck;
          background-color: $note-light;
        }

        .info-cont {
          background-color: $card-light;

          div {
            background-color: $note-light;

            p {
              color: $font-darck;
            }
          }
        }
      }
    }

    .author {
      background-color: $card-light;

      h3 {
        color: $font-darck;
      }
    }
  }
}
// darck and light English style

// darck and light Arabic style
.plans-page-darck-Arabic {
  @extend .plans-page-darck-English;
  direction: rtl;
}

.plans-page-light-Arabic {
  @extend .plans-page-light-English;
  direction: rtl;
}
// darck and light Arabic style
</style>
