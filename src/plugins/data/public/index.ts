/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Any modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { PluginInitializerContext } from '../../../core/public';
import { ConfigSchema } from '../config';

/*
 * Filters:
 */

import {
  buildEmptyFilter,
  buildExistsFilter,
  buildPhraseFilter,
  buildPhrasesFilter,
  buildQueryFilter,
  buildRangeFilter,
  disableFilter,
  FILTERS,
  FilterStateStore,
  getDisplayValueFromFilter,
  getPhraseFilterField,
  getPhraseFilterValue,
  isExistsFilter,
  isFilterPinned,
  isMatchAllFilter,
  isMissingFilter,
  isPhraseFilter,
  isPhrasesFilter,
  isQueryStringFilter,
  isRangeFilter,
  toggleFilterNegated,
  compareFilters,
  COMPARE_ALL_OPTIONS,
} from '../common';

import { FilterLabel } from './ui';
export {
  ACTION_BAR_BUTTONS_CONTAINER_ID,
  createEditor,
  DefaultInput,
  DQLBody,
  SingleLineInput,
  DatasetSelector,
  DatasetSelectorAppearance,
} from './ui';

import {
  generateFilters,
  onlyDisabledFiltersChanged,
  changeTimeFilter,
  mapAndFlattenFilters,
  extractTimeFilter,
  extractTimeRange,
  convertRangeFilterToTimeRangeString,
} from './query';

// Filter helpers namespace:
export const opensearchFilters = {
  FilterLabel,

  FILTERS,
  FilterStateStore,

  buildEmptyFilter,
  buildPhrasesFilter,
  buildExistsFilter,
  buildPhraseFilter,
  buildQueryFilter,
  buildRangeFilter,

  isPhraseFilter,
  isExistsFilter,
  isPhrasesFilter,
  isRangeFilter,
  isMatchAllFilter,
  isMissingFilter,
  isQueryStringFilter,
  isFilterPinned,

  toggleFilterNegated,
  disableFilter,
  getPhraseFilterField,
  getPhraseFilterValue,
  getDisplayValueFromFilter,

  compareFilters,
  COMPARE_ALL_OPTIONS,
  generateFilters,
  onlyDisabledFiltersChanged,

  changeTimeFilter,
  convertRangeFilterToTimeRangeString,
  mapAndFlattenFilters,
  extractTimeFilter,
  extractTimeRange,
};

export {
  RangeFilter,
  RangeFilterMeta,
  RangeFilterParams,
  ExistsFilter,
  PhrasesFilter,
  PhraseFilter,
  CustomFilter,
  MatchAllFilter,
} from '../common';

/*
 * opensearchQuery and opensearchKuery:
 */

import {
  fromKueryExpression,
  toOpenSearchQuery,
  nodeTypes,
  buildOpenSearchQuery,
  getOpenSearchQueryConfig,
  buildQueryFromFilters,
  luceneStringToDsl,
  decorateQuery,
} from '../common';

export const opensearchKuery = {
  nodeTypes,
  fromKueryExpression,
  toOpenSearchQuery,
};

export const opensearchQuery = {
  buildOpenSearchQuery,
  getOpenSearchQueryConfig,
  buildQueryFromFilters,
  luceneStringToDsl,
  decorateQuery,
};

export { OpenSearchQueryConfig, KueryNode } from '../common';

/*
 * Field Formatters:
 */

import {
  FieldFormat,
  FieldFormatsRegistry,
  DEFAULT_CONVERTER_COLOR,
  HTML_CONTEXT_TYPE,
  TEXT_CONTEXT_TYPE,
  FIELD_FORMAT_IDS,
  BoolFormat,
  BytesFormat,
  ColorFormat,
  DurationFormat,
  IpFormat,
  NumberFormat,
  PercentFormat,
  RelativeDateFormat,
  SourceFormat,
  StaticLookupFormat,
  UrlFormat,
  StringFormat,
  TruncateFormat,
} from '../common/field_formats';

import { DateNanosFormat, DateFormat } from './field_formats';
export { baseFormattersPublic, FieldFormatsStart } from './field_formats';

