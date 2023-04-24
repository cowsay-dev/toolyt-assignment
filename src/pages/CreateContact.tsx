import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { setContact } from "../store/ContactSlice";
import { ContactInterface } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

interface FormInterface {
  firstName: string;
  lastName: string;
}

const CreateContact = () => {
  const [status, setStatus] = useState<string>("Active");
  const contactData = useSelector((state: any) => state.contact.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = yup.object().shape({
    firstName: yup.string().min(2).required("Firstname is required"),
    lastName: yup.string().min(2).required("Lastname is required"),
  });
  const { handleSubmit, register } = useForm<FormInterface>({
    resolver: yupResolver(schema),
  });
  const formHandler = (data: FormInterface) => {
    const uid = uuid();
    const payload: ContactInterface = {
      id: uid,
      firstName: data.firstName,
      lastName: data.lastName,
      status: status,
    };
    dispatch(setContact([...contactData, payload]));
    localStorage.setItem(
      "contact-data",
      JSON.stringify([...contactData, payload])
    );
    data.firstName = "";
    data.lastName = "";
    navigate("/");
  };
  return (
    <div className="flex p-3 ml-0 md:ml-56 justify-center items-center h-full">
      <form
        onSubmit={handleSubmit(formHandler)}
        className="flex flex-col bg-slate-100 rounded-lg p-5 w-96"
      >
        <div className="p-3 w-full">
          <h1 className="text-3xl text-center">Create a contact</h1>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center mb-4 w-full">
            <p className="min-w-max">First name:</p>
            <input
              type="text"
              placeholder="Enter first name"
              className="px-3 py-1 w-full ml-2"
              {...register("firstName")}
            />
          </div>
          <div className="flex items-center mb-4 w-full">
            <p className="min-w-max">Last name:</p>
            <input
              type="text"
              placeholder="Enter last name"
              className="px-3 py-1 w-full ml-2 "
              {...register("lastName")}
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
                  defaultChecked
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
                  onChange={(e) => setStatus(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="inactive" className="pt-1">
                  Inactive
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="px-3 py-1 font-bold text-white text-sm bg-green-700 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateContact;
