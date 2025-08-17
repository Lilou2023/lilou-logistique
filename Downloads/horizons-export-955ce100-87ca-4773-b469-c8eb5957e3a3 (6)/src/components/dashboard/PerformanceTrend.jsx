import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg shadow-lg">
        <p className="label font-bold text-primary">{`Semaine ${label}`}</p>
        <p className="intro text-foreground">{`DNR : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const PerformanceTrend = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorDnr" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
          <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
          <YAxis allowDecimals={false} stroke="hsl(var(--muted-foreground))" />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="dnr_count" stroke="hsl(var(--destructive))" fillOpacity={1} fill="url(#colorDnr)" />
          <Line
            type="monotone"
            dataKey="dnr_count"
            name="DNR"
            stroke="hsl(var(--destructive))"
            strokeWidth={2}
            activeDot={{ r: 8, strokeWidth: 2 }}
            dot={{ stroke: 'hsl(var(--destructive))', strokeWidth: 1, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceTrend;