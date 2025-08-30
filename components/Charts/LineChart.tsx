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
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 2)
        .on('mouseover', function(event, d) {
          d3.select(this).attr('r', 6);
          
          const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')
            .style('background', 'rgba(0, 0, 0, 0.8)')
            .style('color', 'white')
            .style('padding', '8px 12px')
            .style('border-radius', '6px')
            .style('font-size', '12px')
            .style('font-weight', '500')
            .style('pointer-events', 'none')
            .style('z-index', '1000')
            .style('box-shadow', '0 4px 6px rgba(0, 0, 0, 0.1)');

          tooltip.html(`${d.category}: ${d.value}`)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px');
        })
        .on('mouseout', function() {
          d3.select(this).attr('r', 4);
          d3.selectAll('.tooltip').remove();
        });
    });

    // X Axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('font-size', '11px')
      .style('fill', '#6B7280');

    // Y Axis
    g.append('g')
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .style('font-size', '11px')
      .style('fill', '#6B7280');

    // Add grid lines
    g.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickFormat(() => '')
      )
      .style('stroke-dasharray', '3,3')
      .style('opacity', 0.3);

    g.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickFormat(() => '')
      )
      .style('stroke-dasharray', '3,3')
      .style('opacity', 0.3);

    // Legend
    const legend = g.append('g')
      .attr('transform', `translate(${innerWidth - 120}, 10)`);

    ['supply', 'demand'].forEach((category, i) => {
      const legendItem = legend.append('g')
        .attr('transform', `translate(0, ${i * 25})`);

      legendItem.append('circle')
        .attr('r', 5)
        .attr('fill', colorScale(category as string) as string || '#666666');

      legendItem.append('text')
        .attr('x', 12)
        .attr('y', 5)
        .style('font-size', '13px')
        .style('font-weight', '500')
        .style('fill', '#374151')
        .text(category.charAt(0).toUpperCase() + category.slice(1));
    });

  }, [data, width, height]);

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>}
      <svg ref={svgRef} width={width} height={height} className="w-full" />
    </div>
  );
}
