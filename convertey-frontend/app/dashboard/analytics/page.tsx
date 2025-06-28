"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", conversions: 400 },
  { name: "Feb", conversions: 300 },
  { name: "Mar", conversions: 200 },
  { name: "Apr", conversions: 278 },
  { name: "May", conversions: 189 },
  { name: "Jun", conversions: 239 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6m");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Usage Analytics</h1>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Conversion Analytics
          </CardTitle>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="conversions" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Converted Formats</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>PDF to DOCX</span>
                <span className="font-semibold">45%</span>
              </li>
              <li className="flex justify-between items-center">
                <span>JPG to PNG</span>
                <span className="font-semibold">30%</span>
              </li>
              <li className="flex justify-between items-center">
                <span>DOCX to PDF</span>
                <span className="font-semibold">15%</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Others</span>
                <span className="font-semibold">10%</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Total Conversions</span>
                <span className="font-semibold">1,234</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Successful Conversions</span>
                <span className="font-semibold">1,230 (99.7%)</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Failed Conversions</span>
                <span className="font-semibold">4 (0.3%)</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Average Conversion Time</span>
                <span className="font-semibold">2.3 seconds</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
