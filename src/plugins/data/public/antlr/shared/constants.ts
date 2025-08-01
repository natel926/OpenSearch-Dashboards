/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { IndexPattern } from '../../index_patterns';

// suggestion item details tags
export const enum SuggestionItemDetailsTags {
  Keyword = 'Keyword',
  AggregateFunction = 'Aggregate Function',
  Value = 'Value',
  Operator = 'Operator',
  Table = 'Table',
  Command = 'Command',
  Field = 'Field',
  Function = 'Function',
  Arguments = 'Arguments',
  Type = 'Type',
}
export const quotesRegex = /^'(.*)'$/;

export const testingIndex = ({
  title: 'opensearch_dashboards_sample_data_flights',
  fields: [
    {
      count: 0,
      name: 'Carrier',
      displayName: 'Carrier',
      type: 'string',
      esTypes: ['keyword'],
      scripted: false,
      searchable: true,
      aggregatable: true,
      readFromDocValues: true,
      subType: undefined,
    },
    {
      count: 2,
      name: 'DestCityName',
      displayName: 'DestCityName',
      type: 'string',
      esTypes: ['keyword'],
      scripted: false,
      searchable: true,
      aggregatable: true,
      readFromDocValues: true,
      subType: undefined,
    },
    {
      count: 0,
      name: 'DestCountry',
      displayName: 'DestCountry',
      type: 'string',
      esTypes: ['keyword'],
      scripted: false,
      searchable: true,
      aggregatable: true,
      readFromDocValues: true,
      subType: undefined,
    },
    {
      count: 0,
      name: 'DestWeather',
      displayName: 'DestWeather',
      type: 'string',
      esTypes: ['keyword'],
      scripted: false,
      searchable: true,
      aggregatable: true,
      readFromDocValues: true,
      subType: undefined,
    },
    {
      count: 0,
      name: 'DistanceMiles',
      displayName: 'DistanceMiles',
      type: 'number',
      esTypes: ['float'],
      scripted: false,
      searchable: true,
      aggregatable: true,
      readFromDocValues: true,
      subType: undefined,
    },
    {
      count: 0,
      name: 'FlightDelay',
      displayName: 'FlightDelay',
      type: 'boolean',
      esTypes: ['boolean'],
      scripted: false,
      searchable: true,
      aggregatable: true,
      readFromDocValues: true,
      subType: undefined,
    },
    {
      count: 0,
      name: 'FlightNum',
      displayName: 'FlightNum',
      type: 'string',
      esTypes: ['keyword'],
      scripted: false,
      searchable: true,
      aggregatable: true,
      readFromDocValues: true,
      subType: undefined,
    },
    {
      count: 0,
      name: 'OriginWeather',
      displayName: 'OriginWeather',
      type: 'string',
      esTypes: ['keyword'],
      scripted: false,
      searchable: true,
      aggregatable: true,
      readFromDocValues: true,
      subType: undefined,
    },
    {
      count: 0,
      name: '_id',
      displayName: '_id',
      type: 'string',
      esTypes: ['_id'],
      scripted: false,
      searchable: true,
      aggregatable: true,
      readFromDocValues: false,
      subType: undefined,
    },
    {
      count: 0,
      name: '_index',
      displayName: '_index',
      type: 'string',
      esTypes: ['_index'],
      scripted: false,
      searchable: true,
      aggregatable: true,
      readFromDocValues: false,
      subType: undefined,
    },
    {
      count: 0,
      name: '_score',
      displayName: '_score',
      type: 'number',
      scripted: false,
      searchable: false,
      aggregatable: false,
      readFromDocValues: false,
      subType: undefined,
    },
    {
      count: 0,
      name: '_source',
      displayName: '_source',
      type: '_source',
      esTypes: ['_source'],
      scripted: false,
      searchable: false,
      aggregatable: false,
      readFromDocValues: false,
      subType: undefined,
    },
    {
      count: 0,
      name: '_type',
      displayName: '_type',
      type: 'string',
      esTypes: ['_type'],
      scripted: false,
      searchable: true,
      aggregatable: true,
      readFromDocValues: false,
      subType: undefined,
    },
  ],
  getFieldByName: (fieldName: string) => {
    return testingIndex.fields.find((field) => field.name === fieldName);
  },
} as unknown) as IndexPattern;
