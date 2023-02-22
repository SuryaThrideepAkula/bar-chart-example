import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

interface ResponseData {
  date: string;
  units: number;
}

const ChartComponent = () => {
  const [data, setData] = useState<ResponseData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get<ResponseData[]>(
        "https://my.api.mockaroo.com/graph.json?key=158c1970",
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        const errorMessage =
          error.response.status === 404
            ? "Resource Not found"
            : "An unexpected error has occurred";
        setError(errorMessage);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error !== "") return <p>{error}</p>;

  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="units" fill="#8884d8" />
    </BarChart>
  );
};

export default ChartComponent;
