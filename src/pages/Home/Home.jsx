import "./Home.scss";
import { BsEye } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Modal from "../../components/Modal/Modal";
import Loader from "../../components/Loader/Loader";
const Home = () => {
  // Loader...
  const [loader, setLoader] = useState(false);

  // Use loader by use effect hook...
  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  // Mymodal...
  const [mymodal, setMymodal] = useState({
    status: false,
    name: "",
    email: "",
    photo: "",
    age: "",
    address: "",
  });

  // Developer data...
  const [developer, setDeveloper] = useState([]);

  // For single view...
  const hendleOnModal = (id) => {
    // Get single user for single view...
    try {
      axios
        .get(`http://localhost:5050/developers/${id}`)
        .then((res) => {
          setMymodal({
            status: true,
            name: res.data.name,
            email: res.data.email,
            age: res.data.age,
            address: res.data.address,
            photo: res.data.photo,
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Delete a user
  const hendleOnDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0d6efd",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5050/developers/${id}`)
          .then((res) => {
            setDeveloper(developer.filter((data) => data.id !== id));
          })
          .catch((error) => {
            console.log(error.message);
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5050/developers?_sort=id&_order=desc")
      .then((res) => {
        const devs_list = res.data;
        setDeveloper(devs_list);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [setDeveloper]);

  return (
    <>
      {loader && <Loader />}
      <div className="section my-5">
        <div className="developer_list">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-md-12 col-sm-12 col-12">
                <div className="card shadow-lg">
                  <div className="card-header">
                    <h3 className="text-center mb-0">Our Developer</h3>
                    <Link to="/create" className="btn btn-primary add">
                      Add New Student
                    </Link>
                  </div>
                  <div className="card-body">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Photo</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Age</th>
                          <th>Address</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody className="align-middle" id="developer_list_item">
                        {developer.map((item, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td>
                              <img src={item.photo} alt="" />
                            </td>
                            <td>{item.name}</td>
                            <td>
                              <a href={`mailto:${item.email}`}>{item.email}</a>
                            </td>
                            <td>{item.age}</td>
                            <td>{item.address}</td>
                            <td>
                              <div className="action">
                                <button
                                  onClick={() => hendleOnModal(item.id)}
                                  className="btn btn-primary"
                                >
                                  <BsEye />
                                </button>
                                <Link
                                  to={`/edit/${item.id}`}
                                  className="btn btn-warning mx-3"
                                >
                                  <CiEdit />
                                </Link>
                                <button
                                  onClick={() => hendleOnDelete(item.id)}
                                  className="btn btn-danger"
                                >
                                  <AiOutlineDelete />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {mymodal.status && (
                  <Modal
                    title={mymodal.name}
                    email={mymodal.email}
                    age={mymodal.age}
                    address={mymodal.address}
                    photo={mymodal.photo}
                    hide={setMymodal}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
