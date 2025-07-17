/* eslint-disable no-unused-vars */
import { useState, useEffect, useReducer } from "react";
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
  const [newList, setNewList] = useState(contacts);

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (savedContacts) {
      setContacts(savedContacts);
      setNewList(savedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const [showDialog, setShowDialog] = useState(false);
  const [askDelete, setAskDelete] = useState(false);
  const [showgropDeletDialog, setShowgropDeletDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (allert) {
      const timer = setTimeout(() => {
        setAllert("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [allert]);

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
    setAllert("Added Contact Successfully");
  };

  const deleteHandeler = (id) => {
    const newContac = contacts.filter((i) => i.id !== id);
    setContacts(newContac);
    setAskDelete(false);
    setAllert("Delete Contact Successfully");
  };

  const editHandeler = (id) => {
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
    setAllert("Edit Contact Successfully");
  };

  const toggleSelect = (id) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter((i) => i !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  const deleteSelected = () => {
    const deleted = contacts.filter((i) => !selectedContacts.includes(i.id));
    setContacts(deleted);
    setSelectedContacts([]);
    setShowgropDeletDialog(false);
    setAllert("Delete Selected Contacts Successfully");
  };

  const deleted = (id) => {
    setAskDelete(true);
    setId(id);
  };

  return (
    <>
      <div className={styles.allertcontainer}>
        {allert && (
          <p
            className={
              allert === "Please Enter valid data"
                ? styles.dangerallert
                : styles.allert
            }
          >
            {allert}
          </p>
        )}
      </div>
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
      {selectedContacts.length > 0 && (
        <button
          onClick={() => setShowgropDeletDialog(true)}
          className={styles.deleteAll}
        >
          Delete Selected Contacts
        </button>
      )}
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
            <div style={{ backgroundColor: "red", width: "100%" }}></div>
          </div>
        </div>
      )}
      {askDelete && (
        <div className="dialogOverlay1">
          <div className="dialog1">
            <h1>Are You sure?</h1>
            <button onClick={() => deleteHandeler(id)}>Yes</button>
            <button onClick={() => setAskDelete(false)}>No</button>
          </div>
        </div>
      )}
      {showgropDeletDialog && (
        <div className="dialogOverlay1">
          <div className="dialog1">
            <h1>Are You sure?</h1>
            <button onClick={deleteSelected}>Yes</button>
            <button onClick={() => setShowgropDeletDialog(false)}>No</button>
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
        toggleSelect={toggleSelect}
        selectedContacts={selectedContacts}
        deleted={deleted}
      />
    </>
  );
}

export default Contacts;
