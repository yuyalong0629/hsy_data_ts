<template>
  <ul class="ch-grid">
    <li>
      <div class="ch-item ch-img-1">
        <div class="ch-info">
          <h3>Use what you have</h3>
          <p>
            by Angela Duncan
            <a href="http://drbl.in/eOPF">View on Dribbble</a>
          </p>
        </div>
      </div>
    </li>
    <li>
      <div class="ch-item ch-img-2">
        <div class="ch-info">
          <h3>Common Causes of Stains</h3>
          <p>
            by Antonio F. Mondragon
            <a href="http://drbl.in/eKMi">View on Dribbble</a>
          </p>
        </div>
      </div>
    </li>
    <li>
      <div class="ch-item ch-img-3">
        <div class="ch-info">
          <h3>Pink Lightning</h3>
          <p>
            by Charlie Wagers
            <a href="http://drbl.in/ekhp">View on Dribbble</a>
          </p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Hover extends Vue {}
</script>

<style lang="less" scoped>
.ch-grid {
  margin: 20px 0 0 0;
  padding: 0;
  list-style: none;
  display: block;
  text-align: center;
  width: 100%;
  li {
    width: 220px;
    height: 220px;
    display: inline-block;
    margin: 20px;
    .ch-item {
      width: 100%;
      height: 100%;
      // border-radius: 50%;
      position: relative;
      cursor: default;
      box-shadow: inset 0 0 0 0 rgba(200, 95, 66, 0.4),
        inset 0 0 0 16px rgba(255, 255, 255, 0.6), 0 1px 2px rgba(0, 0, 0, 0.1);
      transition: all 0.4s ease-in-out;
      .ch-info {
        position: absolute;
        width: 100%;
        height: 100%;
        // border-radius: 50%;
        overflow: hidden;
        opacity: 0;
        transition: all 0.4s ease-in-out;
        transform: scale(0);
        backface-visibility: hidden;
        h3 {
          color: #fff;
          text-transform: uppercase;
          position: relative;
          letter-spacing: 2px;
          font-size: 22px;
          margin: 0 30px;
          padding: 65px 0 0 0;
          height: 110px;
          font-family: 'Open Sans', Arial, sans-serif;
          text-shadow: 0 0 1px #fff, 0 1px 2px rgba(0, 0, 0, 0.3);
        }
        p {
          color: #fff;
          padding: 10px 5px;
          font-style: italic;
          margin: 0 30px;
          font-size: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.5);
          a {
            display: block;
            color: rgba(255, 255, 255, 0.7);
            font-style: normal;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 9px;
            letter-spacing: 1px;
            padding-top: 4px;
            font-family: 'Open Sans', Arial, sans-serif;
            &:hover {
              color: rgba(255, 242, 34, 0.8);
            }
          }
        }
      }
      &:hover {
        box-shadow: inset 0 0 0 110px rgba(200, 95, 66, 0.4),
          inset 0 0 0 16px rgba(255, 255, 255, 0.8),
          0 1px 2px rgba(0, 0, 0, 0.1);
      }
      &:hover .ch-info {
        opacity: 1;
        transform: scale(1);
      }
    }
    .ch-img-1 {
      background-image: url(https://tympanus.net/Tutorials/CircleHoverEffects/images/4.jpg);
    }

    .ch-img-2 {
      background-image: url(https://tympanus.net/Tutorials/CircleHoverEffects/images/5.jpg);
    }

    .ch-img-3 {
      background-image: url(https://tympanus.net/Tutorials/CircleHoverEffects/images/6.jpg);
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
