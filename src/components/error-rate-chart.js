"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function ErrorRateChart() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Generate sample data
    const environments = ["AWS", "Azure", "GCP", "On-Prem"]
    const generateData = () => {
      return environments.map((env) => {
        // Base error rates with some variation by environment
        let baseErrorRate
        switch (env) {
          case "AWS":
            baseErrorRate = 0.8 + Math.random() * 0.4
            break
          case "Azure":
            baseErrorRate = 1.2 + Math.random() * 0.5
            break
          case "GCP":
            baseErrorRate = 0.6 + Math.random() * 0.3
            break
          case "On-Prem":
            baseErrorRate = 1.5 + Math.random() * 0.7
            break
          default:
            baseErrorRate = 1.0 + Math.random() * 0.5
        }

        return {
          name: env,
          "Error Rate": Number.parseFloat(baseErrorRate.toFixed(2)),
          "Previous Period": Number.parseFloat((baseErrorRate * (0.8 + Math.random() * 0.4)).toFixed(2)),
        }
      })
    }

    setData(generateData())
    setLoading(false)
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
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barGap={0} barCategoryGap="20%">
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis
          dataKey="name"
          stroke="#FFFFFF"
          fontSize={12}
          tickLine={false}
          axisLine={{ stroke: "#FFFFFF" }}
        />
        <YAxis
          stroke="#FFFFFF"
          fontSize={12}
          tickLine={false}
          axisLine={{ stroke: "#FFFFFF" }}
          label={{
            value: "%",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle", fill: "#FFFFFF", fontSize: 12 },
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
          formatter={(value) => [`${value}%`, ""]}
        />
        <Legend wrapperStyle={{ fontSize: 12, color: "#FFFFFF" }} />
        <Bar dataKey="Error Rate" fill="#8884d8" radius={[4, 4, 0, 0]} animationDuration={1000} />
        <Bar dataKey="Previous Period" fill="#82ca9d" radius={[4, 4, 0, 0]} animationDuration={1000} />
      </BarChart>
    </ResponsiveContainer>
  )
}

