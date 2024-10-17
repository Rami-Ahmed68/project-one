<template>
  <div
    @loa="rtrt"
    :class="`exam-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <LoadingComponent />
    <ExamPointsFormComponent
      :Exam_Data="{
        points: this.total_points,
        total_questions_points: this.total_questions_points,
      }"
    />

    <div :class="this.status ? 'open-cont' : 'close-cont'">
      <!-- header  -->
      <div class="header">
        <h3>
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.exam_page.exam_header
              : this.$store.state.Arabic.exam_page.exam_header
          }}
        </h3>
        <p>{{ this.exam_time }} : {{ this.exam_secongs }}⏳</p>
      </div>
      <!-- header  -->

      <div
        class="container"
        v-if="
          this.$store.state.exam_questions &&
          this.$store.state.exam_questions.length > 0
        "
      >
        <!-- sid bar -->
        <div :class="`sid-bar-${this.sid_bar_status}`">
          <icon :icon="this.icon" @click="openOrCloseSidBar" />

          <ul>
            <li
              v-for="(question, index) in this.$store.state.exam_questions"
              :key="index"
              @click="ChangeQuestion(question, index)"
            >
              {{
                this.$store.state.language == "English"
                  ? this.$store.state.English.exam_page.question_header
                  : this.$store.state.Arabic.exam_page.question_header
              }}
              {{ index + 1 }} ❓
            </li>
          </ul>
        </div>
        <!-- sid bar -->

        <!-- level nion   -->
        <div :class="`level-${this.active_question.level}`"></div>
        <!-- level nion   -->

        <!-- section  -->
        <div class="section">
          <!-- question's header  -->
          <div class="section-header">
            <h3>
              {{
                this.$store.state.language == "English"
                  ? this.$store.state.English.exam_page.question_header
                  : this.$store.state.Arabic.exam_page.question_header
              }}
              {{ this.index + 1 }} ❓
            </h3>
            <span>{{ this.active_question.points }}M</span>
          </div>
          <!-- question's header  -->

          <!-- end exam button  -->
          <button @click="EndExamMethod" :class="`btn-${this.exam_Btn_status}`">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.exam_page.end
                : this.$store.state.Arabic.exam_page.end
            }}
          </button>
          <!-- end exam button  -->

          <!-- question's title  -->
          <h4>{{ this.active_question.title }}</h4>
          <!-- question's title  -->

          <!-- question's description  -->
          <p v-if="this.active_question.description">
            <mark
              ><u
                >{{
                  this.$store.state.language == "English"
                    ? this.$store.state.English.exam_page.question_description
                    : this.$store.state.Arabic.exam_page.question_description
                }}
              </u></mark
            >
            {{ this.active_question.description }}
          </p>
          <!-- question's description  -->

          <!-- question's note  -->
          <p v-if="this.active_question.note">
            <mark
              ><u
                >{{
                  this.$store.state.language == "English"
                    ? this.$store.state.English.exam_page.question_note
                    : this.$store.state.Arabic.exam_page.question_note
                }}
              </u></mark
            >
            {{ this.active_question.note }}
          </p>
          <!-- question's note  -->

          <!-- question's repated  -->
          <div
            class="repated"
            v-if="
              this.active_question.repated &&
              this.active_question.repated.length > 0
            "
          >
            <p>
              {{
                this.$store.state.language == "English"
                  ? this.$store.state.English.exam_page.question_repated
                  : this.$store.state.Arabic.exam_page.question_repated
              }}
            </p>
            <p
              v-for="(date, index) in this.active_question.repated"
              :key="index"
            >
              {{ date }} 📆
            </p>
          </div>
          <!-- question's repated  -->

          <!-- images section  -->
          <div
            class="images-cont"
            v-if="
              this.active_question.images &&
              this.active_question.images.length > 0
            "
          >
            <img
              v-for="(path, index) in this.active_question.images"
              :key="index"
              :src="path"
              alt=""
            />
          </div>
          <!-- images section  -->

          <!-- options section  -->
          <div class="options-cont">
            <div
              class="option"
              v-for="(option, index) in this.active_question.options"
              :key="index"
              @click="ChooseOption(option, index)"
            >
              <label :for="option.value">
                <span>{{ option.value }}</span>
              </label>
              <input
                type="checkbox"
                :id="index"
                :checked="
                  this.choosed_option &&
                  this.active_question._id == this.choosed_option.question_id &&
                  this.choosed_option.index == index
                    ? true
                    : false
                "
              />
            </div>

            <button @click="ValidateOption()" class="validate">Validate</button>
            <button @click="RestartOption()" class="restart">Restart</button>
          </div>
          <!-- options section  -->
        </div>
        <!-- section  -->
      </div>
    </div>
  </div>
