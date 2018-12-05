<template>
  <div class="todo">
    <div id="nav">
      <template v-for="(route, index) in this.$router.options.routes[1].children">
        <router-link class="route" :key="index" :to="route.path">
          <i :class="`iconfont ${route.meta.icon} icon`"></i>
        </router-link>
      </template>
    </div>
    <div class="view">
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
        >
        <router-view />
      </transition>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import '../common/main.less';
.todo {
  #nav {
    position: fixed;
    bottom: 0;
    height: 8vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: @mainColor;
    .route {
      flex: auto;
      height: 8vh;
      line-height: 8vh;
      color: rgb(113, 114, 114);
      .icon {
        font-size: 2rem;
      }
    }
    .active {
      background-color: @activeColor;
      color: rgb(211, 204, 204);
    }
  }
  .view {
    margin-bottom: 8vh;
  }
}
</style>
