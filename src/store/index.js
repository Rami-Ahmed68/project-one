import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    mood: window.localStorage.getItem("mood") || "darck",
    // mood: "darck",
    language: window.localStorage.getItem("language") || "English",
    language_list_state: "close",
    theme: window.localStorage.getItem("theme") || "orange",
    error_form_status: "close",
    error_message: {},
    delete_hw_form_status: "close",
    copy_message_status: "close",
    avatar_form_status: "close",
    cover_form_status : "close",
    delete_admin_form_status: "close",
    delete_teacher_form_status: "close",
    delete_student_form_status: "close",
    delete_parent_form_status: "close",
    delete_class_form_status: "close",
    delete_student_form : "close",
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
    parent_id_for_delete : "",
    admin_for_update: "",
    teacher_for_update: "",
    student_for_update : "",
    parent_for_update : "",
    active_component_in_dash: "admins",
    choose_children_status : "close",
    choose_teacher_status : "close",
    geted_student : "",
    geted_teacher : "",
    choosed_children : [],
    choosed_teacher : "",
    class_for_update: "",
    selected_cover : "",
    sid_bar_dash : "close",
    // user_type: JSON.parse(window.localStorage.getItem("Ss-user")).user_type || "admint",
    sidBar: "close",
    information: "test",
    loading: "close",
    rate_status : true,
    copy_message: { english: "Id Copyed", arabic: "تم نسخ المعرف" },
    classes: [],
    class: "",
    students: [],
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
    plan: "",
    foods: [],
    food: "",
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
    English: {
      login: {
        title: "log in to your account ...",
        label: { label_one: "Email", label_tow: "Pssword" },
        placeholder: {
          email: "Type your email here ...",
          password: "Type your password here ...",
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
      links: [
        { path: "/profile", title: "Profile", access: "public" },
        { path: "/", title: "Home", access: "public" },
        { path: "/classes", title: "Classes", access: "public" },
        { path: "/classes", title: "My Classes", access: "public" },
        { path: "/students", title: "Students", access: "public" },
        { path: "/teachers", title: "Teachers", access: "public" },
        { path: "/admins", title: "Admins", access: "public" },
        { path: "/parents", title: "Parents", access: "admin" },
        { path: "/plans", title: "Plans", access: "public" },
        { path: "/my/plans", title: "My Plans", access: "public" },
        { path: "/my/children", title: "My Children", access: "parent" },
        { path: "/foods", title: "Food", access: "public" },
        { path: "/about", title: "About us", access: "public" },
        {
          url: "https://rami-web.onrender.com",
          title: "Developer",
          access: "public",
        },
      ],
      language: {
        pages: "Pages",
        title: "Language",
        arabic: "Arabic",
        english: "English",
      },
      footer: {
        message: "Hi,",
        links: [
          {
            title: "FaceBook",
            link: "https://www.facebook.com/albareoun?locale=ar_AR",
            icon: "facebook",
          },
          {
            title: "WhatsApp",
            link: "https://wa.me/0950008822",
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
        images: "Images 🗃️📷 :",
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
        btn_text: "Click to instll",
        message:
          "Our school: an educational edifice equipped with teaching aids, including equipped classrooms and places for educational and sports activities It was established in 2012 and includes educational stages from kindergarten to middle school.",
        note: "All rights are save",
      },
      profile: {
        gender: "Gender ⚧️ :",
        phone: "Phone 📞 :",
        exams: "Exams 📝📑🔖 :",
        points: "Points 📍 :",
        gpa: "GPA 📌 :",
        class_level: "CLass Level 🏫🪜🎚️ :",
        joind_at: "Joind In 📆 :",
        medals: [
          { gpa: 0, message: "dead 🏴‍☠️" },
          { gpa: 1, message: "good 🫡" },
          { gpa: 2, message: "very good ✊" },
          { gpa: 3, message: "persistent 📈" },
          { gpa: 3, message: "smart 🧠" },
          { gpa: 4, message: "scorer 🎯" },
          { gpa: 5, message: "legendary 🔥" },
        ],
        classes_cont: {
          title: "My Classes",
        },
        plans_cont: {
          title: "My Plans",
        },
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
      },
      foods_page: {
        page_title: "Food page 😋🍴",
        placeholder: "Type the food title here ✍️",
        search_food_name: "Search By name 💬👇",
        results_message: "Results 😋🍴👇",
      },
      food_compoenet: {
        created_at: "📆 :",
        images: "Images 📷 :",
      },
      food_page: {
        page_title: "Food page 😋🍴",
        created_at: "📆 :",
        images: "Images 📷 :",
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
        exams: "Exams 📝📑🔖 :",
        points: "Points 📍 :",
        gpa: "GPA 📌 :",
        class_level: "CLass Level 🏫🪜🎚️ :",
        joind_at: "Joind In 📆 :",
        default_message_classes: "📍⛔😕 No Any Class 📍⛔😕",
        default_message_plans: "📍⛔😕 No Any Plan 📍⛔😕",
        medals: [
          { gpa: 0, message: "dead 🏴‍☠️" },
          { gpa: 1, message: "good 🫡" },
          { gpa: 2, message: "very good ✊" },
          { gpa: 3, message: "persistent 📈" },
          { gpa: 3, message: "smart 🧠" },
          { gpa: 4, message: "scorer 🎯" },
          { gpa: 5, message: "legendary 🔥" },
        ],
        classes_cont: {
          title: "Classes",
        },
        plans_cont: {
          title: "Plans",
        },
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
      theme: "Theme",
      mood: "Mood",
      log_out: "Log out",
      error: "Error  ...",
      loading: "Waite Pleace ...",
      avatar_form_header: "Avatra actions",
      new: "New AVatar",
      delete: "Delete Avatar",
    },
    Arabic: {
      login: {
        title: "... تسجيل الدخول ",
        label: { label_one: "الإيميل", label_tow: "كلمة المرور" },
        placeholder: {
          email: "... اكتب الايميل هنا",
          password: "... اكتب كلمة المرور هنا",
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
        pages: "الصفحات",
        title: "اللغة",
        arabic: "عربي",
        english: "إنكليزي",
      },
      footer: {
        message: "مرحبا,",
        links: [
          {
            title: "فيسبوك",
            link: "https://www.facebook.com/albareoun?locale=ar_AR",
            icon: "facebook",
          },
          {
            title: "واتس اب",
            link: "https://wa.me/0950008822",
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
        images: "الصور 🗃️📷 :",
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
        class_level: "الصف 🏫🪜🎚️ :",
        joind_at: "انضم في 📆 :",
        medals: [
          { gpa: 0, message: "ميت 🏴‍☠️" },
          { gpa: 1, message: "جيد 🫡" },
          { gpa: 2, message: "جيد جدا ✊" },
          { gpa: 3, message: "مثابر 📈" },
          { gpa: 3, message: "ذكي 🧠" },
          { gpa: 4, message: "هداف 🎯" },
          { gpa: 5, message: "اسطوري 🔥" },
        ],
        classes_cont: {
          title: "صفوفي",
        },
        plans_cont: {
          title: "خططي",
        },
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
      },
      foods_page: {
        page_title: "صفحة الأطعمة 😋🍴",
        placeholder: "اكتب عنوان الطعام هنا ✍️",
        search_food_name: "البحث عن طريق العنوان 💬👇",
        results_message: "النتائج 😋🍴👇",
      },
      food_compoenet: {
        created_at: "📆 :",
        images: "Images 📷 :",
      },
      food_page: {
        page_title: "صفحة الطعام 😋🍴",
        created_at: "📆 :",
        images: "الصور 📷 :",
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
        exams: "الامتحانات 📝📑🔖 :",
        points: "النقاط 📍 :",
        gpa: "المعدل 📌 :",
        class_level: "الصف 🏫🪜🎚️ :",
        joind_at: "انضم في 📆 :",
        default_message_classes: "📍⛔😕 لا يوجد اي صف 📍⛔😕",
        default_message_plans: "📍⛔😕 لا يوجد اي خطة 📍⛔😕",
        medals: [
          { gpa: 0, message: "ميت 🏴‍☠️" },
          { gpa: 1, message: "جيد 🫡" },
          { gpa: 2, message: "جيد جدا ✊" },
          { gpa: 3, message: "مثابر 📈" },
          { gpa: 3, message: "ذكي 🧠" },
          { gpa: 4, message: "هداف 🎯" },
          { gpa: 5, message: "اسطوري 🔥" },
        ],
        classes_cont: {
          title: "الصفوف",
        },
        plans_cont: {
          title: "الخطط",
        },
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
      choose_teacher_form : {
        title : "ابحث واختار المدرس",
        button : "بحث",
        placeholder : "اكتب معرف المدرس هنا ✍️ ...",
        section_title : "المدرسون الذين تم العثور عليهم 👨‍🏫",
        add_button : "اضافة",
        remove_button : "حذف"
      },
      theme: "السمات",
      mood: "الوضع",
      log_out: "تسجيل الخروج",
      error: "... خطأ",
      loading: "الرجاء الإنتظار ...",
    },
    APIs: {
      login: {
        Admin: "https://rrr-zb8x.onrender.com/api/v1/admin/login",
        Super: "https://rrr-zb8x.onrender.com/api/v1/super/login",
        Teacher: "https://rrr-zb8x.onrender.com/api/v1/teacher/login",
        Student: "https://rrr-zb8x.onrender.com/api/v1/student/login",
        Parent: "https://rrr-zb8x.onrender.com/api/v1/parent/login",
      },
      classes: {
        get_all: "https://rrr-zb8x.onrender.com/api/v1/class/get/all",
        get_one: "https://rrr-zb8x.onrender.com/api/v1/class/get/one",
        super: {
          create: "https://rrr-zb8x.onrender.com/api/v1/super/class/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/super/class/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/super/class/update",
        },
        admin: {
          create: "https://rrr-zb8x.onrender.com/api/v1/admin/class/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/admin/class/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/admin/class/update",
        },
        teachers: {
          create: "https://rrr-zb8x.onrender.com/api/v1/teacher/class/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/teacher/class/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/teacher/class/update",
        },
        join_leave: {
          join: "https://rrr-zb8x.onrender.com/api/v1/class/join",
          leave: "https://rrr-zb8x.onrender.com/api/v1/class/leave",
        },
      },
      teachers: {
        get_all: "https://rrr-zb8x.onrender.com/api/v1/teacher/get/all",
        get_one: "https://rrr-zb8x.onrender.com/api/v1/teacher/get/one",
        update: "https://rrr-zb8x.onrender.com/api/v1/teacher/update",
        add_rate : "https://rrr-zb8x.onrender.com/api/v1/student/rate/add",
        super: {
          create: "https://rrr-zb8x.onrender.com/api/v1/super/teacher/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/super/teacher/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/super/teacher/update",
        },
        admin: {
          create: "https://rrr-zb8x.onrender.com/api/v1/admin/teacher/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/admin/teacher/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/admin/teacher/update",
        },
      },
      super: {
        start_rate : "https://rrr-zb8x.onrender.com/api/v1/super/rate",
        update: "https://rrr-zb8x.onrender.com/api/v1/super/update",
      },
      admins: {
        get_all: "https://rrr-zb8x.onrender.com/api/v1/admin/get/all",
        get_one: "https://rrr-zb8x.onrender.com/api/v1/admin/get/one",
        update: "https://rrr-zb8x.onrender.com/api/v1/admin/update",
        start_rate : "https://rrr-zb8x.onrender.com/api/v1/admin/rate",
        super: {
          create: "https://rrr-zb8x.onrender.com/api/v1/super/admin/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/super/admin/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/super/admin/update",
        },
      },
      students: {
        get_all: "https://rrr-zb8x.onrender.com/api/v1/student/get/all",
        get_one: "https://rrr-zb8x.onrender.com/api/v1/student/get/one",
        update: "https://rrr-zb8x.onrender.com/api/v1/student/update",
        super: {
          create: "https://rrr-zb8x.onrender.com/api/v1/super/student/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/super/student/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/super/student/update",
        },
        admin: {
          create: "https://rrr-zb8x.onrender.com/api/v1/admin/student/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/admin/student/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/admin/student/update",
        },
      },
      parents: {
        get_all: "https://rrr-zb8x.onrender.com/api/v1/parent/get/all",
        get_one: "https://rrr-zb8x.onrender.com/api/v1/parent/get/one",
        update: "https://rrr-zb8x.onrender.com/api/v1/parent/update",
        super: {
          create: "https://rrr-zb8x.onrender.com/api/v1/super/parent/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/super/parent/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/super/parent/update",
        },
        admin: {
          create: "https://rrr-zb8x.onrender.com/api/v1/admin/parent/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/admin/parent/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/admin/parent/update",
        },
      },
      home_works: {
        get_home_work_all: "https://rrr-zb8x.onrender.com/api/v1/hw/get/all",
        get_home_work_one: "https://rrr-zb8x.onrender.com/api/v1/hw/get/one",
        super: {
          create: "https://rrr-zb8x.onrender.com/api/v1/super/hw/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/super/hw/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/super/hw/update",
        },
        admin: {
          create: "https://rrr-zb8x.onrender.com/api/v1/admin/hw/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/admin/hw/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/admin/hw/update",
        },
        teacher: {
          create: "https://rrr-zb8x.onrender.com/api/v1/teacher/hw/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/teacher/hw/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/teacher/hw/update",
        },
      },
      plans: {
        super: {
          create: "https://rrr-zb8x.onrender.com/api/v1/super/plan/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/super/plan/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/super/plan/update",
        },
        admin: {
          create: "https://rrr-zb8x.onrender.com/api/v1/admins/plan/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/admins/plan/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/admins/plan/update",
        },
        teacher: {
          copyORremove:
            "https://rrr-zb8x.onrender.com/api/v1/teacher/plan/copy",
        },
        student: {
          copyORremove:
            "https://rrr-zb8x.onrender.com/api/v1/student/plan/copy",
        },
        get_all: "https://rrr-zb8x.onrender.com/api/v1/plan/get/all",
        get_one: "https://rrr-zb8x.onrender.com/api/v1/plan/get/one",
      },
      messages: {
        super: {
          create: "https://rrr-zb8x.onrender.com/api/v1/super/message/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/super/message/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/super/message/update",
        },
        admin: {
          create: "https://rrr-zb8x.onrender.com/api/v1/admin/message/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/admin/message/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/admin/message/update",
        },
        get_all: "https://rrr-zb8x.onrender.com/api/v1/message/get/all",
        get_one: "https://rrr-zb8x.onrender.com/api/v1/message/get/one",
      },
      food: {
        super: {
          create: "https://rrr-zb8x.onrender.com/api/v1/super/food/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/super/food/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/super/food/update",
        },
        admin: {
          create: "https://rrr-zb8x.onrender.com/api/v1/admin/food/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/admin/food/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/admin/food/update",
        },
        get_all: "https://rrr-zb8x.onrender.com/api/v1/food/get/all",
        get_one: "https://rrr-zb8x.onrender.com/api/v1/food/get/one",
      },
    },
  },
  getters: {},
  mutations: {
    // change mood method
    changeMood(state) {
      state.mood = state.mood == "darck" ? "light" : "darck";
      console.log(state.mood);
      window.localStorage.setItem("mood", state.mood);
    },

    // open & close the sid bar method
    changeSidBarStatus(state) {
      state.sidBar = state.sidBar == "close" ? "open" : "close";
      console.log(state.sidBar);
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

    // open or close the delete parent form verify
    OpenOrCloseDeleteParentForm(state) {
      state.delete_parent_form_status = 
      state.delete_parent_form_status == "close" ? "open" : "close"
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

    // open or close the delete class form verify
    OpenOrCloseDeleteClassForm(state) {
      state.delete_class_form_status = 
      state.delete_class_form_status == "close" ? "open" : "close"
    },
  },
  actions: {
    // log out admin
    LogOut() {
      window.localStorage.removeItem("Ss-user");
      window.location.reload();
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
            console.log(error);
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
