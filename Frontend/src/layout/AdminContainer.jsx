function Container({ children }) {
  return (
    <div className="max-w-screen-full  overflow-hidden px-5 flex flex-col gap-5 bg-customGreen">
      {children}
    </div>
  );
}

export default Container;