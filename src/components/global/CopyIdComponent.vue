<template>
  <p
    v-if="this.Id_data"
    :class="`copy-id-${this.$store.state.mood}-${this.$store.state.language}`"
    id="copyId"
    ref="ObjectId"
    @click="copyId"
  >
    {{
      this.$store.state.language == "English"
        ? this.$store.state.English.copy_id
        : this.$store.state.Arabic.copy_id
    }}
    <icon icon="copy" />
    #{{ this.Id_data.object_type }}/{{ this.Id_data.id }}
  </p>
</template>

<script>
export default {
  name: "copy-component",
  props: {
    Id_data: Object, // you should pass a id and object type to use it here ( #ObjectType: ) to use it in super search
  },
  methods: {
    // copy the id to clipboard
    async copyId() {
      // access to the element

      try {
        await navigator.clipboard.writeText(
          `#${this.Id_data.object_type}/${this.Id_data.id}`
        );
      } catch (error) {
        // to oprn the error form
        this.$store.state.error_form_status = "open";

        // to set the error message to error message in store
        this.$store.state.error_message = {
          english: error,
          arabic: "... خطأ اثناء النسخ",
        };
      }

      // to start the open and cose message
      this.OpenAndCloseCopyMessage();
    },

    // copen and close the copy message
    OpenAndCloseCopyMessage() {
      // to open the coped message
      this.$store.state.copy_message_status = "open";

      // to close the message after 2s
      setTimeout(() => {
        // to open the coped message
        this.$store.state.copy_message_status = "close";
      }, 2000);
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// Darck mood
.copy-id-darck-English {
  padding: 4px;
  margin: 10px 5%;
  color: $font-light;
  cursor: pointer;
  transition-duration: 0.5s;
  font-size: $x-small;
  border-radius: 5px;
  background-color: $card-darck;
  @media (min-width: $tablet) {
    max-width: 70%;
  }
}

.copy-id-darck-English:hover {
  color: $blue;
}

.copy-id-darck-Arabic {
  @extend .copy-id-darck-English;
  color: $font-light;
  padding: 3px;
  border-radius: 5px;
}

.copy-id-darck-Arabic:hover {
  color: $blue;
}
// Darck mood

// Light mood
.copy-id-light-English {
  @extend .copy-id-darck-English;
  color: $font-darck;
  background-color: $card-light;
}

.copy-id-light-English:hover {
  color: $blue;
}

.copy-id-light-Arabic {
  @extend .copy-id-darck-English;
  color: $font-darck;
  background-color: $card-light;
}

.copy-id-light-Arabic:hover {
  color: $blue;
}
// Lght mood
</style>
