import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ProjectConfig } from '../../../config/types';
import { dehydrate, DehydratedState, QueryClient } from "@tanstack/react-query";
import { queryClientOptions } from "../../../api/queryClient";
import { createSingleSchoolDataQueryKey } from "../../../api/singleSchool";
import { ISchoolData } from "../../../types";
import { getProjectConfigProps } from "../../../config/nextHelpers";
import withProjectConfig from "../../../config/withProjectConfig";
import AppLayout from "../../../components/app/AppLayout";
import Brand from "../../../components/Brand";
import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import { FiMap } from "@react-icons/all-files/fi/FiMap";
import SearchField, { SearchFieldInstitutionItem } from "../../../components/app/SearchField";
import { useRouter } from "next/router";
import { useProjectConfig } from "../../../config/projectConfigContext";
import Link from "next/link";
import { IconType } from "@react-icons/all-files";
import { FC } from "react";
import useLinks from "../../../hooks/useLinks";
import styles from './styles/ProjectDashboardPage.module.css'
import { AiOutlineCalculator } from "@react-icons/all-files/ai/AiOutlineCalculator";
import { BiGitCompare } from "@react-icons/all-files/bi/BiGitCompare";
import { FiStar } from "@react-icons/all-files/fi/FiStar";
import { HiScale } from "@react-icons/all-files/hi/HiScale";
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
// className="text-primary text-5xl block"
// className="text-xl block text-left mt-5"
const ProjectDashboardPage = () => {
  const router = useRouter()
  const { appearance } = useProjectConfig()
  const projectLinks = useLinks()

  const tiles: TileProps[] = [
    {
      name: 'Przeglądaj mapę szkół',
      icon: FiMap,
      path: projectLinks.MAP_SEARCH_PAGE
    },
    {
      name: 'Przeglądaj ulubione szkoły',
      icon: FiStar,
      path: projectLinks.MAP_SEARCH_PAGE
    },
    {
      name: 'Porównaj szkoły',
      icon: HiScale,
      path: projectLinks.MAP_SEARCH_PAGE
    },
    {
      name: 'Oblicz punkty rekrutacyjne',
      icon: AiOutlineCalculator,
      path: projectLinks.CALCULATOR
    }
  ]


  const handleSubmit = (query: string) => {
    router.push(`${projectLinks.MAP_SEARCH_PAGE}?query=${query}`)
  }
  const handleInstitutionSelect = (institution: SearchFieldInstitutionItem) => {
    console.log(`/app/${institution.projectId}/school/${institution.rspo}`)
    router.push(`/app/${institution.projectId}/school/${institution.rspo}`)
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
