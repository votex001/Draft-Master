<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    width="200"
    height="200"
    style="shape-rendering: auto; display: block"
    class="loading"
  >
    <g data-idx="1">
      <g transform="matrix(1,0,0,1,0,0)" data-idx="2">
        <rect
          fill="#f47721"
          height="12"
          width="6"
          ry="6"
          rx="3"
          y="24"
          x="47"
          data-idx="3"
          opacity="0.773333"
        ></rect>
      </g>
      <g
        transform="matrix(0.8660254037844387,0.49999999999999994,-0.49999999999999994,0.8660254037844387,31.698729810778058,-18.30127018922194)"
        data-idx="5"
      >
        <rect
          fill="#f47721"
          height="12"
          width="6"
          ry="6"
          rx="3"
          y="24"
          x="47"
          data-idx="6"
          opacity="0.856666"
        ></rect>
      </g>
      <g
        transform="matrix(0.5000000000000001,0.8660254037844386,-0.8660254037844386,0.5000000000000001,68.30127018922192,-18.30127018922194)"
        data-idx="8"
      >
        <rect
          fill="#f47721"
          height="12"
          width="6"
          ry="6"
          rx="3"
          y="24"
          x="47"
          data-idx="9"
          opacity="0.939999"
        ></rect>
      </g>
      <g
        transform="matrix(6.123233995736766e-17,1,-1,6.123233995736766e-17,100,0)"
        data-idx="11"
      >
        <rect
          fill="#f47721"
          height="12"
          width="6"
          ry="6"
          rx="3"
          y="24"
          x="47"
          data-idx="12"
          opacity="0.023333"
        ></rect>
      </g>
      <g
        transform="matrix(-0.4999999999999998,0.8660254037844387,-0.8660254037844387,-0.4999999999999998,118.30127018922192,31.69872981077805)"
        data-idx="14"
      >
        <rect
          fill="#f47721"
          height="12"
          width="6"
          ry="6"
          rx="3"
          y="24"
          x="47"
          data-idx="15"
          opacity="0.106666"
        ></rect>
      </g>
      <g
        transform="matrix(-0.8660254037844387,0.49999999999999994,-0.49999999999999994,-0.8660254037844387,118.30127018922194,68.30127018922194)"
        data-idx="17"
      >
        <rect
          fill="#f47721"
          height="12"
          width="6"
          ry="6"
          rx="3"
          y="24"
          x="47"
          data-idx="18"
          opacity="0.189999"
        ></rect>
      </g>
      <g
        transform="matrix(-1,1.2246467991473532e-16,-1.2246467991473532e-16,-1,100,100)"
        data-idx="20"
      >
        <rect
          fill="#f47721"
          height="12"
          width="6"
          ry="6"
          rx="3"
          y="24"
          x="47"
          data-idx="21"
          opacity="0.273333"
        ></rect>
      </g>
      <g
        transform="matrix(-0.8660254037844386,-0.5000000000000001,0.5000000000000001,-0.8660254037844386,68.30127018922192,118.30127018922194)"
        data-idx="23"
      >
        <rect
          fill="#f47721"
          height="12"
          width="6"
          ry="6"
          rx="3"
          y="24"
          x="47"
          data-idx="24"
          opacity="0.356666"
        ></rect>
      </g>
      <g
        transform="matrix(-0.5000000000000004,-0.8660254037844385,0.8660254037844385,-0.5000000000000004,31.698729810778097,118.30127018922195)"
        data-idx="26"
      >
        <rect
          fill="#f47721"
          height="12"
          width="6"
          ry="6"
          rx="3"
          y="24"
          x="47"
          data-idx="27"
          opacity="0.439999"
        ></rect>
      </g>
      <g
        transform="matrix(-1.8369701987210297e-16,-1,1,-1.8369701987210297e-16,7.105427357601002e-15,100)"
        data-idx="29"
      >
        <rect
          fill="#f47721"
          height="12"
          width="6"
          ry="6"
          rx="3"
          y="24"
          x="47"
          data-idx="30"
          opacity="0.523333"
        ></rect>
      </g>
      <g
        transform="matrix(0.5000000000000001,-0.8660254037844386,0.8660254037844386,0.5000000000000001,-18.30127018922194,68.30127018922192)"
        data-idx="32"
      >
        <rect
          fill="#f47721"
          height="12"
          width="6"
          ry="6"
          rx="3"
          y="24"
          x="47"
          data-idx="33"
          opacity="0.606666"
        ></rect>
      </g>
      <g
        transform="matrix(0.8660254037844384,-0.5000000000000004,0.5000000000000004,0.8660254037844384,-18.30127018922194,31.698729810778104)"
        data-idx="35"
      >
        <rect
          fill="#f47721"
          height="12"
          width="6"
          ry="6"
          rx="3"
          y="24"
          x="47"
          data-idx="36"
          opacity="0.689999"
        ></rect>
      </g>
      <g data-idx="38"></g>
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  setup() {
    onMounted(() => {
      const group = document.querySelector('[data-idx="1"]');
      if (!group) return;

      const rects = group.querySelectorAll("rect");
      const total = rects.length;
      let frame = 0;

      setInterval(() => {
        rects.forEach((rect, i) => {
          const phase = (i - frame + total) % total;
          const opacity = (phase / total).toFixed(2);
          rect.setAttribute("opacity", opacity);
        });
        frame = (frame + 1) % total;
      }, 100); // 100 мс между кадрами (~10 FPS)
    });
  },
});
</script>

<style scoped lang="scss"></style>
