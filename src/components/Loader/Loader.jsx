import "./Loader.scss";
import { Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <>
      <div className="loader">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="loader-item">
                {
                  <Triangle
                    height="150"
                    width="150"
                    color="#0d6efd"
                    ariaLabel="triangle-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
