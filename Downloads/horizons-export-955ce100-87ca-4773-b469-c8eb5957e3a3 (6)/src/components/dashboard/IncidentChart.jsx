import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#EF4444', '#F97316', '#FBBF24', '#8B5CF6'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg shadow-lg">
        <p className="label font-bold text-primary">{`${label}`}</p>
        <p className="intro text-foreground">{`Incidents : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const IncidentChart = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
          <YAxis dataKey="type" type="category" width={80} stroke="hsl(var(--muted-foreground))" />
          <Tooltip
            cursor={{ fill: 'hsl(var(--accent))' }}
            content={<CustomTooltip />}
          />
          <Bar dataKey="count" fill="hsl(var(--primary))" barSize={25} radius={[0, 10, 10, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncidentChart;