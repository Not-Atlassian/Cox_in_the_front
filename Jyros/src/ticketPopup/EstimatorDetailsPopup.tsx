import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {PointElement, LineElement} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const performanceMetrics = [
  { name: "Accuracy", value: 0.9044, color: "rgba(255, 99, 132, 0.2)", borderColor: "rgba(255, 99, 132, 1)" },
  { name: "Macro F1", value: 0.9075, color: "rgba(54, 162, 235, 0.2)", borderColor: "rgba(54, 162, 235, 1)" },
  { name: "Weighted F1", value: 0.9047, color: "rgba(255, 206, 86, 0.2)", borderColor: "rgba(255, 206, 86, 1)" },
  { name: "Precision", value: 0.9141, color: "rgba(75, 192, 192, 0.2)", borderColor: "rgba(75, 192, 192, 1)" },
  { name: "Recall", value: 0.9024, color: "rgba(153, 102, 255, 0.2)", borderColor: "rgba(153, 102, 255, 1)" },
];

const projectData = [
    { repository: "Apache", projects: ["mesos", "usergrid"], color: "rgba(255, 99, 132, 0.2)", border: "rgba(255, 99, 132, 1)" },
    { repository: "Appcelerator", projects: ["Appcelerator studio", "Aptana studio", "Titanium"], color: "rgba(54, 162, 235, 0.2)", border: "rgba(54, 162, 235, 1)" },
    { repository: "Duraspace", projects: ["Duracloud"], color: "rgba(255, 206, 86, 0.2)", border: "rgba(255, 206, 86, 1)" },
    { repository: "Atlassian", projects: ["Bamboo", "Clover"], color: "rgba(75, 192, 192, 0.2)", border: "rgba(75, 192, 192, 1)" },
    { repository: "Moodle", projects: ["Moodle"], color: "rgba(153, 102, 255, 0.2)", border: "rgba(153, 102, 255, 1)" },
    { repository: "Lsstcorp", projects: ["Data management"], color: "rgba(255, 159, 64, 0.2)", border: "rgba(255, 159, 64, 1)" },
    { repository: "Mulesoft", projects: ["Mule", "Mule studio"], color: "rgba(199, 199, 199, 0.2)", border: "rgba(199, 199, 199, 1)" },
    { repository: "Spring", projects: ["Spring XD"], color: "rgba(83, 102, 255, 0.2)", border: "rgba(83, 102, 255, 1)" },
    { repository: "Talendforge", projects: ["Talend Data Quality", "Talend ESB"], color: "rgba(255, 99, 255, 0.2)", border: "rgba(255, 99, 255, 1)" },
  ];


const ModelDescription = () => {
    const datasetChartData = {
      labels: projectData.map(repo => repo.repository),
      datasets: [{
        label: 'Number of Projects',
        data: projectData.map(repo => repo.projects.length),
        backgroundColor: projectData.map(repo => repo.color),
        borderColor: projectData.map(repo => repo.border),
        borderWidth: 1
      }]
    };
  
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const repo = projectData[context.dataIndex];
              return [
                `Projects: ${context.raw}`,
                ...repo.projects.map(project => `- ${project}`)
              ];
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    };
  
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>DistilBERT Model Overview</CardTitle>
          <CardDescription>
            Story Point estimation is done using a DistilBERT base. DistilBERT is a compact and efficient version of BERT, retaining 97% of BERT's language understanding capabilities while being 40% smaller and 60% faster.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Dataset Information</h4>
              <p className="text-sm text-gray-600">
                It consists of 16 csv files from 16 projects collected from 9 open source repositories. The following table shows the list of projects and the repositories where the project was collected from.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-medium mb-2">Repository Distribution</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="h-64">
                    <Bar data={datasetChartData} options={chartOptions} />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Model Architecture</h4>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <img 
                    src="https://www.researchgate.net/publication/358239462/figure/fig2/AS:1120931644747777@1644262338087/The-DistilBERT-model-architecture-and-components.png"
                    alt="DistilBERT Architecture" 
                    className="w-full h-64 object-contain"
                  />
                  <p className="text-xs text-center mt-2 text-gray-500">
                    DistilBERT architecture visualization showing the transformer layers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MetricsAndMatrix = () => {
  const accuracyImprovement = [0.35, 0.42, 0.51, 0.6, 0.63, 0.74, 0.8, 0.84, 0.841, 0.87, 0.88, 0.88, 0.89, 0.898, 0.9];

  const metricsData = {
    labels: performanceMetrics.map((metric) => metric.name),
    datasets: [
      {
        label: "Performance Metrics",
        data: performanceMetrics.map((metric) => metric.value),
        backgroundColor: performanceMetrics.map((metric) => metric.color),
        borderColor: performanceMetrics.map((metric) => metric.borderColor),
        borderWidth: 1,
      },
    ],
  };

  const metricsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${(context.raw * 100).toFixed(2)}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        ticks: {
          callback: (value) => `${(value * 100).toFixed(0)}%`,
        },
      },
    },
  };

  const lrImprovementData = {
    labels: Array.from({ length: accuracyImprovement.length }, (_, i) => `Epoch ${i + 1}`),
    datasets: [
      {
        label: "Accuracy Improvement",
        data: accuracyImprovement,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const lrImprovementOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `Accuracy: ${(context.raw * 100).toFixed(2)}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        ticks: {
          callback: (value) => `${(value * 100).toFixed(0)}%`,
        },
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Performance Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Learning Rate Improvement</h3>
            <div className="h-80">
              <Line data={lrImprovementData} options={lrImprovementOptions} />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Performance Metrics</h3>
            <div className="h-80">
              <Bar data={metricsData} options={metricsOptions} />
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p>* Hover over the charts to see detailed metrics and confusion matrix values.</p>
        </div>
      </CardContent>
    </Card>
  );
};


const EstimatorDetailsPopup = () => {
  return (
    <div className="space-y-6 p-4">
      <ModelDescription />
      <MetricsAndMatrix />
    </div>
  );
};

export default EstimatorDetailsPopup;