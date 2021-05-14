<template>
  <div>
    <hr />
    <p @click="$emit('slot-event', $attrs)">slot</p>
    props from popup：
    <br />
    {{ $attrs }}
    <hr />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
div {
  color: rgb(82, 92, 82);
}
</style>