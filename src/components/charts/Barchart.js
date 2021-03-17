import {Bar} from 'vue-chartjs'
import database from '../../firebase.js'

export default {
    extends: Bar,
    data: function () {
      return {
          datacollection: {
              labels: ['Cereal Prawn','Dry Beef Hor Fun','Pork Fried Rice','Sambal KangKung','Prawn omelette','Mapo Tofu'],
              datasets: [{
                  label: "Total number of each dish",
                  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#e3fc03"],
                  data: [0,0,0,0,0,0]
                }]
          },
          options: {
              legend: { display: false },
              title: {
                display: true,
                text: 'Quantity of items ordered'
              },
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
          }
      }
    },
    methods: {
      fetchItems: function () {
        database.collection('orders').get().then(querySnapShot => {
        let item= {};
        var data = [0,0,0,0,0,0];
          querySnapShot.forEach(doc => { 
              item = doc.data();
              for (var key in item){
                  var pos = this.datacollection.labels.indexOf(key);
                  var currCount = data[pos];
                  currCount = currCount + item[key];
                  data[pos] = currCount;
              }
          })
          this.datacollection.datasets[0].data = data;
          this.renderChart(this.datacollection, this.options)
        })
      }
    },
    created () {
      this.fetchItems()
    }
  }