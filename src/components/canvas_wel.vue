<template lang="html">
  <div class="">
    <div class="scene">
      <div class="lava-lamp" style="--height: 400; --width: 150;">
        <div class="lava-lamp__main">
          <div class="lava-lamp__glass">
              <div class="lava-lamp__lava">
                <svg>
                  <ellipse class="blob blob--top" cx="35" cy="0" rx="35" ry="10"></ellipse>
                  <ellipse class="blob blob--bottom" cx="75" cy="270" rx="75" ry="10"></ellipse>
                  <circle class="blob" r="47.5" cx="88" cy="400" style="--skewX: 4; --skewY: -5; --height: 95; --speed: 41; --delay: -1; --direction: alternate-reverse;"></circle>
                  <circle class="blob" r="16" cx="86" cy="400" style="--skewX: 0; --skewY: 0; --height: 32; --speed: 19; --delay: -7; --direction: alternate-reverse;"></circle>
                  <circle class="blob" r="20.5" cx="92" cy="400" style="--skewX: 5; --skewY: -5; --height: 41; --speed: 26; --delay: -7; --direction: alternate-reverse;"></circle>
                </svg>
              </div>
              <div class="lava-lamp__lava">
                <svg>
                  <ellipse class="blob blob--top" cx="35" cy="0" rx="35" ry="10"></ellipse>
                  <ellipse class="blob blob--bottom" cx="75" cy="270" rx="75" ry="10"></ellipse>
                  <circle class="blob" r="33.5" cx="84" cy="400" style="--skewX: -3; --skewY: -3; --height: 67; --speed: 13; --delay: -5; --direction: alternate-reverse;"></circle>
                  <circle class="blob" r="41.5" cx="7" cy="400" style="--skewX: -5; --skewY: -2; --height: 83; --speed: 11; --delay: -6; --direction: alternate-reverse;"></circle>
                  <circle class="blob" r="22" cx="16" cy="400" style="--skewX: -5; --skewY: 4; --height: 44; --speed: 32; --delay: -9; --direction: alternate;"></circle>
                  <circle class="blob" r="35" cx="3" cy="400" style="--skewX: -5; --skewY: 5; --height: 70; --speed: 43; --delay: -3; --direction: alternate-reverse;"></circle>
                </svg>
              </div>
              <div class="lava-lamp__lava">
                <svg>
                  <ellipse class="blob blob--top" cx="35" cy="0" rx="35" ry="10"></ellipse>
                  <ellipse class="blob blob--bottom" cx="75" cy="270" rx="75" ry="10"></ellipse>
                  <circle class="blob" r="50" cx="131" cy="400" style="--skewX: -3; --skewY: 1; --height: 100; --speed: 43; --delay: -7; --direction: alternate;"></circle>
                  <circle class="blob" r="31" cx="126" cy="400" style="--skewX: -1; --skewY: 1; --height: 62; --speed: 38; --delay: -8; --direction: alternate;"></circle>
                </svg>
              </div>
              <div class="lava-lamp__lava">
                <svg>
                  <ellipse class="blob blob--top" cx="35" cy="0" rx="35" ry="10"></ellipse>
                  <ellipse class="blob blob--bottom" cx="75" cy="270" rx="75" ry="10"></ellipse>
                  <circle class="blob" r="30" cx="84" cy="400" style="--skewX: 4; --skewY: -1; --height: 60; --speed: 33; --delay: -8; --direction: alternate;"></circle>
                </svg>
              </div>
          </div>
        </div>
        <div class="lava-lamp__base"></div>
      </div>
      <svg style="position: absolute; left: 100%;">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="BLUR"></feGaussianBlur>
            <feColorMatrix in="BLUR" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="GOO"></feColorMatrix>
            <feBlend in="SourceGraphic" in2="goo"></feBlend>
          </filter>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
