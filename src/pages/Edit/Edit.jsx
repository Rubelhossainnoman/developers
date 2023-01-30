import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./Edit.scss";
import Loader from "../../components/Loader/Loader";

const Edit = () => {
  // Loader...
  const [loader, setLoader] = useState(false);

  // Use loader by use effect hook...
  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, []);

  // Get user id...here
  const { id } = useParams();

  // From data....
  const [input, setInput] = useState({
    name: "",
    email: "",
    age: "",
    address: "",
    photo: "",
  });

  // Set old user data
  useEffect(() => {
    axios
      .get(`http://localhost:5050/developers/${id}`)
      .then((res) => {
        const { name, email, age, address, photo } = res.data;
        setInput({
          name: name,
          email: email,
          age: age,
          address: address,
          photo: photo,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  // Set value on change
  const hendleOnChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  // navigate....
  const navigate = useNavigate();

  // Data submit
  const hendleOnSubmit = (e) => {
    e.preventDefault();

    // validatioln
    if (
      input.name === "" ||
      input.email === "" ||
      input.age === "" ||
      input.address === "" ||
      input.photo === ""
    ) {
      Swal.fire(
        "Ooops! All fields are required.",
        "Please recheck this from.",
        "error"
      );
    } else {
      axios
        .patch(`http://localhost:5050/developers/${id}`, input)
        .then((res) => {
          setInput({
            name: "",
            email: "",
            age: "",
            locaion: "",
            photo: "",
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
      Swal.fire("Good job!", "Data Edit Successfull", "success");
      navigate("/");
    }
  };

  return (
    <>
      {loader && <Loader />}
      <div className="section my-5">
        <div className="developer_list">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-6 col-sm-12 col-12">
                <div className="card shadow-lg">
                  <div className="card-header">
                    <h3 className="text-center mb-0">
                      Update Form <span style={{ fontSize: "18px" }}></span>
                    </h3>
                    <Link to="/" className="btn btn-warning Edit">
                      Go Back
                    </Link>
                  </div>
                  <div className="card-body">
                    <div className="developer_edit_from">
                      <form onSubmit={hendleOnSubmit}>
                        <div className="my-3">
                          <label htmlFor="">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={hendleOnChange}
                            className="form-control"
                            placeholder="Your Name"
                            id=""
                          />
                        </div>
                        <div className="my-3">
                          <label htmlFor="">Email</label>
                          <input
                            type="text"
                            name="email"
                            value={input.email}
                            onChange={hendleOnChange}
                            className="form-control"
                            placeholder="Your Email"
                            id=""
                          />
                        </div>
                        <div className="my-3">
                          <label htmlFor="">Age</label>
                          <input
                            type="text"
                            name="age"
                            value={input.age}
                            onChange={hendleOnChange}
                            className="form-control"
                            placeholder="Your Age"
                            id=""
                          />
                        </div>
                        <div className="my-3">
                          <label htmlFor="">Location</label>
                          <input
                            type="text"
                            name="address"
                            value={input.address}
                            onChange={hendleOnChange}
                            className="form-control"
                            placeholder="Your Locaion"
                            id=""
                          />
                        </div>
                        <div className="my-3">
                          <label htmlFor="">Photo</label>
                          <input
                            type="text"
                            name="photo"
                            value={input.photo}
                            onChange={hendleOnChange}
                            className="form-control"
                            placeholder="Your Photo URL"
                            id=""
                          />
                        </div>
                        <div className="my-3">
                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                          >
                            Update Data
                          </button>
                        </div>
                      </form>
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

export default Edit;
