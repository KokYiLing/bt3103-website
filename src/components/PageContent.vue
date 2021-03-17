<template>
<div id = "itemsList">
  <ul>
    <li v-for="item in items" :key="item.name">
      <div id="itemName">{{item.name}}</div>
      <div v-html="display(item.imageURL)"></div>
      <div id = "price">${{item.price}}</div>
      <QuantityCounter  v-bind:item="item" v-on:counter="onCounter"></QuantityCounter>
      </li>
  </ul>
  <Basket id="shoppingBasket" v-bind:items="items" v-bind:itemsSelected="itemsSelected"></Basket>
</div>    
</template>

<script>
import QuantityCounter from "./QuantityCounter.vue"
import Basket from "./Basket.vue"
import database from '../firebase.js'


export default {
  data() {
    return{
      items:[],
      itemsSelected:[],
    }
    },
    components: {
      QuantityCounter,
      Basket
    },
    methods: {
        display: function(url) {
          return `<img src=` + url + `></img>`
        },
        onCounter: function (item, count) {
          var flag = false;
      if (this.itemsSelected.length === 0 && count > 0) {
        //If there is nothing in items selected, push the ORDER in
        this.itemsSelected.push([item.name, count, item.price]);
      } else {
        // Loop through everything to check what is not in the basket
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i]; // {prawn omelette,1,5}
          const item_name = curr_item[0];  //prawn omelette        

          if (item_name==item.name&&count>0) {
            this.itemsSelected.splice(i,1);
            this.itemsSelected.push([item.name,count,item.price])
            flag = true;
            break;
          }
          // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
          else if (item_name==item.name&&count==0){
            flag = true;
            this.itemsSelected.splice(i,1);
            break;
          }
        }
          // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
          if (flag == false) {
            this.itemsSelected.push([item.name,count,item.price])
          }
          // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
        }
      },
      fetchItems:function() {
        database.collection('menu').get().then((querySnapShot)=>{
        querySnapShot.forEach(doc=>{
            this.items.push(doc.data()) 
            })      })
      },
    },
    created(){
      this.fetchItems()    
    }   
}
</script>


<style>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}

#myHeader {
  background-color: burlywood;
  font-size: 20px;
  text-align: center;
}

</style>