/* eslint-disable no-unused-vars */
import { useState } from "react";
import ContactsList from "./ContactsList";
import "./style.css";

const inputs = [
  { type: "Text", name: "name", placeholder: "name" },
  { type: "Text", name: "lastName", placeholder: "LastName" },
  { type: "email", name: "email", placeholder: "email" },
  { type: "number", name: "phone", placeholder: "phone" },
];
function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [allert, setAllert] = useState("");
  const [contact, setContact] = useState({
    id: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [showDialog, setShowDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact((contact) => ({ ...contact, [name]: value }));
  };

  const add = () => {
    if (
      !contact.name ||
      !contact.lastName ||
      !contact.email ||
      !contact.phone
    ) {
      setAllert("Please Enter valid data");
      return;
    }
    setAllert("");

    const id = Math.random() * 1000;
    const newContact = { ...contact, id: id };
    setContacts((Contacts) => [...contacts, newContact]);

    setContact({
      name: "",
      lastName: "",
      email: "",
      phone: "",
    });
    setShowDialog(false);
  };

  const deleteHandeler = (id) => {
    const newContac = contacts.filter((i) => i.id !== id);
    setContacts(newContac);
  };


  const editHandeler = (id,e) => {
    setShowDialog(true);
    const editContact = contacts.find((i) => {
      return i.d === id;
    });
    const { name, value } = e.target;
  
  };

  const applyEdit = () => {
    if (
      !contact.name ||
      !contact.lastName ||
      !contact.email ||
      !contact.phone
    ) {
      alert("Please fill all fields");
      return;
    }

    const updated = contacts.map((c) => (c.id === contact.id ? contact : c));
    setContacts(updated);
    setShowDialog(false);
  };

  return (
    <>
      <button onClick={() => setShowDialog(true)}>Add</button>

      {showDialog && (
        <div className="dialogOverlay">
          <div className="dialog">
            {inputs.map((i, ind) => (
              <input
                key={ind}
                name={i.name}
                value={contact[i.name]}
                type={i.type}
                placeholder={i.placeholder}
                onChange={change}
              />
            ))}
            <button onClick={add}>Add Contact</button>
            <button onClick={() => setShowDialog(false)}>cancel</button>
            <button onClick={applyEdit}>Edit</button>
            <div style={{ backgroundColor: "red", width: "100%" }}>
              {allert && <p>{allert}</p>}
            </div>
          </div>
        </div>
      )}
      <ContactsList
        contacts={contacts}
        deleteHandeler={deleteHandeler}
        editHandeler={editHandeler}
      />
    </>
  );
}

export default Contacts;
