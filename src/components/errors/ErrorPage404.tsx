import Brand from '../Brand';

const ErrorPage404 = () => {
  return (
    <div className="w-full h-full px-5 md:px-0 md:w-4/5 mx-auto">
      <div className="mt-20 flex justify-center">
        <Brand className="text-3xl md:text-5xl font-bold" />
      </div>
      <h1 className="mt-10 text-center text-2xl md:text-3xl">Strony nie znaleziono</h1>
      <div className="mt-10 flex justify-center">
        <a
          href="/"
          className="text-lg inline-block px-3 py-1 bg-primaryBg text-primary rounded hover:shadow transition"
        >
          Wróć do strony głównej
        </a>
      </div>
    </div>
  );
};

export default ErrorPage404;
