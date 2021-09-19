<template>
  <div v-if="Object.keys(goods).length > 0">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span>{{goods.newPrice}}</span>
      <span>{{goods.oldPrice}}</span>
      <span>{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span v-for="index in goods.services.length-1" :key="index">
        <img v-if="goods.services[index] !== undefined" :src="goods.services[index].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
      
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style>
.info-title {
  font-weight: 700;
  text-indent: 10%;
  padding: 10px 10px;
}

.info-price span{
  margin-left: 10px;
}

.info-price span:nth-child(1) {
  color: #f00;
  font-size: 20px;
}

.info-price span:nth-child(2) {
  font-size: 12px;
  text-decoration: line-through;
}

.info-price span:nth-child(3) {
  color: white;
  background-color: var(--color-high-text);
  border-radius: 8px;
  padding: 3px 10px;
}

.info-other {
  padding: 10px 0;
  display: flex;
  color: #ccc;
  font-size: 12px;
  border-bottom: 1px solid rgba(100,100,100,.1);
}

.info-other span {
  flex: 1;
  margin-left: 10px;
}

.info-service {
  font-size: 12px;
  display: flex;
  padding: 10px 0;
  font-weight: 600;
}

.info-service img {
  width: 14px;
  height: 14px;
  margin-left: 10px;
  vertical-align: middle;
}

.info-service span {
  flex: 1;
}

.info-service span span {
  vertical-align: middle;
  /* margin-left: 10px; */
}
</style>