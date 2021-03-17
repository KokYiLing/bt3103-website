<template>
<div>
    <p>Menu:</p>

    <ul v-for="item in itemsSelected" :key="item.id">

    {{item[0]}} x {{item[1]}}
    </ul>
    <button v-on:click="findTotal();sendOrder();">Calculate Total</button>
    <p v-show="displayPrice">Subtotal: ${{this.subTotal}}</p>
    <p v-show="displayPrice">Grand Total: ${{this.grandTotal}}</p>
</div>
</template>

<script>
import database from '../firebase.js'

export default {
    data() {
        return {
            subTotal:0,
            grandTotal:0,
            displayPrice:false,
            item:{},
            order1:{},
        }
    },
    props: {
        itemsSelected: {
            type: Array
        },
        items: {
            type: Array
        }
    },
    methods: {
        test:function() {
          database.collection('menu').add(this.item)
          alert(this.item.name + "saved");
        },
        findTotal: function() {
            var tot = 0;
            for (var i = 0; i < this.itemsSelected.length;i++) {
                var item = this.itemsSelected[i];
                var quantity = item[1];
                var price = item[2];
                tot += quantity*price;
            }
            this.subTotal = tot;
            this.displayPrice = true;
        },
        sendOrder: function() {
            alert("Order sent");
            for (var i=0;i<this.itemsSelected.length;i++){
                var currItem=this.itemsSelected[i]; 
                this.order1[currItem[0]]=currItem[1];
            }

            database.collection("orders").add(this.order1).then(()=>location.reload());
        },
    },
    watch: {
        subTotal: function() {
            this.grandTotal = this.subTotal*1.07.toFixed(2);
        },
        itemsSelected:function() {
            this.displayPrice = false;
        }
    }
}
</script>

<style>

</style>