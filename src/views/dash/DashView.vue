<template>
  <div :class="`dash-${this.$store.state.mood}-${this.$store.state.language}`">
    <!-- loading component  -->
    <LoadingComponentVue />
    <!-- loading component  -->

    <!-- loading component  -->
    <ErrorComponentVue />
    <!-- loading component  -->

    <!-- sidbar component  -->
    <SidBarComponentVue />
    <!-- sidbar component  -->

    <div :class="`sid-bar-${this.status}`">
      <icon :icon="this.icon_type" @click="OpenOrCloseSidBar" />
      <ul>
        <li>
          <router-link
            :to="`${this.$store.state.home_router_dash_sid_bar.path}`"
          >
            {{
              this.$store.state.language == "English"
                ? this.$store.state.home_router_dash_sid_bar.English
                : this.$store.state.home_router_dash_sid_bar.Arabic
            }}
          </router-link>
        </li>
        <li
          v-for="(line, index) in this.$store.state.dash_sid_bar_list"
          :key="index"
          :class="
            line.access.includes(this.$store.state.user.user_type)
              ? 'show'
              : 'hidden'
          "
          @click="ChangeComponent(line.component)"
        >
          {{
            this.$store.state.language == "English" ? line.English : line.Arabic
          }}
        </li>
      </ul>
    </div>

    <div :class="`section-${this.status}`">
      <!-- admins component -->
      <AdminsComponentVue
        v-if="this.$store.state.active_component_in_dash == 'admins'"
      />
      <!-- admins component -->

      <!-- teachers component -->
      <TeachersComponentVue
        v-if="this.$store.state.active_component_in_dash == 'teachers'"
      />
      <!-- teachers component -->

      <!-- students component -->
      <StudentsComponentVue
        v-if="this.$store.state.active_component_in_dash == 'students'"
      />
      <!-- students component -->

      <!-- parents component -->
      <ParentsComponentVue
        v-if="this.$store.state.active_component_in_dash == 'parents'"
      />
      <!-- parents component -->

      <!-- classes component -->
      <ClassesComponentVue
        v-if="this.$store.state.active_component_in_dash == 'classes'"
      />
      <!-- classes component -->

      <!-- Home Works component -->
      <HomeWorksComponentVue
        v-if="this.$store.state.active_component_in_dash == 'home-works'"
      />
      <!-- Home Works component -->

      <!-- Messages component -->
      <MessagesComponentVue
        v-if="this.$store.state.active_component_in_dash == 'messages'"
      />
      <!-- Messages component -->

      <!-- CreateAdmin component -->
      <CreateAdminComponentVue
        v-if="this.$store.state.active_component_in_dash == 'create-admin'"
      />
      <!-- CreateAdmin component -->

      <!-- UpdateAdmin component -->
      <UpdateAdminComponentVue
        v-if="this.$store.state.active_component_in_dash == 'update-admin'"
      />
      <!-- UpdateAdmin component -->

      <!-- delete admin component -->
      <VerifyDeleteAdminComponentVue />
      <!-- delete admin component -->

      <!-- create teacher component -->
      <CreateTeacherComponentVue
        v-if="this.$store.state.active_component_in_dash == 'create-teacher'"
      />
      <!-- create teacher component -->

      <!-- Update Teacher component -->
      <UpdateTeacherComponentVue
        v-if="this.$store.state.active_component_in_dash == 'update-teacher'"
      />
      <!-- Update Teacher component -->

      <!-- create student component -->
      <CreateStudentComponent
        v-if="this.$store.state.active_component_in_dash == 'create-student'"
      />
      <!-- create student component -->

      <!-- verify delete admin component -->
      <VerifyDeleteTeacherComponentVue />
      <!-- verify delete admin component -->

      <!-- verify delete student component -->
      <VerifyDeleteStudentComponent />
      <!-- verify delete student component -->

      <!-- update student component -->
      <UpdateStudentComponent
        v-if="this.$store.state.active_component_in_dash == 'update-student'"
      />
      <!-- update student component -->

      <!-- create parent component -->
      <CreateParentComponent
        v-if="this.$store.state.active_component_in_dash == 'create-parent'"
      />
      <!-- create parent component -->

      <!-- verify delete student component -->
      <VerifyDeleteParentComponent />
      <!-- verify delete student component -->

      <!-- update parent component -->
      <UpdateParentsComponent
        v-if="this.$store.state.active_component_in_dash == 'update-parent'"
      />
      <!-- update parent component -->

      <!-- choose child for parent component -->
      <ChooseChildrenComponent />
      <!-- choose child for parent component -->

      <!-- verify delete class component -->
      <VerifyDeleteClassComponent />
      <!-- verify delete class component -->

      <!-- update class component -->
      <UpdateClassComponent
        v-if="this.$store.state.active_component_in_dash == 'update-class'"
      />
      <!-- update class component -->

      <!-- choose teacher for parent component -->
      <ChooseTeacherComponent />
      <!-- choose teacher for parent component -->

      <!-- update class cover component -->
      <CoverFormComponent />
      <!-- update class cover component -->

      <!-- create class component -->
      <CreateClassComponent
        v-if="this.$store.state.active_component_in_dash == 'create-class'"
      />
      <!-- create class component -->

      <!-- create message component -->
      <CreateMessagesComponent
        v-if="this.$store.state.active_component_in_dash == 'create-message'"
      />
      <!-- create message component -->

      <!-- delete message component -->
      <VerifyDeleteMessageComponent />
      <!-- delete message component -->

      <!-- update message component -->
      <UpdateMessagesComponent
        v-if="this.$store.state.active_component_in_dash == 'update-message'"
      />
      <!-- update message component -->

      <!-- delete home work form component -->
      <VerifyDeleteHomeWorkComponent />
      <!-- delete home work form component -->

      <!-- update home work component -->
      <UpdateHomeWorkComponent
        v-if="this.$store.state.active_component_in_dash == 'update-home-work'"
      />
      <!-- update home work component -->

      <!-- create home work component -->
      <CreateHomeWorkComponent
        v-if="this.$store.state.active_component_in_dash == 'create-home-work'"
      />
      <!-- create home work component -->

      <!-- choosing class form component -->
      <ChooseClassComponent />
      <!-- choosing class form component -->

      <!-- plans component -->
      <PlansComponent
        v-if="this.$store.state.active_component_in_dash == 'plans'"
      />
      <!-- plans component -->

      <!-- create plan component -->
      <CreatePlansComponent
        v-if="this.$store.state.active_component_in_dash == 'create-plan'"
      />
      <!-- create plan component -->

      <!-- add subject component -->
      <AddSubjectFormComponent />
      <!-- add subject component -->

      <!-- verify delete plan form component -->
      <VerifyDeletePlanComponent />
      <!-- verify delete plan form component -->

      <!-- Update Plan component -->
      <UpdatePlansComponent
        v-if="this.$store.state.active_component_in_dash == 'update-plan'"
      />
      <!-- Update Plan component -->

      <!-- Update Plan info component -->
      <!-- Update Plan info component -->

      <!-- foods component -->
      <FoodsComponent
        v-if="this.$store.state.active_component_in_dash == 'foods'"
      />
      <!-- foods component -->

      <!-- verify delete food component -->
      <VerifyDeleteFoodComponent />
      <!-- verify delete food component -->

      <!-- update food component -->
      <UpdateFoodComponent
        v-if="this.$store.state.active_component_in_dash == 'update-food'"
      />
      <!-- update food component -->

      <!-- create food component -->
      <CreateFoodComponent
        v-if="this.$store.state.active_component_in_dash == 'create-food'"
      />

      <!-- my classes component -->
      <TeacherCLassesView
        v-if="this.$store.state.active_component_in_dash == 'my-classes'"
      />
      <!-- my classes component -->

      <!-- Math Questiosn component -->
      <MathQuestionsComponent
        v-if="this.$store.state.active_component_in_dash == `math-questions`"
      />
      <!-- Math Questiosn component -->

      <!-- Create Questiosn component -->
      <CreateQuestuinComponent
        v-if="this.$store.state.active_component_in_dash == 'create-question'"
      />
      <!-- Create Questiosn component -->

      <!-- Add option component -->
      <AddOptionComponnet />
      <!-- Add option component -->

      <!-- update question component -->
      <UpdateQuestuinComponent
        v-if="
          this.$store.state.active_component_in_dash ==
          `update-question-component`
        "
      />
      <!-- update question component -->

      <!-- verify delete question component -->
      <VerifyDeleteQuestionComponent />
      <!-- verify delete question component -->

      <!-- English questions component -->
      <EnglishQuestionsComponent
        v-if="this.$store.state.active_component_in_dash == 'english-questions'"
      />
      <!-- English questions component -->

      <!-- French questions component -->
      <FrenchQuestionsComponent
        v-if="this.$store.state.active_component_in_dash == 'french-questions'"
      />
      <!-- French questions component -->

      <!-- Arabic questions component -->
      <ArabicQuestionsComponent
        v-if="this.$store.state.active_component_in_dash == 'arabic-questions'"
      />
      <!-- Arabic questions component -->

      <!-- Islam questions component -->
      <IslamQuestionsComponent
        v-if="this.$store.state.active_component_in_dash == 'islam-questions'"
      />
      <!-- Islam questions component -->

      <!-- History questions component -->
      <HistoryQuestionsComponent
        v-if="this.$store.state.active_component_in_dash == 'history-questions'"
      />
      <!-- History questions component -->

      <!-- Philosophy questions component -->
      <PhilosophyQuestionsComponent
        v-if="
          this.$store.state.active_component_in_dash == 'philosophy-questions'
        "
      />
      <!-- Philosophy questions component -->

      <!-- Physics questions component -->
      <PhysicsQuestionsComponent
        v-if="this.$store.state.active_component_in_dash == 'physics-questions'"
      />
      <!-- Physics questions component -->

      <!-- Physics questions component -->
      <SciencesQuestionsComponent
        v-if="
          this.$store.state.active_component_in_dash == 'sciences-questions'
        "
      />
      <!-- Physics questions component -->

      <!-- Geography questions component -->
      <GeographyQuestionsComponent
        v-if="
          this.$store.state.active_component_in_dash == 'geography-questions'
        "
      />
      <!-- Geography questions component -->

      <!-- Chemistry questions component -->
      <ChemistryQuestionsComponent
        v-if="
          this.$store.state.active_component_in_dash == 'chemistry-questions'
        "
      />
      <!-- Chemistry questions component -->

      <!-- Alwatania questions component -->
      <AlwataniaQuestionsComponent
        v-if="
          this.$store.state.active_component_in_dash == 'alwatania-questions'
        "
      />
      <!-- Alwatania questions component -->
    </div>
  </div>
