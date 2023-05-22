'use client'

import type { FC } from "react";
import useFavoriteInstitutions from "../../../../../hooks/useFavoriteInstitutions";
import { FiStar } from "@react-icons/all-files/fi/FiStar";


interface SchoolFavoritesButtonProps {
  schoolRspo: string
}

const SchoolFavoritesButton: FC<SchoolFavoritesButtonProps> = ({schoolRspo}) => {
  const { isInstitutionFavorite, toggleIsInstitutionFavorite } = useFavoriteInstitutions();
  const isFavorite = isInstitutionFavorite(schoolRspo);
  return (
    <button
    onClick={() => toggleIsInstitutionFavorite(schoolRspo)}
    title={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
    className={[
      'rounded-xl px-2 py-1 text-primary inline-flex items-center border',
      isFavorite ? 'bg-primaryBg border-transparent' : 'border-primaryBg',
    ].join(' ')}
  >
    <FiStar
      className={`text-primary stroke-current mr-2 ${isFavorite ? 'fill-current' : ''}`}
    />
    <span>
      {isFavorite ? 'Szkoła dodana do ulubionych' : 'Dodaj szkołę do ulubionych'}
    </span>
  </button>
  )
}

export default SchoolFavoritesButton