</template>

<script>
//? importingthe components
import LoadingComponent from "@/components/global/LoadingComponent.vue";
import ExamPointsFormComponent from "@/components/global/forms/ExamPointsFormComponent.vue";
import axios from "axios";
export default {
  name: "exam-page",
  data() {
    return {
      // exam status
      exam_status: true,
      // active question
      active_question: {},
      // choosed option
      choosed_option: "",
      // / exam_choosed_options
      exam_choosed_options: [],
      // exam_choosed_options_id
      exam_choosed_options_id: [],
      // checked value
      checked: "",
      // exam time
      exam_time: this.$store.state.exam_time,
      // mints
      exam_secongs: 0,
      // total points
      total_points: 0,
      // total questions points
      total_questions_points: 0,
      // page status
      status: false,
      // sid_bar_status
      sid_bar_status: "close",
      // icon
      icon: "arrow-right",
      //exam_status
      exam_Btn_status: "open",
      // question index
      index: 0,
      // api
      api: "",
    };
  },
  components: {
    LoadingComponent,
    ExamPointsFormComponent,
  },
  mounted() {
    setTimeout(() => {
      this.$store.state.loading = "open";
    }, 200);

    this.GetQuestions();

    // to open the confirm message befor reload or leave
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  },
  methods: {
    // handel befor reload or leave the site
    async handleBeforeUnload(event) {
      event.preventDefault();
    },

    // get questions method
    async GetQuestions() {
      // call to select the api method
      this.SelectApi();
      await axios
        .get(this.api, {
          params: {
            class_level: this.$route.params.class_level,
          },
        })
        .then((response) => {
          // call to start time ending method
          this.TimeMethood();

          // to stop the loading animation
          this.$store.state.loading = "close";

          // set the questiosn from response to exam questions array in store
          this.$store.state.exam_questions = response.data.questions_data;

          // set the first question data to active question
          this.active_question = this.$store.state.exam_questions[0];

          // check if the questions length is more than 0
          if (this.$store.state.exam_questions.length == 0) {
            // send the user to the home page
            window.location = "/";
          }

          // to open the cont
          this.status = true;

          // call to calculate all exam's questions points
          this.CalculateTotalExamPoints();
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

    // select the api type by subject name
    SelectApi() {
      switch (this.$route.params.subject) {
        case "Math":
          this.api = this.$store.state.APIs.subjects_questions.math.start_exam;
          break;

        case "English":
          this.api =
            this.$store.state.APIs.subjects_questions.english.start_exam;
          break;

        case "Arabic":
          this.api =
            this.$store.state.APIs.subjects_questions.arabic.start_exam;
          break;

        case "French":
          this.api =
            this.$store.state.APIs.subjects_questions.french.start_exam;
          break;

        case "Islam":
          this.api = this.$store.state.APIs.subjects_questions.islam.start_exam;
          break;

        case "History":
          this.api =
            this.$store.state.APIs.subjects_questions.history.start_exam;
          break;

        case "Philosophy":
          this.api =
            this.$store.state.APIs.subjects_questions.philosophy.start_exam;
          break;

        case "Physics":
          this.api =
            this.$store.state.APIs.subjects_questions.physics.start_exam;
          break;

        case "Sciences":
          this.api =
            this.$store.state.APIs.subjects_questions.sciences.start_exam;
          break;

        case "Geography":
          this.api =
            this.$store.state.APIs.subjects_questions.geography.start_exam;
          break;

        case "Chemistry":
          this.api =
            this.$store.state.APIs.subjects_questions.chemistry.start_exam;
          break;

        case "Alwatania":
          this.api =
            this.$store.state.APIs.subjects_questions.alwatania.start_exam;
          break;
      }
    },

    // openOrCloseSidBar
    openOrCloseSidBar() {
      // change icon
      this.icon = this.icon == "arrow-left" ? "arrow-right" : "arrow-left";

      // update sid bar status
      this.sid_bar_status = this.sid_bar_status == "close" ? "open" : "close";
    },

    // change question
    ChangeQuestion(question, index) {
      // cgange the question
      this.active_question = question;

      // update the index
      this.index = index;

      let choosed_question_option = this.exam_choosed_options.filter((line) => {
        return line.question_id == this.active_question._id;
      });

      this.choosed_option = choosed_question_option[0];
    },

    // ChooseOption
    ChooseOption(option, index) {
      this.choosed_option = {
        question_id: this.active_question._id,
        _id: `${this.active_question._id}${option.answer}${index}`,
        value: option.value,
        answer: option.answer,
        index: index,
      };

      // for check all the worng options
      this.checked = `${option.value}${option.answer}${index}`;
    },

    // validate the choosed option method
    ValidateOption() {
      // search if the exam_choosed_options has the option
      let isExsist = this.exam_choosed_options.findIndex(
        (line) => line.question_id == this.active_question._id
      );

      // check if the option is exists
      if (isExsist == -1 && this.choosed_option) {
        // add the choosed option to exam_choosed_options array
        this.exam_choosed_options.push({
          question_id: this.active_question._id,
          _id: `${this.active_question._id}${this.choosed_option.answer}${this.choosed_option.index}`,
          title: this.choosed_option.value,
          answer: this.choosed_option.answer,
          points: this.choosed_option.answer ? this.active_question.points : 0,
          index: this.choosed_option.index,
        });
      }

      // call to calculate exam points
      this.CalculatePoints();
    },

    // restart the choosed option method
    RestartOption() {
      // filter and delete the question's option
      this.exam_choosed_options = this.exam_choosed_options.filter((ele) => {
        return ele.question_id != this.active_question._id;
      });

      // emptying the choosed_option
      this.choosed_option = "";

      // call to calculate exam points
      this.CalculatePoints();
    },

    // calculate exam points
    CalculatePoints() {
      // export all choosed options points
      let test = this.exam_choosed_options.map((line) => line.points);

      // calculate all choosed options's points
      this.total_points = test.reduce((total, num) => total + num, 0);
    },

    // calculate exam points
    CalculateTotalExamPoints() {
      // export all choosed options points
      let test = this.$store.state.exam_questions.map((line) => line.points);
      // calculate all choosed options's points
      this.total_questions_points = test.reduce((total, num) => total + num, 0);
    },

    // time method
    TimeMethood() {
      setInterval(() => {
        if (this.exam_secongs > 0) {
          this.exam_secongs -= 1;
        } else if (this.exam_time > 0) {
          this.exam_secongs = 60;

          this.exam_time -= 1;
        } else if (this.exam_status) {
          // call to end the exam method
          this.EndExamMethod();
        }
      }, 1000);
    },

    // end exam
    async EndExamMethod() {
      // updae the exam_status
      this.exam_status = false;

      if (this.$store.state.user.user_type == "student" && !this.exam_status) {
        // to start the loading animatin
        this.$store.state.loading = "open";

        // create headers
        const headers = {
          Authorization: `Bearer ${this.$store.state.user.token}`,
        };

        // craete body data object
        let body_data = {
          student_id: this.$store.state.user.user._id,
          points: this.total_points,
        };

        await axios
          .put(this.$store.state.APIs.students.update_points, body_data, {
            headers,
          })
          .then(() => {
            // to stop the loading animatin
            this.$store.state.loading = "close";

            // to open the exam points form
            this.$store.commit("OpenOrCloseTheExamPointsForm");
          })
          .catch((error) => {
            // to stop the loading animation
            this.$store.state.loading = "close";

            // to set the reqeust's error message to error message var in store
            this.$store.state.error_message = error.response.data.message;

            // to open the error form
            this.$store.state.error_form_status = "open";
          });
      } else {
        // to open the exam points form
        this.$store.commit("OpenOrCloseTheExamPointsForm");
      }

      // reset the time count
      this.exam_time = `00`;

      this.exam_secongs = `00`;

      this.exam_Btn_status = this.exam_Btn_status == "close" ? "open" : "close";
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";
// darck and light English Style
.exam-page-darck-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;

  // open cont style
  .open-cont {
    width: 100%;
    height: 100vh;
    margin: auto;
    padding: 3% 0px 5% 0px;
    opacity: 1;
    transition-duration: 0.5s;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media (max-width: $phone) {
      width: 100%;
      padding: 10% 0px 5% 0px;
    }

    .header {
      width: 90%;
      margin: 5px 5%;
      height: 40px;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      color: $font-light;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .container {
      width: 90%;
      height: 85vh;
      margin: 10px 5%;
      position: relative;

      .sid-bar-open {
        width: 20%;
        height: 100%;
        border-radius: 5px;
        backdrop-filter: blur(50px);
        transition-duration: 0.5s;
        position: absolute;
        left: 0%;
        top: 0%;
        z-index: 50;

        @media (max-width: $phone) {
          width: 30%;
        }

        svg {
          transition-duration: 0.5s;
          padding: 7px;
          border-radius: 0%;
          position: absolute;
          right: 5px;
          top: 5px;
          cursor: pointer;
          color: $font-light;
          background-color: $note-darck;
          border-radius: 3px;
        }

        ul {
          width: 100%;
          height: 90%;
          margin-top: 20%;
          list-style-type: none;
          overflow-y: scroll;

          @media (max-width: $phone) {
            margin-top: 50%;
          }

          li {
            width: 98%;
            height: 40px;
            margin: 5px 1%;
            border-radius: 5px;
            padding: 0px 5px;
            display: flex;
            justify-content: start;
            align-items: center;
            color: $font-light;
            cursor: pointer;
            overflow: hidden;
            background-color: $note-darck;
            transition-duration: 0.5s;

            @media (max-width: $phone) {
              font-size: $x-small;
            }
          }

          li:hover {
            background-color: $message-darck;
          }
        }

        ul::-webkit-scrollbar {
          width: 0px;
        }
      }

      .sid-bar-close {
        @extend .sid-bar-open;
        width: 0px;

        svg {
          transition-duration: 0.5s;
          padding: 7px;
          border-radius: 0%;
          position: absolute;
          right: -35px;
          top: 5px;
          cursor: pointer;
          color: $font-light;
          background-color: $note-darck;
          border-radius: 3px;
        }
      }

      .level-hard {
        width: 5px;
        height: 96%;
        border-radius: 0px 2px 2px 0px;
        position: absolute;
        left: 0px;
        top: 2%;
        z-index: 30;
        background-color: $red;
        box-shadow: 0 0 10px $red;
      }

      .level-normal {
        @extend .level-hard;
        background-color: $normal;
        box-shadow: 0 0 10px $normal;
      }

      .level-easy {
        @extend .level-hard;
        background-color: $green;
        box-shadow: 0 0 10px $green;
      }

      .section {
        width: 100%;
        height: 100%;
        margin: 0px;
        border-radius: 5px;
        background-color: $card-darck;
        transition-duration: 0.5s;
        overflow-y: scroll;
        position: relative;

        .section-header {
          width: 90%;
          height: 40px;
          border: 1px solid;
          border-color: transparent transparent $border-light transparent;
          color: $font-light;
          margin: 35px 5% 5px 5%;
          display: flex;
          // align-items: center;

          h3 {
            width: 95%;
            height: 100%;
            display: flex;
            justify-content: start;
            align-items: center;
          }

          span {
            width: 10%;
            height: 100%;
            display: flex;
            justify-content: end;
            align-items: center;
          }
        }

        h4 {
          margin: 5px 0px;
        }

        p {
          font-size: $x-small;
        }

        .repated {
          width: 90%;
          height: auto;
          margin: 5px 5%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          p {
            padding: 4px;
            width: auto;
            height: auto;
            border-radius: 4px;
            margin: 3px;
            background-color: $note-darck;
          }
        }

        .btn-open {
          position: absolute;
          right: 5px;
          top: 5px;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          outline: none;
          background-color: $green;
          color: $font-light;
          cursor: pointer;
          transition-duration: 0.5s;

          @media (max-width: $phone) {
            padding: 7px 10px;
          }
        }

        .btn-close {
          @extend .btn-open;
          position: absolute;
          right: 5px;
          top: -10%;
        }

        h4 {
          width: 90%;
          margin: 10px 5%;
          height: auto;
          color: $font-light;
        }

        p {
          width: 90%;
          height: auto;
          margin: 10px 5%;
          color: $font-light;
        }

        .images-cont {
          width: 90%;
          height: auto;
          margin: 5px 5%;

          img {
            width: 100%;
            height: auto;
            border-radius: 5px;
          }
        }

        .options-cont {
          width: 90%;
          height: auto;
          margin: 5px 5%;

          .option {
            width: 100%;
            height: 40px;
            margin: 5px 0%;
            padding: 0px 5px;
            border-radius: 5px;
            cursor: pointer;
            background-color: $note-darck;
            display: flex;
            justify-content: space-between;
            align-items: center;

            label {
              width: 95%;
              height: 100%;
              display: flex;
              justify-content: start;
              align-items: center;

              span {
                color: $font-light;
              }
            }
          }
        }

        .validate {
          width: 100%;
          height: 40px;
          border-radius: 5px;
          cursor: pointer;
          margin: 5px 0%;
          border: none;
          outline: none;
          color: $font-light;
          background-color: $green;
        }

        .restart {
          @extend .validate;
          background-color: $red;
        }
      }

      .section::-webkit-scrollbar {
        width: 0px;
      }
    }
  }

  // close cont style
  .close-cont {
    @extend .open-cont;
    padding: 20% 0px 5% 0px;
    transition-duration: 0.5s;
    opacity: 0;
  }
}

.exam-page-light-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;

  // open cont style
  .open-cont {
    width: 100%;
    height: 100vh;
    margin: auto;
    padding: 3% 0px 5% 0px;
    opacity: 1;
    transition-duration: 0.5s;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media (max-width: $phone) {
      width: 100%;
      padding: 10% 0px 5% 0px;
    }

    .header {
      width: 90%;
      margin: 5px 5%;
      height: 40px;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      color: $font-darck;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .container {
      width: 90%;
      height: 85vh;
      margin: 10px 5%;
      position: relative;

      .sid-bar-open {
        width: 20%;
        height: 100%;
        border-radius: 5px;
        backdrop-filter: blur(50px);
        transition-duration: 0.5s;
        position: absolute;
        left: 0%;
        top: 0%;
        z-index: 50;

        @media (max-width: $phone) {
          width: 30%;
        }

        svg {
          transition-duration: 0.5s;
          padding: 7px;
          border-radius: 0%;
          position: absolute;
          right: 5px;
          top: 5px;
          cursor: pointer;
          color: $font-darck;
          background-color: $note-light;
          border-radius: 3px;
        }

        ul {
          width: 100%;
          height: 90%;
          margin-top: 20%;
          list-style-type: none;
          overflow-y: scroll;

          @media (max-width: $phone) {
            margin-top: 50%;
          }

          li {
            width: 98%;
            height: 40px;
            margin: 5px 1%;
            border-radius: 5px;
            padding: 0px 5px;
            display: flex;
            justify-content: start;
            align-items: center;
            color: $font-darck;
            cursor: pointer;
            overflow: hidden;
            background-color: $note-light;
            transition-duration: 0.5s;

            @media (max-width: $phone) {
              font-size: $x-small;
            }
          }

          li:hover {
            background-color: $message-light;
          }
        }

        ul::-webkit-scrollbar {
          width: 0px;
        }
      }

      .sid-bar-close {
        @extend .sid-bar-open;
        width: 0px;

        svg {
          transition-duration: 0.5s;
          padding: 7px;
          border-radius: 0%;
          position: absolute;
          right: -35px;
          top: 5px;
          cursor: pointer;
          color: $font-darck;
          background-color: $note-light;
          border-radius: 3px;
        }
      }

      .level-hard {
        width: 5px;
        height: 96%;
        border-radius: 0px 2px 2px 0px;
        position: absolute;
        left: 0px;
        top: 2%;
        z-index: 30;
        background-color: $red;
        box-shadow: 0 0 10px $red;
      }

      .level-normal {
        @extend .level-hard;
        background-color: $normal;
        box-shadow: 0 0 10px $normal;
      }

      .level-easy {
        @extend .level-hard;
        background-color: $green;
        box-shadow: 0 0 10px $green;
      }

      .section {
        width: 100%;
        height: 100%;
        margin: 0px;
        border-radius: 5px;
        background-color: $card-light;
        transition-duration: 0.5s;
        overflow-y: scroll;
        position: relative;

        .section-header {
          width: 90%;
          height: 40px;
          border: 1px solid;
          border-color: transparent transparent $border-darck transparent;
          color: $font-darck;
          margin: 35px 5% 5px 5%;
          display: flex;

          h3 {
            width: 95%;
            height: 100%;
            display: flex;
            justify-content: start;
            align-items: center;
          }

          span {
            width: 10%;
            height: 100%;
            display: flex;
            justify-content: end;
            align-items: center;
          }
        }

        h4 {
          margin: 5px 0px;
        }

        p {
          font-size: $x-small;
        }

        .repated {
          width: 90%;
          height: auto;
          margin: 5px 5%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          p {
            padding: 4px;
            width: auto;
            height: auto;
            border-radius: 4px;
            margin: 3px;
            background-color: $note-light;
          }
        }

        .btn-open {
          position: absolute;
          right: 5px;
          top: 5px;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          outline: none;
          background-color: $green;
          color: $font-light;
          cursor: pointer;
          transition-duration: 0.5s;

          @media (max-width: $phone) {
            padding: 7px 10px;
          }
        }

        .btn-close {
          @extend .btn-open;
          position: absolute;
          right: 5px;
          top: -10%;
        }

        h4 {
          width: 90%;
          margin: 10px 5%;
          height: auto;
          color: $font-darck;
        }

        p {
          width: 90%;
          height: auto;
          margin: 10px 5%;
          color: $font-darck;
        }

        .images-cont {
          width: 90%;
          height: auto;
          margin: 5px 5%;

          img {
            width: 100%;
            height: auto;
            border-radius: 5px;
          }
        }

        .options-cont {
          width: 90%;
          height: auto;
          margin: 5px 5%;

          .option {
            width: 100%;
            height: 40px;
            margin: 5px 0%;
            padding: 0px 5px;
            border-radius: 5px;
            cursor: pointer;
            background-color: $note-light;
            display: flex;
            justify-content: space-between;
            align-items: center;

            label {
              width: 95%;
              height: 100%;
              display: flex;
              justify-content: start;
              align-items: center;

              span {
                color: $font-darck;
              }
            }
          }
        }

        .validate {
          width: 100%;
          height: 40px;
          border-radius: 5px;
          cursor: pointer;
          margin: 5px 0%;
          border: none;
          outline: none;
          color: $font-light;
          background-color: $green;
        }

        .restart {
          @extend .validate;
          background-color: $red;
        }
      }

      .section::-webkit-scrollbar {
        width: 0px;
      }
    }
  }

  // close cont style
  .close-cont {
    @extend .open-cont;
    padding: 20% 0px 5% 0px;
    transition-duration: 0.5s;
    opacity: 0;
  }
}
// darck and light English Style

// darck and light Arabic Style
.exam-page-darck-Arabic {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: rtl;

  // open cont style
  .open-cont {
    width: 100%;
    height: 100vh;
    margin: auto;
    padding: 3% 0px 5% 0px;
    opacity: 1;
    transition-duration: 0.5s;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media (max-width: $phone) {
      width: 100%;
      padding: 10% 0px 5% 0px;
    }

    .header {
      width: 90%;
      margin: 5px 5%;
      height: 40px;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      color: $font-light;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .container {
      width: 90%;
      height: 85vh;
      margin: 10px 5%;
      position: relative;

      .sid-bar-open {
        width: 20%;
        height: 100%;
        border-radius: 5px;
        backdrop-filter: blur(50px);
        transition-duration: 0.5s;
        position: absolute;
        left: 0%;
        top: 0%;
        z-index: 50;

        @media (max-width: $phone) {
          width: 30%;
        }

        svg {
          transition-duration: 0.5s;
          padding: 7px;
          border-radius: 0%;
          position: absolute;
          right: 5px;
          top: 5px;
          cursor: pointer;
          color: $font-light;
          background-color: $note-darck;
          border-radius: 3px;
        }

        ul {
          width: 100%;
          height: 90%;
          margin-top: 20%;
          list-style-type: none;
          overflow-y: scroll;

          @media (max-width: $phone) {
            margin-top: 50%;
          }

          li {
            width: 98%;
            height: 40px;
            margin: 5px 1%;
            border-radius: 5px;
            padding: 0px 5px;
            display: flex;
            justify-content: start;
            align-items: center;
            color: $font-light;
            cursor: pointer;
            overflow: hidden;
            background-color: $note-darck;
            transition-duration: 0.5s;

            @media (max-width: $phone) {
              font-size: $x-small;
            }
          }

          li:hover {
            background-color: $message-darck;
          }
        }

        ul::-webkit-scrollbar {
          width: 0px;
        }
      }

      .sid-bar-close {
        @extend .sid-bar-open;
        width: 0px;

        svg {
          transition-duration: 0.5s;
          padding: 7px;
          border-radius: 0%;
          position: absolute;
          right: -35px;
          top: 5px;
          cursor: pointer;
          color: $font-light;
          background-color: $note-darck;
          border-radius: 3px;
        }
      }

      .level-hard {
        width: 5px;
        height: 96%;
        border-radius: 0px 2px 2px 0px;
        position: absolute;
        left: 0px;
        top: 2%;
        z-index: 30;
        background-color: $red;
        box-shadow: 0 0 10px $red;
      }

      .level-normal {
        @extend .level-hard;
        background-color: $normal;
        box-shadow: 0 0 10px $normal;
      }

      .level-easy {
        @extend .level-hard;
        background-color: $green;
        box-shadow: 0 0 10px $green;
      }

      .section {
        width: 100%;
        height: 100%;
        margin: 0px;
        border-radius: 5px;
        background-color: $card-darck;
        transition-duration: 0.5s;
        overflow-y: scroll;
        position: relative;

        .section-header {
          width: 90%;
          height: 40px;
          border: 1px solid;
          border-color: transparent transparent $border-light transparent;
          color: $font-light;
          margin: 35px 5% 5px 5%;
          display: flex;
          // align-items: center;

          h3 {
            width: 95%;
            height: 100%;
            display: flex;
            justify-content: start;
            align-items: center;
          }

          span {
            width: 10%;
            height: 100%;
            display: flex;
            justify-content: end;
            align-items: center;
          }
        }

        h4 {
          margin: 5px 0px;
        }

        p {
          font-size: $x-small;
        }

        .repated {
          width: 90%;
          height: auto;
          margin: 5px 5%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          p {
            padding: 4px;
            width: auto;
            height: auto;
            border-radius: 4px;
            margin: 3px;
            background-color: $note-darck;
          }
        }

        .btn-open {
          position: absolute;
          right: 5px;
          top: 5px;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          outline: none;
          background-color: $green;
          color: $font-light;
          cursor: pointer;
          transition-duration: 0.5s;

          @media (max-width: $phone) {
            padding: 7px 10px;
          }
        }

        .btn-close {
          @extend .btn-open;
          position: absolute;
          right: 5px;
          top: -10%;
        }

        h4 {
          width: 90%;
          margin: 10px 5%;
          height: auto;
          color: $font-light;
        }

        p {
          width: 90%;
          height: auto;
          margin: 10px 5%;
          color: $font-light;
        }

        .images-cont {
          width: 90%;
          height: auto;
          margin: 5px 5%;

          img {
            width: 100%;
            height: auto;
            border-radius: 5px;
          }
        }

        .options-cont {
          width: 90%;
          height: auto;
          margin: 5px 5%;

          .option {
            width: 100%;
            height: 40px;
            margin: 5px 0%;
            padding: 0px 5px;
            border-radius: 5px;
            cursor: pointer;
            background-color: $note-darck;
            display: flex;
            justify-content: space-between;
            align-items: center;

            label {
              width: 95%;
              height: 100%;
              display: flex;
              justify-content: start;
              align-items: center;

              span {
                color: $font-light;
              }
            }
          }
        }

        .validate {
          width: 100%;
          height: 40px;
          border-radius: 5px;
          cursor: pointer;
          margin: 5px 0%;
          border: none;
          outline: none;
          color: $font-light;
          background-color: $green;
        }

        .restart {
          @extend .validate;
          background-color: $red;
        }
      }

      .section::-webkit-scrollbar {
        width: 0px;
      }
    }
  }

  // close cont style
  .close-cont {
    @extend .open-cont;
    padding: 20% 0px 5% 0px;
    transition-duration: 0.5s;
    opacity: 0;
  }
}

.exam-page-light-Arabic {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  direction: rtl;

  // open cont style
  .open-cont {
    width: 100%;
    height: 100vh;
    margin: auto;
    padding: 3% 0px 5% 0px;
    opacity: 1;
    transition-duration: 0.5s;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media (max-width: $phone) {
      width: 100%;
      padding: 10% 0px 5% 0px;
    }

    .header {
      width: 90%;
      margin: 5px 5%;
      height: 40px;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      color: $font-darck;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .container {
      width: 90%;
      height: 85vh;
      margin: 10px 5%;
      position: relative;

      .sid-bar-open {
        width: 20%;
        height: 100%;
        border-radius: 5px;
        backdrop-filter: blur(50px);
        transition-duration: 0.5s;
        position: absolute;
        left: 0%;
        top: 0%;
        z-index: 50;

        @media (max-width: $phone) {
          width: 30%;
        }

        svg {
          transition-duration: 0.5s;
          padding: 7px;
          border-radius: 0%;
          position: absolute;
          right: 5px;
          top: 5px;
          cursor: pointer;
          color: $font-darck;
          background-color: $note-light;
          border-radius: 3px;
        }

        ul {
          width: 100%;
          height: 90%;
          margin-top: 20%;
          list-style-type: none;
          overflow-y: scroll;

          @media (max-width: $phone) {
            margin-top: 50%;
          }

          li {
            width: 98%;
            height: 40px;
            margin: 5px 1%;
            border-radius: 5px;
            padding: 0px 5px;
            display: flex;
            justify-content: start;
            align-items: center;
            color: $font-darck;
            cursor: pointer;
            overflow: hidden;
            background-color: $note-light;
            transition-duration: 0.5s;

            @media (max-width: $phone) {
              font-size: $x-small;
            }
          }

          li:hover {
            background-color: $message-light;
          }
        }

        ul::-webkit-scrollbar {
          width: 0px;
        }
      }

      .sid-bar-close {
        @extend .sid-bar-open;
        width: 0px;

        svg {
          transition-duration: 0.5s;
          padding: 7px;
          border-radius: 0%;
          position: absolute;
          right: -35px;
          top: 5px;
          cursor: pointer;
          color: $font-darck;
          background-color: $note-light;
          border-radius: 3px;
        }
      }

      .level-hard {
        width: 5px;
        height: 96%;
        border-radius: 0px 2px 2px 0px;
        position: absolute;
        left: 0px;
        top: 2%;
        z-index: 30;
        background-color: $red;
        box-shadow: 0 0 10px $red;
      }

      .level-normal {
        @extend .level-hard;
        background-color: $normal;
        box-shadow: 0 0 10px $normal;
      }

      .level-easy {
        @extend .level-hard;
        background-color: $green;
        box-shadow: 0 0 10px $green;
      }

      .section {
        width: 100%;
        height: 100%;
        margin: 0px;
        border-radius: 5px;
        background-color: $card-light;
        transition-duration: 0.5s;
        overflow-y: scroll;
        position: relative;

        .section-header {
          width: 90%;
          height: 40px;
          border: 1px solid;
          border-color: transparent transparent $border-darck transparent;
          color: $font-darck;
          margin: 35px 5% 5px 5%;
          display: flex;

          h3 {
            width: 95%;
            height: 100%;
            display: flex;
            justify-content: start;
            align-items: center;
          }

          span {
            width: 10%;
            height: 100%;
            display: flex;
            justify-content: end;
            align-items: center;
          }
        }

        h4 {
          margin: 5px 0px;
        }

        p {
          font-size: $x-small;
        }

        .repated {
          width: 90%;
          height: auto;
          margin: 5px 5%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          p {
            padding: 4px;
            width: auto;
            height: auto;
            border-radius: 4px;
            margin: 3px;
            background-color: $note-light;
          }
        }

        .btn-open {
          position: absolute;
          right: 5px;
          top: 5px;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          outline: none;
          background-color: $green;
          color: $font-light;
          cursor: pointer;
          transition-duration: 0.5s;

          @media (max-width: $phone) {
            padding: 7px 10px;
          }
        }

        .btn-close {
          @extend .btn-open;
          position: absolute;
          right: 5px;
          top: -10%;
        }

        h4 {
          width: 90%;
          margin: 10px 5%;
          height: auto;
          color: $font-darck;
        }

        p {
          width: 90%;
          height: auto;
          margin: 10px 5%;
          color: $font-darck;
        }

        .images-cont {
          width: 90%;
          height: auto;
          margin: 5px 5%;

          img {
            width: 100%;
            height: auto;
            border-radius: 5px;
          }
        }

        .options-cont {
          width: 90%;
          height: auto;
          margin: 5px 5%;

          .option {
            width: 100%;
            height: 40px;
            margin: 5px 0%;
            padding: 0px 5px;
            border-radius: 5px;
            cursor: pointer;
            background-color: $note-light;
            display: flex;
            justify-content: space-between;
            align-items: center;

            label {
              width: 95%;
              height: 100%;
              display: flex;
              justify-content: start;
              align-items: center;

              span {
                color: $font-darck;
              }
            }
          }
        }

        .validate {
          width: 100%;
          height: 40px;
          border-radius: 5px;
          cursor: pointer;
          margin: 5px 0%;
          border: none;
          outline: none;
          color: $font-light;
          background-color: $green;
        }

        .restart {
          @extend .validate;
          background-color: $red;
        }
      }

      .section::-webkit-scrollbar {
        width: 0px;
      }
    }
  }

  // close cont style
  .close-cont {
    @extend .open-cont;
    padding: 20% 0px 5% 0px;
    transition-duration: 0.5s;
    opacity: 0;
  }
}
// darck and light Arabic Style
</style>
