function Container({ children }) {
  return (
    <div className="max-w-screen-xl mx-auto overflow-hidden px-5">
      {children}
    </div>
  );
}

export default Container;
