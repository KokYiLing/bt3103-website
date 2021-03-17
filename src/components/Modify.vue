<template>
  <div>
    <ul v-for="(item, index) in dataPacket" :key="item.id">
      <li>
        {{ item[0] }}:{{ item[1] }}
        <br />
        <input
          v-bind:id="index"
          placeholder=0
          type="number"
          min=0
          v-model="newOrder[item[0]]"
        />
      </li>
    </ul>
    <button v-on:click="updateOrder()">Update Order</button>
    {{newOrder}}
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      dataPacket: [],
      newOrder: {},
      menu:["Sambal KangKung","Cereal Prawn","Dry Beef Hor Fun","Prawn omelette","Pork Fried Rice","Mapo Tofu"],
    };
  },
  methods: {
    fetchItems: function () {
      database
        .collection("orders")
        .doc(this.$route.params.docId)
        .get()
        .then((querySnapShot) => {
          Object.keys(querySnapShot.data()).forEach((name) =>
            this.dataPacket.push([name, querySnapShot.data()[name]])
          );
        });
    },
    addNewItems:function() {
      //var x = this.dataPacket.length;
      for (var i=0;i<6;i++) {
          var currItem = this.menu[i];
          var absent = true;
          console.log("check length: " + this.dataPacket.length);
          for (var j=0;j<this.dataPacket.length;j++) {
            if (currItem==this.dataPacket[j][0]) {
              absent = false;
            }
          }
          if (absent) {
            this.dataPacket.push([currItem,0]);
          }
        }
    },
    updateOrder: function() {
      var numberOrder = {};
      for (var key in this.newOrder) {
        numberOrder[key] = parseInt(this.newOrder[key]);

      }
      database.collection("orders").doc(this.$route.params.docId)
      .update(numberOrder).then(()=>this.$router.push({path:'/orders'}));
    }
  },
  created() {
    this.fetchItems();
  },
  updated() {
    this.addNewItems();
  }
};
</script>

<style scoped>

</style>