'use client'

import { forwardRef, HTMLProps } from 'react';
import { useProjectConfig } from "../api/projectConfig/projectConfigContext";

interface BrandProps extends HTMLProps<HTMLSpanElement> {
  projectName?: string;
  projectNameClassName?: string;
}

const Brand = forwardRef<HTMLSpanElement, BrandProps>(
  ({ projectName: overwriteProjectName, projectNameClassName, ...props }, ref) => {
    const { projectName } = useProjectConfig()
    return (
      <span ref={ref} {...props} className={['font-primary', props.className ?? ''].join(' ')}>
      po
      <span className="text-primary">8</span>
      klasie
        {(overwriteProjectName || projectName) && (
          <>
            &nbsp;
            <span
              className={[
                'font-primary uppercase text-lightGray font-normal',
                projectNameClassName ?? '',
              ].join(' ')}
            >
            {overwriteProjectName || projectName}
          </span>
          </>
        )}
    </span>
    )
  })

export default Brand;
