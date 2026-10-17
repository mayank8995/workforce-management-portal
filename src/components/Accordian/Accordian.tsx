import React, { useState } from 'react';
import type { AccordionSection, Employee } from '../../types/types';
import { extract } from '../../services/utils.service';
import { FIELD_LABELS } from '../../utils/constants';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { card, cx, text } from '../../theme/theme';

interface Accordian {
  accordian: AccordionSection;
  content: Employee;
}
export default function Accordion({
  accordian,
  content,
}: Accordian): React.ReactElement {
  const [openAccordian, setOpenAccordian] = useState(
    () => accordian.initialState
  );
  function handleAccordian() {
    setOpenAccordian((prev) => !prev);
  }

  function rendeFields() {
    try {
      return (
        <>
          {accordian?.fields?.map((field) => {
            let value = null;
            let rowLabel = null;
            if (
              field.indexOf('$') !== -1 &&
              accordian.fieldType === 'array-objects'
            ) {
              const title = field?.split('$')?.[0];
              if (title.length) {
                value = extract(content, field.split('$'));
                rowLabel =
                  FIELD_LABELS[field.split('$')?.[0] as keyof Employee];
                return (
                  <React.Fragment key={`item-${field}`}>
                    <div className="flex flex-row justify-between gap-2">
                      <h2
                        title={rowLabel}
                        className={cx(
                          text.muted,
                          'text-xs xl:text-sm font-medium'
                        )}
                      >
                        {rowLabel}
                      </h2>
                      {value?.map((val) => (
                        <h2
                          title={val}
                          key={val}
                          className={cx(
                            text.primary,
                            'text-xs xl:text-sm font-semibold min-w-0 flex-1 break-all text-end'
                          )}
                        >
                          {val}
                        </h2>
                      ))}
                    </div>
                  </React.Fragment>
                );
              }
            }
            rowLabel = FIELD_LABELS[field as keyof Employee];
            value = content?.[field as keyof Employee];
            return (
              <React.Fragment key={`item-${field}`}>
                <div className="flex flex-row justify-between gap-2">
                  {accordian?.showColumns && (
                    <h2
                      title={rowLabel}
                      className={cx(
                        text.muted,
                        'text-xs xl:text-sm font-medium shrink-0 whitespace-nowrap'
                      )}
                    >
                      {rowLabel}
                    </h2>
                  )}
                  {Array.isArray(value) && accordian?.fieldType === 'array' ? (
                    value?.map((val) => (
                      <h2
                        title={String(val)}
                        key={String(val)}
                        className={cx(
                          text.primary,
                          'text-xs xl:text-sm font-medium min-w-0 flex-1 break-all text-end'
                        )}
                      >
                        {String(val)}
                      </h2>
                    ))
                  ) : (
                    <h2
                      title={String(value)}
                      className={cx(
                        text.primary,
                        'text-xs xl:text-sm font-medium min-w-0 flex-1 break-all text-end'
                      )}
                    >
                      {String(value)}
                    </h2>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </>
      );
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div
      className={cx('mt-2', card.accordion)}
      id={accordian?.id}
      aria-controls={`accordian-panel-${accordian?.id}`}
      onClick={handleAccordian}
    >
      <button
        type="button"
        className="flex justify-between font-semibold items-center cursor-pointer"
      >
        <div
          className={cx(text.primary, 'flex min-w-0 gap-2 flex-1 items-center')}
        >
          {accordian?.render
            ? accordian?.render({ className: 'h-4 w-4 xl:h-6 xl:w-6' })
            : null}
          <h2 className="text-xs lg:text-sm truncate">{accordian?.label}</h2>
        </div>{' '}
        <span aria-hidden={!openAccordian} aria-expanded={openAccordian}>
          {!openAccordian ? (
            <ChevronDown className={text.muted} size={18} />
          ) : (
            <ChevronUp className={text.muted} size={18} />
          )}
        </span>
      </button>
      {openAccordian && (
        <div
          className=""
          id={`accordian-panel-${accordian?.id}`}
          aria-labelledby={accordian?.id}
        >
          {rendeFields()}
        </div>
      )}
    </div>
  );
}
