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
      popupData: { title: "title here", content: "content here" },
    };
  },
  methods: {
    showPopup() {
      this.$popup({
        attrs: this.popupData,
        contentSlot: [PopupContent],
      })
      .then(({ confirm, data, unmount }) => {
        if (confirm) {
          console.log("on confirm");
          console.log("data----", data);
        } else {
          console.log("on cancel");
        }
        unmount();
      });
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
