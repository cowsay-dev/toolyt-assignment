import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactInterface } from "../interfaces";
import { setContact } from "../store/ContactSlice";

interface FormInterface {
  firstName: string;
  lastName: string;
}

const UpdateContact = () => {
  const contactData = useSelector((state: any) => state.contact.data);
  const { id } = useParams();
  const currData: ContactInterface = contactData.filter(
    (data: ContactInterface) => data.id === id
  )[0];
  const [status, setStatus] = useState<string>(currData.status);
  const [fname, setFname] = useState<string>(currData.firstName);
  const [lname, setLname] = useState<string>(currData.lastName);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = yup.object().shape({
    firstName: yup.string().min(2).required("Firstname is required"),
    lastName: yup.string().min(2).required("Lastname is required"),
  });
  const { handleSubmit, register } = useForm<FormInterface>({
    resolver: yupResolver(schema),
  });
  const updateHandler = (data: FormInterface) => {
    const payload: ContactInterface = {
      id: currData.id,
      firstName: data.firstName,
      lastName: data.lastName,
      status: status,
    };
    const updatedData = contactData.map((data: ContactInterface) => {
      if (data.id === id) {
        return payload;
      } else {
        return data;
      }
    });
    dispatch(setContact(updatedData));
    localStorage.setItem("contact-data", JSON.stringify(updatedData));
    data.firstName = "";
    data.lastName = "";
    navigate("/");
  };
  return (
    <div className="flex p-3 ml-0 md:ml-56 justify-center items-center h-full">
      <form
        onSubmit={handleSubmit(updateHandler)}
        className="flex flex-col bg-slate-100 rounded-lg p-5 w-96"
      >
        <div className="p-3 w-full">
          <h1 className="text-3xl text-center">Update the contact</h1>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center mb-4 w-full">
            <p className="min-w-max">First name:</p>
            <input
              type="text"
              value={fname}
              placeholder="Enter first name"
              className="px-3 py-1 w-full ml-2"
              {...register("firstName")}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>
          <div className="flex items-center mb-4 w-full">
            <p className="min-w-max">Last name:</p>
            <input
              type="text"
              value={lname}
              placeholder="Enter last name"
              className="px-3 py-1 w-full ml-2 "
              {...register("lastName")}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
          <div className="flex w-full">
            <p className="w-20">Status</p>
            <div className="ml-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="active"
                  name="status"
                  value="Active"
                  defaultChecked={currData.status === "Active" ? true : false}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="active" className="pt-1">
                  Active
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="inactive"
                  name="status"
                  value="Inactive"
                  defaultChecked={currData.status === "Inactive" ? true : false}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="inactive" className="pt-1">
                  Inactive
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <button
              type="submit"
              className="px-3 py-1 font-bold text-white text-sm bg-green-700 rounded"
            >
              Save edited contact
            </button>
            <button
              type="button"
              className="px-3 py-1 font-bold text-white text-sm bg-red-500 rounded"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateContact;
