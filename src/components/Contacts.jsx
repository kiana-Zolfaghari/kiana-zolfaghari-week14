/* eslint-disable no-unused-vars */
import { useState, useEffect, useReducer } from "react";
import ContactsList from "./ContactsList";
import "./style.css";
import styles from "./Contacts.module.css";
import Search from "./Search";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("نام الزامی اسات"),
  lastName: yup.string().required("نام خانوادگی الزمی است"),
  phone: yup.string().required("شماره موبایل الزامی است"),
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
});

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
  const [showEditBtn, setShowEditBtn] = useState(false);

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

  // const add = () => {
  //   if (
  //     !contact.name ||
  //     !contact.lastName ||
  //     !contact.email ||
  //     !contact.phone
  //   ) {
  //     setAllert("Please Enter valid data");
  //     return;
  //   }

  //   const id = Math.random() * 1000;
  //   const newContact = { ...contact, id: id };
  //   setContacts((Contacts) => [...contacts, newContact]);

  //   setContact({
  //     name: "",
  //     lastName: "",
  //     email: "",
  //     phone: "",
  //   });
  //   setShowDialog(false);
  //   setAllert("Added Contact Successfully");
  // };

  const deleteHandeler = (id) => {
    const newContac = contacts.filter((i) => i.id !== id);
    setContacts(newContac);
    setAskDelete(false);
    setAllert("Delete Contact Successfully");
  };

  const editHandeler = (id, e) => {
    const editContact = contacts.find((i) => {
      return i.id === id;
    });
    setContact(editContact);
    setShowDialog(true);
    setShowEditBtn(true);
  };

  // const applyEdit = () => {
  //   if (
  //     !contact.name ||
  //     !contact.lastName ||
  //     !contact.email ||
  //     !contact.phone
  //   ) {
  //     alert("Please fill all fields");
  //     return;
  //   }

  //   const updated = contacts.map((c) => (c.id === contact.id ? contact : c));
  //   setContacts(updated);
  //   setContact({
  //     name: "",
  //     lastName: "",
  //     email: "",
  //     phone: "",
  //   });
  //   setShowDialog(false);
  //   setShowEditBtn(false);
  //   setAllert("Edit Contact Successfully");
  // };

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
              allert === "Please fill all Required fields"
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
            <h1>{showEditBtn ? "Edit Contact" : "Add New Contact"}</h1>
            <Formik
              initialValues={contact}
              enableReinitialize={true}
              validationSchema={schema}
              onSubmit={(values, { resetForm, setSubmitting }) => {
                if (showEditBtn) {
                  const updated = contacts.map((c) =>
                    c.id === contact.id ? { ...values, id: contact.id } : c
                  );
                  setContacts(updated);
                  setAllert("Edit Contact Successfully");
                  setContact({
                    name: "",
                    lastName: "",
                    email: "",
                    phone: "",
                  });
                  setShowEditBtn(false);
                } else {
                  const id = Math.random() * 1000;
                  const newContact = { ...values, id };
                  setContacts([...contacts, newContact]);
                  setAllert("Added Contact Successfully");
                }

                resetForm();
                setContact({
                  name: "",
                  lastName: "",
                  email: "",
                  phone: "",
                });
                setShowDialog(false);
              }}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                errors,
                setTouched,
                touched,
              }) => (
                <Form
                  className="inputGroup"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setTouched({
                      name: true,
                      lastName: true,
                      email: true,
                      phone: true,
                    });
                    if (Object.keys(errors).length > 0) {
                      setAllert("Please fill all Required fields");
                    } else {
                      setAllert("");
                      handleSubmit();
                    }
                  }}
                >
                  {inputs.map((i, ind) => (
                    <div key={ind}>
                      <Field
                        name={i.name}
                        type={i.type}
                        placeholder={i.placeholder}
                        style={
                          errors[i.name] && touched[i.name]
                            ? { border: "1px solid red" }
                            : {}
                        }
                      />
                      <ErrorMessage
                        name={i.name}
                        component="div"
                        className="error"
                      />
                    </div>
                  ))}
                  <div className="form-actions">
                    <button type="submit">
                      {showEditBtn ? "Edit" : "Add Contact"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowDialog(false);
                        setShowEditBtn(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* {showDialog && (
        <div className="dialogOverlay">
          <div
            className="dialog"
          >
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
            {!showEditBtn && (
              <button type="submit" onClick={add}>
                Add Contact
              </button>
            )}
            <button onClick={() => setShowDialog(false)}>cancel</button>
            {showEditBtn && <button onClick={applyEdit}>Edit</button>}
          </div>
        </div>
      )} */}
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
