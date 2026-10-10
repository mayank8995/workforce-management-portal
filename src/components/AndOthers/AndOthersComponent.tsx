import React, { useState } from 'react';

type AndOthersComponentProps = {
  values: string[];
  id: string;
  render?: (value: string, id: string) => React.ReactNode;
};
const AND = ' and ';
const OTHERS = 'others';
const OTHERS_SINGULAR = 'other';
const AndOthersComponent = ({
  values,
  render,
  id,
}: AndOthersComponentProps) => {
  const [showOthers, setShowOthers] = useState<boolean>(false);
  if (!values?.length) {
    return null;
  }
  function renderUI(values: string[]) {
    if (values?.length > 1) {
      const restOtherCount = values?.length - 1;
      return (
        <React.Fragment>
          {values?.map((item: string, index: number) => (
            <React.Fragment key={`${item}-other`}>
              {index === 0 ? (
                <div>{!render ? <div>{item}</div> : render(item, id)}</div>
              ) : (
                <div className={`${showOthers ? 'block' : 'hidden'}`}>
                  {!render ? <span>{item}</span> : render(item, id)}
                </div>
              )}
              {!showOthers && index === 0 && (
                <span
                  className="inline-flex justify-center text-accent text-[10px]
                     md:text-xs truncate cursor-pointer"
                  onClick={() => setShowOthers(true)}
                >
                  {AND}
                  {restOtherCount}{' '}
                  {restOtherCount > 1 ? OTHERS : OTHERS_SINGULAR}
                </span>
              )}
            </React.Fragment>
          ))}
        </React.Fragment>
      );
    }
    return (
      <React.Fragment key={`${values[0]}-other`}>
        {!render ? <div>{values[0]}</div> : render(values[0], id)}
      </React.Fragment>
    );
  }

  return (
    <div className="flex flex-1 flex-col justify-center items-center gap-1 shrink-0">
      {renderUI(values)}
    </div>
  );
};

export default React.memo(AndOthersComponent);

{
  /* {!render ? <div>{values[0]}</div> : render(values[0])}
          <span onClick={handleClickOthers}>
            {AND}
            {restOtherCount} {restOtherCount > 1 ? OTHERS : OTHERS_SINGULAR}
          </span> */
}
