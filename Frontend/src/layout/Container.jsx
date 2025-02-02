function Container({ children }) {
  return (
    <div className="max-w-screen-xl mx-auto bg-customGreen overflow-hidden">
      {children}
    </div>
  );
}

export default Container;