// Field formats helpers namespace:
export const fieldFormats = {
  FieldFormat,
  FieldFormatsRegistry, // exported only for tests. Consider mock.

  DEFAULT_CONVERTER_COLOR,
  HTML_CONTEXT_TYPE,
  TEXT_CONTEXT_TYPE,
  FIELD_FORMAT_IDS,

  BoolFormat,
  BytesFormat,
  ColorFormat,
  DateFormat,
  DateNanosFormat,
  DurationFormat,
  IpFormat,
  NumberFormat,
  PercentFormat,
  RelativeDateFormat,
  SourceFormat,
  StaticLookupFormat,
  UrlFormat,
  StringFormat,
  TruncateFormat,
};

export {
  IFieldFormat,
  FieldFormatInstanceType,
  IFieldFormatsRegistry,
  FieldFormatsContentType,
  FieldFormatsGetConfigFn,
  FieldFormatConfig,
  FieldFormatId,
  FieldFormat,
  DATA_FRAME_TYPES,
} from '../common';

/*
 * Data views:
 */

import {
  isDataViewFieldNested,
  isDataViewFieldFilterable,
  setDataViewFieldOverrides,
  getDataViewOverrides,
} from '../common';

import {
  ILLEGAL_CHARACTERS_KEY as DATA_VIEWS_ILLEGAL_CHARACTERS_KEY,
  CONTAINS_SPACES_KEY as DATA_VIEWS_CONTAINS_SPACES_KEY,
  ILLEGAL_CHARACTERS_VISIBLE as DATA_VIEWS_ILLEGAL_CHARACTERS_VISIBLE,
  ILLEGAL_CHARACTERS as DATA_VIEWS_ILLEGAL_CHARACTERS,
  isDefault as isDefaultDataView,
  validateDataView,
  getFromSavedObject as getDataViewFromSavedObject,
  flattenHitWrapper as flattenHitWrapperDataView,
  formatHitProvider as formatHitProviderDataView,
} from './data_views';

export type { DataViewsService } from './data_views';

// Data views namespace:
export const dataViews = {
  DATA_VIEWS_ILLEGAL_CHARACTERS_KEY,
  DATA_VIEWS_CONTAINS_SPACES_KEY,
  DATA_VIEWS_ILLEGAL_CHARACTERS_VISIBLE,
  DATA_VIEWS_ILLEGAL_CHARACTERS,
  isDefault: isDefaultDataView,
  isFilterable: isDataViewFieldFilterable,
  setOverrides: setDataViewFieldOverrides,
  getOverrides: getDataViewOverrides,
  isNestedField: isDataViewFieldNested,
  validate: validateDataView,
  getFromSavedObject: getDataViewFromSavedObject,
  flattenHitWrapper: flattenHitWrapperDataView,
  formatHitProvider: formatHitProviderDataView,
};

export { DataViewsContract, DataView, IDataViewFieldList, DataViewField } from './data_views';

export {
  IDataView,
  IDataViewFieldType,
  IDataViewFieldSubType,
  OPENSEARCH_FIELD_TYPES as OPENSEARCH_DATA_VIEW_FIELD_TYPES,
  OSD_FIELD_TYPES as OSD_DATA_VIEW_FIELD_TYPES,
  DataViewAttributes,
  UI_SETTINGS as UI_SETTINGS_DATA_VIEWS,
  TypeMeta as DataViewTypeMeta,
  AggregationRestrictions as DataViewAggRestrictions,
  DataViewSpec,
  dataViewFieldList,
} from '../common';

export { DuplicateDataViewError } from '../common/data_views/errors';

/*
 * Index patterns:
 */

import { isNestedField, isFilterable, setOverrides, getOverrides } from '../common';

import {
  ILLEGAL_CHARACTERS_KEY,
  CONTAINS_SPACES_KEY,
  ILLEGAL_CHARACTERS_VISIBLE,
  ILLEGAL_CHARACTERS,
  isDefault,
  validateIndexPattern,
  getFromSavedObject,
  flattenHitWrapper,
  formatHitProvider,
} from './index_patterns';

export type { IndexPatternsService } from './index_patterns';