</template>

<script>
//? importing the components
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import AdminsComponentVue from "@/components/dash/admins/AdminsComponent.vue";
import TeachersComponentVue from "@/components/dash/Teachers/TeachersComponent.vue";
import StudentsComponentVue from "@/components/dash/Students/StudentsComponent.vue";
import ParentsComponentVue from "@/components/dash/Parents/ParentsComponent.vue";
import ClassesComponentVue from "@/components/dash/Classes/ClassesComponent.vue";
import HomeWorksComponentVue from "@/components/dash/Home Works/HomeWorksComponent.vue";
import MessagesComponentVue from "@/components/dash/Messages/MessagesComponent.vue";
import CreateAdminComponentVue from "@/components/dash/admins/CreateAdminComponent.vue";
import VerifyDeleteAdminComponentVue from "@/components/global/forms/dash/VerifyDeleteAdminComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import UpdateAdminComponentVue from "@/components/dash/admins/UpdateAdminComponent.vue";
import CreateTeacherComponentVue from "@/components/dash/Teachers/CreateTeacherComponent.vue";
import UpdateTeacherComponentVue from "@/components/dash/Teachers/UpdateTeacherComponent.vue";
import VerifyDeleteTeacherComponentVue from "@/components/global/forms/dash/teacher/VerifyDeleteTeacherComponent.vue";
import CreateStudentComponent from "@/components/dash/Students/CreateStudentComponent.vue";
import UpdateStudentComponent from "@/components/dash/Students/UpdateStudentComponent.vue";
import VerifyDeleteStudentComponent from "@/components/global/forms/dash/student/VerifyDeleteStudentComponent.vue";
import VerifyDeleteParentComponent from "@/components/global/forms/dash/parent/VerifyDeleteParentComponent.vue";
import CreateParentComponent from "@/components/dash/Parents/CreateParentComponent.vue";
import UpdateParentsComponent from "@/components/dash/Parents/UpdateParentsComponent.vue";
import ChooseChildrenComponent from "@/components/global/forms/dash/parent/ChooseChildrenComponent.vue";
import VerifyDeleteClassComponent from "@/components/global/forms/dash/class/VerifyDeleteClassComponent.vue";
import UpdateClassComponent from "@/components/dash/Classes/UpdateClassComponent.vue";
import ChooseTeacherComponent from "@/components/global/forms/dash/class/ChooseTeacherComponent.vue";
import CoverFormComponent from "@/components/global/forms/dash/class/CoverFormComponent.vue";
import CreateClassComponent from "@/components/dash/Classes/CreateClassComponent.vue";
import CreateMessagesComponent from "@/components/dash/Messages/CreateMessagesComponent.vue";
import VerifyDeleteMessageComponent from "@/components/global/forms/dash/message/VerifyDeleteMessageComponent.vue";
import UpdateMessagesComponent from "@/components/dash/Messages/UpdateMessagesComponent.vue";
import VerifyDeleteHomeWorkComponent from "@/components/global/forms/dash/HomeWork/VerifyDeleteHomeWorkComponent.vue";
import UpdateHomeWorkComponent from "@/components/dash/Home Works/UpdateHomeWorkComponent.vue";
import CreateHomeWorkComponent from "@/components/dash/Home Works/CreateHomeWorkComponent.vue";
import ChooseClassComponent from "@/components/global/forms/dash/HomeWork/ChooseClassComponent.vue";
import PlansComponent from "@/components/dash/Plans/PlansComponent.vue";
import CreatePlansComponent from "@/components/dash/Plans/CreatePlansComponent.vue";
import AddSubjectFormComponent from "@/components/global/forms/dash/plan/AddSubjectFormComponent.vue";
import VerifyDeletePlanComponent from "@/components/global/forms/dash/plan/VerifyDeletePlanComponent.vue";
import UpdatePlansComponent from "@/components/dash/Plans/UpdatePlansComponent.vue";
import FoodsComponent from "@/components/dash/Foods/FoodsComponent.vue";
import VerifyDeleteFoodComponent from "@/components/global/forms/dash/food/VerifyDeleteFoodComponent.vue";
import UpdateFoodComponent from "@/components/dash/Foods/UpdateFoodComponent.vue";
import CreateFoodComponent from "@/components/dash/Foods/CreateFoodComponent.vue";
import TeacherCLassesView from "@/components/dash/Teachers/TeacherCLassesView.vue";
import MathQuestionsComponent from "@/components/dash/Subjects/Math/MathQuestionsComponent.vue";
import CreateQuestuinComponent from "@/components/Subjects/CreateQuestuinComponent.vue";
import AddOptionComponnet from "@/components/global/forms/dash/Subject/AddOptionComponnet.vue";
import UpdateQuestuinComponent from "@/components/Subjects/UpdateQuestuinComponent.vue";
import VerifyDeleteQuestionComponent from "@/components/global/forms/dash/Subject/VerifyDeleteQuestionComponent.vue";
import EnglishQuestionsComponent from "@/components/dash/Subjects/English/EnglishQuestionsComponent.vue";
import FrenchQuestionsComponent from "@/components/dash/Subjects/French/FrenchQuestionsComponent.vue";
import ArabicQuestionsComponent from "@/components/dash/Subjects/Arabic/ArabicQuestionsComponent.vue";
import IslamQuestionsComponent from "@/components/dash/Subjects/Islam/IslamQuestionsComponent.vue";
import HistoryQuestionsComponent from "@/components/dash/Subjects/History/HistoryQuestionsComponent.vue";
import PhilosophyQuestionsComponent from "@/components/dash/Subjects/Philosophy/PhilosophyQuestionsComponent.vue";
import PhysicsQuestionsComponent from "@/components/dash/Subjects/Physics/PhysicsQuestionsComponent.vue";
import SciencesQuestionsComponent from "@/components/dash/Subjects/Sciences/SciencesQuestionsComponent.vue";
import GeographyQuestionsComponent from "@/components/dash/Subjects/Geography/GeographyQuestionsComponent.vue";
import ChemistryQuestionsComponent from "@/components/dash/Subjects/Chemistry/ChemistryQuestionsComponent.vue";
import AlwataniaQuestionsComponent from "@/components/dash/Subjects/Alwatania/AlwataniaQuestionsComponent.vue";

