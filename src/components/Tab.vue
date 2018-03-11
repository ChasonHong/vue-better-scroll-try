<template>
  <div>
    <div class="tab-content">
      <span class="tab-item" @click="toggleTab('A')">A</span>
      <span class="tab-item" @click="toggleTab('B')">B</span>
    </div>
    <div class="postion-box">
      <div v-if="type=='A'" style="height: 100%">
        <Scroller 
         class="wrapper"
         ref="scrollerA"
         :scrollbar="scrollbarObj"
         :pullDownRefresh="pullDownRefreshObj"
         :pullUpLoad="pullUpLoadObj"
         :startY="parseInt(startY)"
         @pullingDown="onPullingDown"
         @pullingUp="onPullingUp">
          <ul ref="listA" class="list-content" style="min-height: 95vh">
            <li class="list-item" v-for="item in ListA" :key="item.id+ Math.random()">{{item.txt}}</li>
          </ul>
        </Scroller>
      </div>
      <div v-else style="height: 100%">
        <Scroller
          class="wrapper"
          ref="scollerB"
          :scrollbar="scrollbarObj"
          :pullDownRefresh="pullDownRefreshObj"
          :pullUpLoad="pullUpLoadObj"
          @pullingDown="onPullingDownB"
          @pullingUp="onPullingUpB">
          <ul ref="listB" class="list-content" style="min-height: 95vh">
            <li class="list-item" v-for="itemB in ListB" :key="itemB.id"></li>
          </ul>
        </Scroller>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroller from './Bscroll';

export default {
  data() {
    return {
      type: 'A',
      scrollbarObj: false,

      pullDownRefreshObj: {
        threshold: 90,
        stop: 40
      },

      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: '加载更多',
          noMore: '没有更多了'
        }
      },
      startY: 0,
      scrollToX: 0,
      scrollToTime: 700,
      ListA: [],
      ListB: []
    }
  },
  mounted() {

  },
  methods: {
    toggleTab (type) {
      this.type = type;
      if (type == 'A') {
        this.onPullingDown();
        this.$nextTick(() => {
          this.$refs.scrollerA.refresh();
        })
      } else {
        this.onPullingDownB();
        this.$nextTick(() => {
          this.$nextTick(() => {
            this.$refs.scrollerB.refresh();
          })
        })
      }
    },
    
    getData() {
      return new Promise(resolve => {
        setTimeout(() => {
          const arr = [];
          for (let i = 0; i < 20; i++) {
            arr.push({id:i, txt: 'aa'});
          }
          resolve(arr);
        }, 1000);
      })
    },

    onPullingDown () {
      console.log('下拉刷新A');
      this.getData().then(res => {
        this.ListA = res;
        this.$refs.scrollerA.forceUpdate(true);
      })
    },

    onPullingUp() {
      console.log('上拉加载A');
      this.getData().then(res=> {
        this.ListA = this.ListA.concat(res);
         
        this.$refs.scrollerA.forceUpdate(Math.random() > 0.5 ? true : false);
      })
    }
  },
  components: {Scroller}
};
</script>

<style lang="scss">
ul,li {
  list-style: none;
}
html {
  height: 100%;
  overflow: hidden;
  background: #e5e5e5;
}
.position-box {
  position: fixed;
  top: 20px;
  right: 0;
  bottom: 0;
  left: 0;
}
.wrapper {
  height: 100%;
    overflow: hidden;
    position: absolute;
    width: 100%;
}
 .tab-content {
   display: flex;
   position: fixed;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   width: 100%;
   height: 40px;
   line-height: 40px;
   background: #fff;
   border-bottom: 1px solid #c9c9c9;
  .tab-item {
    display: inline-block;
    width: 49%;
    text-align: center;
    transition: all .3s;
    &:active {
      background: #e1e1e1;
    }
  }
 }
 .list-content {
   
    .list-item {
      height: 30px;
      line-height: 30px;
    }
  }
</style>
