// import React, { useState, useEffect, useRef } from "react";
// import "./chart.css";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import "chart.js/auto";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function ExpenseChart() {
//   const [expenses, setExpenses] = useState([]);
//   const [error, setError] = useState(null);
//   const chartCanvas = useRef(null);
//   let chartInstance = useRef(null);

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/expenses");
//         const data = await response.json();
//         setExpenses(data);
//       } catch (error) {
//         setError(error);
//         console.error("Error fetching expenses:", error);
//       }
//     };

//     fetchExpenses();

//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (chartCanvas.current && !error) {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//       const chartData = transformDataForChart(expenses);
//       chartInstance.current = new ChartJS(chartCanvas.current, {
//         type: "bar",
//         data: chartData,
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true,
//             },
//           },
//         },
//       });
//     }
//   }, [expenses, error]);

//   const transformDataForChart = (expenses) => {
//     const categories = {};
//     expenses.forEach((expense) => {
//       if (categories[expense.category]) {
//         categories[expense.category] += expense.amount;
//       } else {
//         categories[expense.category] = expense.amount;
//       }
//     });

//     return {
//       labels: Object.keys(categories),
//       datasets: [
//         {
//           label: "Total Expense Amount",
//           data: Object.values(categories),
//           backgroundColor: "rgba(255, 99, 132, 0.2)",
//           borderColor: "rgba(255, 99, 132, 1)",
//           borderWidth: 1,
//         },
//       ],
//     };
//   };

//   return (
//     <div className="expense-chart">
//       {" "}
//       <br />
//       <br />
//       <br />
//       <br />
//       <h2 className="chart-title">Expense Breakdown</h2>
//       {error ? (
//         <p className="error-message">
//           Error fetching expenses: {error.message}
//         </p>
//       ) : (
//         <canvas ref={chartCanvas} id="expenseChart"></canvas>
//       )}
//     </div>
//   );
// }

// export default ExpenseChart;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect, useRef } from "react";
// import "./chart.css";
// import {
//   Chart as ChartJS,
//   DoughnutController,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import "chart.js/auto";

// ChartJS.register(DoughnutController, Title, Tooltip, Legend);

// function ExpenseChart() {
//   const [expenses, setExpenses] = useState([]);
//   const [error, setError] = useState(null);
//   const chartCanvas = useRef(null);
//   let chartInstance = useRef(null);

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/expenses");
//         const data = await response.json();
//         setExpenses(data);
//       } catch (error) {
//         setError(error);
//         console.error("Error fetching expenses:", error);
//       }
//     };

//     fetchExpenses();

//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (chartCanvas.current && !error) {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//       const chartData = transformDataForChart(expenses);
//       chartInstance.current = new ChartJS(chartCanvas.current, {
//         type: "doughnut",
//         data: chartData,
//         options: {
//           plugins: {
//             title: {
//               display: true,
//               text: "Expense Breakdown",
//             },
//             legend: {
//               display: true,
//               position: "bottom",
//             },
//             tooltip: {
//               callbacks: {
//                 label: function (context) {
//                   return context.label + ": " + context.formattedValue;
//                 },
//               },
//             },
//           },
//         },
//       });
//     }
//   }, [expenses, error]);

//   const transformDataForChart = (expenses) => {
//     const categories = {};
//     expenses.forEach((expense) => {
//       if (categories[expense.category]) {
//         categories[expense.category] += expense.amount;
//       } else {
//         categories[expense.category] = expense.amount;
//       }
//     });

//     return {
//       labels: Object.keys(categories),
//       datasets: [
//         {
//           label: "Total Expense Amount",
//           data: Object.values(categories),
//           backgroundColor: [
//             "rgba(255, 99, 132, 0.2)",
//             "rgba(54, 162, 235, 0.2)",
//             "rgba(255, 206, 86, 0.2)",
//             "rgba(67, 67, 67, 0.2)",
//             "rgba(153, 102, 255, 0.2)",
//             "rgba(75, 192, 192, 0.2)",
//             "rgba(0, 191, 255, 0.2)",
//             "rgba(152, 255, 0, 0.2)",
//             "rgba(255, 165, 0, 0.2)",
//           ],
//           borderColor: [
//             "rgba(255, 99, 132, 1)",
//             "rgba(54, 162, 235, 1)",
//             "rgba(255, 206, 86, 1)",
//             "rgba(67, 67, 67, 1)",
//             "rgba(153, 102, 255, 1)",
//             "rgba(75, 192, 192, 0.2)",
//             "rgba(0, 191, 255, 0.2)",
//             "rgba(152, 255, 0, 0.2)",
//             "rgba(255, 165, 0, 0.2)",
//           ],
//           borderWidth: 1,
//         },
//       ],
//     };
//   };

