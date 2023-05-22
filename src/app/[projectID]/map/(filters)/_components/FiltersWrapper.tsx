'use client'

import { FC, ReactNode, useState } from "react";
import { FiFilter } from "@react-icons/all-files/fi/FiFilter";
import { FiX } from "@react-icons/all-files/fi/FiX";
import styles from './styles/FiltersWrapper.module.css'

const FiltersWrapper: FC<{children: ReactNode}> = ({children}) => {
  const [isFiltersPaneOpened, setIsFiltersPaneOpened] = useState(false);

  return (
    <>
      <div className={isFiltersPaneOpened ? styles.filtersPageOpened : styles.filtersPane}>
        <div className={styles.filtersInnerWrapper}>
          {children}
        </div>
      </div>
      <button className={styles.filtersFab} onClick={() => setIsFiltersPaneOpened(true)}>
        <FiFilter />
      </button>
      <button
        className={
          isFiltersPaneOpened ? styles.closeFiltersButtonActive : styles.closeFiltersButton
        }
        onClick={() => setIsFiltersPaneOpened(false)}
      >
        <FiX className="mr-1 text-gray-500" />
        Zamknij filtry
      </button>
    </>
  )
}

export default FiltersWrapper
