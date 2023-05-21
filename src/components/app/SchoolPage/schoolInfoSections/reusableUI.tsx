import { IconType } from 'react-icons';
import { FC } from 'react';

export const SectionHeading = ({ title }) => (
  <h3 className="text-lg font-bold text-dark">{title}</h3>
);

export const SectionSubHeading = ({ title }) => (
  <h4 className="text-dark text-base font-semibold mt-5">{title}</h4>
);

interface DataPresentGuardProps<T extends unknown | null> {
  data: T;
  NAClassName?: string;
  render: (data: NonNullable<T>) => JSX.Element;
}

export const DataPresentGuard = <T,>({ data, NAClassName, render }: DataPresentGuardProps<T>) => {
  if (!data || (data && Array.isArray(data) && data.length === 0)) {
    return <p className={NAClassName ?? 'my-2'}>Brak danych</p>;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return render(data!);
};

interface SimpleUnorderedListProps {
  items: string[];
}

export const SimpleUnorderedList: FC<SimpleUnorderedListProps> = ({ items }) => (
  <ul className="ml-2 list-inside list-disc">
    {items.map((item) => (
      <li className="my-2" key={item}>
        {item}
      </li>
    ))}
  </ul>
);

interface ItemWithIconProps {
  icon: IconType;
  iconClassName: string;
}

const ItemWithIcon: FC<ItemWithIconProps> = ({ children, icon: Icon, iconClassName }) => (
  <span className="flex items-center h-full">
    <span className={iconClassName}>
      <Icon className={`text-primary ${iconClassName}`} />
    </span>
    <span className="ml-2">{children}</span>
  </span>
);

interface ItemsListProps {
  items?: string[] | null;
  icon: IconType;
  title: string;
  iconClassName: string;
  gridClassName: string;
}

export const ItemsList: FC<ItemsListProps> = ({
  items,
  icon,
  title,
  iconClassName,
  gridClassName,
}) => (
  <div className="">
    <h4 className="text-dark text-base font-semibold mt-5">{title}</h4>
    <DataPresentGuard
      data={items}
      render={(data) => (
        <ul className={`mt-3 grid ${gridClassName} text-gray`}>
          {data.map((item) => (
            <li key={item}>
              <ItemWithIcon icon={icon} iconClassName={iconClassName}>
                {item}
              </ItemWithIcon>
            </li>
          ))}
        </ul>
      )}
    />
  </div>
);
