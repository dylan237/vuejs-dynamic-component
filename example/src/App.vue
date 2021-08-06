<template>
  <div id="app">
    <div class="fix">
      <button @click="showPopup">popup</button>
    </div>
  </div>
</template>

<script>
import PopupContent from "@/components/PopupContent";

export default {
  name: "App",
  data() {
    return {
      popupData: { 
        title: "title text", 
        content: "content text",
        confirmText: 'confirm',
        cancelText: 'cancel'
      },
    };
  },
  methods: {
    showPopup() {
      this.$popup({
        attrs: this.popupData,
        slot: PopupContent,
        callbacks: {
          'on-confirm': ({ unmount, data }) => {
            console.log('on-confirm---', data)
            unmount()
          },
          'on-cancel': ({ unmount }) => {
            unmount()
          },
          'on-slot-event': ({ unmount, data }) => {
            console.log('slot event----', data)
            unmount()
          }
        }
      })
    },
  },
};
</script>

<style>
.fix {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
