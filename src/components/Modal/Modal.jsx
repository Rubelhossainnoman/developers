import "./Modal.scss";

const Modal = ({ title, photo, email, address, age, hide }) => {
  return (
    <>
      <div className="modal_section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-4 col-12">
              <div className="card shadow-lg">
                <div className="card-header">
                  <h3 className="mb-0 text-center">Name : {title}</h3>
                  <button
                    onClick={() => hide(false)}
                    className="btn-close"
                  ></button>
                </div>
                <div className="card-body">
                  <div className="developer_img text-center">
                    <img src={photo} alt="" />
                  </div>
                  <div className="developer_info text-center mt-3">
                    <div className="email">
                      <a href={`mailto:${email}`}>Email : {email}</a>
                    </div>
                    <div className="location">
                      <p className="mb-0">Locaion : {address}</p>
                    </div>
                    <div className="skill">
                      <p className="mb-0">Age : {age}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