// Index patterns namespace:
export const indexPatterns = {
  ILLEGAL_CHARACTERS_KEY,
  CONTAINS_SPACES_KEY,
  ILLEGAL_CHARACTERS_VISIBLE,
  ILLEGAL_CHARACTERS,
  isDefault,
  isFilterable,
  setOverrides,
  getOverrides,
  isNestedField,
  validate: validateIndexPattern,
  getFromSavedObject,
  flattenHitWrapper,
  formatHitProvider,
};

export {
  IndexPatternsContract,
  IndexPattern,
  IIndexPatternFieldList,
  IndexPatternField,
} from './index_patterns';

export {
  IIndexPattern,
  IFieldType,
  IFieldSubType,
  OPENSEARCH_FIELD_TYPES,
  OSD_FIELD_TYPES,
  IndexPatternAttributes,
  UI_SETTINGS,
  TypeMeta as IndexPatternTypeMeta,
  AggregationRestrictions as IndexPatternAggRestrictions,
  IndexPatternSpec,
  fieldList,
} from '../common';

export { DuplicateIndexPatternError } from '../common/index_patterns/errors';

/*
 * Autocomplete query suggestions:
 */

export {
  QuerySuggestion,
  QuerySuggestionTypes,
  QuerySuggestionGetFn,
  QuerySuggestionGetFnArgs,
  QuerySuggestionBasic,
  QuerySuggestionField,
  AutocompleteStart,
} from './autocomplete';

/*
 * Search:
 */

import {
  // aggs
  CidrMask,
  intervalOptions,
  isDateHistogramBucketAggConfig,
  isNumberType,
  isStringType,
  isType,
  parentPipelineType,
  propFilter,
  siblingPipelineType,
  termsAggFilter,
  dateHistogramInterval,
  InvalidOpenSearchCalendarIntervalError,
  InvalidOpenSearchIntervalFormatError,
  Ipv4Address,
  isValidOpenSearchInterval,
  isValidInterval,
  parseOpenSearchInterval,
  parseInterval,
  toAbsoluteDates,
  // expressions utils
  getRequestInspectorStats,
  getResponseInspectorStats,
  // tabify
  tabifyAggResponse,
  tabifyGetColumns,
} from '../common';

export {
  // aggs
  AggConfigSerialized,
  AggGroupLabels,
  AggGroupName,
  AggGroupNames,
  AggParam,
  AggParamOption,
  AggParamType,
  AggConfigOptions,
  BUCKET_TYPES,
  OpenSearchaggsExpressionFunctionDefinition,
  IAggConfig,
  IAggConfigs,
  IAggType,
  IFieldParamType,
  IMetricAggType,
  METRIC_TYPES,
  OptionedParamType,
  OptionedValueProp,
  ParsedInterval,
  // tabify
  TabbedAggColumn,
  TabbedAggRow,
  TabbedTable,
} from '../common';

export type { AggConfigs, AggConfig } from '../common';

export {
  // search
  OPENSEARCH_SEARCH_STRATEGY,
  OpenSearchQuerySortValue,
  extractSearchSourceReferences,
  getOpenSearchPreference,
  getSearchParamsFromRequest,
  IOpenSearchSearchRequest,
  IOpenSearchSearchResponse,
  IOpenSearchDashboardsSearchRequest,
  IOpenSearchDashboardsSearchResponse,
  injectSearchSourceReferences,
  ISearch,
  ISearchSetup,
  ISearchStart,
  ISearchStartSearchSource,
  ISearchGeneric,
  ISearchSource,
  parseSearchSourceJSON,
  SearchInterceptor,
  SearchInterceptorDeps,
  SearchRequest,
  SearchSourceFields,
  SortDirection,
  // expression functions and types
  OpenSearchdslExpressionFunctionDefinition,
  OpenSearchRawResponseExpressionTypeDefinition,
  // errors
  SearchError,
  SearchTimeoutError,
  PainlessError,
} from './search';

export type { SearchSource } from './search';

export { ISearchOptions, isErrorResponse, isCompleteResponse, isPartialResponse } from '../common';

