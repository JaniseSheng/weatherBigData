<template>
  <svg class='ui-icon' style='vertical-align: middle; max-height: 100%' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" :width="size" :height="size" :viewBox="'0 0 ' + viewbox + ' ' + viewbox">
    <use :fill="color" :xlink:href="'#' + icon"></use>
  </svg>
</template>
<script>
export default {
  props: {
    size: {
      default: '32'
    },
    viewbox: {
      default: '1024'
    },
    color: {
      default : 'currentColor'
    },
    icon: {
      default: '',
      type: String
    }
  }
}
</script>
