/* eslint-disable no-unused-vars */
import { useState } from "react";
import ContactsList from "./ContactsList";
import "./style.css";
import styles from "./Contacts.module.css";
import Search from "./Search";

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
  const [isEdit, setIsEdit] = useState(null);
  const [search, setSearch] = useState("");
  const [newList, setNewList] = useState(contacts);

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

  const editHandeler = (id, e) => {
    setShowDialog(true);
    setIsEdit(id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsEdit({ ...isEdit, [name]: value });
  };

  const applyEdit = () => {
    const updatedContacts = contacts.map((c) =>
      c.id === isEdit.id ? isEdit : c
    );
    setContacts(updatedContacts);
    setIsEdit(null);
    setShowDialog(false);
  };

  return (
    <>
      <Search
        search={search}
        setSearch={setSearch}
        setNewList={setNewList}
        contacts={contacts}
      />
      <div className={styles.btnContainer}>
        <button onClick={() => setShowDialog(true)} className={styles.addBtn}>
          Add
        </button>
      </div>
      <hr />

      {showDialog && (
        <div className="dialogOverlay">
          <div className="dialog">
            <h1>Add New Contact</h1>
            <div className="inputGroup">
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
            </div>
            <button onClick={add}>Add Contact</button>
            <button onClick={() => setShowDialog(false)}>cancel</button>
            <button onClick={applyEdit}>Edit</button>
            <div style={{ backgroundColor: "red", width: "100%" }}>
              {allert && <p>{allert}</p>}
            </div>
          </div>
        </div>
      )}
      <div className={styles.headContainer}>
        <p className={styles.head}>name</p>
        <p className={styles.head}>Email</p>
        <p className={styles.head}>Phone</p>
        <p className={styles.head}>validators</p>
      </div>
      <ContactsList
        contacts={contacts}
        deleteHandeler={deleteHandeler}
        editHandeler={editHandeler}
        setContacts={setContacts}
        newList={newList}
      />
    </>
  );
}

export default Contacts;
