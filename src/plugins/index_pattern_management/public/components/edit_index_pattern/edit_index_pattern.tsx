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

import { filter } from 'lodash';
import React, { useEffect, useState, useCallback } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiBadge,
  EuiText,
  EuiLink,
  EuiCallOut,
  EuiPanel,
} from '@elastic/eui';
import { i18n } from '@osd/i18n';
import { FormattedMessage } from '@osd/i18n/react';
import { IndexPattern, IndexPatternField } from '../../../../../plugins/data/public';
import { useOpenSearchDashboards } from '../../../../opensearch_dashboards_react/public';
import { IndexPatternManagmentContext } from '../../types';
import { Tabs } from './tabs';
import { IndexHeader } from './index_header';
import { IndexPatternTableItem } from '../types';
import { getIndexPatterns } from '../utils';
import { TopNavControlDescriptionData } from '../../../../navigation/public';

export interface EditIndexPatternProps extends RouteComponentProps {
  indexPattern: IndexPattern;
}

const mappingAPILink = i18n.translate(
  'indexPatternManagement.editIndexPattern.timeFilterLabel.mappingAPILink',
  {
    defaultMessage: 'Mapping API',
  }
);

const mappingConflictHeader = i18n.translate(
  'indexPatternManagement.editIndexPattern.mappingConflictHeader',
  {
    defaultMessage: 'Mapping conflict',
  }
);

const confirmMessage = i18n.translate('indexPatternManagement.editIndexPattern.refreshLabel', {
  defaultMessage: 'This action resets the popularity counter of each field.',
});

const confirmModalOptionsRefresh = {
  confirmButtonText: i18n.translate('indexPatternManagement.editIndexPattern.refreshButton', {
    defaultMessage: 'Refresh',
  }),
  title: i18n.translate('indexPatternManagement.editIndexPattern.refreshHeader', {
    defaultMessage: 'Refresh field list?',
  }),
};

const confirmModalOptionsDelete = {
  confirmButtonText: i18n.translate('indexPatternManagement.editIndexPattern.deleteButton', {
    defaultMessage: 'Delete',
  }),
  title: i18n.translate('indexPatternManagement.editIndexPattern.deleteHeader', {
    defaultMessage: 'Delete index pattern?',
  }),
};

