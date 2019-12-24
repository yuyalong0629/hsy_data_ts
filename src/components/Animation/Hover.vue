<template>
  <ul class="ch-grid">
    <li :style="{ width: setStyle.width, height: setStyle.height }">
      <div class="ch-item ch-img" :style="{ background: setStyle.color }">
        <h3>{{ setStyle.text }}</h3>
        <p>{{ setStyle.num }}</p>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Hover extends Vue {
  @Prop({ default: () => {} }) private setStyle!: object
}
</script>

<style lang="less" scoped>
.ch-grid {
  padding: 0;
  list-style: none;
  display: block;
  text-align: center;
  width: 100%;

  li {
    display: inline-block;
    margin: 10px;

    .ch-item {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      position: relative;
      cursor: default;
      box-shadow: inset 0 0 0 0 rgba(63, 187, 209, 0.4),
        inset 0 0 0 12px rgba(255, 255, 255, 0.6), 0 1px 2px rgba(0, 0, 0, 0.1);
      transition: all 0.4s ease-in-out;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      h3 {
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 16px;
      }

      p {
        color: #fff;
        padding: 5px;
        font-style: italic;
        margin: 0 30px;
        font-size: 18px;
        font-weight: 600;
      }

      &:hover {
        box-shadow: inset 0 0 0 110px rgba(148, 222, 224, 0.4),
          inset 0 0 0 16px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
        opacity: 1;
        transform: scale(1);
      }
    }
  }
  &:after,
  &:before {
    content: '';
    display: table;
  }

  &:after {
    clear: both;
  }
}
</style>
