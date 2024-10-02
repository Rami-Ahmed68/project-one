<template>
  <p
    :class="`copy-message-${this.$store.state.mood}-${this.$store.state.copy_message_status}`"
  >
    📌
    {{
      this.$store.state.language == "English"
        ? this.$store.state.copy_message.english
        : this.$store.state.copy_message.arabic
    }}
    📌
  </p>
</template>

<script>
export default {
  name: "copy_message_component1",
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";
// darck copy message
.copy-message-darck-close {
  width: 120px;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  font-size: $x-small;
  color: $font-light;
  backdrop-filter: blur(50px);
  display: flex;
  justify-content: start;
  position: fixed;
  top: 80px;
  right: -40%;
  z-index: 60;
  box-shadow: 0 0 5px $black;
  transition-duration: 0.5s;
}

.copy-message-darck-open {
  @extend .copy-message-darck-close;
  right: 0%;
  transition-duration: 0.5s;
}
// darck copy message

// light copy message
.copy-message-light-close {
  width: 150px;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  font-size: $x-small;
  color: $font-darck;
  backdrop-filter: blur(50px);
  display: flex;
  justify-content: start;
  position: fixed;
  top: 80px;
  right: -40%;
  z-index: 60;
  box-shadow: 0 0 5px $black;
  transition-duration: 0.5s;
}

.copy-message-light-open {
  @extend .copy-message-light-close;
  right: 0%;
  transition-duration: 0.5s;
}
// light copy message
</style>
