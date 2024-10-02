<template>
  <div
    :class="`update-message-${this.$store.state.mood}-${this.$store.state.language}-${this.status}`"
  >
    <!-- header  -->
    <div class="header">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_message.page_title
          : this.$store.state.Arabic.update_message.page_title
      }}
    </div>
    <!-- header  -->

    <!-- form  -->
    <div class="form">
      <!-- title  -->
      <label for="title">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_message.title
          : this.$store.state.Arabic.update_message.title
      }}</label>

      <input
        type="text"
        id="title"
        v-model="this.title"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.update_message.title_placeholder
            : this.$store.state.Arabic.update_message.title_placeholder
        "
      />
      <!-- title  -->

      <!-- description  -->
      <label for="description">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_message.description
          : this.$store.state.Arabic.update_message.description
      }}</label>

      <textarea
        id="description"
        v-model="this.description"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.update_message.description_placeholder
            : this.$store.state.Arabic.update_message.description_placeholder
        "
      >
      </textarea>
      <!-- description  -->

      <!-- note  -->
      <label for="note">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_message.note
          : this.$store.state.Arabic.update_message.note
      }}</label>

      <textarea
        id="note"
        v-model="this.note"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.update_message.note_placeholder
            : this.$store.state.Arabic.update_message.note_placeholder
        "
      >
      </textarea>
      <!-- note  -->

      <!-- recipient  -->
      <label for="recipient">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_message.Recipient
          : this.$store.state.Arabic.update_message.Recipient
      }}</label>

      <select name="" id="recipient" v-model="this.recipient">
        <option
          v-for="(recipient, index) in this.$store.state.recipient_list"
          :key="index"
          :value="recipient.value"
        >
          {{
            this.$store.state.language == "English"
              ? recipient.English
              : recipient.Arabic
          }}
        </option>
      </select>
      <!-- recipient  -->

      <!-- level  -->
      <label for="level">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_message.level
          : this.$store.state.Arabic.update_message.level
      }}</label>

      <select name="" id="level" v-model="this.level">
        <option
          v-for="(level, index) in this.$store.state.messages_level_list"
          :key="index"
          :value="level.value"
        >
          {{
            this.$store.state.language == "English"
              ? level.English
              : level.Arabic
          }}
        </option>
      </select>
      <!-- level  -->

      <button @click="UpdateMessage">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_message.button
            : this.$store.state.Arabic.update_message.button
        }}
      </button>
    </div>
    <!-- form  -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "update-mesage-component",
  data() {
    return {
      // page status
      status: "close",
      // title
      title: this.$store.state.message_for_update.title,
      // description
      description: this.$store.state.message_for_update.description,
      // note
      note: this.$store.state.message_for_update.note,
      // recipient
      recipient: this.$store.state.message_for_update.recipient,
      // level
      level: this.$store.state.message_for_update.level,
      // body data
      body_data: {},
    };
  },
  components: {},
  mounted() {
    setTimeout(() => {
      this.status = "open";
    }, 500);
  },
  methods: {
    // update message method
    async UpdateMessage() {
      // to start the loading
      this.$store.state.loading = "open";

      // create headers
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // add the super_admin_id or admin_id
      if (this.$store.state.user.user_type == "super") {
        this.body_data.super_admin_id = this.$store.state.user.user._id;
      } else if (this.$store.state.user.user_type == "admin") {
        this.body_data.admin_id = this.$store.state.user.user._id;
      }

      // add the message id
      this.body_data.message_id = this.$store.state.message_for_update._id;

      // add the title
      if (this.title != this.$store.state.message_for_update.title) {
        this.body_data.title = this.title;
      }

      // add the description
      if (
        this.description != this.$store.state.message_for_update.description
      ) {
        this.body_data.description = this.description;
      }

      // add the note
      if (this.note != this.$store.state.message_for_update.note) {
        this.body_data.note = this.note;
      }

      // add the recipient
      if (this.recipient != this.$store.state.message_for_update.recipient) {
        this.body_data.recipient = this.recipient;
      }

      // add the level
      if (this.level != this.$store.state.message_for_update.level) {
        this.body_data.level = this.level;
      }

      await axios
        .put(
          this.$store.state.user.user_type == "super"
            ? this.$store.state.APIs.messages.super.update
            : this.$store.state.APIs.messages.admin.update,
          this.body_data,
          { headers }
        )
        .then(() => {
          // to stop the loading loading
          this.$store.state.loading = "close";

          // change the active componenet in dash
          this.$store.state.active_component_in_dash = "messages";
        })
        .catch((error) => {
          // to open the componenet smooth
          this.status = "open";

          // to stop the loading animation
          this.$store.state.loading = "close";

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },
  },
};
</script>

<style lang="scss">
@import "../../../Sass/varibels/variables";
// darck and light English style
.update-message-darck-English-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  // component header style
  .header {
    width: 100%;
    height: auto;
    border: 1px solid;
    padding: 5px 0px;
    border-color: transparent transparent $border-light transparent;
    color: $font-light;
  }

  .form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .cover-cont {
      width: 100%;
      height: auto;
      margin: 20px 0px;

      img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        cursor: pointer;
      }
    }

    // input's labels
    label {
      width: 100%;
      height: auto;
      padding: 5px 0px;
      margin: 10px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      color: $font-light;
    }

    // input style
    input {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      padding: 0px 10px;
      margin: 10px 0px;
      background-color: $body-light;
    }

    textarea {
      width: 100%;
      height: 100px;
      padding: 5px 5px 5px 10px;
      border: none;
      border-radius: 5px;
      outline: none;
      resize: none;
      margin: 10px 0px;
      background-color: $body-light;
    }

    // gender and Permissions list style
    select {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      margin: 10px 0px;
      background-color: $body-light;
      padding: 0px 10px;
    }

    .teacher-cont {
      width: 100%;
      height: 120px;
      border-radius: 5px;
      background-color: $card-darck;
      position: relative;
      margin: 5px 0px;
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        position: absolute;
        right: 5px;
        top: 5px;
        padding: 5px;
        border-radius: 3px;
        background-color: $blue;
        color: $font-light;
        cursor: pointer;
      }

      .teacher {
        width: 98%;
        height: auto;
        border-radius: 5px;
        background-color: $body-darck;
        display: flex;
        align-items: center;

        img {
          width: 90px;
          height: 90px;
          border-radius: 5px;
          margin: 3px;
          cursor: pointer;
        }

        .info {
          width: 70%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          margin: 0px 5px;
          cursor: pointer;

          h3 {
            width: 100%;
            height: auto;
            color: $font-light;
          }

          p {
            padding: 3px;
            border-radius: 3px;
            background-color: $card-darck;
            color: $font-light;
            font-size: $x-small;
            margin: 3px;

            @media (max-width: $phone) {
              font-size: $xx-small;
            }
          }

          .editor {
            @extend p;
            background-color: $green;
          }
        }

        button {
          background-color: $red;
          color: $font-light;
          margin: 0px 5px;
          @media (max-width: $phone) {
            padding: 5px 10px;
            font-size: $xx-small;
          }
        }
      }
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      outline: none;
      color: $font-light;
      background-color: $green;
      cursor: pointer;
      margin: 10px 0px;
    }
  }
}

