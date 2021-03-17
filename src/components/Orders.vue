<template>
  <div>
    {{orders}}
<ul>
    <li v-for="order in orders" :key="order.name">
    <div v-for="(value, name) in order[0]" :key="value.name">
    {{ name }}: {{ value }}
    </div> 
      <button v-bind:id="order[1]"  v-on:click="deleteItem($event)">Delete</button>
      <button v-on:click="route(order[1])">Modify</button>
    </li>
  </ul>

  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      orders: [],
      newList:[],
      id:"",
    };
  },
  methods: {
    fetchItems: function () {
      database
        .collection("orders")
        .get()
        .then((querySnapShot) => {
          let item= {};
          querySnapShot.forEach((doc) => {
            item = doc.data();
            
            this.newList.push(item);
            this.newList.push(doc.id);
            this.orders.push(this.newList);
            this.newList=[];
          });
        });
    },
    deleteItem:function(event) {
        let doc_id = event.target.getAttribute("id");
        this.newList = this.newList.filter(thisitem => thisitem[1] !== doc_id);
        database.collection('orders').doc(doc_id).delete().then(()=>location.reload());
    },
    route:function(id){
      this.$router.push({name:'modify',params:{docId:id}});
    }
  },
  created() {
      this.fetchItems()
  }
};
</script>

<style>
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

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>