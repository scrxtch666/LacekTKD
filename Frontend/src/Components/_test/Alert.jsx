import { Link } from "react-router-dom";

function Alert() {
    return (
      <>
      <div className="card flex justify-center border-2 border-alertRed w-1/3 gap-1">
      <Link to={"/detail"}>
      <p>⛔</p>
        <p className="font-bold text-alertRed">Detail Akce</p>
        </Link>
      </div>
      </>
       
    );
  }
  
  export default Alert;
  