.update-message-darck-English-open::-webkit-scrollbar {
  width: 0px;
}

.update-message-darck-English-close {
  @extend .update-message-darck-English-open;
  opacity: 0;
  padding: 30% 5px 5px 5px;
}

.update-message-light-English-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  // component header style
  .header {
    width: 100%;
    height: auto;
    border: 1px solid;
    padding: 5px 0px;
    border-color: transparent transparent $border-darck transparent;

    h3 {
      color: $font-darck;
    }
  }

  .form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .cover-cont {
      width: 100%;
      height: auto;
      margin: 20px 0px;

      img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        cursor: pointer;
      }
    }

    // input's labels
    label {
      width: 100%;
      height: auto;
      padding: 5px 0px;
      margin: 10px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      color: $font-darck;
    }

    // input style
    input {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      padding: 0px 10px;
      margin: 10px 0px;
      background-color: $message-light;
    }

    textarea {
      width: 100%;
      height: 100px;
      padding: 5px 5px 5px 10px;
      border: none;
      border-radius: 5px;
      outline: none;
      resize: none;
      margin: 10px 0px;
      background-color: $message-light;
    }

    // gender and Permissions list style
    select {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      margin: 10px 0px;
      background-color: $message-light;
      padding: 0px 10px;
    }

    .teacher-cont {
      width: 100%;
      height: 120px;
      border-radius: 5px;
      background-color: $message-light;
      position: relative;
      margin: 5px 0px;
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        position: absolute;
        right: 5px;
        top: 5px;
        padding: 5px;
        border-radius: 3px;
        background-color: $blue;
        color: $font-light;
        cursor: pointer;
      }

      .teacher {
        width: 98%;
        height: auto;
        border-radius: 5px;
        background-color: $body-light;
        display: flex;
        align-items: center;

        img {
          width: 90px;
          height: 90px;
          border-radius: 5px;
          margin: 3px;
          cursor: pointer;
        }

        .info {
          width: 70%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          margin: 0px 5px;
          cursor: pointer;

          h3 {
            width: 100%;
            height: auto;
            color: $font-darck;
          }

          p {
            padding: 3px;
            border-radius: 3px;
            background-color: $message-light;
            color: $font-darck;
            font-size: $x-small;
            margin: 3px;

            @media (max-width: $phone) {
              font-size: $xx-small;
            }
          }

          .editor {
            @extend p;
            color: $font-light;
            background-color: $green;
          }
        }

        button {
          background-color: $red;
          color: $font-light;
          margin: 0px 5px;
          @media (max-width: $phone) {
            padding: 5px 10px;
            font-size: $xx-small;
          }
        }
      }
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      outline: none;
      color: $font-light;
      background-color: $green;
      cursor: pointer;
      margin: 10px 0px;
    }
  }
}

.update-message-light-English-open::-webkit-scrollbar {
  width: 0px;
}

.update-message-light-English-close {
  @extend .update-message-light-English-open;
  opacity: 0;
  padding: 30% 5px 5px 5px;
}
// darck and light English style

// darck and light Arabic style
.update-message-darck-Arabic-open {
  @extend .update-message-darck-English-open;
  direction: rtl;
}

.update-message-darck-Arabic-open::-webkit-scrollbar {
  width: 0px;
}

.update-message-darck-Arabic-close {
  @extend .update-message-darck-Arabic-open;
  opacity: 0;
  padding: 30% 5px 5px 5px;
}

.update-message-light-Arabic-open {
  @extend .update-message-light-English-open;
  direction: rtl;
}

.update-message-light-Arabic-open::-webkit-scrollbar {
  width: 0px;
}

.update-message-light-Arabic-close {
  @extend .update-message-light-Arabic-open;
  opacity: 0;
  padding: 30% 5px 5px 5px;
}
// darck and light Arabic style
</style>
