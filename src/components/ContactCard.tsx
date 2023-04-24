import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ContactInterface } from "../interfaces";
import { setContact } from "../store/ContactSlice";
import { useNavigate } from "react-router-dom";

const ContactCard = (props: ContactInterface) => {
  const contactData = useSelector((state: any) => state.contact.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteHandler = (id: string) => {
    const updatedData = [
      ...contactData.filter((data: ContactInterface) => data.id !== id),
    ];
    dispatch(setContact(updatedData));
    localStorage.setItem("contact-data", JSON.stringify(updatedData));
  };
  return (
    <div className="flex flex-col w-60 bg-slate-50 rounded p-3 my-3 mx-2 shadow-md">
      <div className="h-fit w-full flex flex-col">
        <p className="text-xl">
          {props.firstName} {props.lastName}
        </p>
        <p className="text-base">
          <span className="text-base">Status: </span>
          {props.status}
        </p>
      </div>
      <div className="flex justify-between w-full mt-3">
        <button
          className="px-3 py-1 font-bold text-white text-sm bg-green-700 rounded"
          onClick={() => navigate(`/update-contact/${props.id}`)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 font-bold  text-white text-sm bg-red-500 rounded"
          onClick={() => deleteHandler(props.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
