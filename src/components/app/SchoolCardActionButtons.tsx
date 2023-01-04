import React, { FC, MouseEventHandler } from "react";
import { FiStar } from "@react-icons/all-files/fi/FiStar";
import { RectangleStackIcon as RectangleStackIconSolid } from "@heroicons/react/24/solid";
import { RectangleStackIcon as RectangleStackIconOutline } from "@heroicons/react/24/outline";
import useFavoriteInstitutions from "../../hooks/useFavoriteInstitutions";
import useComparisonInstitutions from "../../hooks/useComparisonInstitutions";

const actionIconClassName = 'text-primary stroke-current w-5 h-5'

interface SchoolCardAddToFavoritesAction {
  isFavorite: boolean
  onClick: MouseEventHandler
}

const SchoolCardAddToFavoritesActionButton: FC<SchoolCardAddToFavoritesAction> = ({isFavorite, onClick}) => (
  <button
    onClick={onClick}
    title={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
  >
    <FiStar className={[actionIconClassName, isFavorite ? 'fill-current' : ''].join(' ')} />
  </button>
)

interface SchoolCardAddToComparisonActionButton {
  isToCompare: boolean
  onClick: MouseEventHandler
}

const SchoolCardAddToComparisonActionButton: FC<SchoolCardAddToComparisonActionButton> = ({isToCompare, onClick}) => {
  const Icon = isToCompare ? RectangleStackIconSolid : RectangleStackIconOutline;
  return (
    <button
      onClick={onClick}
      title={isToCompare ? 'Usuń szkołę z porównania' : 'Porównaj szkołę z innymi'}
    >
      <Icon className={actionIconClassName} />
    </button>
  )
}

interface SchoolCardActionButtonsProps {
  rspo: string
  className?: string
}

const SchoolCardActionButtons: FC<SchoolCardActionButtonsProps> = ({rspo, className}) => {
  const {isInstitutionFavorite, toggleIsInstitutionFavorite } = useFavoriteInstitutions()
  const {isInstitutionToCompare, toggleIsInstitutionToCompare} = useComparisonInstitutions()
  const isFavorite = isInstitutionFavorite(rspo)
  const isToCompare = isInstitutionToCompare(rspo)

  const handleAddToFavoritesClick = () => toggleIsInstitutionFavorite(rspo)
  const handleAddToComparisonClick = () => toggleIsInstitutionToCompare(rspo)

  return (
    <div className={className ?? ''}>
      <SchoolCardAddToFavoritesActionButton isFavorite={isFavorite} onClick={handleAddToFavoritesClick} />
      <SchoolCardAddToComparisonActionButton isToCompare={isToCompare} onClick={handleAddToComparisonClick} />
    </div>
  )
}

export default SchoolCardActionButtons
