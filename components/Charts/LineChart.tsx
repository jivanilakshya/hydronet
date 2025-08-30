'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ChartData } from '@/lib/dataClient';

interface LineChartProps {
  data: ChartData[];
  width?: number;
  height?: number;
  title?: string;
}

export default function LineChart({ data, width = 400, height = 200, title }: LineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Group data by category (supply/demand)
    const groupedData = d3.group(data, d => d.category);

    // Scales
    const xScale = d3.scalePoint()
      .domain(data.map(d => d.label))
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0])
      .range([innerHeight, 0]);

    // Line generator
    const line = d3.line<ChartData>()
      .x(d => xScale(d.label) || 0)
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Colors for different categories
    const colorScale = d3.scaleOrdinal()
      .domain(['supply', 'demand'])
      .range(['#10b981', '#ef4444']);

    // Draw lines for each category
    groupedData.forEach((categoryData, category) => {
      const color = colorScale(category as string) as string || '#666666';
      
      g.append('path')
        .datum(categoryData)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 2)
        .attr('d', line);

      // Add dots
      g.selectAll(`.dot-${category}`)
        .data(categoryData)
        .enter().append('circle')
        .attr('class', `dot-${category}`)
        .attr('cx', d => xScale(d.label) || 0)
        .attr('cy', d => yScale(d.value))
        .attr('r', 4)
        .attr('fill', color)
        .on('mouseover', function(event, d) {
          const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')
            .style('background', 'rgba(0, 0, 0, 0.8)')
            .style('color', 'white')
            .style('padding', '8px')
            .style('border-radius', '4px')
            .style('font-size', '12px')
            .style('pointer-events', 'none')
            .style('z-index', '1000');

          tooltip.html(`${d.category}: ${d.value}`)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px');
        })
        .on('mouseout', function() {
          d3.selectAll('.tooltip').remove();
        });
    });

    // X Axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('font-size', '12px');

    // Y Axis
    g.append('g')
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .style('font-size', '12px');

    // Legend
    const legend = g.append('g')
      .attr('transform', `translate(${innerWidth - 100}, 20)`);

    ['supply', 'demand'].forEach((category, i) => {
      const legendItem = legend.append('g')
        .attr('transform', `translate(0, ${i * 20})`);

      legendItem.append('circle')
        .attr('r', 4)
        .attr('fill', colorScale(category as string) as string || '#666666');

      legendItem.append('text')
        .attr('x', 10)
        .attr('y', 4)
        .style('font-size', '12px')
        .text(category);
    });

  }, [data, width, height]);

  return (
    <div className="bg-white p-4 rounded-lg border">
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
}
