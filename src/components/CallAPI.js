import { Line } from "vue-chartjs";
import axios from "axios";

export default {
  extends: Line,
  data: function() {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            data: [],
            fill: false,
            label: "West",
            borderColor: "#FA0D02",
          },
          {
            data: [],
            fill: false,
            label: "National",
            borderColor: "#0E90CB",
          },
          {
            data: [],
            fill: false,
            label: "East",
            borderColor: "#576299",
          },
          {
            data: [],
            fill: false,
            label: "Central",
            borderColor: "#109DC6",
          },
          {
            data: [],
            fill: false,
            label: "South",
            borderColor: "#A6879D",
          },
          {
            data: [],
            fill: false,
            label: "North",
            borderColor: "#9BF3AF",
          },
        ],
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: "PSI Twenty Four Hourly (By Region)",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    fetchItems: function() {
      axios
        .get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then((response) => {
          response.data["items"].forEach((data) => {
            this.datacollection.labels.push(data["timestamp"]);
            var values = data["readings"]["psi_twenty_four_hourly"];
            this.datacollection.datasets[0].data.push(values["west"]);
            this.datacollection.datasets[1].data.push(values["national"]);
            this.datacollection.datasets[2].data.push(values["east"]);
            this.datacollection.datasets[3].data.push(values["central"]);
            this.datacollection.datasets[4].data.push(values["south"]);
            this.datacollection.datasets[5].data.push(values["north"]);
          });
          this.renderChart(this.datacollection, this.options);
        });
    },
  },
  created() {
    this.fetchItems();
  },
};