import { Disclosure } from '@headlessui/react';
import { FC, PropsWithChildren } from 'react';
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown';

interface CollapsibleFilterWrapperProps {
  title: string;
}

const CollapsibleFilterWrapper: FC<PropsWithChildren<CollapsibleFilterWrapperProps>> = ({
  title,
  children,
}) => {
  return (
    <Disclosure defaultOpen={true} as="div" className="mt-4">
      {({ open }) => (
        <>
          <Disclosure.Button className="px-1 flex justify-between items-center w-full">
            <span className="font-primary font-semibold text-lg text-dark">{title}</span>
            <FiChevronDown
              className={[
                'text-xl transition duration-200 transform',
                open ? 'rotate-180' : '',
              ].join(' ')}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-500 pt-2">{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default CollapsibleFilterWrapper;
