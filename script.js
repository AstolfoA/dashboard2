import { fetchApi } from "./app.js";

let magnitudes = [];
let geographicReferences = [];

const rgbaGreenColor = "rgba(255, 99, 132, 0.2)";
const rgbGreenColor = "rgb(255, 00, 00)";

const rgbaRedColor = "rgba(0, 128, 0, 0.2)";
const rgbRedColor = "rgb(0, 128, 0)";



async function renderData() {



    const earthquakes = await fetchApi(
        "https://api.gael.cloud/general/public/sismos"
    );
    console.log(earthquakes);

    magnitudes = earthquakes.map((earthquake) => earthquake.Magnitud);
    geographicReferences = earthquakes.map(
        (earthquake) => earthquake.RefGeografica
    );

    const backgroundColors = magnitudes.map((magnitude) =>
        magnitude > 3 ? rgbaGreenColor : rgbaRedColor
    );
    const borderColors = magnitudes.map((magnitude) =>
        magnitude > 3 ? rgbGreenColor : rgbRedColor
    );
    console.log(backgroundColors);
    console.log(borderColors);

    console.log(geographicReferences);

    const ctx = document.getElementById("myChart");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: geographicReferences,
            datasets: [
                {
                    label: "Earthquake magnitude",
                    data: magnitudes,
                    borderWidth: 2,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },

            plugins: {
                title: {
                    display: true,
                    text: "Gráfico de sismos en Chile",
                    padding: {
                        top: 50,
                        bottom: 30,
                        
                    },
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || "";
                            if (label) {
                                label += ": ";
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y + "°";
                            }
                            return label;
                        },
                    },
                },
            },
        },
    });
}
renderData();