//   return (
//     <div className="expense-chart">
//       {" "}
//       <br />
//       <br />
//       <br />
//       <br />
//       {error ? (
//         <p className="error-message">
//           Error fetching expenses: {error.message}
//         </p>
//       ) : (
//         <canvas ref={chartCanvas} id="expenseChart"></canvas>
//       )}
//     </div>
//   );
// }

// export default ExpenseChart;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect, useRef } from "react";
// import "./chart.css";
// import {
//   Chart as ChartJS,
//   DoughnutController,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import "chart.js/auto";

// ChartJS.register(DoughnutController, Title, Tooltip, Legend);

// function ExpenseChart() {
//   const [expenses, setExpenses] = useState([]);
//   const [error, setError] = useState(null);
//   const chartCanvas = useRef(null);
//   let chartInstance = useRef(null);

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/expenses");
//         const data = await response.json();
//         setExpenses(data);
//       } catch (error) {
//         setError(error);
//         console.error("Error fetching expenses:", error);
//       }
//     };

//     fetchExpenses();

//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (chartCanvas.current && !error) {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//       const chartData = transformDataForChart(expenses);
//       chartInstance.current = new ChartJS(chartCanvas.current, {
//         type: "doughnut",
//         data: chartData,
//         options: {
//           plugins: {
//             title: {
//               display: true,
//               text: "Expense Breakdown ",
//             },
//             legend: {
//               display: true,
//               position: "bottom",
//             },
//             tooltip: {
//               callbacks: {
//                 label: function (context) {
//                   return context.label + ": " + context.formattedValue;
//                 },
//               },
//             },
//           },
//         },
//       });
//     }
//   }, [expenses, error]);

//   const transformDataForChart = (expenses) => {
//     const categories = {};
//     expenses.forEach((expense) => {
//       if (categories[expense.category]) {
//         categories[expense.category] += expense.amount;
//       } else {
//         categories[expense.category] = expense.amount;
//       }
//     });

//     const categoryLabels = Object.keys(categories);
//     const categoryData = Object.values(categories);
//     const backgroundColors = generateRandomColors(categoryLabels.length);

//     return {
//       labels: categoryLabels,
//       datasets: [
//         {
//           label: "Total Expense Amount",
//           data: categoryData,
//           backgroundColor: backgroundColors,
//           borderColor: backgroundColors,
//           borderWidth: 1,
//         },
//       ],
//     };
//   };

//   // Function to generate random colors dynamically (brighter range)
//   const generateRandomColors = (numColors) => {
//     const colors = [];
//     for (let i = 0; i < numColors; i++) {
//       const r = Math.floor(Math.random() * 156) + 100;
//       const g = Math.floor(Math.random() * 156) + 100;
//       const b = Math.floor(Math.random() * 156) + 100;
//       const color = `rgba(${r}, ${g}, ${b}, 1.5)`;
//       colors.push(color);
//     }
//     return colors;
//   };

