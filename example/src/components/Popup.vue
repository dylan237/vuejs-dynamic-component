
<script>
// # template version
// <template>
//   <div class="mask">
//     <div class="popup">
//       <h1>{{ title }}</h1>
//       <slot v-if="$scopedSlots.default()" :child-prop="$attrs">
//         default slot
//       </slot>
//       <p v-else>{{ content }}</p>
//       <button @click="$emit('on-confirm', childData)">confrim</button>
//       <button @click="$emit('on-cancel')">cancel</button>
//     </div>
//   </div>
// </template>
export default {
  data() {
    return {
      childData: "childData",
    };
  },
  props: ["title", "content", "confirmText", "cancelText"],
  methods: {
    onConfirm() {
      this.$emit("on-confirm", this.childData);
    },
    onCancel() {
      this.$emit("on-cancel");
    },
    onUnmount() {
      this.$emit("on-unmount")
    }
  },
  render(h) {
    return h(
      "div", 
      { class: "mask" }, 
      [
        h(
          "div", 
          { class: "popup" }, 
          [
            h("div", {
              class: 'cancel-button',
              on: {
                click: this.onUnmount
              }
            }, 'X'),
            h("h1", this.title),
            this.$scopedSlots.default(this.$attrs) || h("p", this.content),
            h(
              "button",
              {
                on: {
                  click: this.onConfirm
                },
              },
              this.confirmText
            ),
            h(
              "button",
              {
                on: {
                  click: this.onCancel
                },
              },
              this.cancelText
            ),
          ]
        ),
      ]
    );
  },
};
</script>

<style>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:#000000c7;
}
.popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background: #f27777;
  z-index: 9999999;
}
.cancel-button {
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  background-color: #fff;
}
</style>