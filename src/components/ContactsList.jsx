import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import styles from "./ContactList.module.css";

function ContactsList({
  contacts,
  editHandeler,
  newList,
  selectedContacts,
  toggleSelect,
  deleted,
}) {
  return (
    <>
      <h3 className={styles.title}>Contact List</h3>
      {contacts.length ? (
        <ul className={styles.listContainer}>
          {newList.map((i) => (
            <li key={i.id} className={styles.List}>
              <p className={styles.name}>
                {i.name} {i.lastName}{" "}
              </p>
              <p className={styles.email}>
                <span>📫</span> {i.email}
              </p>
              <p className={styles.phone}>
                <span>📞</span>
                {i.phone}
              </p>
              <div className={styles.btn}>
                <button onClick={() => deleted(i.id)} className={styles.delete}>
                  <MdDelete />
                </button>
                <button
                  onClick={() => editHandeler(i.id)}
                  className={styles.edit}
                  id={styles.btn}
                >
                  <RiEdit2Fill />
                </button>
                <input
                  type="checkbox"
                  onChange={() => toggleSelect(i.id)}
                  checked={selectedContacts.includes(i.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noContact}>NO Contact yet</p>
      )}
    </>
  );
}

export default ContactsList;

// editHandeler(i.id)
