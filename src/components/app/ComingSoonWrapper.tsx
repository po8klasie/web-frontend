const ComingSoonWrapper = ({ children }) => (
  <div className="border border rounded">
    <div className="border-b p-1 bg-gray-100">{children}</div>
    <div className="p-1">
      <span className="bg-primaryBg px-2 py-1 rounded-3xl">Dostępne wkrótce!</span>
      <small className="block mt-1 italic">
        Działanie tego widżetu w wersji beta aplikacji może być chwilowo ograniczone lub może dawać
        on błędne rezultaty.
      </small>
    </div>
  </div>
);

export default ComingSoonWrapper;
