import { createRouter, createWebHistory,  } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/loginView.vue";

// students pages
import StudentsView from "../views/student/StudentsView.vue";
import StudentView from "../views/student/StudentView.vue";
import CreateStudentView from "../views/student/CreateStudentView.vue";
import StudentCLassesView from "@/views/student/StudentCLassesView.vue";
import StudentPlansView from "@/views/student/StudentPlansView.vue";
import TopStudentView from "@/views/student/TopStudentsView.vue";
import StudentsGPAListView from "@/views/student/StudentsGPAListView.vue";
import MyGPAListView from "@/views/student/MyGPAListView.vue";
// students pages

// classes pages
import ClassesView from "../views/classes/CLassesView.vue";
import ClassView from "../views/classes/ClassView.vue";
import CreateClassView from "../views/classes/CreateClassView.vue";
// classes pages

// Plans pages
import PlansView from "../views/plans/PlansView.vue";
import PlanView from "../views/plans/PlanView.vue";
import MyPlansView from "../views/plans/MyPlansView.vue";
import CreatePlanView from "../views/plans/CreatePlanView.vue";
// Plans pages

// Home Work pages
import HomeWorksView from "../views/home_works/HomeWorksView.vue";
import HomeWorkView from "../views/home_works/HomeWorkView.vue";
import CreateHomeWorkView from "../views/home_works/CreateHomeWorkView.vue";
import UpdateHomeWorkView from "../views/home_works/UpdateHomeWorkView.vue";
// Home Work pages

// Teachers pages
import TeachersView from "../views/teachers/TeachersView.vue";
import TeacherView from "../views/teachers/TeacherView.vue";
import TeacherPlansView from "@/views/teachers/TeacherPlansView.vue";
import TeacherCLassesView from "@/views/teachers/TeacherCLassesView.vue";
// Teachers pages

// Admins pages
import AdminView from "../views/admins/AdminView.vue";
import AdminsView from "../views/admins/AdminsView.vue";
// Admins pages

// parents pages
import parentsView from "../views/parent/ParentsView.vue";
import parentView from "../views/parent/ParentView.vue";
// parents pages

// profile page
import ProfileView from "../views/profile/ProfileView.vue";
import UpdateProfilrView from "../views/profile/UpdateProfileView.vue";
// profile page

// children page
import MyChildren from "../views/childrens/MyChildrenView.vue";
// children page

// my classes page
import MyClasses from "../views/classes/MyCLassesView.vue";
// my classes page

// messages page
import MessagesView from "../views/MessagesView.vue";
// messages page

// install page
import InstallView from "../views/InstallView.vue";
// install page

// install food pages
import FoodsView from "../views/Foods/FoodsView.vue";
import FoodView from "../views/Foods/FoodView.vue";
// install food pages

// dash bord
import DashView from "../views/dash/DashView.vue";
// dash bord

// question view
import QuestionsView from "@/views/Subjects/QuestionsView.vue";
// question view

// exam
import StartExam from "@/views/Exam/StartExamView.vue";
import ExamView from "@/views/Exam/ExamView.vue";
// exam

// 404 not found 
import NotFoundView from "@/views/NotFoundView.vue";
// 404 not found 

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
  {
    path: "/updateProfile/:id",
    name: "update-profile",
    component: UpdateProfilrView,
  },
  {
    path: "/login",
    name: "login-page",
    component: LoginView,
  },
  // exam 
  {
    path : "/start/exam",
    name : "StartExam",
    component : StartExam
  },
  {
    path : "/exam/:subject/:class_level",
    name : "ExamPage",
    component : ExamView,
  },
  // exam 
  // students pages
  {
    path: "/students",
    name: "students",
    component: StudentsView,
  },
  {
    path: "/student/:id",
    name: "student",
    component: StudentView,
  },
  {
    path: "/create/student",
    name: "createstudent",
    component: CreateStudentView,
  },
  {
    path : "/plans/student/:id",
    name : "studentsPlans",
    component : StudentPlansView
  },
  {
    path : "/classes/student/:id",
    name : "studentsClasses",
    component : StudentCLassesView
  },
  {
    path : "/top/students",
    name : "TopStudents",
    component : TopStudentView
  },
  {
    path : "/student/gpa_list/:id",
    name : "StudentGpa",
    component : StudentsGPAListView
  },
  {
    path : "/my/gpa_list/:id",
    name : "MyGpaList",
    component : MyGPAListView
  },
  // students pages
  // teacher pages
  {
    path: "/teachers",
    name: "teachers",
    component: TeachersView,
  },
  {
    path: "/teacher/:id",
    name: "teacher",
    component: TeacherView,
  },
  {
    path : "/plans/teacher/:id",
    name : "teacherPlans",
    component : TeacherPlansView
  },
  {
    path : "/classes/teacher/:id",
    name : "teacherClasses",
    component : TeacherCLassesView
  },
  // teacher pages
  // teacher pages
  {
    path: "/admins",
    name: "admins",
    component: AdminsView,
  },
  {
    path: "/admin/:id",
    name: "admin",
    component: AdminView,
  },
  // teacher pages
  // parents pages
  {
    path: "/parents",
    name: "parents",
    component: parentsView,
  },
  {
    path: "/parent/:id",
    name: "parent",
    component: parentView,
  },
  // parents pages
  // classes pages
  {
    path: "/classes",
    name: "classes",
    component: ClassesView,
  },
  {
    path: "/class/:id",
    name: "class",
    component: ClassView,
  },
  {
    path: "/create/class",
    name: "createclass",
    component: CreateClassView,
  },
  // classes pages
  // plans pages
  {
    path: "/plans",
    name: "plans",
    component: PlansView,
  },
  {
    path: "/plan/:id",
    name: "plan",
    component: PlanView,
  },
  {
    path: "/create/plan",
    name: "createplan",
    component: CreatePlanView,
  },
  {
    path: "/my/plans",
    name: "myplans",
    component: MyPlansView,
  },
  // plans pages
  // Home Work pages
  {
    path: "/homeWorks",
    name: "homeWorks",
    component: HomeWorksView,
  },
  {
    path: "/HomeWork/:id",
    name: "HomeWork",
    component: HomeWorkView,
  },
  {
    path: "/create/homeWork",
    name: "CraeteHomeWork",
    component: CreateHomeWorkView,
  },
  {
    path: "/update/homeWork/:id",
    name: "updateHomeWork",
    component: UpdateHomeWorkView,
  },
  // Home Work pages
  // children page
  {
    path: "/my/children",
    name: "mychildren",
    component: MyChildren,
  },
  // children page
  // my classes page
  {
    path: "/my/classes/",
    name: "myClasses",
    component: MyClasses,
  },
  // my classes page
  // messages page
  {
    path: "/messages",
    name: "messages",
    component: MessagesView,
  },
  // install app
  {
    path: "/install",
    name: "install",
    component: InstallView,
  },
  // install app
  // food page
  {
    path: "/foods",
    name: "foods",
    component: FoodsView,
  },
  {
    path: "/food/:id",
    name: "food",
    component: FoodView,
  },
  // food page
  // dash bord
  {
    path: "/dash",
    name: "DashBord",
    component: DashView,
  },
  // question page
  {
    path : "/qu/:type/:id",
    name :"QuestionPage",
    component : QuestionsView
  },
  // question page
  // not found page
  {
    path : "/:pathMatch(.*)*",
    name : "NotFound",
    component: NotFoundView,
    }
  // not found page
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});



export default router;
