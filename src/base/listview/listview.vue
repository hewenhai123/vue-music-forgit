<template>
  <list-scroll class="listview" :data="data" ref="listview">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar" alt />
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="ontouchstart" @touchmove.stop.prevent="ontouchmove">
      <ul>
        <li v-for="(item,index) in sortcutList" class="item" :data-index="index">{{item}}</li>
      </ul>
    </div>
  </list-scroll>
</template>
<script>
import ListScroll from "base/scroll/scroll";
import { attr } from "common/js/dom";

const ANCHOR_HEIGHT = 18;
export default {
  created() {
    this.thouchObj = {};
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      touch: {}
    };
  },
  computed: {
    sortcutList() {
      //map 返回新数组，结果是数组每一项回掉函数处理的结果
      return this.data.map(group => {
        return group.title.substr(0, 1);
      });
    }
  },
  methods: {
    ontouchstart(e) {
      let anchor_index = attr(e.target, "data-index");
      let firstTouch = e.touches[0];
      this.thouchObj["y1"] = firstTouch.pageY;
      this.thouchObj.anchorIndex = anchor_index;
      // this.$refs.listview.scrollToElement(this.$refs.listGroup[anchor_index],0)
      this.scrollTo(anchor_index);
    },
    ontouchmove(e) {
      let firstTouch = e.touches[0];
      this.thouchObj.y2 = firstTouch.pageY;
      let delta = ((this.thouchObj.y2 - this.thouchObj.y1) / ANCHOR_HEIGHT) | 0;
      let anchor_index=(this.thouchObj.anchorIndex*1)+delta
      this.scrollTo(anchor_index);
    },
    scrollTo(index) {
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 10);
    }
  },
  components: {
    ListScroll
  }
};
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable';

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list-group {
    padding-bottom: 30px;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme;
      }
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>