// Search namespace
export const search = {
  aggs: {
    CidrMask,
    dateHistogramInterval,
    intervalOptions,
    InvalidOpenSearchCalendarIntervalError,
    InvalidOpenSearchIntervalFormatError,
    Ipv4Address,
    isDateHistogramBucketAggConfig, // TODO: remove in build_pipeline refactor
    isNumberType,
    isStringType,
    isType,
    isValidOpenSearchInterval,
    isValidInterval,
    parentPipelineType,
    parseOpenSearchInterval,
    parseInterval,
    propFilter,
    siblingPipelineType,
    termsAggFilter,
    toAbsoluteDates,
  },
  getRequestInspectorStats,
  getResponseInspectorStats,
  tabifyAggResponse,
  tabifyGetColumns,
};

/*
 * UI components
 */

export {
  SearchBar,
  SearchBarProps,
  StatefulSearchBarProps,
  DatasetSelectProps,
  IndexPatternSelectProps,
  QueryStringInput,
  QueryStringInputProps,
  QueryEditor,
  QueryEditorExtensionConfig,
  QueryEditorExtensions,
  QueryEditorExtensionDependencies,
  QueryEditorProps,
  QueryEditorTopRow,
  // for BWC, keeping the old name
  IUiStart as DataPublicPluginStartUi,
  useQueryStringManager,
  getEffectiveLanguageForAutoComplete,
} from './ui';

/**
 * Types to be shared externally
 * @public
 */
export { Filter, Query, RefreshInterval, TimeRange } from '../common';

export {
  createSavedQueryService,
  connectStorageToQueryState,
  useConnectStorageToQueryState,
  connectToQueryState,
  syncQueryStateWithUrl,
  useSyncQueryStateWithUrl,
  QueryState,
  getDefaultQuery,
  FilterManager,
  QueryStringContract,
  QueryStringManager,
  DatasetTypeConfig,
  DatasetService,
  DatasetServiceContract,
  LanguageConfig,
  LanguageService,
  LanguageServiceContract,
  RecentQueriesTable,
  QueryControls,
  QueryResult,
  QueryStatus,
  ResultStatus,
  SavedQuery,
  SavedQueryService,
  SavedQueryTimeFilter,
  InputTimeRange,
  TimeHistory,
  TimefilterContract,
  TimeHistoryContract,
  QueryStateChange,
  QueryStart,
  PersistedLog,
  LanguageReference,
  DatasetIndexedViewsService,
  validateTimeRange,
} from './query';

export { useSavedQuery } from './ui/search_bar';

export { AggsStart } from './search/aggs';

export {
  getTime,
  // osd field types
  castOpenSearchToOsdFieldTypeName,
  getOsdTypeNames,
  getOsdFieldOverrides,
  setOsdFieldOverrides,
} from '../common';

export { isTimeRange, isQuery, isFilter, isFilters } from '../common';

export { ACTION_GLOBAL_APPLY_FILTER, ApplyGlobalFilterActionContext } from './actions';

export * from '../common/field_mapping';

/*
 * Plugin setup
 */

import { DataPublicPlugin } from './plugin';

export function plugin(initializerContext: PluginInitializerContext<ConfigSchema>) {
  return new DataPublicPlugin(initializerContext);
}

export {
  DataPublicPluginSetup,
  DataPublicPluginStart,
  IDataPluginServices,
  DataPublicPluginStartActions,
} from './types';

// Export plugin after all other imports
export { DataPublicPlugin as Plugin };

// Export datasources
export {
  DataSource,
  IDataSourceMetadata,
  IDataSetParams,
  IDataSourceQueryParams,
  IDataSourceQueryResult,
  IDataSourceDataSet,
  DataSourceConnectionStatus,
  DataSourceFactory,
} from './data_sources/datasource';
export {
  DataSourceRegistrationError,
  DataSourceService,
  IDataSourceFilter,
  IDataSourceRegistrationResult,
} from './data_sources/datasource_services';
export {
  DataSourceSelectable,
  DataSourceSelectableProps,
  DataSourceGroup,
  DataSourceOption,
} from './data_sources/datasource_selector';

export { SavedQueryManagementComponent } from './ui/saved_query_management';
export { SaveQueryForm, SavedQueryMeta } from './ui/saved_query_form';
