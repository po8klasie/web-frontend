import Brand from '../Brand';

const ClientSideErrorPage = () => {
  const handleClick = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };
  return (
    <div className="w-full h-full px-5 md:px-0 md:w-4/5 mx-auto">
      <div className="mt-20 flex justify-center">
        <Brand className="text-3xl md:text-5xl font-bold" />
      </div>
      <h1 className="mt-10 text-center text-2xl md:text-3xl">Wystąpił błąd</h1>
      <div className="mt-10 flex justify-center">
        <button
          onClick={handleClick}
          className="text-lg inline-block px-3 py-1 bg-primaryBg text-primary rounded hover:shadow transition"
        >
          Wyczyść dane podręczne i odśwież stronę
        </button>
      </div>
    </div>
  );
};

export default ClientSideErrorPage;
