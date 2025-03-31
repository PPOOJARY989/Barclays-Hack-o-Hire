"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function ResponseTimeChart() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Generate sample data
    const generateData = () => {
      const now = new Date()
      const data = []

      // Generate 24 hours of data points
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now)
        time.setHours(now.getHours() - i)

        // Base response time with some natural variation
        let responseTime = 120 + Math.random() * 30

        // Add some spikes for visual interest
        if (i === 5) responseTime = 320 // Anomaly spike
        if (i === 6) responseTime = 280 // Anomaly continued
        if (i === 18) responseTime = 220 // Minor spike

        // Add anomaly markers
        const isAnomaly = responseTime > 250

        data.push({
          time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          responseTime: Math.round(responseTime),
          isAnomaly,
          anomalyValue: isAnomaly ? responseTime : null,
        })
      }

      return data
    }

    setData(generateData())
    setLoading(false)

    // Update data periodically
    const interval = setInterval(() => {
      const newData = [...data]

      // Remove first item and add new one
      if (newData.length > 0) {
        newData.shift()

        const now = new Date()
        const lastResponseTime = newData[newData.length - 1]?.responseTime || 120

        // Generate new response time with some correlation to the last one
        let newResponseTime = lastResponseTime + (Math.random() * 20 - 10)

        // Keep within reasonable bounds
        newResponseTime = Math.max(80, Math.min(200, newResponseTime))

        // Occasionally add an anomaly
        if (Math.random() < 0.05) {
          newResponseTime = 300 + Math.random() * 100
        }

        const isAnomaly = newResponseTime > 250

        newData.push({
          time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          responseTime: Math.round(newResponseTime),
          isAnomaly,
          anomalyValue: isAnomaly ? newResponseTime : null,
        })

        setData(newData)
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent"
        />
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="responseTimeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#00FFFF" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="anomalyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FF0000" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#FF0000" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis
          dataKey="time"
          stroke="#FFFFFF" // Change X-axis color to white
          fontSize={12}
          tickLine={false}
          axisLine={{ stroke: "#FFFFFF" }} // Change X-axis line color to white
        />
        <YAxis
          stroke="#FFFFFF" // Change Y-axis color to white
          fontSize={12}
          tickLine={false}
          axisLine={{ stroke: "#FFFFFF" }} // Change Y-axis line color to white
          label={{
            value: "ms",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle", fill: "#FFFFFF", fontSize: 12 }, // Change label color to white
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
          labelStyle={{ color: "hsl(var(--foreground))" }}
          itemStyle={{ color: "hsl(var(--foreground))" }}
          formatter={(value) => [`${value} ms`, "Response Time"]}
        />
        <Area
          type="monotone"
          dataKey="responseTime"
          stroke="#00FFFF"
          strokeWidth={2}
          fill="url(#responseTimeGradient)"
          animationDuration={500}
          dot={{ r: 4, fill: "#00FFFF" }}
          activeDot={{ r: 6, fill: "#00FFFF" }}
        />
        <Area
          type="monotone"
          dataKey="anomalyValue"
          stroke="#FF0000"
          strokeWidth={2}
          fill="url(#anomalyGradient)"
          animationDuration={500}
          dot={{ r: 4, fill: "#FF0000" }}
          activeDot={{ r: 6, fill: "#FF0000" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

