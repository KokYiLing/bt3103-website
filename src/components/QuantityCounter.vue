<template>
<div class="style=display: flex;">
    <button id = "button1" v-on:click="increment()">+</button
    ><p id = "counter" style="display:inline-block;">{{counter}}</p>
    <button id = "button2" v-on:click="decrement()">-</button>
</div>
</template>


<script>
export default {
    name:'QuantityCounter',
    data() {
        return{
        counter:0,
        }
    },
    props: {
        item: {
            type: Object
        },
    },
    methods: {
        increment:function(){
              if (this.counter <= 9) {
              this.counter++
              } else {
                  alert("You cannot buy more than 10 items")
              }
            this.$emit('counter', this.item, this.counter)
        },
        decrement:function() {
             if (this.counter>=1) {
            this.counter--
             }
            this.$emit('counter', this.item, this.counter)
        }
    }
}
</script>

<style>
 #button1{
   color:white;
   background-color: darkcyan;
   border: 3px solid darkblue;
   margin: 10px;
 }
 #button2{
     color: white;
     background-color: tomato;
     border: 3px solid red;
     margin: 10px;

 }
</style>