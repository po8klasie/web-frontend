import { AiOutlineWarning } from "@react-icons/all-files/ai/AiOutlineWarning";
import Calculator from "./_components/Calculator";
import type { ProjectPageT } from "../../../types";
import createProjectMetadata from "../../../utils/seo";

export const generateMetadata = createProjectMetadata((projectName) => ({
  title: 'Kalkulator punktów',
  description: `Oblicz punkty rekrutacyjne z po8klasie ${projectName}`
}))

const CalculatorPage: ProjectPageT = () => {
  return (
    <div className="w-container mx-auto">
      <h1 className="flex items-center text-3xl font-bold mt-5 lg:mt-10">
        Kalkulator punktów
        <span className="flex rounded-full bg-primaryBg text-primary uppercase px-2 py-1 text-xs font-bold ml-3">
            New
          </span>
      </h1>
      <p className="my-10">
        Podaj swoje oceny, wyniki z egzaminu ósmoklasisty oraz dodatkowe osiągnięcia (jeśli takie
        masz) i oblicz punkty, jakie uzyskasz podczas rekrutacji do szkoły średniej.
      </p>
      <div
        className="bg-primaryBg border-l-4 border-primary text-primary p-4 lg:w-1/2 xl:w-1/3 rounded "
        role="alert"
      >
        <p className="font-bold mb-2 flex items-center font-primary">
          <AiOutlineWarning className="mr-2 text-xl" />
          Przypomnienie
        </p>
        <p>Progi punktowe zmieniają się co roku i zależą od wielu czynników.</p>
      </div>
      <Calculator />
    </div>
  );
};

export default CalculatorPage
