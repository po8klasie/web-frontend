import { ComparisonItemsSchemaI, PropertiesMaxLengthsI } from "./types";
import React, { FC } from "react";
import { ComparisonList, ComparisonListBlank, ComparisonListTitle } from "./ComparisonList";
import comparableProperties from "./comparableProperties";

interface ComparablePropertiesProps {
  comparisonItems: ComparisonItemsSchemaI
  propertiesMaxLengths: PropertiesMaxLengthsI
}

const ComparablePropertiesRenderer: FC<ComparablePropertiesProps> = ({comparisonItems, propertiesMaxLengths}) => {
  return (
    <div>
      {
        comparableProperties.map(({sectionName, renderComparisonListContents, getBlankItemsNo}) => (
          <div className="" key={sectionName}>
            <ComparisonListTitle>{sectionName}</ComparisonListTitle>
            <ComparisonList>
              {renderComparisonListContents(comparisonItems)}
              {getBlankItemsNo && (
                <ComparisonListBlank blankItemsNo={getBlankItemsNo(comparisonItems, propertiesMaxLengths)} />
              )}
            </ComparisonList>

          </div>
        ))
      }
    </div>
  )
}

export default ComparablePropertiesRenderer;