* {
  box-sizing: border-box;
}
.scene {
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  height: 500px;
  overflow-x: hidden;
  z-index: 888;
}
img {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-69.5%, -26%);
          transform: translate(-69.5%, -26%);
  opacity: 0.2;
  /* height: 1300px; */
}
.lava-lamp {
  height: calc(var(--height) * 1px);
  width: calc(var(--width) * 1px);
  position: relative;
}
.lava-lamp:after {
  content: '';
  height: 500px;
  width: 500px;
  position: absolute;
  background: radial-gradient(circle at 50% 50%, #eb7a1d, transparent 60%);
  top: 45%;
  left: 50%;
  z-index: 4;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-filter: blur(10px);
          filter: blur(10px);
  opacity: 0.5;
}
.lava-lamp:before {
  content: '';
  height: 25%;
  width: 300%;
  border-radius: 100%;
  background: radial-gradient(ellipse at 50% 50%, #eb7a1d, transparent 60%);
  position: absolute;
  top: 85%;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
          transform: translate(-50%, 0);
  opacity: 0.5;
  -webkit-filter: blur(10px);
          filter: blur(10px);
}
.lava-lamp__main {
  border-radius: 50% 50% 50% 50%/60% 60% 40% 40%;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  z-index: 2;
}
.lava-lamp__main:after,
.lava-lamp__main:before {
  background: #000;
  content: '';
  height: 12%;
  left: 0;
  position: absolute;
  width: 100%;
}
.lava-lamp__main:after {
  top: 0;
}
.lava-lamp__main:before {
  bottom: 0;
  height: 26%;
}
.lava-lamp__glass {
  background: radial-gradient(circle at 50% 50%, #ff5858 25%, #ffc697);
  border-radius: 50%/10%;
  overflow: hidden;
  height: 70%;
  left: 0;
  position: absolute;
  top: 10%;
  width: 100%;
  z-index: 2;
}
.lava-lamp__base {
  height: 20%;
  width: 100%;
  position: absolute;
  bottom: 0;
  overflow: hidden;
  border-radius: 0 0 50% 50%/0 0 35% 35%;
}
.lava-lamp__base:before {
  content: '';
  background: #000;
  border-radius: 50% 50% 50% 50%/60% 60% 40% 40%;
  position: absolute;
  top: -60%;
  height: calc(var(--height) * 1px);
  width: calc(var(--width) * 1px);
}
.lava-lamp__lava {
  border-radius: 50%/10%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  width: 100%;
  -webkit-filter: url("#goo");
          filter: url("#goo");
}
.lava-lamp__lava svg {
  height: 280px;
  width: 150px;
}
.blob {
  -webkit-animation-delay: calc(var(--delay) * 1s);
          animation-delay: calc(var(--delay) * 1s);
  -webkit-animation-direction: var(--direction);
          animation-direction: var(--direction);
  -webkit-animation-duration: calc(var(--speed) * 1s);
          animation-duration: calc(var(--speed) * 1s);
  -webkit-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
  -webkit-animation-name: blob;
          animation-name: blob;
  -webkit-animation-timing-function: linear;
          animation-timing-function: linear;
  fill: #e36600;
  transform-box: fill-box;
}
.blob--bottom,
.blob--top {
  -webkit-animation: none;
          animation: none;
}
.blob--top {
  -webkit-animation: sway 20s infinite linear;
          animation: sway 20s infinite linear;
}
@-webkit-keyframes sway {
  50% {
    -webkit-transform: translate(50%, 0);
            transform: translate(50%, 0);
  }
}
@keyframes sway {
  50% {
    -webkit-transform: translate(50%, 0);
            transform: translate(50%, 0);
  }
}
@-webkit-keyframes blob {
  from {
    -webkit-transform: skew(calc(var(--skewX) * 1deg), calc(var(--skewY) * 1deg)) translate(0, 0);
            transform: skew(calc(var(--skewX) * 1deg), calc(var(--skewY) * 1deg)) translate(0, 0);
  }
  to {
    -webkit-transform: skew(calc(var(--skewX) * 1deg), calc(var(--skewY) * 1deg)) translate(0, calc((400 + (var(--height) * 2)) * -1px));
            transform: skew(calc(var(--skewX) * 1deg), calc(var(--skewY) * 1deg)) translate(0, calc((400 + (var(--height) * 2)) * -1px));
  }
}
@keyframes blob {
  from {
    -webkit-transform: skew(calc(var(--skewX) * 1deg), calc(var(--skewY) * 1deg)) translate(0, 0);
            transform: skew(calc(var(--skewX) * 1deg), calc(var(--skewY) * 1deg)) translate(0, 0);
  }
  to {
    -webkit-transform: skew(calc(var(--skewX) * 1deg), calc(var(--skewY) * 1deg)) translate(0, calc((400 + (var(--height) * 2)) * -1px));
            transform: skew(calc(var(--skewX) * 1deg), calc(var(--skewY) * 1deg)) translate(0, calc((400 + (var(--height) * 2)) * -1px));
  }
}

</style>
