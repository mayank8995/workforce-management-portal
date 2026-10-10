import { ArrowRight, Briefcase } from 'lucide-react';
import {
  CARD_CONTENT_LIMIT_TO_SCROLL,
  PROJECT_DETAILS,
  RISK_STATUS,
  VIEW_MORE,
  VIEW_MORE_ROUTES_VALUES,
} from '../../utils/constants';
import React from 'react';
import { Link } from 'react-router-dom';
import type { TopProjectsList } from '../../types/types';
import ErrorPage from '../Error/ErrorPage';
import { loadViewMorePage } from '../../router/router';
import {
  button,
  card,
  cx,
  icon,
  skeleton,
  text,
  toneBadge,
  toneSolid,
} from '../../theme/theme';

const TopProjectsCard = ({
  topProjects,
  title,
  isError,
  isLoading,
  refetch,
}: TopProjectsList) => {
  const topProj = topProjects?.employees;

  return (
    <div className={cx(card.panel, 'p-4 xl:p-5 gap-3 overflow-visible')}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center justify-center">
          <div className="mr-2 h-5 w-5 xl:h-6 xl:w-6 rounded-lg flex items-center justify-center">
            {<Briefcase className={icon.highlight} />}
          </div>
          <h1 className={cx(card.title, 'flex items-center')}>{title}</h1>
        </div>
      </div>
      <>
        {!isLoading ? (
          <>
            {!isError ? (
              <div className="flex-1 flex flex-col justify-evenly">
                {Array.isArray(topProj) &&
                  topProj?.map((value, index: number) => {
                    return (
                      <React.Fragment key={value.name + index}>
                        {index < CARD_CONTENT_LIMIT_TO_SCROLL && (
                          <div className="flex flex-row mb-2 flex-1 min-w-0">
                            {RISK_STATUS.COMPLETED === value?.riskStatus && (
                              <div
                                className={cx(
                                  'h-auto w-1.5 xl:w-2 rounded-full',
                                  toneSolid.accent
                                )}
                              ></div>
                            )}
                            {RISK_STATUS.AT_RISK === value?.riskStatus && (
                              <div
                                className={cx(
                                  'h-auto w-1.5 xl:w-2 rounded-full',
                                  toneSolid.danger
                                )}
                              ></div>
                            )}
                            {RISK_STATUS.ON_TRACK === value?.riskStatus && (
                              <div
                                className={cx(
                                  'h-auto w-1.5 xl:w-2 rounded-full',
                                  toneSolid.success
                                )}
                              ></div>
                            )}
                            <div className="p-2 flex flex-row justify-between max-xs:flex-col max-xs:gap-2 w-full flex-1 min-w-0">
                              <div className="flex flex-col gap-1 min-w-0">
                                <span
                                  className={cx(
                                    text.primary,
                                    'font-bold text-sm truncate'
                                  )}
                                >
                                  {value?.projectName}
                                </span>
                                <span
                                  className={cx(
                                    text.muted,
                                    'mb-1 text-xs font-bold truncate'
                                  )}
                                >
                                  {PROJECT_DETAILS.MANAGER}:&nbsp;
                                  {value?.name && value?.name.length > 20
                                    ? value.name
                                        .split(' ')
                                        .map((n: string) => n[0])
                                        .join('')
                                    : value.name}
                                </span>
                              </div>
                              <div className="shrink-0 self-start max-xs:self-end min-w-0 items-center flex justify-end">
                                <span
                                  className={toneBadge(
                                    RISK_STATUS.AT_RISK === value?.riskStatus
                                      ? 'caution'
                                      : 'success'
                                  )}
                                >
                                  {value?.riskStatus}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
              </div>
            ) : (
              <ErrorPage refetchAll={() => refetch?.()} />
            )}
          </>
        ) : (
          <div className="flex-1 flex flex-col justify-evenly">
            {Array.from({ length: 5 }, (_, index) => index + 1)?.map(
              (_, index) => (
                <React.Fragment key={`w-9-${index}`}>
                  <div className="flex flex-row mb-2">
                    <div className={cx('w-2 h-9 rounded-full', skeleton.fill)}>
                      <h1
                        className={cx(skeleton.block, 'w-2 h-9 rounded-full')}
                      ></h1>
                    </div>
                    <div className="p-2 flex flex-row justify-between w-full">
                      <div className="flex flex-col justify-between">
                        <span
                          className={cx(skeleton.block, 'h-2 w-10 mb-2')}
                        ></span>
                        <span
                          className={cx(skeleton.block, 'h-2 w-10 mb-1 flex')}
                        ></span>
                      </div>
                      <div className="items-center flex justify-end">
                        <span className={cx(skeleton.block, 'h-2 w-10')}></span>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )
            )}
          </div>
        )}
      </>
      {Array.isArray(topProj) && (
        <div className="flex flex-col items-end">
          <Link
            className={button.linkMd}
            to="/home/dashboard/viewmore?target=topProjects"
            state={{ name: VIEW_MORE_ROUTES_VALUES.top_projects }}
            onMouseEnter={() => {
              loadViewMorePage();
            }}
            onPointerDown={() => loadViewMorePage()}
          >
            <span>{VIEW_MORE}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default React.memo(TopProjectsCard);
