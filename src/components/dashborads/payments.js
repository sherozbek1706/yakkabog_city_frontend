import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { getRequest } from "../../request";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { formatmoney } from "../../utils/functions";

// Format money function to display as currency
const formatMoney = (value) => {
  return formatmoney(value);
};

const fetchData = async (id) => {
  const data = await getRequest("contract/stats-payments/" + id);
  return data;
};

export const DashboardPayments = () => {
  const { id } = useParams();

  const { data, error, isLoading, refetch, isSuccess } = useQuery(
    ["stats-payments", id],
    () => fetchData(id),
    { enabled: !!id }
  );

  console.log(data?.data?.data);

  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
            fontSize: "12px", // Adjust tooltip font size
          }}
        >
          <p className="label" style={{ fontSize: "12px" }}>
            {`Date: ${payload[0].payload.sana}`}
          </p>
          <p className="intro" style={{ fontSize: "12px" }}>
            {`Amount: ${formatMoney(payload[0].value)}`}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <ComposedChart width={500} height={400} data={data?.data?.data}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="sana"
            scale="band"
            tick={{ fontSize: 12 }} // Adjust XAxis tick font size
          />
          <YAxis
            tick={{ fontSize: 12 }} // Adjust YAxis tick font size
          />
          <Tooltip content={customTooltip} />
          <Legend
            wrapperStyle={{ fontSize: "12px" }} // Adjust legend font size
          />
          <Area
            type="monotone"
            dataKey="tulov"
            fill="#8884d8"
            stroke="#8884d8"
          />
          <Bar dataKey="belgilangan" barSize={10} fill="#413ea0" />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
