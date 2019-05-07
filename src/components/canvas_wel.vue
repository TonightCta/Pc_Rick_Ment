<template lang="html">
  <div class="canvas_wel">
    <b></b>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.canvas_wel{
  display: grid;
  place-content: center;
  height: 1500px;
  width: 100%;
  top:110px;
  background: black;
  position: absolute;
  top:0;
  overflow: hidden;
  /* filter: blur(5px); */
}
b, b:before, b:after {
  display: block;
  border-radius: 50%;
}
b {
  width: 50vmin;
  height: 51vmin;
  position: absolute;
  top:30px;
  left:50%;
  margin-left:-25vmin;
  box-shadow: 1vmin 0 3vmin 2vmin #f50,
       inset -1vmin 0 3vmin 4vmin #f80,
             -4vmin 0 35vmin 0 #f60;
  animation: bh 5s linear infinite;
}
@keyframes bh {
  0% {transform: rotate(0deg)}
  100% {transform: rotate(-360deg)}
}
b:before, b:after {
  content: "";
  background: white;
  position: relative;
  top: 6vmin;
}
b:before {
  width: 3vmin;
  height: 3vmin;
  left: 40vmin;
  box-shadow: yellow 0 0 2vmin 2vmin,
              yellow 2vmin 4vmin 2vmin 0.5vmin;
}
b:after {
  width: 38vmin;
  height: 38vmin;
  opacity: 0.03;
  left: -14vmin;
}
</style>