export default {
  data() {
    return {
      // icon type
      icon_type: "arrow-right",
      // sid bar status
      status: "close",
      // subjet for update data
      subject_for_update_data: "",
    };
  },
  mounted() {
    // call to select the active component in dash
    this.$store.commit("SelectActiveComponent");

    // check if the user is super or admin or teacher
    if (
      this.$store.state.user.user_type == "student" ||
      this.$store.state.user.user_type == "parent"
    ) {
      window.location = "/login";
    }
  },
  components: {
    SidBarComponentVue,
    LoadingComponentVue,
    ErrorComponentVue,
    AdminsComponentVue,
    TeachersComponentVue,
    StudentsComponentVue,
    ParentsComponentVue,
    ClassesComponentVue,
    HomeWorksComponentVue,
    MessagesComponentVue,
    CreateAdminComponentVue,
    VerifyDeleteAdminComponentVue,
    UpdateAdminComponentVue,
    UpdateTeacherComponentVue,
    VerifyDeleteTeacherComponentVue,
    CreateTeacherComponentVue,
    CreateStudentComponent,
    UpdateStudentComponent,
    VerifyDeleteStudentComponent,
    VerifyDeleteParentComponent,
    CreateParentComponent,
    UpdateParentsComponent,
    ChooseChildrenComponent,
    VerifyDeleteClassComponent,
    UpdateClassComponent,
    ChooseTeacherComponent,
    CoverFormComponent,
    CreateClassComponent,
    CreateMessagesComponent,
    VerifyDeleteMessageComponent,
    UpdateMessagesComponent,
    VerifyDeleteHomeWorkComponent,
    UpdateHomeWorkComponent,
    CreateHomeWorkComponent,
    ChooseClassComponent,
    PlansComponent,
    CreatePlansComponent,
    AddSubjectFormComponent,
    VerifyDeletePlanComponent,
    UpdatePlansComponent,
    FoodsComponent,
    VerifyDeleteFoodComponent,
    UpdateFoodComponent,
    CreateFoodComponent,
    TeacherCLassesView,
    MathQuestionsComponent,
    CreateQuestuinComponent,
    AddOptionComponnet,
    UpdateQuestuinComponent,
    VerifyDeleteQuestionComponent,
    EnglishQuestionsComponent,
    FrenchQuestionsComponent,
    ArabicQuestionsComponent,
    IslamQuestionsComponent,
    HistoryQuestionsComponent,
    PhilosophyQuestionsComponent,
    PhysicsQuestionsComponent,
    SciencesQuestionsComponent,
    GeographyQuestionsComponent,
    ChemistryQuestionsComponent,
    AlwataniaQuestionsComponent,
  },
  methods: {
    UpdateSubject(data) {
      // set the data to subject_for_update_data
      this.subject_for_update_data = data;
    },

    // change the component
    ChangeComponent(component) {
      // call to open or close sidBar methdo to close the sidBar
      this.OpenOrCloseSidBar();

      // change the active component
      this.$store.state.active_component_in_dash = component;
    },

    // open or close the sidBar
    OpenOrCloseSidBar() {
      // change the sid bar status
      this.status = this.status == "close" ? "open" : "close";

      // to change the icon type
      this.icon_type =
        this.icon_type == "arrow-right" ? "arrow-left" : "arrow-right";

      // to open or close the sid bar
      this.$store.commit("ChangeDashSidBarStatus");
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";
// darck adn light English style
.dash-darck-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  display: flex;
  direction: ltr;

  .sid-bar-open {
    width: 20%;
    height: 96vh;
    margin: 2vh 10px;
    background-color: $card-darck;
    border-radius: 10px;
    position: absolute;
    transition-duration: 0.5s;
    z-index: 100;

    @media (max-width: $phone) {
      width: 40%;
    }

    svg {
      padding: 10px;
      border-radius: 5px;
      background-color: $message-darck;
      color: $font-light;
      cursor: pointer;
      position: absolute;
      right: -15px;
      top: 40px;
    }

    // home link (svg)
    a {
      text-decoration: none;
      width: 100%;
      height: 100%;
      color: $font-light;
      display: flex;
      justify-content: start;
      align-items: center;
    }

    ul {
      width: 100%;
      height: 100%;
      overflow: hidden;
      overflow-y: scroll;

      li {
        width: 96%;
        height: 40px;
        margin: 10px 2%;
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 0px 10px;
        border-radius: 5px;
        color: $font-light;
        cursor: pointer;
        transition-duration: 0.5s;
        @media (max-width: $phone) {
          font-size: $x-small;
        }
      }

      li:hover {
        background-color: $note-darck;
      }

      .hidden {
        display: none;
      }

      .show {
        display: flex;
      }
    }

    ul::-webkit-scrollbar {
      width: 0px;
    }
  }

  .sid-bar-close {
    @extend .sid-bar-open;
    width: 0%;
  }

  .section-open,
  .section-close {
    width: 100%;
    height: 100vh;
    transition-duration: 0.5s;
    overflow: hidden;
  }
}

.dash-light-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  display: flex;
  direction: ltr;

  .sid-bar-open {
    width: 20%;
    height: 96vh;
    margin: 2vh 10px;
    background-color: $card-light;
    border-radius: 10px;
    position: absolute;
    transition-duration: 0.5s;
    z-index: 100;

    @media (max-width: $phone) {
      width: 40%;
    }

    svg {
      padding: 10px;
      border-radius: 5px;
      background-color: $message-light;
      color: $font-darck;
      cursor: pointer;
      position: absolute;
      right: -15px;
      top: 40px;
    }

    // home link (svg)
    a {
      text-decoration: none;
      width: 100%;
      height: 100%;
      color: $font-darck;
      display: flex;
      justify-content: start;
      align-items: center;
    }

    ul {
      width: 100%;
      height: 100%;
      overflow: hidden;
      overflow-y: scroll;

      li {
        width: 96%;
        height: 40px;
        margin: 10px 2%;
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 0px 10px;
        border-radius: 5px;
        color: $font-darck;
        cursor: pointer;
        transition-duration: 0.5s;

        @media (max-width: $phone) {
          font-size: $x-small;
        }
      }

      li:hover {
        background-color: $note-light;
      }

      .hidden {
        display: none;
      }

      .show {
        display: flex;
      }
    }

    ul::-webkit-scrollbar {
      width: 0px;
    }
  }

  .sid-bar-close {
    @extend .sid-bar-open;
    width: 0%;
  }

  .section-open,
  .section-close {
    width: 100%;
    height: 100vh;
    transition-duration: 0.5s;
    overflow: hidden;
  }
}
// darck adn light English style

// darck adn light Arabic style
.dash-darck-Arabic {
  @extend .dash-darck-English;
}

.dash-light-Arabic {
  @extend .dash-light-English;
}
// darck adn light Arabic style
</style>
