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

import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { FieldMapping, DocViewFilterFn } from '../../doc_views/doc_views_types';
import { DocViewTableRowBtnFilterAdd } from './table_row_btn_filter_add';
import { DocViewTableRowBtnFilterRemove } from './table_row_btn_filter_remove';
import { DocViewTableRowBtnToggleColumn } from './table_row_btn_toggle_column';
import { DocViewTableRowBtnCollapse } from './table_row_btn_collapse';
import { DocViewTableRowBtnFilterExists } from './table_row_btn_filter_exists';
import { DocViewTableRowIconNoMapping } from './table_row_icon_no_mapping';
import { DocViewTableRowIconUnderscore } from './table_row_icon_underscore';
import { FieldName } from '../field_name/field_name';

export interface Props {
  field: string;
  fieldMapping?: FieldMapping;
  fieldType: string;
  displayNoMappingWarning: boolean;
  displayUnderscoreWarning: boolean;
  isCollapsible: boolean;
  isColumnActive: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onFilter?: DocViewFilterFn;
  onToggleColumn?: () => void;
  value: string | ReactNode;
  valueRaw: unknown;
}

export function DocViewTableRow({
  field,
  fieldMapping,
  fieldType,
  displayNoMappingWarning,
  displayUnderscoreWarning,
  isCollapsible,
  isCollapsed,
  isColumnActive,
  onFilter,
  onToggleCollapse,
  onToggleColumn,
  value,
  valueRaw,
}: Props) {
  const valueClassName = classNames({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    osdDocViewer__value: true,
    'truncate-by-height': isCollapsible && isCollapsed,
  });

  return (
    <tr key={field} data-test-subj={`tableDocViewRow-${field}`}>
      {typeof onFilter === 'function' && (
        <td className="osdDocViewer__buttons" data-test-subj="osdDocViewerButtons">
          <DocViewTableRowBtnFilterAdd
            disabled={!fieldMapping || !fieldMapping.filterable}
            onClick={() => onFilter(fieldMapping, valueRaw, '+')}
          />
          <DocViewTableRowBtnFilterRemove
            disabled={!fieldMapping || !fieldMapping.filterable}
            onClick={() => onFilter(fieldMapping, valueRaw, '-')}
          />
          {typeof onToggleColumn === 'function' && (
            <DocViewTableRowBtnToggleColumn active={isColumnActive} onClick={onToggleColumn} />
          )}
          <DocViewTableRowBtnFilterExists
            disabled={!fieldMapping || !fieldMapping.filterable}
            onClick={() => onFilter('_exists_', field, '+')}
            scripted={fieldMapping && fieldMapping.scripted}
          />
        </td>
      )}
      <td className="osdDocViewer__field" data-test-subj="osdDocViewerField">
        <FieldName
          fieldName={field}
          fieldType={fieldType}
          fieldIconProps={{ fill: 'none', color: 'gray' }}
          scripted={Boolean(fieldMapping?.scripted)}
        />
      </td>
      <td>
        {isCollapsible && (
          <DocViewTableRowBtnCollapse onClick={onToggleCollapse} isCollapsed={isCollapsed} />
        )}
        {displayUnderscoreWarning && <DocViewTableRowIconUnderscore />}
        {displayNoMappingWarning && <DocViewTableRowIconNoMapping />}
        <div
          className={valueClassName}
          data-test-subj={`tableDocViewRow-${field}-value`}
          /*
           * Justification for dangerouslySetInnerHTML:
           * We just use values encoded by our field formatters
           */
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: value as string }}
        />
      </td>
    </tr>
  );
}
