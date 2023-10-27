
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

renderData();
