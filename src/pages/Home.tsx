import React from "react";
import ContactCard from "../components/ContactCard";
import { useSelector } from "react-redux";
import { ContactInterface } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";

const Home = () => {
  const contactData = useSelector((state: any) => state.contact.data);
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/create-contact");
  };
  return (
    <div className="flex flex-col p-3 ml-0 mt-20 md:ml-56 md:mt-0">
      <div className="flex justify-center">
        <button
          className="px-2 py-1 font-semibold text-lg bg-blue-600 text-white rounded"
          onClick={navigateHandler}
        >
          Create contact
        </button>
      </div>
      <section className="flex justify-center flex-wrap mt-5">
        {contactData?.length > 0 ? (
          contactData.map((data: ContactInterface, index: number) => {
            return <ContactCard {...data} key={`contact-card-${index}`} />;
          })
        ) : (
          <div className="flex items-center p-3 rounded bg-slate-300">
            <ImCancelCircle className="w-11 h-11 min-w-fit" />
            <p className="text-xl ml-4">
              No contact found. Please add contact from Create Contact button.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
