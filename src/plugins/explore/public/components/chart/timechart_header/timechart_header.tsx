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

import React, { useState, useEffect, useCallback } from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiToolTip,
  EuiText,
  EuiSelect,
  EuiIconTip,
} from '@elastic/eui';
import { I18nProvider } from '@osd/i18n/react';
import { i18n } from '@osd/i18n';
import moment from 'moment';
import { DiscoverChartToggleId } from '../utils/use_persist_chart_state';

export interface TimechartHeaderBucketInterval {
  scaled?: boolean;
  description?: string;
  scale?: number;
}

export interface TimechartHeaderProps {
  /**
   * Format of date to be displayed
   */
  dateFormat?: string;
  /**
   * Interval for the buckets of the recent request
   */
  bucketInterval?: {
    scaled?: boolean;
    description?: string;
    scale?: number;
  };
  /**
   * Range of dates to be displayed
   */
  timeRange?: {
    from: string;
    to: string;
  };
  /**
   * Interval Options
   */
  options: Array<{ display: string; val: string }>;
  /**
   * changes the interval
   */
  onChangeInterval: (interval: string) => void;
  /**
   * selected interval
   */
  stateInterval: string;
  /**
   * Toggle the displaying of histogram or results summary
   */
  toggleIdSelected: DiscoverChartToggleId;

  additionalControl: any;
}

export function TimechartHeader({
  bucketInterval,
  dateFormat,
  timeRange,
  options,
  onChangeInterval,
  stateInterval,
  additionalControl,
  toggleIdSelected,
}: TimechartHeaderProps) {
  const [interval, setInterval] = useState(stateInterval);

  const toMoment = useCallback(
    (datetime: string) => {
      if (!datetime) {
        return '';
      }
      if (!dateFormat) {
        return datetime;
      }
      return moment(datetime).format(dateFormat);
    },
    [dateFormat]
  );

  useEffect(() => {
    setInterval(stateInterval);
  }, [stateInterval]);

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInterval(e.target.value);
    onChangeInterval(e.target.value);
  };

  if (!timeRange || !bucketInterval) {
    return null;
  }

  return (
    <I18nProvider>
      <EuiFlexGroup gutterSize="s" responsive alignItems="center" justifyContent="flexEnd">
        <EuiFlexItem grow={false} className="exploreChart__TimechartHeader__logCount">
          <EuiText
            className="exploreChart__TimechartHeader__logCount__text"
            data-test-subj="discoverTimechartHeaderLogCount"
            size="s"
          >
            {i18n.translate('explore.discover.timechartHeader.logCount', {
              defaultMessage: 'Log count',
            })}
          </EuiText>
        </EuiFlexItem>
        {toggleIdSelected === 'histogram' && (
          <>
            <EuiFlexItem grow={false}>
              <EuiToolTip
                content={i18n.translate('explore.discover.howToChangeTheTimeTooltip', {
                  defaultMessage: 'To change the time, use the global time filter above',
                })}
                delay="long"
              >
                <EuiText data-test-subj="discoverIntervalDateRange" size="s">
                  {`${toMoment(timeRange.from)} - ${toMoment(timeRange.to)} ${
                    interval !== 'auto'
                      ? i18n.translate('explore.discover.timechartHeader.timeIntervalSelect.per', {
                          defaultMessage: 'per',
                        })
                      : ''
                  }`}
                </EuiText>
              </EuiToolTip>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiSelect
                className="exploreChart__TimechartHeader__selection"
                aria-label={i18n.translate(
                  'explore.discover.timechartHeader.timeIntervalSelect.ariaLabel',
                  {
                    defaultMessage: 'Time interval',
                  }
                )}
                compressed
                id="dscResultsIntervalSelector"
                data-test-subj="discoverIntervalSelect"
                options={options
                  .filter(({ val }) => val !== 'custom')
                  .map(({ display, val }) => {
                    return {
                      text: display,
                      value: val,
                      label: display,
                    };
                  })}
                value={interval}
                onChange={handleIntervalChange}
                prepend={
                  <EuiText
                    className="exploreChart__TimechartHeader__selection__prependText"
                    data-test-subj="discoverTimechartHeaderInterval"
                    size="s"
                  >
                    {i18n.translate('explore.discover.timechartHeader.interval', {
                      defaultMessage: 'Interval',
                    })}
                  </EuiText>
                }
                append={
                  bucketInterval.scaled ? (
                    <EuiIconTip
                      id="discoverIntervalIconTip"
                      content={i18n.translate('explore.discover.bucketIntervalTooltip', {
                        defaultMessage:
                          'This interval creates {bucketsDescription} to show in the selected time range, so it has been scaled to {bucketIntervalDescription}.',
                        values: {
                          bucketsDescription:
                            bucketInterval!.scale && bucketInterval!.scale > 1
                              ? i18n.translate(
                                  'explore.explore.discover.bucketIntervalTooltip.tooLargeBucketsText',
                                  {
                                    defaultMessage: 'buckets that are too large',
                                  }
                                )
                              : i18n.translate(
                                  'explore.explore.discover.bucketIntervalTooltip.tooManyBucketsText',
                                  {
                                    defaultMessage: 'too many buckets',
                                  }
                                ),
                          bucketIntervalDescription: bucketInterval.description,
                        },
                      })}
                      color="warning"
                      size="s"
                      type="alert"
                    />
                  ) : undefined
                }
              />
            </EuiFlexItem>
          </>
        )}
        {additionalControl}
      </EuiFlexGroup>
    </I18nProvider>
  );
}
