/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import NavBar from "../supplier/NavBar";
import { supplierDetails } from "./AxiosCall";

//this function use to show approved suppliers
export default function ApprovedSuppriers() {
  const [supplier, setSupplier] = useState([]);
  const [MyImage, setImage] = useState("user.png");

  useEffect(() => {
    //retrivesupplier details

    supplierDetails().then((res) => {
      if (res.data.success) {
        setSupplier(res.data.exsitingSupplierDetails);
      }
    });
  }, []);

  const secondColumnStart = Math.ceil(supplier.length / 2);
  var imageBasePath =
    window.location.protocol + "//" + window.location.host + "/images/";

  return (
    <div>
      <NavBar />
      <div className="container">
        <h2 className="text-center mt-4 mb-4"> Approved Suppliers</h2>

        <div className="container border  border-secondary rounded-3 shadow-lg">
          <div className="row">
            <div className="col-sm-5 mx-2 me-2">
              {/* display suppliers using map  */}
              {/* page devide in 2 side and show supplier details */}
              {supplier.slice(0, secondColumnStart).map((data, index) => {
                if (data.supstatus == "Approved")
                  return (
                    <div class="card mt-4 mb-4">
                      <div class="card-body">
                        <p class="card-text">
                          <div className="row">
                            <div className="col-sm-4">
                              <div className="d-flex justify-content-center">
                                <img
                                  className="img"
                                  style={{ width: "90px", height: "90px" }}
                                  src={imageBasePath + MyImage}
                                  alt="alt"
                                />
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <h5 class="card-title">{data.name}</h5>
                              <i class="fa fa-map-marker" aria-hidden="true">
                                &nbsp;&nbsp;{data.address}
                              </i>
                            </div>
                            <div className="col-sm-4 mb-2">
                              <span class="position-absolute top-0 start-100 translate-middle badge  bg-success">
                                {data.supstatus}
                                <span class="visually-hidden">approved</span>
                              </span>

                              <a
                                href={`/profile/view/${data.name}`}
                                class="btn btn-danger rounded-pill"
                              >
                                Preview
                              </a>

                              <a
                                href={`/supplier/check/${data._id}`}
                                class="btn btn-primary mt-2 rounded-pill"
                              >
                                &nbsp;&nbsp;Action
                              </a>
                            </div>
                          </div>
                        </p>
                      </div>
                    </div>
                  );
              })}
            </div>
            {/* display suppliers using map  */}
            {/* page devide in 2 side and show supplier details */}
            <div className="col-sm-5 mx-2 me-2">
              {supplier.slice(secondColumnStart).map((data, index) => {
                if (data.supstatus == "Approved")
                return (
                  <div class="card mt-4 mb-4">
                    <div class="card-body">
                      <p class="card-text">
                        <div className="row">
                          <div className="col-sm-4">
                            <div className="d-flex justify-content-center">
                              <img
                                className="img"
                                style={{ width: "90px", height: "90px" }}
                                src={imageBasePath + MyImage}
                                alt="alt"
                              />
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <h5 class="card-title">{data.name}</h5>
                            <i class="fa fa-map-marker" aria-hidden="true">
                              &nbsp;&nbsp;{data.address}
                            </i>
                          </div>
                          <div className="col-sm-4 mb-2">
                            <span class="position-absolute top-0 start-100 translate-middle badge  bg-success">
                              {data.supstatus}
                              <span class="visually-hidden">approved</span>
                            </span>

                            <a
                              href={`/profile/view/${data.name}`}
                              class="btn btn-danger rounded-pill"
                            >
                              Preview
                            </a>

                            <a
                              href={`/supplier/check/${data._id}`}
                              class="btn btn-primary mt-2 rounded-pill"
                            >
                              &nbsp;&nbsp;Action
                            </a>
                          </div>
                        </div>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
