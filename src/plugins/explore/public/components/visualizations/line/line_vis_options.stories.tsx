/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { LineVisStyleControls } from './line_vis_options';
import { LineChartStyleControls } from './line_vis_config';
import { ThresholdLineStyle, VisColumn, VisFieldType, Positions } from '../types';

export default {
  component: LineVisStyleControls,
  title: 'src/plugins/explore/public/components/visualizations/line/line_vis_options',
} as ComponentMeta<typeof LineVisStyleControls>;

// Mock data for the component props
const mockNumericalColumns: VisColumn[] = [
  {
    id: 1,
    name: 'count',
    schema: VisFieldType.Numerical,
    column: 'count',
    validValuesCount: 1,
    uniqueValuesCount: 1,
  },
  {
    id: 2,
    name: 'price',
    schema: VisFieldType.Numerical,
    column: 'price',

    validValuesCount: 1,
    uniqueValuesCount: 1,
  },
  {
    id: 3,
    name: 'revenue',
    schema: VisFieldType.Numerical,
    column: 'revenue',
    validValuesCount: 1,
    uniqueValuesCount: 1,
  },
];

const mockCategoricalColumns: VisColumn[] = [
  {
    id: 4,
    name: 'category',
    schema: VisFieldType.Categorical,
    column: 'category',
    validValuesCount: 1,
    uniqueValuesCount: 1,
  },
  {
    id: 5,
    name: 'product',
    schema: VisFieldType.Categorical,
    column: 'product',
    validValuesCount: 1,
    uniqueValuesCount: 1,
  },
];

const mockDateColumns: VisColumn[] = [
  {
    id: 6,
    name: 'timestamp',
    schema: VisFieldType.Date,
    column: 'timestamp',
    validValuesCount: 1,
    uniqueValuesCount: 1,
  },
];

// Default style options
const defaultStyleOptions: LineChartStyleControls = {
  // Basic controls
  tooltipOptions: { mode: 'all' },
  addLegend: true,
  legendPosition: Positions.RIGHT,
  addTimeMarker: false,

  lineStyle: 'dots',
  lineMode: 'smooth',
  lineWidth: 2,

  // Threshold and grid
  thresholdLines: [
    {
      color: '#E7664C',
      show: false,
      style: ThresholdLineStyle.Full,
      value: 10,
      width: 1,
    },
  ],

  // Category axes
  categoryAxes: [
    {
      id: 'CategoryAxis-1',
      type: 'category',
      position: Positions.BOTTOM,
      show: true,
      labels: {
        show: true,
        filter: true,
        rotate: 0,
        truncate: 100,
      },
      title: {
        text: 'Category Axis',
      },
      grid: { showLines: true },
    },
  ],

  // Value axes
  valueAxes: [
    {
      id: 'ValueAxis-1',
      name: 'LeftAxis-1',
      type: 'value',
      position: Positions.LEFT,
      show: true,
      labels: {
        show: true,
        rotate: 0,
        filter: false,
        truncate: 100,
      },
      title: {
        text: 'Value Axis',
      },
      grid: { showLines: true },
    },
  ],
  titleOptions: {
    show: false,
    titleName: '',
  },
};

// Template for the story
const Template: ComponentStory<typeof LineVisStyleControls> = (args) => {
  // Use state to track changes
  const [styleOptions, setStyleOptions] = useState<LineChartStyleControls>(args.styleOptions);

  return (
    <div style={{ maxWidth: '800px', padding: '16px' }}>
      <LineVisStyleControls
        {...args}
        styleOptions={styleOptions}
        onStyleChange={(newOptions) => {
          setStyleOptions({
            ...styleOptions,
            ...newOptions,
          });
          action('onStyleChange')(newOptions);
        }}
      />
    </div>
  );
};

// Primary story
export const Primary = Template.bind({});
Primary.args = {
  styleOptions: defaultStyleOptions,
  numericalColumns: mockNumericalColumns,
  categoricalColumns: mockCategoricalColumns,
  dateColumns: mockDateColumns,
};

// Story with threshold line enabled
export const WithThreshold = Template.bind({});
WithThreshold.args = {
  styleOptions: {
    ...defaultStyleOptions,
    thresholdLines: [...defaultStyleOptions.thresholdLines].map((thresholdLine) => ({
      ...thresholdLine,
      show: true,
    })),
  },
  numericalColumns: mockNumericalColumns,
  categoricalColumns: mockCategoricalColumns,
  dateColumns: mockDateColumns,
};

// Story with multiple value axes
export const MultipleValueAxes = Template.bind({});
MultipleValueAxes.args = {
  styleOptions: {
    ...defaultStyleOptions,
    valueAxes: [
      ...defaultStyleOptions.valueAxes,
      {
        id: 'ValueAxis-2',
        name: 'RightAxis-1',
        type: 'value',
        position: Positions.RIGHT,
        show: true,
        labels: {
          show: true,
          rotate: 0,
          filter: false,
          truncate: 100,
        },
        title: {
          text: 'Secondary Value Axis',
        },
        grid: { showLines: true },
      },
    ],
  },
  numericalColumns: mockNumericalColumns,
  categoricalColumns: mockCategoricalColumns,
  dateColumns: mockDateColumns,
};

// Story with no grid lines
export const NoGridLines = Template.bind({});
NoGridLines.args = {
  styleOptions: {
    ...defaultStyleOptions,
  },
  numericalColumns: mockNumericalColumns,
  categoricalColumns: mockCategoricalColumns,
  dateColumns: mockDateColumns,
};