export const EditIndexPattern = withRouter(
  ({ indexPattern, history, location }: EditIndexPatternProps) => {
    const {
      uiSettings,
      indexPatternManagementStart,
      overlays,
      savedObjects,
      chrome,
      data,
      docLinks,
      navigationUI: { HeaderControl },
      application,
    } = useOpenSearchDashboards<IndexPatternManagmentContext>().services;
    const [fields, setFields] = useState<IndexPatternField[]>(indexPattern.getNonScriptedFields());
    const [conflictedFields, setConflictedFields] = useState<IndexPatternField[]>(
      indexPattern.fields.getAll().filter((field) => field.type === 'conflict')
    );
    const [defaultIndex, setDefaultIndex] = useState<string>(uiSettings.get('defaultIndex'));
    const [tags, setTags] = useState<any[]>([]);

    useEffect(() => {
      setFields(indexPattern.getNonScriptedFields());
      setConflictedFields(
        indexPattern.fields.getAll().filter((field) => field.type === 'conflict')
      );
    }, [indexPattern]);

    useEffect(() => {
      const indexPatternTags =
        indexPatternManagementStart.list.getIndexPatternTags(
          indexPattern,
          indexPattern.id === defaultIndex
        ) || [];
      setTags(indexPatternTags);
    }, [defaultIndex, indexPattern, indexPatternManagementStart.list]);

    const setDefaultPattern = useCallback(async () => {
      const isSuccess = await uiSettings.set('defaultIndex', indexPattern.id);
      if (isSuccess) {
        setDefaultIndex(indexPattern.id || '');
      }
    }, [uiSettings, indexPattern.id]);

    const refreshFields = () => {
      overlays.openConfirm(confirmMessage, confirmModalOptionsRefresh).then(async (isConfirmed) => {
        if (isConfirmed) {
          await data.indexPatterns.refreshFields(indexPattern);
          await data.indexPatterns.updateSavedObject(indexPattern);
          setFields(indexPattern.getNonScriptedFields());
        }
      });
    };

    const removePattern = () => {
      async function doRemove() {
        if (indexPattern.id === defaultIndex) {
          const indexPatterns: IndexPatternTableItem[] = await getIndexPatterns(
            savedObjects.client,
            uiSettings.get('defaultIndex'),
            indexPatternManagementStart
          );
          uiSettings.remove('defaultIndex');
          const otherPatterns = filter(indexPatterns, (pattern) => {
            return pattern.id !== indexPattern.id;
          });

          if (otherPatterns.length) {
            uiSettings.set('defaultIndex', otherPatterns[0].id);
          }
        }
        if (indexPattern.id) {
          Promise.resolve(data.indexPatterns.delete(indexPattern.id)).then(function () {
            const datasetService = data.query.queryString.getDatasetService();
            // @ts-expect-error TS2345 TODO(ts-error): fixme
            datasetService.removeFromRecentDatasets(indexPattern.id);
            history.push('');
          });
        }
      }

      overlays.openConfirm('', confirmModalOptionsDelete).then((isConfirmed) => {
        if (isConfirmed) {
          doRemove();
        }
      });
    };

    const timeFilterHeader = i18n.translate(
      'indexPatternManagement.editIndexPattern.timeFilterHeader',
      {
        defaultMessage: "Time field: '{timeFieldName}'",
        values: { timeFieldName: indexPattern.timeFieldName },
      }
    );

    const mappingConflictLabel = i18n.translate(
      'indexPatternManagement.editIndexPattern.mappingConflictLabel',
      {
        defaultMessage:
          '{conflictFieldsLength, plural, one {A field is} other {# fields are}} defined as several types (string, integer, etc) across the indices that match this pattern. You may still be able to use these conflict fields in parts of OpenSearch Dashboards, but they will be unavailable for functions that require OpenSearch Dashboards to know their type. Correcting this issue will require reindexing your data.',
        values: { conflictFieldsLength: conflictedFields.length },
      }
    );

    const headingAriaLabel = i18n.translate('indexPatternManagement.editIndexPattern.detailsAria', {
      defaultMessage: 'Index pattern details',
    });

    chrome.docTitle.change(indexPattern.title);

    const showTagsSection = Boolean(indexPattern.timeFieldName || (tags && tags.length > 0));

    const useUpdatedUX = uiSettings.get('home:useNewHomePage');

    const renderDescription = () => {
      const descriptionText = (
        <FormattedMessage
          id="indexPatternManagement.editIndexPattern.timeFilterLabel.timeFilterDetail"
          defaultMessage="This page lists every field in the {indexPatternTitle} index and the field's associated core type as recorded by OpenSearch. To change a field type, use the OpenSearch"
          values={{ indexPatternTitle: <strong>{indexPattern.title}</strong> }}
        />
      );

      return useUpdatedUX ? (
        <HeaderControl
          controls={[
            {
              description: (descriptionText as unknown) as string,
              links: [
                {
                  href: docLinks.links.opensearch.indexTemplates.base,
                  controlType: 'link',
                  target: '_blank',
                  flush: 'both',
                  label: mappingAPILink,
                },
              ],
            } as TopNavControlDescriptionData,
          ]}
          setMountPoint={application.setAppDescriptionControls}
        />
      ) : (
        <EuiText size="s">
          <p>
            {descriptionText}{' '}
            <EuiLink href={docLinks.links.opensearch.indexTemplates.base} target="_blank" external>
              {mappingAPILink}
            </EuiLink>
          </p>
        </EuiText>
      );
    };

    const renderBadges = () => {
      if (useUpdatedUX) {
        const components = [
          ...(Boolean(indexPattern.timeFieldName)
            ? [<EuiBadge color="warning">{timeFilterHeader}</EuiBadge>]
            : []),
          ...tags.map((tag: any) => <EuiBadge color="hollow">{tag.name}</EuiBadge>),
        ];
        const controls = components.map((component) => ({
          renderComponent: component,
        }));

        return (
          <HeaderControl controls={[...controls]} setMountPoint={application.setAppBadgeControls} />
        );
      } else {
        return (
          <EuiFlexGroup wrap>
            {Boolean(indexPattern.timeFieldName) && (
              <EuiFlexItem grow={false}>
                <EuiBadge color="warning">{timeFilterHeader}</EuiBadge>
              </EuiFlexItem>
            )}
            {tags.map((tag: any) => (
              <EuiFlexItem grow={false} key={tag.key}>
                <EuiBadge color="hollow">{tag.name}</EuiBadge>
              </EuiFlexItem>
            ))}
          </EuiFlexGroup>
        );
      }
    };

    return useUpdatedUX ? (
      <div data-test-subj="editIndexPattern" role="region" aria-label={headingAriaLabel}>
        <IndexHeader
          indexPattern={indexPattern}
          setDefault={setDefaultPattern}
          refreshFields={refreshFields}
          deleteIndexPatternClick={removePattern}
          defaultIndex={defaultIndex}
        />
        {showTagsSection && renderBadges()}
        {renderDescription()}
        {conflictedFields.length > 0 && (
          <>
            <EuiSpacer />
            <EuiCallOut title={mappingConflictHeader} color="warning" iconType="alert">
              <p>{mappingConflictLabel}</p>
            </EuiCallOut>
          </>
        )}
        <Tabs
          indexPattern={indexPattern}
          saveIndexPattern={data.indexPatterns.updateSavedObject.bind(data.indexPatterns)}
          fields={fields}
          history={history}
          location={location}
        />
      </div>
    ) : (
      <EuiPanel paddingSize={'l'}>
        <div data-test-subj="editIndexPattern" role="region" aria-label={headingAriaLabel}>
          <IndexHeader
            indexPattern={indexPattern}
            setDefault={setDefaultPattern}
            refreshFields={refreshFields}
            deleteIndexPatternClick={removePattern}
            defaultIndex={defaultIndex}
          />
          <EuiSpacer size="s" />
          {showTagsSection && renderBadges()}
          <EuiSpacer size="m" />
          {renderDescription()}
          {conflictedFields.length > 0 && (
            <>
              <EuiSpacer />
              <EuiCallOut title={mappingConflictHeader} color="warning" iconType="alert">
                <p>{mappingConflictLabel}</p>
              </EuiCallOut>
            </>
          )}
          <EuiSpacer />
          <Tabs
            indexPattern={indexPattern}
            saveIndexPattern={data.indexPatterns.updateSavedObject.bind(data.indexPatterns)}
            fields={fields}
            history={history}
            location={location}
          />
        </div>
      </EuiPanel>
    );
  }
);
