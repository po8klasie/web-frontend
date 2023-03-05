import { forwardRef, HTMLProps } from 'react';

interface BrandProps extends HTMLProps<HTMLSpanElement> {
  projectName?: string;
  projectNameClassName?: string;
}

const Brand = forwardRef<HTMLSpanElement, BrandProps>(
  ({ projectName, projectNameClassName, ...props }, ref) => (
    <span ref={ref} {...props} className={['font-primary', props.className ?? ''].join(' ')}>
      po
      <span className="text-primary">8</span>
      klasie
      {projectName && (
        <>
          &nbsp;
          <span
            className={[
              'font-primary uppercase text-lightGray font-normal',
              projectNameClassName ?? '',
            ].join(' ')}
          >
            {projectName}
          </span>
        </>
      )}
    </span>
  ),
);

export default Brand;
