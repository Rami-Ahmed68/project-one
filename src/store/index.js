import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    mood: window.localStorage.getItem("mood") || "darck",
    // mood: "darck",
    language: window.localStorage.getItem("language") || "English",
    language_list_state: "close",
    theme: window.localStorage.getItem("theme") || "orange",
    developer : {
      url: "https://rami-web.onrender.com",
      English: "Developer 👨‍💻",
      Arabic: "👨‍💻 المطور",
    },
    error_form_status: "close",
    messages_count : 0,
    error_message: {},
    delete_hw_form_status: "close",
    copy_message_status: "close",
    avatar_form_status: "close",
    cover_form_status : "close",
    delete_admin_form_status: "close",
    delete_teacher_form_status: "close",
    delete_student_form_status: "close",
    delete_question_form_status: "close",
    delete_parent_form_status: "close",
    remove_plan_form_dash_status : "close",
    remove_food_form_dash_status : "close",
    delete_class_form_status: "close",
    delete_home_work_form_status: "close",
    delete_student_form : "close",
    delete_message_form_status : "close",
    add_subject_form_status : "close",
    update_subject_form_status : "close",
    add_option_form_status : "close",
    add_rate_form_status : "close",
    user: JSON.parse(window.localStorage.getItem("Ss-user")) || "",
    profile: "",
    user_type: "",
    show_user: "",
    selectd_images: [],
    delete_avatar: "false",
    delete_cover : "false",
    messages: [],
    admin_id_for_delete: "",
    teacher_id_for_delete: "",
    teacher_id_for_add_rate: "",
    parent_id_for_delete : "",
    plan_id_for_delete : "",
    food_id_for_delete : "",
    admin_for_update: "",
    teacher_for_update: "",
    student_for_update : "",
    parent_for_update : "",
    message_id_for_delete : "",
    message_for_update : "",
    home_work_id_for_delete : "",
    home_work_for_update : "",
    plan_data_for_update : "",
    food_data_for_update : "",
    active_component_in_dash: "admins",
    choose_children_status : "close",
    choose_teacher_status : "close",
    choose_class_status : "close",
    exam_points_form : "close",
    geted_student : "",
    geted_class : "",
    geted_teacher : "",
    exam_questions : [],
    exam_choosed_options : [],
    exam_marks : 0,
    exam_time : 40,
    choosed_children : [],
    choosed_teacher : "",
    choosed_class : "",
    class_for_update: "",
    selected_cover : "",
    new_home_work_images : [],
    home_work_images_for_delete : [],
    food_images_for_delete : [],
    new_food_images : [],
    new_question_images : [],
    question_images_for_delete : [],
    question_data_for_update : "",
    question_subject_type_for_update : "",
    question_subject_type_for_delete : "",
    question_id_for_delete : "",
    question_options : [],
    class_id_for_create_home_work : "",
    sid_bar_dash : "close",
    // user_type: JSON.parse(window.localStorage.getItem("Ss-user")).user_type || "admint",
    sidBar: "close",
    information: "test",
    loading: "close",
    rate_status : true,
    copy_message: { english: "Id Copyed", arabic: "تم نسخ المعرف" },
    math_questions : [],
    english_questions : [],
    arabic_questions : [],
    french_questions : [],
    islam_questions : [],
    history_questions : [],
    philosophy_questions : [],
    physics_questions : [],
    sciences_questions : [],
    geography_questions : [],
    chemistry_questions : [],
    alwatania_questions : [],
    classes: [],
    class: "",
    students: [],
    top_students: [],
    student: "",
    teachers: [],
    teacher: "",
    home_works: [],
    home_work: "",
    parents: [],
    parent: "",
    admins: [],
    admin: "",
    plans: [],
    my_plans : [],
    my_classes : [],
    plan: "",
    foods: [],
    food: "",
    plan_info : [],
    Links: [
      { path: "/dash", English_title: "Dashboard 🎛️", Arabic_title : "لوحة التحكم 🎛️", access: ["super" , "admin" , "teacher"] },
      { path: "/profile", English_title: "Profile 🧾", Arabic_title : "حسابي 🧾", access: ["super" , "admin" , "teacher" , "student" , "parent"] },
      { path: "/start/exam", English_title: "Start Exam 📝🧠", Arabic_title: "بدء إختبار 📝🧠", access: ["super" , "admin" , "teacher" , "student" , "parent"] },
      { path: "/", English_title: "Home 🏠", Arabic_title: "الصفحة الرئيسية 🏠", access: ["super" , "admin" , "teacher" , "student" , "parent"] },
      { path: "/classes", English_title: "Classes 🏛️", Arabic_title: "الصفوف 🏛️",access: ["super" , "admin" , "teacher" , "student" , "parent"] },
      { path: "/my/classes", English_title: "My Classes 🏫⭕📌", Arabic_title: "صفوفي",access: ["teacher" , "student"] },
      { path: "/students", English_title: "Students 👨‍🎓", Arabic_title: "الطلاب 👨‍🎓",access: ["super" , "admin" , "teacher" , "student" , "parent"] },
      { path: "/top/students", English_title: "Top Students 👨‍🎓📌", Arabic_title: "الطلاب الأوائل 👨‍🎓📌",access: ["super" , "admin" , "teacher" , "student" , "parent"] },
      { path: "/teachers", English_title: "Teachers 👨‍🏫", Arabic_title: "المدرسون 👨‍🏫",access: ["super" , "admin" , "teacher" , "student" , "parent"] },
      { path: "/admins", English_title: "Admins 🦸‍♂️", Arabic_title: "المدراء 🦸‍♂️",access: ["super" , "admin" , "teacher" , "student" , "parent"] },
      { path: "/parents", English_title: "Parents 👨‍👩‍👦‍👦", Arabic_title: "أولياء الأمور 👨‍👩‍👦‍👦",access: ["super" , "admin" , "teacher" , "parent"] },
      { path: "/plans", English_title: "Plans 📌📚", Arabic_title: " الخطط 📌📚",access: ["super" , "admin" , "teacher" , "student" , "parent"] },
      { path: "/my/plans", English_title: "My Plans ⭕📌📚", Arabic_title: "خططي ⭕📌📚",access: ["teacher" , "student"] },
      { path: "/my/children", English_title: "My Children 👶", Arabic_title: "أبنائي 👶", access: ["parent"] },
      { path: "/foods", English_title: "Food Guide 🍝", Arabic_title: "دليل الطعام 🍝", access: ["super" , "admin" , "teacher" , "parent"] },
      { path: "/about", English_title: "About us 💁‍♂️ℹ️", Arabic_title: "معلومات عنا 💁‍♂️ℹ️", access: ["super" , "admin" , "teacher" , "student" , "parent"] },
      { path: "/install", English_title: "Install app 🔻", Arabic_title: "تنزيل التطبيق 🔻", access: ["super" , "admin" , "teacher" , "student" , "parent"] }
    ],
    medals: [
      { gpa: 0, English: "Weak 🏴‍☠️" , Arabic : "ضعيف 🏴‍☠️" , id : 'Weak'},
      { gpa: 5, English: "Pay more attention 👀" , Arabic : "انتبه أكثر 👀" , id : 'Pay-more-attention'},
      { gpa: 10, English: "Okay 👍" , Arabic : "لا بأس 👍" , id : 'Okay'},
      { gpa: 20, English: "Good ✊", Arabic : "جيد ✊", id : 'Good'},
      { gpa: 30, English: "Very good 📈" , Arabic : "جدي جدا 📈" , id : 'Very-good'},
      { gpa: 40, English: "Perseverant 🙇" , Arabic : "مثابر 🙇" , id : 'Perseverant'},
      { gpa: 50, English: "Smart 🧠" , Arabic : "ذكي 🧠" , id : 'Smart'},
      { gpa: 60, English: "Goal scorer 🎯" , Arabic : "هداف 🎯" , id : 'Goal-scorer'},
      { gpa: 70, English: "Legendary 🔥" , Arabic : "اسطوري 🔥" , id : 'Legendary'},
      { gpa: 80, English: "Third level 🥉" , Arabic : "المستوى الثالث 🥉" , id : 'Third-level'},
      { gpa: 90, English: "Second level 🥈" , Arabic : "المستوى الثاني 🥈" , id : 'Second-level'},
      { gpa: 95, English: "First level 🥇" , Arabic : "المستوى الأول 🥇" , id : 'First-level'},
    ],
    home_router_dash_sid_bar : 
    { English : "Home 🏠" , Arabic : "🏠 الصفحة الرئيسية" , path : "/" , access : ["super" , "admin" , "teacher"]},
    dash_sid_bar_list : [
      { English : "Admins 🦸‍♂️" , Arabic : "المدراء 🦸‍♂️" , component : "admins" , access : ["super" , "admin"]},
      { English : "Teachers 👨‍🏫" , Arabic : "👨‍🏫 المدرسين" , component : "teachers" , access : ["super" , "admin"]},
      { English : "Students 👨‍🎓" , Arabic : "👨‍🎓 الطلاب" , component : "students", access : ["super" , "admin"]},
      { English : "Parents 👨‍👩‍👦‍👦" , Arabic : "👨‍👩‍👦‍👦  أولياء الأمور", component : "parents" , access : ["super" , "admin"]},
      { English : "Classes 🏫" , Arabic : "🏫 الصفوف" , component : "classes", access : ["super" , "admin" , "teacher"]},
      { English : "Home Works 🏚️💯🔝" , Arabic : "🏚️💯🔝 الوظائف" , component : "home-works" , access : ["super" , "admin" , "teacher"]},
      { English : "Messages 💬" , Arabic : "🏫 الرسائل" , component : "messages" , access : ["super" , "admin"]},
      { English : "Plans 📌📚" , Arabic : "📌📚 الخطط" , component : "plans" , access : ["super" , "admin"]},
      { English : "Foods 😋🍴" , Arabic : "😋🍴 الأطعمة" , component : "foods" , access : ["super" , "admin"]},
      { English : "My Classes ⭕📌🏫" , Arabic : "⭕📌🏫 صفوفي " , component : "my-classes" , access : ["teacher"]},
      { English : "Create Admin 🦸‍♂️➕" , Arabic : "🦸‍♂️➕ إنشاء مدير " , component : "create-admin" , access : ["super"]},
      { English : "Create Teacher 👨‍🏫➕" , Arabic : "👨‍🏫➕ إنشاء مدرس " , component : "create-teacher" , access : ["super" , "admin"]},
      { English : "Create Student 👨‍🎓➕" , Arabic : "👨‍🎓➕ إنشاء طالب " , component : "create-student" , access : ["super" , "admin"]},
      { English : "Create Parent 👨‍👩‍👦‍👦➕" , Arabic : "👨‍👩‍👦‍👦 ➕ إنشاء ولي أمر" , component : "create-parent" , access : ["super" , "admin"]},
      { English : "Create Class 🏫➕" , Arabic : "🏫➕ إنشاء صف" , component : "create-class" , access : ["super" , "admin" , "teacher"]},
      { English : "Create Message 💬➕" , Arabic : "💬➕ إنشاء رسالة" , component : "create-message" , access : ["super" , "admin"]},
      { English : "Create Home Work 🏚️💯🔝➕" , Arabic : "🏚️💯🔝➕ إنشاء وظيفة" , component : "create-home-work" , access : ["super" , "admin" , "teacher"]},
      { English : "Create Plan 📌📚➕" , Arabic : "📌📚➕ إنشاء خطة" , component : "create-plan" , access : ["super" , "admin"]},
      { English : "Create Food 😋🍴➕" , Arabic : "😋🍴➕ إنشاء توصية طعام" , component : "create-food" , access : ["super" , "admin"]},
      { English : "Create Question 📌⭕➕" , Arabic : "📌⭕➕ إنشاء سؤال" , component : "create-question" , access : ["super" , "admin" , "teacher"]},
      { English : "Math Bank ⭕📌🧮" , Arabic : "⭕📌🧮 بنك الرياضيات" , component : "math-questions" , access : ["super" , "admin" , "teacher"]},
      { English : "Arabic Bank ⭕📌🇸🇾" , Arabic : "⭕📌🇸🇾 بنك العربي" , component : "arabic-questions" , access : ["super" , "admin" , "teacher"]},
      { English : "English Bank ⭕📌🇺🇸" , Arabic : "⭕📌🇺🇸 بنك الإنكليزي" , component : "english-questions" , access : ["super" , "admin" , "teacher"]},
      { English : "French Bank ⭕📌🇫🇷" , Arabic : "⭕📌🇫🇷 بنك الفرنسي" , component : "french-questions" , access : ["super" , "admin" , "teacher"]},
      { English : "Physics Bank ⭕📌⚛️" , Arabic : "⭕📌⚛️ بنك الفيزياء" , component : "physics-questions" , access : ["super" , "admin" , "teacher"]},
      { English : "Philosophy Bank ⭕📌👴🏻" , Arabic : " ⭕📌👴🏻بنك الفلسفة" , component : "philosophy-questions" , access : ["super" , "admin" , "teacher"]},
      { English : "Sciences Bank ⭕📌🦠" , Arabic : "⭕📌🦠 بنك العلوم" , component : "sciences-questions" , access : ["super" , "admin" , "teacher"]},
      { English : "Islam Bank ⭕📌👳🕋" , Arabic : "⭕📌👳🕋 بنك الديانة" , component : "islam-questions" , access : ["super" , "admin" , "teacher"]},
      { English : "History Bank ⭕📌⏳" , Arabic : "⭕📌⏳ بنك التاريخ" , component : "history-questions" , access : ["super" , "admin" , "teacher"]},
      { English : "Chemistry Bank ⭕📌🧪" , Arabic : "⭕📌🧪 بنك الكيمياء" , component : "chemistry-questions" , access : ["super" , "admin" , "teacher"]},
      { English : "Geography Bank ⭕📌🌎" , Arabic : "⭕📌🌎 بنك الجغرافيا" , component : "geography-questions" , access : ["super" , "admin" , "teacher"]},
      { English : "Alwatania Bank ⭕📌🪖" , Arabic : "⭕📌🪖 بنك الوطنية" , component : "alwatania-questions" , access : ["super" , "admin" , "teacher"]},
    ],
    subjects_list: [
      { English: "Math", Arabic: "رياضيات" },
      { English: "Arabic", Arabic: "عربي" },
      { English: "English", Arabic: "إنكليزي" },
      { English: "French", Arabic: "فرنسي" },
      { English: "History", Arabic: "تاريخ" },
      { English: "Philosophy", Arabic: "فلسفة" },
      { English: "Physics", Arabic: "فيزياء" },
      { English: "Sciences", Arabic: "علم احياء" },
      { English: "Islam", Arabic: "ديانة" },
      { English: "Geography", Arabic: "جغرافيا" },
      { English: "Chemistry", Arabic: "كيمياء" },
      { English: "Alwatania", Arabic: "وطنية" },
    ],
    Classes_level_list: [
      { English: "First_grade", Arabic: "الصف الأول" },
      { English: "Second_grade", Arabic: "الصف الثاني" },
      { English: "Third_grade", Arabic: "الصف الثالث" },
      { English: "Fourth_grade", Arabic: "الصف الرابع" },
      { English: "Fifth_grade", Arabic: "الصف الخامس" },
      { English: "Sixth_grade", Arabic: "الصف السادس" },
      { English: "Seventh_grade", Arabic: "الصف السابع" },
      { English: "Eighth_grade", Arabic: "الصف الثامن" },
      { English: "Ninth_grade", Arabic: "الصف التاسع" },
      { English: "Literary_Tenth_grade", Arabic: "الصف العاشر الأدبي" },
      { English: "Scientific_Tenth_grade", Arabic: "الصف العاشر العلمي" },
      { English: "Literary_Eleventh_grade", Arabic: "الصف الحادي عشر الأدبي" },
      {
        English: "Scientific_Eleventh_grade",
        Arabic: "الصف الحادي عشر العلمي",
      },
      { English: "Literary_baccalaureate", Arabic: "بكالوريا أدبي " },
      { English: "Scientific_baccalaureate", Arabic: "بكالوريا علمي" },
      
    ],
    question_value : [
      { English : "True ✅" , Arabic : "صح ✅" , value : true},
      { English : "False ❌" , Arabic : "خطأ ❌" , value : false},
    ],
    recipient_list : [
      { English: "for students 👨‍🎓", Arabic: "👨‍🎓 للطلاب" , value : "students"},
      { English: "for parents 👨‍👩‍👦‍👦", Arabic: "👨‍👩‍👦‍👦 لأولياء الأمور" , value : "parents"},
      { English: "for teachers 👨‍🏫", Arabic: "👨‍🏫 للمدرسين" , value : "teachers"},
      { English: "public 📢", Arabic: "📢 للجميع" , value : "public"},
    ],
    messages_level_list : [
      { English: "normal 🟨", Arabic: "🟨 متوسطة الأهمية" , value : "normal"},
      { English: "important 🟧", Arabic: "🟧 هامة" , value : "important"},
      { English: "veryimportant 🟥 ", Arabic: "🟥  هامة جدا" , value : "veryimportant"},
    ],
    home_work_level_list : [
      { English: "easy 🟩 ", Arabic: "🟩  سهلة" , value : "easy"},
      { English: "normal 🟧", Arabic: "🟧 وسط" , value : "normal"},
      { English: "hard 🟥", Arabic: "🟥 صعبة" , value : "hard"},
    ],
    questions_level_list : [
      { English: "easy 🟩 ", Arabic: "🟩  سهل" , value : "easy"},
      { English: "normal 🟧", Arabic: "🟧 وسط" , value : "normal"},
      { English: "hard 🟥", Arabic: "🟥 سعب" , value : "hard"},
    ],
    English: {
      login: {
        title: "Log in to your account 🔐...",
        label: { label_one: "Email", label_tow: "Pssword" },
        info : `Hello. Please be careful when logging in. You must choose your identity on the site by adding key letters before your account, for example:
If you are a student, add S: your email
If you are my guardian, add P: your email`,
        placeholder: {
          email: "Type your email here 📧...",
          password: "Type your password here 🔑...",
        },
        button: "login",
      },
      home: {
        classes: {
          title: "Classes 🏫",
          link: "Get Classes",
          subject: "subject",
        },
        teachers: { title: "Teachers 👨‍🏫", link: "Get Teachers" },
        admins: { title: "Admins 🦸", link: "Get Admins" },
      },
      nav: {
        messages: {
          message_one: "Super Search ⚡",
          message_tow: "Type Id here 👇 to search",
        },
        placeholder: "Type Id here to search ...",
        button: "Search",
      },
      language: {
        pages: "Pages 🗂️",
        title: "Language 🗣️🌍",
        arabic: "Arabic",
        english: "English",
      },
      footer: {
        message: "Hi,",
        links: [
          {
            title: "FaceBook",
            link: "https://www.facebook.com/awael.school.alp",
            icon: "facebook",
          },
          {
            title: "WhatsApp",
            link: "https://wa.me/980 727 092",
            icon: "whatsapp",
          },
          { title: "About Us", link: "/about" },
        ],
      },
      class_page: {
        class_level: "Class level 🏫🪜🎚️ :",
        class_subject: "Subject 📚📖📑 :",
        created_by: "Created By :",
        section_title: {
          home_work: "👉 Home Works 🏚️💯🔝",
          student: " 👉 Student 👨‍🎓👩‍🎓",
        },
        result_messages: {
          home_work_message: "📍⛔😕 No Home Works 😕⛔📍",
          students: "📍⛔😕 No Students 😕⛔📍",
        },
        buttons: {
          join: "join",
          leave: "leave",
        },
      },
      copy_id: "👉",
      home_work_page: {
        page_title: "Home Work 🏚️💯🔝",
        description: "Description 📝📋 :",
        subject: "Subject 📚📖📑 :",
        images_title: "Images",
        class: "Class 🏫",
        created_by: "Created By",
        result_message: "📍⛔😕 No Images 😕⛔📍",
      },
      delete_hw_form: {
        message: "❓😳 Are you sur 😳❓",
        delete: "Delete",
        Cancel: "Cancel",
      },
      classes_page: {
        placeholder: "Type the class title here ✍️",
        page_title: "Classes Page 🏫",
        search_classes_title: "Search By title 💬👇",
        results_message: "Results 🏚️👇",
      },
      home_works_page: {
        placeholder: "Type the home work title here ✍️",
        page_title: "Home Works Page 🏫",
        search_classes_title: "Search By title 💬👇",
        results_message: "Results 🏚️👇",
      },
      home_works_component: {
        subject: "Subject 📚📖📑 :",
        class_level: "Class level 🏫🪜🎚️ :",
        created_at: "📆 :",
        images: "Images 🗃️🖼️ :",
      },
      student_component: {
        points: "points 🖊️📝🎊 :",
        gpa: "GPA ✅📑 :",
        class_level: "class level🏛️🪜🎚️ :",
      },
      students_page: {
        placeholder: "Type the student name here ✍️",
        page_title: "Students page 👨‍🎓",
        search_admin_name: "Search By name 💬👇",
        results_message: "Results 👨‍🎓👇",
      },
      top_students_page: {
        label: "Choose Class Level here 🎯",
        page_title: "Top Students page 👑 👨‍🎓",
        results_message: "Results 👨‍🎓👇",
        default : "📍⛔😕 No Any Student 😕⛔📍",
        button : "Get Student"
      },
      plans_page: {
        placeholder: "Type the plan title here ✍️",
        page_title: "Plans page 📌🪃📚",
        search_admin_name: "Search By title 💬👇",
        results_message: "Results 📌🪃📚👇",
      },
      plan_page: {
        class_level: "Class level 🏫🪜🎚️ :",
        created_at: "📆 :",
        students: "students 👨‍🎓 :",
        teachers: "teachers 👨‍🏫 :",
        collection: "plan collection :",
        day: "day 🌅 :",
        subject: "Subject 📚📖📑 :",
        start: "start 🏁 :",
        end: "end 🚩 :",
        buttons: {
          copy: "Copy",
          remove: "Remove",
        },
      },
      plan_component: {
        class: "class level 🏫🪜🎚️ :",
        students: "students 👨‍🎓 :",
        teachers: "teachers 👨‍🏫 :",
        created_at: "📆 :",
      },
      admins_page: {
        placeholder: "Type the admin name here ✍️",
        page_title: "Admins page 🦸‍♂️",
        search_admin_name: "Search By name 💬👇",
        results_message: "Results 🦸‍♂️👇",
      },
      admin_component: {
        admin: "Admin 🦸‍♂️",
        supper_admin: "Super admin ⚡🦸‍♂️",
      },
      teachers_page: {
        placeholder: "Type the teacher name here ✍️",
        page_title: "Teachers page 👨‍🏫",
        search_admin_name: "Search By name 💬👇",
        results_message: "Results 👨‍🏫👇",
      },
      parents_page: {
        placeholder: "Type the parent name here ✍️",
        page_title: "Parents page 👨‍👩‍👦‍👦",
        search_admin_name: "Search By name 💬👇",
        results_message: "Results 👨‍👩‍👦‍👦👇",
      },
      teacher_component: {
        rate: "Rate ⭐ :",
        classes: "Class 🏛️ :",
        subject: "Subject 📚📖📑 :",
        editor: "Editor",
        class_level: "class level 🏫🪜🎚️ :",
        phone: "📞 :",
      },
      install_page: {
        title : "Al'awayel School",
        btn_text: "Click to instll",
        message:
          "Our school: an educational edifice equipped with teaching aids, including equipped classrooms and places for educational and sports activities It was established in 2012 and includes educational stages from kindergarten to middle school.",
        note: "All rights are save",
      },
      profile: {
        gender: "Gender ⚧️ :",
        phone: "Phone 📞 :",
        exams: "Exams 📝📑🔖 :",
        rate: "Rate ⭐ :",
        points: "Points 📍 :",
        gpa: "GPA 📌 :",
        class_level: "CLass Level 🏫🪜🎚️ :",
        joind_at: "Joind In 📆 :",
        medals : "Medals",
        children : "Children 👶🧒👱‍♂️ :",
        default_message_children: "📍⛔😕 No Any Child 📍⛔😕",
        default_message_classes: "📍⛔😕 No Any Class 📍⛔😕",
        default_message_plans: "📍⛔😕 No Any Plan 📍⛔😕",
        classes_cont: {
          title: "My Classes",
        },
        plans_cont: {
          title: "My Plans",
        },
        history : {
          link : "👉 Go To My GPA History"
        }
      },
      messages_page: {
        page_title: "Messages Page 💬",
        result_message: "📍⛔😕 There is no message 😕⛔📍",
      },
      messgae_component: {
        description: "Description 📝 :",
        created_at: "Created at 📆 :",
        level: "level 🔥 : ",
        recipient: "recipient 📌 : ",
        created_by: "Created By 👉 : ",
        delete : "Delete",
        update : "Update"
      },
      messages_component : {
        title : "Messages 💬",
        default_message : "📍⛔😕 No Any Message 😕⛔📍"
      },
      foods_page: {
        page_title: "Food page 😋🍴",
        placeholder: "Type the food title here ✍️",
        search_food_name: "Search By name 💬👇",
        results_message: "Results 😋🍴👇",
      },
      food_compoenet: {
        created_at: "📆 :",
        images: "Images 🖼️ :",
      },
      food_page: {
        page_title: "Food page 😋🍴",
        created_at: "📆 :",
        images: "Images 🖼️ :",
      },
      update_profile: {
        name: "Name",
        about_me: "About Me",
        password: "Password",
        phone: "Phone",
        button: "Update",
        avatar_form_header: "Avatar Actions 🎬",
        new: "New Avatar 🚀",
        delete: "Delete Avatar 🗑️",
      },
      show_user_page: {
        gender: "Gender ⚧️ :",
        phone: "Phone 📞 :",
        rate: "Rate ⭐ :",
        exams: "Exams 📝📑🔖 :",
        points: "Points 📍 :",
        gpa: "GPA 📌 :",
        children : "Children 👶🧒👱‍♂️ :",
        class_level: "CLass Level 🏫🪜🎚️ :",
        joind_at: "Joind In 📆 :",
        add_rate : "Add Rate",
        subject : "Subject 📚📖📑 :",
        default_message_children: "📍⛔😕 No Any Child 📍⛔😕",
        default_message_classes: "📍⛔😕 No Any Class 📍⛔😕",
        default_message_plans: "📍⛔😕 No Any Plan 📍⛔😕",
        classes_cont: {
          title: "Classes",
        },
        plans_cont: {
          title: "Plans",
        },
        history : {
          link : "👉 Go To Student's GPA History"
        }
      },
      show_user_gpa_page : {
        title : "Student GPA Sequence 📌",
        gpa : "GPA : 📌",
        points : "Points : 📍",
        exams : "Exams : 📝📑🔖",
        date : "Date : 📆",
        default_message : "📍⛔😕 Sorry, the student has not arrived yet 📍⛔😕"
      },
      my_gpa_page : {
        title : "My GPA Sequence 📌",
        gpa : "GPA : 📌",
        points : "Points : 📍",
        exams : "Exams : 📝📑🔖",
        date : "Date : 📆",
        default_message : "📍⛔😕 Sorry you don't have any progress yet 📍⛔😕"
      },
      dash_admins_component: {
        title: "Admins 🦸‍♂️",
        update: "Updae",
        delete: "Delete",
      },
      create_admin: {
        title: "Create Admin 🦸‍♂️",
        name: "Name",
        email: "Email 📧",
        password: "Password 🔑",
        phone_number: "Phone Number 📞",
        gender: "Gender ⚧️",
        male: "Male 🚹",
        female: "Female 🚺",
        admin_access: "Admin Permissions 🦸‍♂️",
        admin: "Is Admin 🦸‍♂️",
        not_admin: "Is Not Admin 🚫",
        button: "Create",
        name_placeholder: "Type admin name here ✍️ ...",
        email_placeholder: "Type admin email here ✍️ ...",
        password_placeholder: "Type admin password here ✍️ ...",
        phone_placeholder: " Type admin phone number here ✍️ ...",
      },
      update_admin: {
        title: "Update Admin 🦸‍♂️",
        name: "Name",
        password: "Password 🔑",
        phone_number: "Phone Number 📞",
        gender: "Gender ⚧️",
        male: "Male 🚹",
        female: "Female 🚺",
        admin_access: "Admin Permissions 🦸‍♂️",
        admin: "Is Admin 🦸‍♂️",
        not_admin: "Is Not Admin 🚫",
        button: "Update",
        name_placeholder: "Type admin name here ✍️ ...",
        password_placeholder: "Type new admin's password here ✍️ ...",
        phone_placeholder: " Type admin phone number here ✍️ ...",
      },
      delete_admin_form: {
        title: "Delete Admin ...",
        delete: "Delete 🗑️",
        cancel: "Cancel",
      },
      dash_teachers_component: {
        title: "Teachers 👨‍🏫",
        update: "Updae",
        delete: "Delete",
        start_rate : "Start Rate ⭐",
        stop_rate : "Stop Rate ⭐"
      },
      create_teacher: {
        title: "Create Teacher 👨‍🏫",
        name: "Name",
        email: "Email 📧",
        password: "Password 🔑",
        phone_number: "Phone Number 📞",
        subject: "Subject 📚📖📑",
        class_level: "Class Level 🏫🪜🎚️",
        gender: "Gender ⚧️",
        male: "Male 🚹",
        female: "Female 🚺",
        teacher_access: "Teacher Permissions 👨‍🏫",
        editor: "Is Editor 👨‍🏫",
        not_editor: "Is Not Editor 🚫",
        button: "Create",
        name_placeholder: "Type teacher name here ✍️ ...",
        email_placeholder: "Type teacher email here ✍️ ...",
        password_placeholder: "Type teacher password here ✍️ ...",
        phone_placeholder: " Type teacher phone number here ✍️ ...",
      },
      update_teacher: {
        title: "Update Teacher 👨‍🏫",
        name: "Name",
        password: "Password 🔑",
        phone_number: "Phone Number 📞",
        subject: "Subject 📚📖📑",
        class_level: "Class Level 🏫🪜🎚️",
        gender: "Gender ⚧️",
        male: "Male 🚹",
        female: "Female 🚺",
        teacher_access: "Teacher Permissions 👨‍🏫",
        editor: "Is Editor 👨‍🏫",
        not_editor: "Is Not Editor 🚫",
        button: "Update",
        name_placeholder: "Type teacher name here ✍️ ...",
        password_placeholder: "Type new teacher's password here ✍️ ...",
        phone_placeholder: " Type teacher phone number here ✍️ ...",
      },
      delete_teacher_form: {
        title: "Delete Teacher 👨‍🏫 ...",
        delete: "Delete 🗑️",
        cancel: "Cancel",
      },
      dash_students_component: {
        title: "Students 👨‍🎓",
        update: "Updae",
        delete: "Delete",
      },
      create_student: {
        title: "Create Student 👨‍🏫",
        name: "Name",
        email: "Email 📧",
        password: "Password 🔑",
        phone_number: "Phone Number 📞",
        birth_date : "Birth Date 📆",
        class_level: "Class Level 🏫🪜🎚️",
        about_me : "About Me 💬",
        gender: "Gender ⚧️",
        male: "Male 🚹",
        female: "Female 🚺",
        teacher_access: "Student Permissions 👨‍🏫",
        button: "Create",
        birth_date_placeholder : "Type student's birth date here ✍️ ...",
        name_placeholder: "Type student name here ✍️ ...",
        email_placeholder: "Type student email here ✍️ ...",
        password_placeholder: "Type student password here ✍️ ...",
        phone_placeholder: " Type student phone number here ✍️ ...",
        about_me_placeholder : "Type about me for student here ✍️ ..."
      },
      update_student: {
        title: "Update Student 👨‍🎓",
        name: "Name",
        password: "Password 🔑",
        phone_number: "Phone Number 📞",
        class_level: "Class Level 🏫🪜🎚️",
        about_me : "About Me 💬",
        gender: "Gender ⚧️",
        male: "Male 🚹",
        female: "Female 🚺",
        button: "Update",
        birth_date : "Birth Date 📆",
        name_placeholder: "Type student's name here ✍️ ...",
        email_placeholder: "Type new student's email here ✍️ ...",
        password_placeholder: "Type new student's password here ✍️ ...",
        phone_placeholder: " Type student's phone number here ✍️ ...",
        birth_date_placeholder: " Type student's birth date here (YYY-MM-DD) ✍️ ...",
        about_me_placeholder : "Type about me for student here ✍️ ..."
      },
      delete_student_form: {
        title: "Delete Student 👨‍🎓 ...",
        delete: "Delete 🗑️",
        cancel: "Cancel",
      },
      dash_parents_component: {
        title: "Parents 👨‍👩‍👦‍👦",
        update: "Updae",
        delete: "Delete",
      },
      create_parent: {
        title: "Create Parent 👨‍👩‍👦‍👦",
        name: "Name",
        email: "Email 📧",
        password: "Password 🔑",
        phone_number: "Phone Number 📞",
        gender: "Gender ⚧️",
        male: "Male 🚹",
        female: "Female 🚺",
        button: "Create",
        children_title : "Children 👨‍🎓",
        remove_button : "Remove 🗑️",
        name_placeholder: "Type parent's name here ✍️ ...",
        email_placeholder: "Type parent's email here ✍️ ...",
        password_placeholder: "Type parent's password here ✍️ ...",
        phone_placeholder: " Type parent's phone number here ✍️ ...",
      },
      update_parent: {
        title: "Update Parent 👨‍👩‍👦‍👦",
        name: "Name",
        password: "Password 🔑",
        phone_number: "Phone Number 📞",
        gender: "Gender ⚧️",
        male: "Male 🚹",
        female: "Female 🚺",
        button: "Update",
        children_title : "Children 👨‍🎓",
        remove_button : "Remove 🗑️",
        name_placeholder: "Type parent's name here ✍️ ...",
        email_placeholder: "Type parent's email here ✍️ ...",
        password_placeholder: "Type parent's password here ✍️ ...",
        phone_placeholder: " Type parent's phone number here ✍️ ...",
      },
      delete_parent_form: {
        title: "Delete Parent 👨‍👩‍👦‍👦 ...",
        delete: "Delete 🗑️",
        cancel: "Cancel",
      },
      choose_children_form : {
        title : "Search and choose children",
        button : "Search",
        placeholder : "Type Student Id Here ✍️ ...",
        section_title : "Finded Students 👨‍🎓",
        add_button : "Add",
        remove_button : "Remove"
      },
      delete_class_form: {
        title: "Delete Class ...",
        delete: "Delete 🗑️",
        cancel: "Cancel",
      },
      dash_classes_component: {
        title: "Classes 🏫",
        update: "Updae",
        delete: "Delete",
      },
      update_class: {
        page_title : "Update Class 🏫",
        title: "Title ⭕",
        class_level: "Class level 🏫🪜🎚️",
        subject : "Subject 📚📖📑",
        note: "Note 📝",
        teachers_section_title : "Teacher 👨‍🏫",
        button: "Update",
        remove_button : "Remove 🗑️",
        cover_form_header: "Cover Actions 🎬",
        new: "New Cover 🚀",
        delete: "Delete Cover 🗑️",
        teacher : "Choose The Teacher 👨‍🏫",
        title_placeholder: "Type class's title here ✍️ ...",
        note_placeholder: "Type class's note here ✍️ ...",
      },
      choose_teacher_form : {
        title : "Search and choose teacher",
        button : "Search",
        placeholder : "Type Teacher Id Here ✍️ ...",
        section_title : "Finded Teacher 👨‍🏫",
        add_button : "Add",
        remove_button : "Remove"
      },
      choose_class_form : {
        title : "Search and choose class",
        button : "Search",
        placeholder : "Type Class's Id Here ✍️ ...",
        section_title : "Finded Class 🏫",
        select : "Select",
        unselect : "UnSelect"
      },
      create_class: {
        page_title : "Create Class 🏫",
        title: "Title ⭕",
        class_level: "Class level 🏫🪜🎚️",
        subject : "Subject 📚📖📑",
        note: "Note 📝",
        teachers_section_title : "Teacher 👨‍🏫",
        button: "Create",
        remove_button : "Remove 🗑️",
        teacher : "Choose The Teacher 👨‍🏫",
        title_placeholder: "Type class's title here ✍️ ...",
        note_placeholder: "Type class's note here ✍️ ...",
      },
      delete_messages_form: {
        title: "Delete Message 💬 ...",
        delete: "Delete 🗑️",
        cancel: "Cancel",
      },
      create_message : {
        page_title : "Create Messages 💬",
        title : "Title ⭕",
        description : "Description 📑",
        note : "Note 📝",
        Recipient : "Recipient 🎯",
        level : "Message Level 💬🎚️",
        title_placeholder : "Type Messages's title here ✍️ ...",
        description_placeholder : "Type Messages's description here ✍️ ...",
        note_placeholder : "Type Messages's note here ✍️ ...",
        button : "Create"
      },
      update_message : {
        page_title : "Update Messages 💬",
        title : "Title ⭕",
        description : "Description 📑",
        note : "Note 📝",
        Recipient : "Recipient 🎯",
        level : "Message Level 💬🎚️",
        title_placeholder : "Type Messages's title here ✍️ ...",
        description_placeholder : "Type Messages's description here ✍️ ...",
        note_placeholder : "Type Messages's note here ✍️ ...",
        button : "Update"
      },
      home_works_in_dash : {
        page_title : "Home Works 🏚️💯🔝",
        component_title : "Home Work 🏚️💯🔝",
        delete : "Delete",
        update : "Update"
      },
      delete_home_work_form: {
        title: "Delete Home Work 🏚️💯🔝 ...",
        delete: "Delete 🗑️",
        cancel: "Cancel",
      },
      update_home_work : {
        page_title : "Update Home Work 🏚️💯🔝",
        title : "Title ⭕",
        description : "Description 📑",
        note : "Note 📝",
        level : "Home Work Level 🏚️💯🔝🎚️",
        images : "Images 🖼️",
        title_placeholder : "Type home work's title here ✍️ ...",
        description_placeholder : "Type home work's description here ✍️ ...",
        note_placeholder : "Type home work's note here ✍️ ...",
        button : "Update"
      },
      create_home_work : {
        page_title : "Create Home Work 🏚️💯🔝",
        title : "Title ⭕",
        description : "Description 📑",
        note : "Note 📝",
        level : "Home Work Level 🏚️💯🔝🎚️",
        images : "Images 🖼️",
        title_placeholder : "Type home work's title here ✍️ ...",
        description_placeholder : "Type home work's description here ✍️ ...",
        note_placeholder : "Type home work's note here ✍️ ...",
        button : "Create"
      },
      plans_component : {
        title : "Plans 📌📚",
        default_message : "📍⛔😕 No Any Plans 😕⛔📍"
      },
      create_plan: {
        page_title: "Create Plan 📌📚",
        title : "Title ⭕",
        description : "Description 📑",
        note : "Note 📝",
        level : "Class Level 🏚️💯🔝🎚️",
        plan_info : "Plan Data 📊📈",
        add_day : "Add Day 🌅",
        button: "Create",
        title_placeholder: "Type plan's title here ✍️ ...",
        description_placeholder: "Type plan's description here ✍️ ...",
        plan_placeholder: "Type plan's note here ✍️ ...",
      },
      update_plan: {
        page_title: "Update Plan 📌📚",
        title : "Title ⭕",
        description : "Description 📑",
        note : "Note 📝",
        level : "Class Level 🏚️💯🔝🎚️",
        plan_info : "Plan Data 📊📈",
        add_day : "Add Day 🌅",
        button: "Update",
        title_placeholder: "Type the new  plan's title here ✍️ ...",
        description_placeholder: "Type the new plan's description here ✍️ ...",
        plan_placeholder: "Type the new plan's note here ✍️ ...",
      },
      add_day_to_plan_form : {
        title : "Add Day 🌅",
        day : "Day Name 🌅",
        subjects : "Subjects 📚📖📑",
        subject : "Subject 📚📖📑",
        start : "Start 🏁",
        end : "End 🚩",
        add : "Add +",
        add_subject : "Add Subject",
        day_placeholder : "Type day's name here ✍️ ...",
        subject_placeholder : "Type subject's title here ✍️ ...",
        start_placeholder : "Type the start time of subject here ✍️ ...",
        end_placeholder : "Type the end time of subject here ✍️ ...",
      },
      remove_plan_form_dash : {
        title : "Remove Plan 📌📚 ...",
        remove_btn : "Remove",
        update : "Update",
        remove : "Remove 🗑️",
        cancel : "Cancel"
      },
      food_dash_compoenet: {
        created_at: "📆 :",
        images: "Images 🖼️ :",
        delete : "Remove",
        update : "Update"
      },
      foods_component: {
        page_title: "Foods 😋🍴",
        created_at: "📆 :",
        images: "Images 🖼️ :",
      },
      remove_food_form_dash : {
        title : "Remove Food 😋🍴 ...",
        remove_btn : "Remove",
        update : "Update",
        remove : "Remove 🗑️",
        cancel : "Cancel"
      },
      update_food : {
        page_title : "Update Food 😋🍴",
        title : "Title ⭕",
        description : "Description 📑",
        images : "Images 🖼️",
        title_placeholder : "Type food's title here ✍️ ...",
        description_placeholder : "Type food's description here ✍️ ...",
        button : "Update"
      },
      create_food : {
        page_title : "Create Food 😋🍴",
        title : "Title ⭕",
        description : "Description 📑",
        images : "Images 🖼️",
        title_placeholder : "Type food's title here ✍️ ...",
        description_placeholder : "Type food's description here ✍️ ...",
        button : "Create"
      },
      my_plans_page: {
        page_title: "My Plans ⭕📌📚",
        default : "📍⛔😕 There is no Plans 😕⛔📍"
      },
      my_classes_page: {
        page_title: "My Classes ⭕📌🏫",
        default : "📍⛔😕 There is no Classes 😕⛔📍"
      },
      teacher_classes_plans_page: {
        classes: "Teacher's Classes ⭕📌🏫",
        plans: "Teacher's Plans ⭕📌📚",
      },
      student_classes_plans_page: {
        classes: "Student's Classes ⭕📌🏫",
        plans: "Student's Plans ⭕📌📚",
      },
      questions : {
        math : "Math 🧮",
        arabic : "Arabic 🇸🇾",
        english : "English 🇺🇸",
        french : "French 🇫🇷",
        islam : "Islam 👳🕋",
        alwatania : "Alwatania 🪖",
        history : "History ⏳",
        philosophy : "Philosophy 👴🏻",
        Physics : "Physics ⚛️",
        sciences : "Sciences 🦠",
        geography : "Geography 🌎",
        chemistry : "Chemistry 🧪",
      },
      question_component : {
        points : "Points 🔢 :",
        class_level : "Class Level 🏫🪜🎚️ :",
        repated : "Repated At 🔄 :",
        answers : "Answers 🟰💯 :",
        created_at : "Created at 📆 :",
        update : "Update",
        delete : "Delete"
      },
      create_question : {
        page_title : "Create Question ❓",
        title : "Title ⭕",
        description : "Description 📑",
        images : "Images 🖼️",
        note : "Note 📝",
        points : "Points 🔢",
        repated : "Repated 🔄",
        level : "Level 🎚️",
        class_level : "Class Level 🏚️🎚️",
        subject_type : "Subject 📚📖📑",
        options : "options 🗃️",
        delete : "Delete 🗑️",
        title_placeholder : "Type question's title here ✍️ ...",
        description_placeholder : "Type question's description here ✍️ ...",
        note_placeholder : "Type question's note here ✍️ ...",
        points_placeholder : "Type question's points here ✍️ ...",
        repated_placeholder : "Type question's repated here ✍️ ...",
        level_placeholder : "Type question's level here ✍️ ...",
        class_level_placeholder : "Type question's class level here ✍️ ...",
        options_placeholder : "Type question's options here ✍️ ...",
        button : "Create"
      },
      update_question : {
        page_title : "Upadet Question ❓",
        title : "Title ⭕",
        description : "Description 📑",
        images : "Images 🖼️",
        note : "Note 📝",
        points : "Points 🔢",
        repated : "Repated 🔄",
        level : "Level 🎚️",
        class_level : "Class Level 🏚️🎚️",
        subject_type : "Subject 📚📖📑",
        options : "options 🗃️",
        delete : "Delete 🗑️",
        title_placeholder : "Type question's title here ✍️ ...",
        description_placeholder : "Type question's description here ✍️ ...",
        note_placeholder : "Type question's note here ✍️ ...",
        points_placeholder : "Type question's points here ✍️ ...",
        repated_placeholder : "Type question's repated here ✍️ ...",
        level_placeholder : "Type question's level here ✍️ ...",
        class_level_placeholder : "Type question's class level here ✍️ ...",
        options_placeholder : "Type question's options here ✍️ ...",
        button : "Update"
      },
      add_option_component : {
        title : "Add Option",
        option : "Option title 🟰",
        option_value : "Option Value 🟰",
        placeholder_option : " Type option title here ✍️ ...",
        button : "Add"
      },
      question_page: {
        page_title: "Question 🏚️💯🔝",
        description: "Description 📝📋 :",
        subject: "Subject 📚📖📑 :",
        points: "Points 🔢 :",
        class_level: "Class Level 🏫🪜🎚️ :",
        repated: "Repated 🔄 :",
        options: "Options 🟰💯 :",
        created_at: "Created At :",
        images_title: "Images 🖼️",
        created_by: "Created By",
        result_message: "📍⛔😕 No Images 😕⛔📍",
      },
      delete_question_form: {
        title: "Delete Question ❓ ...",
        delete: "Delete 🗑️",
        cancel: "Cancel",
      },
      start_exam_page : {
        page_title : "Start Exam 🧠🏁",
        choose_class_level : "Choose Class Level 🏫🪜🎚️ ",
        choose_subject : "Choose Subject 📚⭕ ",
        info : "Dear student, you should know that the goal of the tests is to build a strong educational level and awareness and adapt to the tests to get rid of exam fear and help the student memorize the largest possible number of questions by simplifying the process of testing your information.",
        time :  "m",
        start : "Start Exam 🧠🚀",
      },
      exam_page : {
        exam_header : "Exam ❓",
        question_header : "Question ",
        question_description : "Description 📝",
        question_note : "Note 📝",
        question_repated : "Repated At 🔄",
        end : "End Exam 🧠🏁",
      },
      exam_points_form : {
        header : "Exam is over ⭕🎉",
        points : "Points Is : ",
        leave : "Leaving 🏃🏻 : "
      },
      not_found : {
        default_message: "📍⛔😕 Sorry, The Page Not Found 📍⛔😕",
        page : "Home 🏠"
      },
      rate_form : {
        header : "Add Rate",
        label : "Write an rate ⭐",
        placeholder : "Write Teacher's Rate here ✍️...",
        add : "Add Rate"
      },
      nav_message : "Good Day 👋",
      theme: "Theme 🎨",
      mood: "Mood ☀️🌑",
      log_out: "Log out",
      log_in : "Log In",
      error: "Error  ...",
      loading: "Waite Pleace ...",
      avatar_form_header: "Avatra actions",
      new: "New AVatar",
      delete: "Delete Avatar",
    },
    Arabic: {
      login: {
        title: "تسجيل الدخول الى حسابك 🔐 ...",
        label: { label_one: "الإيميل", label_tow: "كلمة المرور" },
        info : `مرحباً ، يرجى توخي الحذر عند تسجيل الدخول. يجب عليك اختيار هويتك على الموقع بإضافة أحرف رئيسية قبل حسابك، على سبيل المثال:
إذا كنت طالباً، أضف S: بريدك الإلكتروني
إذا كنت ولي أمري، أضف P: بريدك الإلكتروني`,
        placeholder: {
          email: "اكتب الايميل هنا 📧...",
          password: "اكتب كلمة المرور هنا 🔑...",
        },
        button: "تسجيل الدخول",
      },
      home: {
        classes: { title: "🏫 الصفوف", link: "عرض الصفوف", subject: "مادة" },
        teachers: { title: " 👨‍🏫 المدرسون", link: " عرض المدرسون" },
        admins: { title: "🦸 المدراء", link: "عرض المدراء" },
      },
      nav: {
        messages: {
          message_one: " ⚡ البحث الخارق",
          message_tow: "اكتب المعرف 👇 للبحث",
        },
        placeholder: "... اكتب المعرف هنا للبحث",
        button: "بحث",
      },
      links: [
        { path: "/profile", title: "حسابي", access: "public" },
        { path: "/", title: "الصفحة الرئيسية", access: "public" },
        { path: "/classes", title: "الصفوف", access: "public" },
        { path: "/classes", title: "صفوفي", access: "public" },
        { path: "/students", title: "الطلاب", access: "public" },
        { path: "/teachers", title: "المدرسون", access: "public" },
        { path: "/admins", title: "المدراء", access: "public" },
        { path: "/parents", title: "أولياء الأمور", access: "admin" },
        { path: "/plans", title: "الخطط", access: "public" },
        { path: "/my/plans", title: "خططي", access: "public" },
        { path: "/my/children", title: "أبنائي", access: "parent" },
        { path: "/about", title: "معلومات عنا", access: "public" },
        {
          url: "https://rami-web.onrender.com",
          title: "المطور",
          access: "public",
        },
      ],
      language: {
        pages: "الصفحات 🗂️",
        title: "اللغة 🗣️🌍",
        arabic: "عربي",
        english: "إنكليزي",
      },
      footer: {
        message: "مرحبا,",
        links: [
          {
            title: "فيسبوك",
            link: "https://www.facebook.com/awael.school.alp",
            icon: "facebook",
          },
          {
            title: "واتس اب",
            link: "https://wa.me/980 727 092",
            icon: "whatsapp",
          },
          { title: "معلومات عنا", link: "/about" },
        ],
      },
      copy_id: "👈",
      class_page: {
        class_level: "مستوى الصف 🏫🪜🎚️ :",
        class_subject: "المادة 📚📖📑 :",
        created_by: ": تم الانشاء بواسطة",
        section_title: {
          home_work: "الوظائف🏚️💯🔝 ",
          student: "الطلاب👈👨‍🎓👩‍🎓 ",
        },
        result_messages: {
          home_work_message: "📍⛔😕 لا يوجد أي وظيفة 😕⛔📍",
          students: "📍⛔😕 لا يوجد اي طالب 😕⛔📍",
        },
        buttons: {
          join: "انضمام",
          leave: "مغادرة",
        },
      },
      home_work_page: {
        page_title: "وظيفة 🏚️💯🔝 ",
        description: " وصف الوظيفة📝📋 :",
        subject: "المادة 📚📖📑 :",
        images_title: "الصور",
        class: " الصف 🏫",
        created_by: "تم الإنشاء بواسطة",
        result_message: "📍⛔😕 لا يوجد صور 😕⛔📍",
      },
      delete_hw_form: {
        message: "❓😳 هل أنت متأكد 😳❓",
        delete: "حذف",
        Cancel: "إالغاء",
      },
      classes_page: {
        placeholder: "اكتب عنوان الصف هنا ✍️",
        page_title: "صفحة الصفوف 🏫",
        search_classes_title: "ابحث عن طريق العنوان 💬👇",
        results_message: "النتائج 🏚️👇",
      },
      home_works_page: {
        placeholder: "اكتب عنوان الوظيفة هنا ✍️",
        page_title: "صفحة الوظائف 🏫",
        search_home_work_title: "ابحث عن طريق العنوان 💬👇",
        results_message: "النتائج 🏚️👇",
      },
      home_works_component: {
        subject: "المادة 📚📖📑 :",
        class_level: "مستوى الصف 🏫🪜🎚️ :",
        created_at: "📆 :",
        images: "الصور 🗃️🖼️ :",
      },
      student_component: {
        points: "النقاط 🖊️📝🎊 :",
        gpa: "المعدل ✅📑 :",
        class_level: "الصف 🏛️🪜🎚️ :",
      },
      students_page: {
        placeholder: "اكتب اسم الطالب هنا ✍️",
        page_title: "صفحة الطلاب 👨‍🎓",
        search_admin_name: "البحث عن طريق الاسم 💬👇",
        results_message: "النتائج 👨‍🎓👇",
      },
      top_students_page: {
        label: "اختر مستوى الصف هنا 🎯",
        page_title: "صفحة الطلاب الأوائل 👑 👨‍🎓",
        results_message: "النتائج 👨‍🎓👇",
        default : "📍⛔😕 لا يوجد أي طالب 😕⛔📍",
        button : "جلب الطلاب"
      },
      admin_component: {
        admin: "مدير 🦸‍♂️",
        supper_admin: "مدير عام ⚡🦸‍♂️",
      },
      plans_page: {
        placeholder: "اكتب عنوان الخطة هنا ✍️",
        page_title: "صفحة الخطط 📌🪃📚",
        search_admin_name: "ابحث عن طريق العنوان💬👇",
        results_message: "النتائج 📌🪃📚👇",
      },
      plan_page: {
        class_level: "الصف 🏫🪜🎚️ :",
        created_at: "📆 :",
        students: "الطلاب 👨‍🎓 :",
        teachers: "المدرسون 👨‍🏫 :",
        collection: "جدول الخطة :",
        day: "اليوم 🌅 :",
        subject: "المادة 📚📖📑 :",
        start: "تبدأ 🏁 :",
        end: "تنتهي 🚩 :",
        buttons: {
          copy: "حفظ",
          remove: "حذف",
        },
      },
      plan_component: {
        class: "الصف 🏫🪜🎚️ :",
        students: "الطلاب 👨‍🎓 :",
        teachers: "المدرسون 👨‍🏫 :",
        created_at: "📆 :",
      },
      admins_page: {
        placeholder: "اكتب اسم المدير هنا ✍️",
        page_title: "صفحة المدراء 🦸‍♂️",
        search_admin_name: "ابحث عن طريق الاسم 💬👇",
        results_message: "النتائج 🦸‍♂️👇",
      },
      teachers_page: {
        placeholder: "اكتب اسم المدرس هنا ✍️",
        page_title: "صفحة المدرسين 👨‍🏫",
        search_admin_name: "ابحث عن طريق الاسم 💬👇",
        results_message: "النتائج 👨‍🏫👇",
      },
      parents_page: {
        placeholder: "اكتب اسم وليّ الأمر هنا ✍️",
        page_title: "صفحة أولياء الأمور 👨‍👩‍👦‍👦",
        search_admin_name: "ابحث عن طريق الاسم 💬👇",
        results_message: "النتائج 👨‍👩‍👦‍👦👇",
      },
      teacher_component: {
        rate: "التقييم ⭐ :",
        classes: "الصفوف 🏛️ :",
        subject: "المادة 📚📖📑 :",
        editor: "محرر",
        class_level: "مستوى الصف 🏫🪜🎚️ :",
        phone: "📞 :",
      },
      install_page: {
        title : "مدرسة الأوائل",
        btn_text: "انقر للتحميل",
        message:
          "مدرستنا : صرح تعليمي مجهز بوسائل التعليم من فصول مجهزة و أماكن للأنشطة التعليمية و الرياضية تأسست عام ٢٠١٢ و تتضمن مراحل التعليم من مرحلة رياض الأطفال إلى المرحلة الاعدادية.",
        note: "جميع الحقوق محفوظة",
      },
      profile: {
        gender: "النوع ⚧️ :",
        phone: "الهاتف 📞 :",
        exams: "الامتحانات 📝📑🔖 :",
        points: "النقاط 📍 :",
        gpa: "المعدل 📌 :",
        rate: "التقييم ⭐ :",
        class_level: "الصف 🏫🪜🎚️ :",
        joind_at: "انضم في 📆 :",
        medals : "الميدليات",
        children : "أطفال 👶🧒👱‍♂️ :",
        default_message_children: "📍⛔😕 لا يوجد اي طفل 📍⛔😕",
        default_message_classes: "📍⛔😕 لا يوجد اي صف 📍⛔😕",
        default_message_plans: "📍⛔😕 لا يوجد اي خطة 📍⛔😕",
        classes_cont: {
          title: "صفوفي",
        },
        plans_cont: {
          title: "خططي",
        },
        history : {
          link : "👉 اذهب إلى تسلسل معدلي"
        }
      },
      messages_page: {
        page_title: "صفحة الرسائل 💬",
        result_message: "📍⛔😕 لا يوجد اي رسالة 😕⛔📍",
      },
      messgae_component: {
        description: "الوصف 📝 :",
        created_at: "كتبت في 📆 :",
        recipient: "المعنيين 📌 : ",
        created_by: "الكاتب 👈 : ",
        delete : "حذف",
        update : "تعديل"
      },
      messages_component : {
        title : "الرسائل 💬",
        default_message : "📍⛔😕 لا يوجد اي رسالة 😕⛔📍"
      },
      foods_page: {
        page_title: "صفحة الأطعمة 😋🍴",
        placeholder: "اكتب عنوان الطعام هنا ✍️",
        search_food_name: "البحث عن طريق العنوان 💬👇",
        results_message: "النتائج 😋🍴👇",
      },
      food_compoenet: {
        created_at: "📆 :",
        images: "الصور 🖼️ :",
      },
      food_page: {
        page_title: "صفحة الطعام 😋🍴",
        created_at: "📆 :",
        images: "الصور 🖼️ :",
      },
      update_profile: {
        name: "الأسم",
        about_me: "نبذة عني",
        password: "كلمة المرور",
        phone: "الهاتف",
        button: "تعديل",
        avatar_form_header: "احداث الأفاتار 🎬",
        new: "افاتار جديد 🚀",
        delete: "حذف الأفاتار 🗑️",
      },
      show_user_page: {
        gender: "النوع ⚧️ :",
        phone: "الهاتف 📞 :",
        rate: "التقييم ⭐ :",
        exams: "الامتحانات 📝📑🔖 :",
        points: "النقاط 📍 :",
        gpa: "المعدل 📌 :",
        add_rate : "أضف تقييم",
        class_level: "الصف 🏫🪜🎚️ :",
        joind_at: "انضم في 📆 :",
        children : "أطفال 👶🧒👱‍♂️ :",
        subject : "المادة 📚📖📑 :",
        default_message_children: "📍⛔😕 لا يوجد اي طفل 📍⛔😕",
        default_message_classes: "📍⛔😕 لا يوجد اي صف 📍⛔😕",
        default_message_plans: "📍⛔😕 لا يوجد اي خطة 📍⛔😕",
        classes_cont: {
          title: "الصفوف",
        },
        plans_cont: {
          title: "الخطط",
        },
        history : {
          link : "👉 اذهب إلى تسلسل معدلي"
        }
      },
      show_user_gpa_page : {
        title : "تسلسل المعدل التراكمي للطالب 📌",
        gpa : "المعدل التراكمي : 📌",
        points : "النقاط : 📍",
        exasm : "الاختبارات : 📝📑🔖",
        date : "التارخي : 📆",
        default_message : "📍⛔😕 عذرا لم يصل الطالب  بعد 📍⛔😕"
      },
      my_gpa_page : {
        title : "تسلسل معدلي التراكمي  📌",
        gpa : "المعدل التراكمي : 📌",
        points : "النقاط : 📍",
        exasm : "الاختبارات : 📝📑🔖",
        date : "التارخي : 📆",
        default_message : "📍⛔😕 عذرا ليس لديك أي تقدم بعد 📍⛔😕"
      },
      dash_admins_component: {
        title: "الأدمن 🦸‍♂️",
        update: "تعديل",
        delete: "حذف",
      },
      delete_admin_form: {
        title: "حذف حساب الأدمن ...",
        delete: "حذف 🗑️",
        cancel: "إلغاء",
      },
      create_admin: {
        title: "إنشاء حساب أدمن 🦸‍♂️",
        name: "الأسم",
        email: "ألايميل 📧",
        password: "كلمة المرور 🔑",
        phone_number: "رقم الهاتف 📞",
        gender: "النوع ⚧️",
        male: "ذكر 🚹",
        female: "انثى 🚺",
        admin_access: "صلاحيات الأدمن 🦸‍♂️",
        admin: "أدمن 🦸‍♂️",
        not_admin: "ليس أدمن 🚫",
        button: "إنشاء",
        name_placeholder: "اكتب اسم الأدمن هنا ✍️ ...",
        email_placeholder: "اكتب ايميل الأدمن هنا ✍️ ...",
        password_placeholder: "اكتب كلمةمرور الأدمن هنا ✍️ ...",
        phone_placeholder: "اكتب رقم هاتف الأدمن هنا ✍️ ...",
      },
      update_admin: {
        title: "تعديل حساب أدمن 🦸‍♂️",
        name: "الأسم",
        password: "كلمة المرور 🔑",
        phone_number: "رقم الهاتف 📞",
        gender: "النوع ⚧️",
        male: "ذكر 🚹",
        female: "انثى 🚺",
        admin_access: "صلاحيات الأدمن 🦸‍♂️",
        admin: "أدمن 🦸‍♂️",
        not_admin: "ليس أدمن 🚫",
        button: "تعديل",
        name_placeholder: "اكتب اسم الأدمن هنا ✍️ ...",
        password_placeholder: "اكتب كلمة مرور الأدمن الجديدة هنا ✍️ ...",
        phone_placeholder: "اكتب رقم هاتف الأدمن هنا ✍️ ...",
      },
      dash_teachers_component: {
        title: "المدرسون 👨‍🏫",
        update: "تعديل",
        delete: "حذف",
        start_rate : "إبدأ التقييم ⭐",
        stop_rate : "إيقاف التقييم ⭐"
      },
      create_teacher: {
        title: "إنشاء مدرس 👨‍🏫",
        name: "الاسم",
        email: "الايميل 📧",
        password: "كلمة المرور 🔑",
        phone_number: "رقم الهاتف 📞",
        subject: "المادة 📚📖📑",
        class_level: "مستوى الصف 🏫🪜🎚️",
        gender: "النوع ⚧️",
        male: "ذكر 🚹",
        female: "انثى 🚺",
        teacher_access: "صلاحيات المدرس 👨‍🏫",
        editor: "محرر 👨‍🏫",
        not_editor: "ليس محرر 🚫",
        button: "إنشاء",
        name_placeholder: "اكتب اسم المدرس هنا ✍️ ...",
        email_placeholder: "اكتب ايميل المدرس هنا ✍️ ...",
        password_placeholder: "اكتب كلمة مرور المدرس هنا✍️ ...",
        phone_placeholder: "اكتب رقم هاتف المدرس هنا ✍️ ...",
      },
      update_teacher: {
        title: "تعديل المدرس👨‍🏫",
        name: "الاسم",
        password: "كلمة المرور 🔑",
        phone_number: "رقم الهاتف 📞",
        subject: "المادة 📚📖📑",
        class_level: "مستوى الصف 🏫🪜🎚️",
        gender: "النوع ⚧️",
        male: "ذكر 🚹",
        female: "انثى 🚺",
        teacher_access: "صلاحيات المدرس 👨‍🏫",
        editor: "محرر 👨‍🏫",
        not_editor: "ليس محرر 🚫",
        button: "تعديل",
        name_placeholder: "اكتب اسم المردس هنا ✍️ ...",
        email_placeholder: "اكتب ايميل المرس هنا ✍️ ...",
        password_placeholder: "اكتب كلمة مرور المدرس هنا✍️ ...",
        phone_placeholder: "اكتب رقم هاتف المدرس هنا ✍️ ...",
      },
      delete_teacher_form: {
        title: "حذف المدرس👨‍🏫 ...",
        delete: "حذف 🗑️",
        cancel: "إلغاء",
      },
      dash_students_component: {
        title: "الطلاب 👨‍🎓",
        update: "تعديل",
        delete: "حذف"
      },
      create_student: {
        title: "إنشاء طالب 👨‍🏫",
        name: "الاسم",
        email: "الايميل 📧",
        password: "كلمة المرور 🔑",
        phone_number: "رقم الهاتف 📞",
        class_level: "مستوى الصف 🏫🪜🎚️",
        birth_date : "تاريخ الميلاد 📆",
        about_me : "نبذة عني 💬",
        gender: "النوع ⚧️",
        male: "ذكر 🚹",
        female: "انثى 🚺",
        not_editor: "ليس محرر 🚫",
        button: "إنشاء",
        name_placeholder: "اكتب اسم الطالب هنا ✍️ ...",
        birth_date_placeholder : "اكتب تاريخ ميلاد الطالب هنا ✍️ ...",
        email_placeholder: "اكتب ايميل الطالب هنا ✍️ ...",
        password_placeholder: "اكتب كلمة مرور الطالب هنا✍️ ...",
        phone_placeholder: "اكتب رقم هاتف الطالب هنا ✍️ ...",
        about_me_placeholder: "اكتب نبذة عن الطالب هنا ✍️ ...",
      },
      update_student: {
        title: "تعديل الطالب 👨‍🎓",
        name: "الاسم",
        password: "كلمة المرور 🔑",
        phone_number: "رقم الهاتف 📞",
        class_level: "مستوى الصف 🏫🪜🎚️",
        about_me : "نبذة عني 💬",
        gender: "النوع ⚧️",
        male: "ذكر 🚹",
        female: "انثى 🚺",
        button: "تعديل",
        children_title : "الأطفال 👨‍🎓",
        birth_date : "تاريخ الميلاد 📆",
        name_placeholder: "اكتب اسم الطالب هنا ✍️ ...",
        email_placeholder: "اكتب ايميل الطالب هنا ✍️ ...",
        password_placeholder: "اكتب كلمة مرور الطالب هنا✍️ ...",
        phone_placeholder: "اكتب رقم هاتف الطالب هنا ✍️ ...",
        birth_date_placeholder: "اكتب تاريخ ميلاد الطالب هنا (سنة-شهر-يوم) ✍️ ...",
        about_me_placeholder: "اكتب نبذة عن الطالب هنا ✍️ ...",
      },
      delete_student_form: {
        title: "حذف الطالب 👨‍🎓 ...",
        delete: "حذف 🗑️",
        cancel: "إلغاء",
      },
      dash_parents_component: {
        title: "أولياء الأمور 👨‍👩‍👦‍👦",
        update: "تعديل",
        delete: "حذف",
      },
      create_parent: {
        title: "إنشاء ولي أمر 👨‍👩‍👦‍👦",
        name: "الاسم",
        email: "الإيميل 📧",
        password: "كلمة المرور 🔑",
        phone_number: "رقم الهاتف  📞",
        gender: "النوع ⚧️",
        male: "ذكر 🚹",
        female: "انثى 🚺",
        button: "إنشاء",
        children_title : "الأأطفال 👨‍🎓",
        remove_button : "حذف 🗑️",
        name_placeholder: "اكتب اسم ولي الامر هنا ✍️ ...",
        email_placeholder: "اكتب ايميل ولي الامر هنا ✍️ ...",
        password_placeholder: "اكتب كلمة مرور ولي الامر هنا ✍️ ...",
        phone_placeholder: " اكتب رقم هاتفولي الأمر هنا ✍️ ...",
      },
      update_parent: {
        title: "تعديل ولي الأمر 👨‍👩‍👦‍👦",
        name: "الاسم",
        password: "كلمة المرور 🔑",
        phone_number: "رقم الهاتف 📞",
        gender: "النوع ⚧️",
        male: "ذكر 🚹",
        female: "انثى 🚺",
        button: "تعديل",
        children_title : "الأأطفال 👨‍🎓",
        remove_button : "حذف 🗑️",
        name_placeholder: "اكتب اسم ولي الامر هنا ✍️ ...",
        email_placeholder: "اكتب ايميل ولي الامر هنا ✍️ ...",
        password_placeholder: "اكتب كلمة مرور ولي الامر هنا ✍️ ...",
        phone_placeholder: " اكتب رقم هاتفولي الأمر هنا ✍️ ...",
      },
      delete_parent_form: {
        title: "حذف ولي الأمر 👨‍👩‍👦‍👦 ...",
        delete: "حذف 🗑️",
        cancel: "إلغاء",
      },
      choose_children_form : {
        title : "ابحث واختار الطفل",
        button : "بحث",
        placeholder : "اكتب معرف الطالب هنا ✍️ ...",
        section_title : "الطلاب الذين تم العثور عليهم 👨‍🎓",
        add_button : "اضافة",
        remove_button : "حذف"
      },
      delete_class_form: {
        title: "حذف الصف ...",
        delete: "حذف 🗑️",
        cancel: "إلغاء",
      },
      dash_classes_component: {
        title: "الصفوف 🏫",
        update: "تعديل",
        delete: "حذف",
      },
      update_class: {
        page_title : "تعديل الصف 🏫",
        title: "العنوان ⭕",
        class_level: "مستوى الصف 🏫🪜🎚️",
        subject : "لمادة 📚📖📑",
        note: "ملاحظات 📝",
        teachers_section_title : "المدرس 👨‍🏫",
        button: "تعديل",
        remove_button : "حذف 🗑️",
        cover_form_header: "احداث الغلاف 🎬",
        new: "كفر جديد 🚀",
        delete: "حذف الكفر 🗑️",
        teacher : "اختر مدرس الصف 👨‍🏫",
        title_placeholder: "اكتب عنوان الصف هنا ✍️ ...",
        note_placeholder: "اكتب ملاحظات الصف هنا ✍️ ...",
      },
      create_class: {
        page_title : "إنشاء الصف 🏫",
        title: "العنوان ⭕",
        class_level: "مستوى الصف 🏫🪜🎚️",
        subject : "لمادة 📚📖📑",
        note: "ملاحظات 📝",
        teachers_section_title : "المدرس 👨‍🏫",
        button: "إنشاء",
        remove_button : "حذف 🗑️",
        teacher : "اختر مدرس الصف 👨‍🏫",
        title_placeholder: "اكتب عنوان الصف هنا ✍️ ...",
        note_placeholder: "اكتب ملاحظات الصف هنا ✍️ ...",
      },
      choose_teacher_form : {
        title : "ابحث واختار المدرس",
        button : "بحث",
        placeholder : "اكتب معرف المدرس هنا ✍️ ...",
        section_title : "المدرسون الذين تم العثور عليهم 👨‍🏫",
        add_button : "اضافة",
        remove_button : "حذف"
      },
      choose_class_form : {
        title : "ابحث و اختار الصف",
        button : "ابحث",
        placeholder : "اكتب معرف الصف هنا  ✍️ ...",
        section_title : "الصفوف التي تم لعثور عليها 🏫",
        select : "تحديد",
        unselect : "إلغاء التحديد"
      },
      remove_plan_form_dash : {
        title : "... 📌📚 حذف الخطة",
        remove_btn : "حذف",
        update : "تعديل",
        remove : "🗑️ حذف",
        cancel : "إلغاء"
      },
      create_message : {
        page_title : "إنشاء رسالة 💬",
        title : "العنوان ⭕",
        description : "الوصف 📑",
        note : "الملاحظة 📝",
        Recipient : "المستهد فون 🎯",
        level : "مستوى اهمية الرسالة 💬🎚️",
        title_placeholder : "اكتب عنوان الراسالة هنا ✍️ ...",
        description_placeholder : "اكتب وصف الرسالة هنا ✍️ ...",
        note_placeholder : "اكتب ملاظة لرسالة هنا ✍️ ...",
        button : "إنشاء"
      },
      update_message : {
        page_title : "تعديل رسالة 💬",
        title : "العنوان ⭕",
        description : "الوصف 📑",
        note : "الملاحظة 📝",
        Recipient : "المستهد فون 🎯",
        level : "مستوى اهمية الرسالة 💬🎚️",
        title_placeholder : "اكتب عنوان الراسالة هنا ✍️ ...",
        description_placeholder : "اكتب وصف الرسالة هنا ✍️ ...",
        note_placeholder : "اكتب ملاظة لرسالة هنا ✍️ ...",
        button : "تعديل"
      },
      home_works_in_dash : {
        page_title : "الوظائف 🏚️💯🔝",
        component_title : "وظيفة 🏚️💯🔝",
        delete : "حذف",
        update : "تعديل"
      },
      delete_messages_form: {
        title: "حذف الرسالة 💬 ...",
        delete: "حذف 🗑️",
        cancel: "إلغاء",
      },
      delete_home_work_form: {
        title: " ... 🏚️💯🔝 حذف الوظيفة",
        delete: "🗑️ حذف",
        cancel: "إلغاء",
      },
      update_home_work : {
        page_title : "تعديل الوظيفة 🏚️💯🔝",
        title : "العنوان ⭕",
        description : "الوصف 📑",
        note : "ملاحظة 📝",
        level : "مستوى الوظيفة 🏚️💯🔝🎚️",
        images : "الصور 🖼️",
        title_placeholder : "اكتب عنوان الوظيفة هنا ✍️ ...",
        description_placeholder : "اكتب وصف الوظيفة هنا ✍️ ...",
        note_placeholder : "اكتب ملاحظة الوظيفة هنا ✍️ ...",
        button : "تعديل"
      },
      create_home_work : {
        page_title : "إنشاء الوظيفة 🏚️💯🔝",
        title : "العنوان ⭕",
        description : "الوصف 📑",
        note : "ملاحظة 📝",
        level : "مستوى الوظيفة 🏚️💯🔝🎚️",
        images : "الصور 🖼️",
        title_placeholder : "اكتب عنوان الوظيفة هنا ✍️ ...",
        description_placeholder : "اكتب وصف الوظيفة هنا ✍️ ...",
        note_placeholder : "اكتب ملاحظة الوظيفة هنا ✍️ ...",
        button : "إنشاء"
      },
      plans_component : {
        title : "الخطط 📌📚",
        default_message : "📍⛔😕 لا يوجد اي خطة 😕⛔📍"
      },
      create_plan: {
        page_title: "إنشاء خطة 📌📚",
        title : "العنوان ⭕",
        description : "الوصف 📑",
        note : "ملاحظة 📝",
        level : "مستوى الصف 🏚️💯🔝🎚️",
        plan_info : "بيانات الخطة 📊📈",
        add_day : "أضف يوم 🌅",
        button: "إنشاء",
        title_placeholder: "اكتب عنوان الخطة هنا ✍️ ...",
        description_placeholder: "اكتب وصف الخطة هنا ✍️ ...",
        plan_placeholder: "اكتب ملاحظة الخطة هنا ✍️ ...",
      },
      update_plan: {
        page_title: "تعديل خطة 📌📚",
        title : "العنوان ⭕",
        description : "الوصف 📑",
        note : "ملاحظة 📝",
        level : "مستوى الصف 🏚️💯🔝🎚️",
        plan_info : "بيانات الخطة 📊📈",
        add_day : "أضف يوم 🌅",
        button: "تعديل",
        title_placeholder: "اكتب عنوان الخطة الجديد هنا ✍️ ...",
        description_placeholder: "اكتب وصف الخطة الجديد هنا ✍️ ...",
        plan_placeholder: "اكتب ملاحظة الخطة الجديد هنا ✍️ ...",
      },
      add_day_to_plan_form : {
        title : "أضف يوم 🌅",
        day : "اسم اليوم 🌅",
        subjects : "المواد 📚📖📑",
        subject : "الماجة 📚📖📑",
        start : "تبدأ 🏁",
        end : "تنتهي 🚩",
        add : "+ أضف",
        add_subject : "أضف ماجة",
        day_placeholder : "اكتب اسم اليوم هنا ✍️ ...",
        subject_placeholder : "اكتب اسم المادة هنا ✍️ ...",
        start_placeholder : "اكتب ساعةالبداية هنا ✍️ ...",
        end_placeholder : "اكتب ساعة الانتهاء هنا ✍️ ...",
      },
      food_dash_compoenet: {
        created_at: "📆 :",
        images: "الصور 🖼️ :",
        delete : "حذف",
        update : "تعديل"
      },
      foods_component: {
        page_title: "توصيات الأطعمة 😋🍴",
        created_at: "📆 :",
        images: "الصور 🖼️ :",
      },
      remove_food_form_dash : {
        title : "... 😋🍴 حذف الوجبة",
        remove_btn : "حذف",
        update : "تعديل",
        remove : "🗑️ حذف",
        cancel : "إلغاء"
      },
      update_food : {
        page_title : "تعديل الوجبة 😋🍴",
        title : "العنوان ⭕",
        description : "الوصف 📑",
        images : "الصور 🖼️",
        title_placeholder : "اكتب عنوان الوجبة هنا ✍️ ...",
        description_placeholder : "اكتب وصف الوجبة هنا ✍️ ...",
        button : "تعديل"
      },
      create_food : {
        page_title : "إنشاء الوجبة 😋🍴",
        title : "العنوان ⭕",
        description : "الوصف 📑",
        images : "الصور 🖼️",
        title_placeholder : "اكتب عنوان الوجبة هنا ✍️ ...",
        description_placeholder : "اكتب وصف الوجبة هنا ✍️ ...",
        button : "إنشاء"
      },
      my_plans_page: {
        page_title: "خططي ⭕📌📚",
      },
      my_classes_page: {
        page_title: "صفوفي ⭕📌🏫",
        default : "📍⛔😕 لا يوجد أي صف 😕⛔📍"
      },
      teacher_classes_plans_page: {
        classes: "صفوف المدرس ⭕📌🏫",
        plans: "خطط المدرس ⭕📌📚",
      },
      student_classes_plans_page: {
        classes: "صفوف الطالب ⭕📌🏫",
        plans: "خطط الطالب ⭕📌📚",
      },
      questions : {
        math : "🧮 رياضيات",
        arabic : "🇸🇾 عربي",
        english : "🇺🇸 إنكليزي",
        french : "🇫🇷 فرنسي",
        islam : "👳🕋 ديانة",
        alwatania : "🪖 وطنية",
        history : "⏳ تاريخ",
        philosophy : "👴🏻 فلسفة",
        Physics : "⚛️ فيزياء",
        sciences : "🦠 علوم",
        geography : "🌎 جغرافيا",
        chemistry : "🧪 كيمياء",
      },
      question_component : {
        points : "النقاط 🔢 :",
        class_level : "مستوى الصف 🏫🪜🎚️ :",
        repated : "كررت في 🔄 :",
        answers : "الأجوبة 🟰💯 :",
        created_at : "إشئ في 📆 :",
        update : "تعديل",
        delete : "حذف"
      },
      create_question : {
        page_title : "إنشاء سؤال ❓",
        title : "العنوان ⭕",
        description : "الوصف 📑",
        images : "الصور 🖼️",
        note : "ملاحظة 📝",
        points : "النقاط 🔢",
        repated : "كُرر 🔄",
        level : "المستوى 🎚️",
        class_level : "مستور الصف 🏚️🎚️",
        subject_type : "المادة 📚📖📑",
        options : "الخيارات 🗃️",
        delete : "حذف 🗑️",
        title_placeholder : "اكتب عنوان السؤال هنا ✍️ ...",
        description_placeholder : "اكتب وصف السؤال هنا ✍️ ...",
        note_placeholder : "اكتب ملاحظة السئال هنا ✍️ ...",
        points_placeholder : "اكتب نقاط السؤال هنا ✍️ ...",
        repated_placeholder : "اكتب تواريخ التكرار هنا ✍️ ...",
        level_placeholder : "اكتب مستوى السؤال هنا ✍️ ...",
        class_level_placeholder : "اكتب مستوى الصف هنا ✍️ ...",
        options_placeholder : "اكتب خيارات السؤال هنا ✍️ ...",
        button : "إنشاء"
      },
      update_question : {
        page_title : " تعديل السؤال ❓",
        title : "العنوان ⭕",
        description : "الوصف 📑",
        images : "الصور 🖼️",
        note : "ملاحظة 📝",
        points : "النقاط 🔢",
        repated : "كُرر 🔄",
        level : "المستوى 🎚️",
        class_level : "مستور الصف 🏚️🎚️",
        subject_type : "المادة 📚📖📑",
        options : "الخيارات 🗃️",
        delete : "حذف 🗑️",
        title_placeholder : "اكتب عنوان السؤال هنا ✍️ ...",
        description_placeholder : "اكتب وصف السؤال هنا ✍️ ...",
        note_placeholder : "اكتب ملاحظة السئال هنا ✍️ ...",
        points_placeholder : "اكتب نقاط السؤال هنا ✍️ ...",
        repated_placeholder : "اكتب تواريخ التكرار هنا ✍️ ...",
        level_placeholder : "اكتب مستوى السؤال هنا ✍️ ...",
        class_level_placeholder : "اكتب مستوى الصف هنا ✍️ ...",
        options_placeholder : "اكتب خيارات السؤال هنا ✍️ ...",
        button : "تعديل"
      },
      add_option_component : {
        title : "أضف خيار",
        option : "عنوان الخيار 🟰",
        placeholder_option : "اكتب عنوان الخيار هنا ✍️ ...",
        option_value : "قيمة الخيار 🟰",
        button : "أضف"
      },
      question_page: {
        page_title: "صفحى السؤال 🏚️💯🔝",
        description: "الوصف 📝📋 :",
        subject: "المادة 📚📖📑 :",
        points: "النقاط 🔢 :",
        class_level: "مستوى الصف 🏫🪜🎚️ :",
        repated: "كُرر 🔄 :",
        options: "الخيارات 🟰💯 :",
        created_at: "كُتب في :",
        images_title: "الصور 🖼️",
        created_by: "كُتب بواسطة",
        result_message: "📍⛔😕 لا يوجد صور 😕⛔📍",
      },
      delete_question_form: {
        title: "حذف السؤال ❓ ...",
        delete: "حذف السؤال 🗑️",
        cancel: "إلغاء",
      },
      start_exam_page : {
        page_title : "بدء الإختبار 🧠🏁",
        choose_class_level : "إختيار مستوى الصف 🏫🪜🎚️ ",
        choose_subject : "إختار المادة 📚⭕ ",
        info : "عزيزي الطالب يجب أن تعلم أن الهدف من الاختبارت هو بناء مستوى تعليمي و وعي قوي والتأقلم على الإختبارت للتخلص من رهبة الإمتحان و مساعد الطالب على حفظ أكبر عدد ممكن من الأسئلة الممكنة من خلال تبسيط عملية إختبار معلوماتك",
        time : "د",
        start : "بدء الإختبار 🧠🚀"
      },
      exam_page : {
        exam_header : "إختبار ❓",
        question_header : "السؤال",
        question_description : "الوصف 📝",
        question_note : "ملاحظة 📝",
        question_repated : "كُرر في 🔄",
        end : "إنهاء الإختبار 🧠🏁",
      },
      exam_points_form : {
        header : "إنتهى الإختبار ⭕🎉",
        points : "النقاط : ",
        leave : "الخروج  🏃🏻 : "
      },
      not_found : {
        default_message: "📍⛔😕 عذرا لم يتم العثور على الصفحة 📍⛔😕",
        page : "الصفحة الرئيسية 🏠"
      },
      rate_form : {
        header : "أضف تقييم",
        label : "اكتب معدل التقييم ⭐",
        placeholder : "اكتب تقييم المدرس هنا ✍️...",
        add : "أضف التقييم"
      },
      nav_message : "👋 يوم طيب",
      theme: "السمات 🎨",
      mood: "الوضع ☀️🌑",
      log_out: "تسجيل الخروج",
      log_in : "تسجيل الدخول",
      error: "... خطأ",
      loading: "الرجاء الإنتظار ...",
    },
    APIs: {
      login: {
        Admin: "https://rrr-1-0jyo.onrender.com/api/v1/admin/login",
        Super: "https://rrr-1-0jyo.onrender.com/api/v1/super/login",
        Teacher: "https://rrr-1-0jyo.onrender.com/api/v1/teacher/login",
        Student: "https://rrr-1-0jyo.onrender.com/api/v1/student/login",
        Parent: "https://rrr-1-0jyo.onrender.com/api/v1/parent/login",
      },
      classes: {
        get_all: "https://rrr-1-0jyo.onrender.com/api/v1/class/get/all",
        get_one: "https://rrr-1-0jyo.onrender.com/api/v1/class/get/one",
        get_count: "https://rrr-1-0jyo.onrender.com/api/v1/class/get/count",
        super: {
          create: "https://rrr-1-0jyo.onrender.com/api/v1/super/class/create",
          delete: "https://rrr-1-0jyo.onrender.com/api/v1/super/class/delete",
          update: "https://rrr-1-0jyo.onrender.com/api/v1/super/class/update",
        },
        admin: {
          create: "https://rrr-1-0jyo.onrender.com/api/v1/admin/class/create",
          delete: "https://rrr-1-0jyo.onrender.com/api/v1/admin/class/delete",
          update: "https://rrr-1-0jyo.onrender.com/api/v1/admin/class/update",
        },
        teacher: {
          create: "https://rrr-1-0jyo.onrender.com/api/v1/teacher/class/create",
          delete: "https://rrr-1-0jyo.onrender.com/api/v1/teacher/class/delete",
          update: "https://rrr-1-0jyo.onrender.com/api/v1/teacher/class/update",
          get_my_classes : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/get/classes"
        },
        student : {
          get_my_classes : "https://rrr-1-0jyo.onrender.com/api/v1/student/get/classes"
        },
        join_leave: {
          join: "https://rrr-1-0jyo.onrender.com/api/v1/class/join",
          leave: "https://rrr-1-0jyo.onrender.com/api/v1/class/leave",
        },
      },
      teachers: {
        get_all: "https://rrr-1-0jyo.onrender.com/api/v1/teacher/get/all",
        get_one: "https://rrr-1-0jyo.onrender.com/api/v1/teacher/get/one",
        get_count: "https://rrr-1-0jyo.onrender.com/api/v1/teacher/get/count",
        update: "https://rrr-1-0jyo.onrender.com/api/v1/teacher/update",
        add_rate : "https://rrr-1-0jyo.onrender.com/api/v1/student/rate/add",
        super: {
          create: "https://rrr-1-0jyo.onrender.com/api/v1/super/teacher/create",
          delete: "https://rrr-1-0jyo.onrender.com/api/v1/super/teacher/delete",
          update: "https://rrr-1-0jyo.onrender.com/api/v1/super/teacher/update",
        },
        admin: {
          create: "https://rrr-1-0jyo.onrender.com/api/v1/admin/teacher/create",
          delete: "https://rrr-1-0jyo.onrender.com/api/v1/admin/teacher/delete",
          update: "https://rrr-1-0jyo.onrender.com/api/v1/admin/teacher/update",
        },
      },
      super: {
        start_rate : "https://rrr-1-0jyo.onrender.com/api/v1/super/rate",
        update: "https://rrr-1-0jyo.onrender.com/api/v1/super/update",
      },
      admins: {
        get_all: "https://rrr-1-0jyo.onrender.com/api/v1/admin/get/all",
        get_one: "https://rrr-1-0jyo.onrender.com/api/v1/admin/get/one",
        get_count: "https://rrr-1-0jyo.onrender.com/api/v1/admin/get/count",
        update: "https://rrr-1-0jyo.onrender.com/api/v1/admin/update",
        start_rate : "https://rrr-1-0jyo.onrender.com/api/v1/admin/rate",
        super: {
          create: "https://rrr-1-0jyo.onrender.com/api/v1/super/admin/create",
          delete: "https://rrr-1-0jyo.onrender.com/api/v1/super/admin/delete",
          update: "https://rrr-1-0jyo.onrender.com/api/v1/super/admin/update",
        },
      },
      students: {
        get_top: "https://rrr-1-0jyo.onrender.com/api/v1/student/get/top",
        get_all: "https://rrr-1-0jyo.onrender.com/api/v1/student/get/all",
        get_one: "https://rrr-1-0jyo.onrender.com/api/v1/student/get/one",
        add_rate: "https://rrr-1-0jyo.onrender.com/api/v1/student/rate/add",
        get_count: "https://rrr-1-0jyo.onrender.com/api/v1/student/get/count",
        update: "https://rrr-1-0jyo.onrender.com/api/v1/student/update",
        update_points: "https://rrr-1-0jyo.onrender.com/api/v1/student/update/points",
        super: {
          create: "https://rrr-1-0jyo.onrender.com/api/v1/super/student/create",
          delete: "https://rrr-1-0jyo.onrender.com/api/v1/super/student/delete",
          update: "https://rrr-1-0jyo.onrender.com/api/v1/super/student/update",
        },
        admin: {
          create: "https://rrr-1-0jyo.onrender.com/api/v1/admin/student/create",
          delete: "https://rrr-1-0jyo.onrender.com/api/v1/admin/student/delete",
          update: "https://rrr-1-0jyo.onrender.com/api/v1/admin/student/update",
        },
      },
      parents: {
        get_all: "https://rrr-1-0jyo.onrender.com/api/v1/parent/get/all",
        get_one: "https://rrr-1-0jyo.onrender.com/api/v1/parent/get/one",
        get_count: "https://rrr-1-0jyo.onrender.com/api/v1/parent/get/count",
        update: "https://rrr-1-0jyo.onrender.com/api/v1/parent/update",
        super: {
          create: "https://rrr-1-0jyo.onrender.com/api/v1/super/parent/create",
          delete: "https://rrr-1-0jyo.onrender.com/api/v1/super/parent/delete",
          update: "https://rrr-1-0jyo.onrender.com/api/v1/super/parent/update",
        },
        admin: {
          create: "https://rrr-1-0jyo.onrender.com/api/v1/admin/parent/create",
          delete: "https://rrr-1-0jyo.onrender.com/api/v1/admin/parent/delete",
          update: "https://rrr-1-0jyo.onrender.com/api/v1/admin/parent/update",
        },
      },
      home_works: {
        get_all: "https://rrr-1-0jyo.onrender.com/api/v1/hw/get/all",
        get_one: "https://rrr-1-0jyo.onrender.com/api/v1/hw/get/one",
        get_count: "https://rrr-1-0jyo.onrender.com/api/v1/hw/get/count",
        super: {
          create: "https://rrr-1-0jyo.onrender.com/api/v1/super/hw/create",
          delete: "https://rrr-1-0jyo.onrender.com/api/v1/super/hw/delete",
          update: "https://rrr-1-0jyo.onrender.com/api/v1/super/hw/update",
        },
        admin: {
          create: "https://rrr-1-0jyo.onrender.com/api/v1/admin/hw/create",
          delete: "https://rrr-1-0jyo.onrender.com/api/v1/admin/hw/delete",
          update: "https://rrr-1-0jyo.onrender.com/api/v1/admin/hw/update",
        },
        teacher: {
          create: "https://rrr-1-0jyo.onrender.com/api/v1/teacher/hw/create",
          delete: "https://rrr-1-0jyo.onrender.com/api/v1/teacher/hw/delete",
          update: "https://rrr-1-0jyo.onrender.com/api/v1/teacher/hw/update",
        },
      },
      plans: {
        get_all: "https://rrr-1-0jyo.onrender.com/api/v1/plan/get/all",
        get_one: "https://rrr-1-0jyo.onrender.com/api/v1/plan/get/one",
        get_count: "https://rrr-1-0jyo.onrender.com/api/v1/plan/get/count",
        super: {
          create: "https://rrr-1-0jyo.onrender.com/api/v1/super/plan/create",
          delete: "https://rrr-1-0jyo.onrender.com/api/v1/super/plan/delete",
          update: "https://rrr-1-0jyo.onrender.com/api/v1/super/plan/update",
        },
        admin: {
          create: "https://rrr-1-0jyo.onrender.com/api/v1/admin/plan/create",
          delete: "https://rrr-1-0jyo.onrender.com/api/v1/admin/plan/delete",
          update: "https://rrr-1-0jyo.onrender.com/api/v1/admin/plan/update",
        },
        teacher: {
          copyORremove:
            "https://rrr-1-0jyo.onrender.com/api/v1/teacher/plan/copy",
            get_my_plans : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/get/plans"
        },
        student: {
          copyORremove:
            "https://rrr-1-0jyo.onrender.com/api/v1/student/plan/copy",
            get_my_plans : "https://rrr-1-0jyo.onrender.com/api/v1/student/get/plans"
        }
      },
      messages: {
        get_all: "https://rrr-1-0jyo.onrender.com/api/v1/message/get/all",
        get_one: "https://rrr-1-0jyo.onrender.com/api/v1/message/get/one",
        get_count: "https://rrr-1-0jyo.onrender.com/api/v1/message/get/count",
        super: {
          create: "https://rrr-1-0jyo.onrender.com/api/v1/super/message/create",
          delete: "https://rrr-1-0jyo.onrender.com/api/v1/super/message/delete",
          update: "https://rrr-1-0jyo.onrender.com/api/v1/super/message/update",
        },
        admin: {
          create: "https://rrr-1-0jyo.onrender.com/api/v1/admin/message/create",
          delete: "https://rrr-1-0jyo.onrender.com/api/v1/admin/message/delete",
          update: "https://rrr-1-0jyo.onrender.com/api/v1/admin/message/update",
        }
      },
      food: {
        get_all: "https://rrr-1-0jyo.onrender.com/api/v1/food/get/all",
        get_one: "https://rrr-1-0jyo.onrender.com/api/v1/food/get/one",
        get_count: "https://rrr-1-0jyo.onrender.com/api/v1/food/get/count",
        super: {
          create: "https://rrr-1-0jyo.onrender.com/api/v1/super/food/create",
          delete: "https://rrr-1-0jyo.onrender.com/api/v1/super/food/delete",
          update: "https://rrr-1-0jyo.onrender.com/api/v1/super/food/update",
        },
        admin: {
          create: "https://rrr-1-0jyo.onrender.com/api/v1/admin/food/create",
          delete: "https://rrr-1-0jyo.onrender.com/api/v1/admin/food/delete",
          update: "https://rrr-1-0jyo.onrender.com/api/v1/admin/food/update",
        }
      },
      subjects_questions : {
        math : {
          get_all : "https://rrr-1-0jyo.onrender.com/api/v1/math/get/all",
          get_one : "https://rrr-1-0jyo.onrender.com/api/v1/math/get/one",
          get_count : "https://rrr-1-0jyo.onrender.com/api/v1/math/get/count",
          start_exam : "https://rrr-1-0jyo.onrender.com/api/v1/math/exam",
          super : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/super/math/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/super/math/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/super/math/update",
          },
          admin : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/admin/math/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/admin/math/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/admin/math/update",
          },
          teacher : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/math/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/math/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/math/update",
          },
        },
        english : {
          get_all : "https://rrr-1-0jyo.onrender.com/api/v1/english/get/all",
          get_one : "https://rrr-1-0jyo.onrender.com/api/v1/english/get/one",
          get_count : "https://rrr-1-0jyo.onrender.com/api/v1/english/get/count",
          start_exam : "https://rrr-1-0jyo.onrender.com/api/v1/english/exam",
          super : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/super/english/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/super/english/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/super/english/update",
          },
          admin : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/admin/english/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/admin/english/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/admin/english/update",
          },
          teacher : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/english/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/english/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/english/update",
          },
        },
        arabic : {
          get_all : "https://rrr-1-0jyo.onrender.com/api/v1/arabic/get/all",
          get_one : "https://rrr-1-0jyo.onrender.com/api/v1/arabic/get/one",
          get_count : "https://rrr-1-0jyo.onrender.com/api/v1/arabic/get/count",
          start_exam : "https://rrr-1-0jyo.onrender.com/api/v1/arabic/exam",
          super : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/super/arabic/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/super/arabic/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/super/arabic/update",
          },
          admin : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/admin/arabic/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/admin/arabic/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/admin/arabic/update",
          },
          teacher : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/arabic/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/arabic/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/arabic/update",
          },
        },
        french : {
          get_all : "https://rrr-1-0jyo.onrender.com/api/v1/french/get/all",
          get_one : "https://rrr-1-0jyo.onrender.com/api/v1/french/get/one",
          get_count : "https://rrr-1-0jyo.onrender.com/api/v1/french/get/count",
          start_exam : "https://rrr-1-0jyo.onrender.com/api/v1/french/exam",
          super : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/super/french/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/super/french/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/super/french/update",
          },
          admin : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/admin/french/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/admin/french/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/admin/french/update",
          },
          teacher : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/french/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/french/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/french/update",
          },
        },
        islam : {
          get_all : "https://rrr-1-0jyo.onrender.com/api/v1/islam/get/all",
          get_one : "https://rrr-1-0jyo.onrender.com/api/v1/islam/get/one",
          get_count : "https://rrr-1-0jyo.onrender.com/api/v1/islam/get/count",
          start_exam : "https://rrr-1-0jyo.onrender.com/api/v1/islam/exam",
          super : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/super/islam/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/super/islam/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/super/islam/update",
          },
          admin : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/admin/islam/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/admin/islam/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/admin/islam/update",
          },
          teacher : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/islam/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/islam/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/islam/update",
          },
        },
        history : {
          get_all : "https://rrr-1-0jyo.onrender.com/api/v1/history/get/all",
          get_one : "https://rrr-1-0jyo.onrender.com/api/v1/history/get/one",
          get_count : "https://rrr-1-0jyo.onrender.com/api/v1/history/get/count",
          start_exam : "https://rrr-1-0jyo.onrender.com/api/v1/history/exam",
          super : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/super/history/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/super/history/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/super/history/update",
          },
          admin : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/admin/history/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/admin/history/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/admin/history/update",
          },
          teacher : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/history/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/history/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/history/update",
          },
        },
        philosophy : {
          get_all : "https://rrr-1-0jyo.onrender.com/api/v1/philosophy/get/all",
          get_one : "https://rrr-1-0jyo.onrender.com/api/v1/philosophy/get/one",
          get_count : "https://rrr-1-0jyo.onrender.com/api/v1/philosophy/get/count",
          start_exam : "https://rrr-1-0jyo.onrender.com/api/v1/philosophy/exam",
          super : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/super/philosophy/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/super/philosophy/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/super/philosophy/update",
          },
          admin : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/admin/philosophy/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/admin/philosophy/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/admin/philosophy/update",
          },
          teacher : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/philosophy/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/philosophy/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/philosophy/update",
          },
        },
        physics : {
          get_all : "https://rrr-1-0jyo.onrender.com/api/v1/physics/get/all",
          get_one : "https://rrr-1-0jyo.onrender.com/api/v1/physics/get/one",
          get_count : "https://rrr-1-0jyo.onrender.com/api/v1/physics/get/count",
          start_exam : "https://rrr-1-0jyo.onrender.com/api/v1/physics/exam",
          super : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/super/physics/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/super/physics/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/super/physics/update",
          },
          admin : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/admin/physics/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/admin/physics/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/admin/physics/update",
          },
          teacher : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/physics/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/physics/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/physics/update",
          },
        },
        sciences : {
          get_all : "https://rrr-1-0jyo.onrender.com/api/v1/sciences/get/all",
          get_one : "https://rrr-1-0jyo.onrender.com/api/v1/sciences/get/one",
          get_count : "https://rrr-1-0jyo.onrender.com/api/v1/sciences/get/count",
          start_exam : "https://rrr-1-0jyo.onrender.com/api/v1/sciences/exam",
          super : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/super/sciences/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/super/sciences/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/super/sciences/update",
          },
          admin : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/admin/sciences/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/admin/sciences/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/admin/sciences/update",
          },
          teacher : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/sciences/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/sciences/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/sciences/update",
          },
        },
        geography : {
          get_all : "https://rrr-1-0jyo.onrender.com/api/v1/geography/get/all",
          get_one : "https://rrr-1-0jyo.onrender.com/api/v1/geography/get/one",
          get_count : "https://rrr-1-0jyo.onrender.com/api/v1/geography/get/count",
          start_exam : "https://rrr-1-0jyo.onrender.com/api/v1/geography/exam",
          super : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/super/geography/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/super/geography/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/super/geography/update",
          },
          admin : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/admin/geography/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/admin/geography/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/admin/geography/update",
          },
          teacher : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/geography/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/geography/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/geography/update",
          },
        },
        chemistry : {
          get_all : "https://rrr-1-0jyo.onrender.com/api/v1/chemistry/get/all",
          get_one : "https://rrr-1-0jyo.onrender.com/api/v1/chemistry/get/one",
          get_count : "https://rrr-1-0jyo.onrender.com/api/v1/chemistry/get/count",
          start_exam : "https://rrr-1-0jyo.onrender.com/api/v1/chemistry/exam",
          super : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/super/chemistry/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/super/chemistry/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/super/chemistry/update",
          },
          admin : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/admin/chemistry/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/admin/chemistry/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/admin/chemistry/update",
          },
          teacher : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/chemistry/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/chemistry/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/chemistry/update",
          },
        },
        alwatania : {
          get_all : "https://rrr-1-0jyo.onrender.com/api/v1/alwatania/get/all",
          get_one : "https://rrr-1-0jyo.onrender.com/api/v1/alwatania/get/one",
          get_count : "https://rrr-1-0jyo.onrender.com/api/v1/alwatania/get/count",
          start_exam : "https://rrr-1-0jyo.onrender.com/api/v1/alwatania/exam",
          super : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/super/alwatania/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/super/alwatania/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/super/alwatania/update",
          },
          admin : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/admin/alwatania/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/admin/alwatania/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/admin/alwatania/update",
          },
          teacher : {
            create : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/alwatania/create",
            delete : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/alwatania/delete",
            update : "https://rrr-1-0jyo.onrender.com/api/v1/teacher/alwatania/update",
          },
        },
      },
    },
  },
  getters: {},
  mutations: {
    // change mood method
    changeMood(state) {
      state.mood = state.mood == "darck" ? "light" : "darck";
      window.localStorage.setItem("mood", state.mood);
    },

    // select the active component in dash 
    SelectActiveComponent(state) {
      state.active_component_in_dash = state.user.user_type == "super" || state.user.user_type == "admin" ? "admins" : "my-classes"
    },

    // open & close the sid bar method
    changeSidBarStatus(state) {
      state.sidBar = state.sidBar == "close" ? "open" : "close";
    },

    // open & close the dash's viwe sid bar
    ChangeDashSidBarStatus(state) {
      state.sid_bar_dash = state.sid_bar_dash == "clsoe" ? "open" : "cose"
    },

    // open & closethe language list state
    changelanguage_list_state(state) {
      state.language_list_state =
        state.language_list_state == "close" ? "open" : "close";
    },

    // open || close the error form
    ChangeErrorFormStatus(state) {
      state.error_form_status =
        state.error_form_status == "close" ? "open" : "close";
    },

    // open || close the avatar form
    Change_avatar_form_status(state) {
      state.avatar_form_status =
        state.avatar_form_status == "close" ? "open" : "close";
    },

    // open || close the cover form
    Change_cover_form_status(state) {
      state.cover_form_status =
        state.cover_form_status == "close" ? "open" : "close";
    },

    ChangeAddOptionFormStatus(state) {
      state.add_option_form_status = state.add_option_form_status == "close"? "open" : "close";
    },

    // open or close add rate component 
    OpenOrCloseAddRate(state) {
      state.add_rate_form_status = state.add_rate_form_status == "close" ? "open" : "close";
    },

    // open or close the verify delete home work form
    OpenOrCloseDeleteHW(state) {
      state.delete_hw_form_status =
        state.delete_hw_form_status == "close" ? "open" : "close";
    },

    // open or close the delete admin form verify
    OpenOrCloseDeleteAdminForm(state) {
      state.delete_admin_form_status =
        state.delete_admin_form_status == "close" ? "open" : "close";
    },

    // open or close the delete teacher form verify
    OpenOrCloseDeleteTeacherForm(state) {
      state.delete_teacher_form_status =
        state.delete_teacher_form_status == "close" ? "open" : "close";
    },

    // open or close the delete message form verify
    OpenOrCloseDeleteMessage(state) {
      state.delete_message_form_status = state.delete_message_form_status == "close"
      ? "open"
      : "close"
    },

    // open or close the add_subject_form
    OpenOrCloseAddSubjectForm(state) {
      state.add_subject_form_status = state.add_subject_form_status == "close" ? "open" : "close"
    },

    // open or close the update_subject_form
    OpenOrCloseUpdateSubjectForm(state) {
      state.update_subject_form_status = state.update_subject_form_status == "close" ? "open" : "close"
    },

    // open or close the update admin form verify
    OpenOrCloseUpdateAdminForm(state) {
      state.update_admin_form =
        state.update_admin_form == "close" ? "open" : "close";
    },

    // open or close the delete student form verify
    OpenOrCloseDeleteStudentForm(state) {
      state.delete_student_form_status = 
      state.delete_student_form_status == "close" ? "open" : "close"
    },

    // open or close the delete student form verify
    OpenOrCloseDeleteQuestionForm(state) {
      state.delete_question_form_status = 
      state.delete_question_form_status == "close" ? "open" : "close"
    },

    // open or close the delete parent form verify
    OpenOrCloseDeleteParentForm(state) {
      state.delete_parent_form_status = 
      state.delete_parent_form_status == "close" ? "open" : "close"
    },

    // open or close the delete plan form verify
    OpenOrCloseDeletePlanForm(state) {
      state.remove_plan_form_dash_status = 
      state.remove_plan_form_dash_status == "close" ? "open" : "close"
    },

    // open or close the exam points form
    OpenOrCloseTheExamPointsForm(state) {
      state.exam_points_form = state.exam_points_form == "close" ? "open" : "close";
    },

    // open or close the delete plan form verify
    OpenOrCloseDeleteFoodForm(state) {
      state.remove_food_form_dash_status = 
      state.remove_food_form_dash_status == "close" ? "open" : "close"
    },

    // open or close the choosing children container
    ChooseChildren(state) {
      // to open or close the choose children form
      state.choose_children_status = state.choose_children_status == "close" ? "open" : "close"
    },

    // open or close the choosing teacher container
    ChooseTeacher(state) {
      // to open or close the choose teacher form
      state.choose_teacher_status = state.choose_teacher_status == "close" ? "open" : "close"
    },

    // open or close the choosing class container
    ChooseClass(state) {
      // to open or close the choose class form
      state.choose_class_status = state.choose_class_status == "close" ? "open" : "close"
    },

    // open or close the delete class form verify
    OpenOrCloseDeleteClassForm(state) {
      state.delete_class_form_status = 
      state.delete_class_form_status == "close" ? "open" : "close"
    },

    // open or close the delete home work form verify
    OpenOrCloseDeleteHomeWorkForm(state) {
      state.delete_home_work_form_status = 
      state.delete_home_work_form_status == "close" ? "open" : "close"
    },

  },
  actions: {
    // log out admin
    LogOut() {
      window.localStorage.removeItem("Ss-user");
      window.location = '/login';
    },

    // get classes
    async getClasses() {
      try {
        // to start the loadin animation
        this.loading = "open";

        await axios
          .get("https://rrr-zb8x.onrenders.com/api/v1/class/get/all")
          .then((response) => {
            // set the data to stor classes
            this.classes = response.data.classes_data;
          })
          .catch((error) => {
            // to stop the loading animation
            this.loading = "close";

            // to set the reqeust's error message to error message var in store
            this.erorr_message = error.message;

            // to open the error form
            this.error_form_status = "open";
          });

        // to stop the loadin animation
        this.loading = "close";
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {},
});

