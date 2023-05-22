import URLModifier from "./_components/URLModifier";
import QueryField from "./_components/QueryField";
import styles from './_styles/layout.module.css'
import { SelectedSchoolProvider } from "../../../hooks/useSelectedSchool";

const MapSearchPageLayout = ({children, map, listing}) => (
  <SelectedSchoolProvider>
  <div className={styles.layout}>
    <URLModifier />
    {children}
    <div className={styles.mapPane}>
      <QueryField />
      {map}
    </div>
    <div  className={styles.institutionsPane}>
      <div className="px-2">
        {listing}
      </div>
    </div>
  </div>
  </SelectedSchoolProvider>
)

export default MapSearchPageLayout