//   return (
//     <div className="expense-chart">
//       {" "}
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       {error ? (
//         <p className="error-message">
//           Error fetching expenses: {error.message}
//         </p>
//       ) : (
//         <canvas ref={chartCanvas} id="expenseChart"></canvas>
//       )}
//     </div>
//   );
// }

// export default ExpenseChart;

// import React, { useState, useEffect, useRef } from "react";
// import "./chart.css";
// import Chart from "chart.js/auto";
// import {
//   Chart as CchartJS,
//   DoughnutController,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// // import "chart.js/auto";

// CchartJS.register(DoughnutController, Title, Tooltip, Legend);

// function Echart() {
//   const [expenses, setExpenses] = useState([]);
//   const [error, setError] = useState(null);
//   const chartCanvas = useRef(null);
//   let chartInstance = useRef(null);

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         // Assuming you have the user's identifier stored in sessionStorage
//         const user = JSON.parse(sessionStorage.getItem("user"));
//         console.log(user._id);
//         const response = await fetch(
//           `http://localhost:5000/api/expenses/${user._id}`
//         );
//         const data = await response.json();
//         console.log(data);
//         setExpenses(data);
//       } catch (error) {
//         setError(error);
//         console.error("Error fetching expenses:", error);
//       }
//     };

//     fetchExpenses();

//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (chartCanvas.current && !error) {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//       const chartData = transformDataForChart(expenses);
//       chartInstance.current = new CchartJS(chartCanvas.current, {
//         type: "doughnut",
//         data: chartData,
//         options: {
//           plugins: {
//             title: {
//               display: true,
//               text: "Expense Breakdown ",
//             },
//             legend: {
//               display: true,
//               position: "bottom",
//             },
//             tooltip: {
//               callbacks: {
//                 label: function (context) {
//                   return context.label + ": " + context.formattedValue;
//                 },
//               },
//             },
//           },
//         },
//       });
//     }
//   }, [expenses, error]);

//   const transformDataForChart = (expenses) => {
//     const categories = {};
//     expenses.forEach((expense) => {
//       if (categories[expense.category]) {
//         categories[expense.category] += expense.amount;
//       } else {
//         categories[expense.category] = expense.amount;
//       }
//     });

//     const categoryLabels = Object.keys(categories);
//     const categoryData = Object.values(categories);
//     const backgroundColors = generateRandomColors(categoryLabels.length);

//     return {
//       labels: categoryLabels,
//       datasets: [
//         {
//           label: "Total Expense Amount",
//           data: categoryData,
//           backgroundColor: backgroundColors,
//           borderColor: backgroundColors,
//           borderWidth: 1,
//         },
//       ],
//     };
//   };

//   // Function to generate random colors dynamically (brighter range)
//   const generateRandomColors = (numColors) => {
//     const colors = [];
//     for (let i = 0; i < numColors; i++) {
//       const r = Math.floor(Math.random() * 156) + 100;
//       const g = Math.floor(Math.random() * 156) + 100;
//       const b = Math.floor(Math.random() * 156) + 100;
//       const color = `rgba(${r}, ${g}, ${b}, 1.5)`;
//       colors.push(color);
//     }
//     return colors;
//   };

//   return (
//     <div className="expense-chart">
//       {" "}
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       {error ? (
//         <p className="error-message">
//           Error fetching expenses: {error.message}
//         </p>
//       ) : (
//         <>
//           <canvas ref={chartCanvas} id="expenseChart"></canvas>
//           <p>Total No of Expenses: {expenses.length}</p>
//         </>
//       )}
//     </div>
//   );
// }

// export default Echart;

import React, { useState, useEffect, useRef } from "react";
import "./chart.css";
import Chart from "chart.js/auto";

function Echart() {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const chartCanvas = useRef(null);
  let chartInstance = useRef(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        // Assuming you have the user's identifier stored in sessionStorage
        const user = JSON.parse(sessionStorage.getItem("user"));
        console.log(user._id);
        const response = await fetch(
          `https://dailyexpenses-b16357ac6f5b.herokuapp.com/api/expenses/${user._id}`
        );
        const data = await response.json();
        console.log(data);
        setExpenses(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (chartCanvas.current && !error) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const chartData = transformDataForChart(expenses);
      chartInstance.current = new Chart(chartCanvas.current, {
        type: "doughnut",
        data: chartData,
        options: {
          plugins: {
            title: {
              display: true,
              text: "Expense Breakdown ",
            },
            legend: {
              display: true,
              position: "bottom",
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return context.label + ": " + context.formattedValue;
                },
              },
            },
          },
        },
      });
    }
  }, [expenses, error]);

  const transformDataForChart = (expenses) => {
    const categories = {};
    expenses.forEach((expense) => {
      if (categories[expense.category]) {
        categories[expense.category] += expense.amount;
      } else {
        categories[expense.category] = expense.amount;
      }
    });

    const categoryLabels = Object.keys(categories);
    const categoryData = Object.values(categories);
    const backgroundColors = generateRandomColors(categoryLabels.length);

    return {
      labels: categoryLabels,
      datasets: [
        {
          label: "Total Expense Amount",
          data: categoryData,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors,
          borderWidth: 1,
        },
      ],
    };
  };

  // Function to generate random colors dynamically (brighter range)
  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const r = Math.floor(Math.random() * 156) + 100;
      const g = Math.floor(Math.random() * 156) + 100;
      const b = Math.floor(Math.random() * 156) + 100;
      const color = `rgba(${r}, ${g}, ${b}, 1.5)`;
      colors.push(color);
    }
    return colors;
  };

  return (
    <div className="expense-chart">
      {" "}
      <br />
      <br />
      <br />
      <br />
      <br />
      {error ? (
        <p className="error-message">
          Error fetching expenses: {error.message}
        </p>
      ) : (
        <>
          <canvas ref={chartCanvas} id="expenseChart"></canvas>
          <p>Total No of Expenses: {expenses.length}</p>
        </>
      )}
    </div>
  );
}

export default Echart;
