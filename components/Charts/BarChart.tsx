'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ChartData } from '@/lib/dataClient';

interface BarChartProps {
  data: ChartData[];
  width?: number;
  height?: number;
  title?: string;
}

export default function BarChart({ data, width = 400, height = 200, title }: BarChartProps) {
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

    // Scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0])
      .range([innerHeight, 0]);

    // Bars
    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.label) || 0)
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => innerHeight - yScale(d.value))
      .attr('fill', '#10b981')
      .attr('opacity', 0.8)
      .on('mouseover', function(event, d) {
        d3.select(this).attr('opacity', 1);
        
        // Tooltip
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

        tooltip.html(`${d.label}: ${d.value}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this).attr('opacity', 0.8);
        d3.selectAll('.tooltip').remove();
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

  }, [data, width, height]);

  return (
    <div className="bg-white p-4 rounded-lg border">
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
}
