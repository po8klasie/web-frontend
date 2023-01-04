import { RectangleStackIcon as RectangleStackIconOutline } from "@heroicons/react/24/outline";

const EmptyComparisonMessage = () => (
  <div>
    <h2 className="text-gray-700 text-center text-lg mt-10">Brak szkół do porównania</h2>
    <p className="text-gray-700 text-center mt-2">
      <p className="text-gray-700 text-center mt-2">
       Klikając <RectangleStackIconOutline className="w-5 h-5 inline stroke-current text-primary" />{' '}
             przy danej szkole, dodasz ją do ulubionych.
         </p>
    </p>
  </div>
)
export default EmptyComparisonMessage
