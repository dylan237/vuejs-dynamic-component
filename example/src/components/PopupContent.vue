<template>
  <div>
    <hr />
    <p @click="$emit('on-slot-event', slotData)">slot</p>
    <hr />
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: 'slotData'
    }
  },
  computed: {
    slotData() {
      return {
        slotData: this.text,
        attr: this.$attrs
      }
    }
  }
};
</script>

<style scoped>
div {
  color: rgb(82, 92, 82);
}
</style>