
import Brand from "../../../components/Brand";
import { FiMap } from "@react-icons/all-files/fi/FiMap";
import SearchField, { SearchFieldInstitutionItem } from "../../../components/app/SearchField";
import { useRouter } from "next/router";
import { useProjectConfig } from "../../../config/projectConfigContext";
import { IconType } from "@react-icons/all-files";
import { FC } from "react";
import useLinks from "../../../hooks/useLinks";
import styles from './styles/ProjectDashboardPage.module.css'
import { AiOutlineCalculator } from "@react-icons/all-files/ai/AiOutlineCalculator";
import { FiStar } from "@react-icons/all-files/fi/FiStar";
import { RectangleStackIcon as RectangleStackIconOutline } from "@heroicons/react/24/outline";
interface TileProps {
  path: string
  icon: IconType
  name: string
}

const Tile: FC<TileProps> = ({path, icon: Icon, name}) => (
  <div className={styles.tile}>
    <a href={path}>
      <Icon />
      <span>{name}</span>
    </a>
  </div>
)

const ProjectDashboardPage = () => {
  const router = useRouter()
  const { appearance } = useProjectConfig()
  const links = useLinks()

  const tiles: TileProps[] = [
    {
      name: 'Przeglądaj mapę szkół',
      icon: FiMap,
      path: links.MAP_SEARCH_PAGE
    },
    {
      name: 'Przeglądaj ulubione szkoły',
      icon: FiStar,
      path: links.MAP_SEARCH_PAGE
    },
    {
      name: 'Porównaj szkoły',
      icon: RectangleStackIconOutline,
      path: links.COMPARISON_PAGE
    },
    {
      name: 'Oblicz punkty rekrutacyjne',
      icon: AiOutlineCalculator,
      path: links.CALCULATOR
    }
  ]


  const handleSubmit = (query: string) => {
    router.push(`${links.MAP_SEARCH_PAGE}?query=${query}`)
  }
  const handleInstitutionSelect = (institution: SearchFieldInstitutionItem) => {
    router.push(links.getSchoolPath(institution.rspo))
  }
  return (
      <div className="w-4/5 mx-auto mt-20 h-full">
        <h1 className="text-center ">
          <Brand
            projectName={appearance.appName}
            projectNameClassName="text-2xl"
            className="font-bold text-4xl" />
          <span className="ml-2 rounded-full bg-primaryBg text-primary uppercase px-2 py-1 text-xs font-bold">
                Beta
        </span>
        </h1>
        <div className="flex items-center text-2xl w-3/5 bg-white mx-auto mt-10 rounded-xl shadow-xl">
          <SearchField
            className="w-full rounded-xl"
            onSubmit={handleSubmit}
            onInstitutionSelect={handleInstitutionSelect} />
        </div>
        <div className="mt-20 grid grid-cols-4 gap-10">
          {tiles.map(tileProps => (
            <Tile {...tileProps} key={tileProps.name}  />
          ))}
        </div>
      </div>
  )
}

export default ProjectDashboardPage
