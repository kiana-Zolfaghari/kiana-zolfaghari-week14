function ContactsList({ contacts, deleteHandeler,editHandeler }) {
  return (
    <>
      <h3>Contact List</h3>
      {contacts.length ? (
        <ul>
          {contacts.map((i) => (
            <li key={i.id}>
              <p>
                {i.name} {i.lastName}{" "}
              </p>
              <p>
                <span>📫</span> {i.email}
              </p>
              <p>
                <span>📞</span>
                {i.phone}
              </p>
              <button onClick={() => deleteHandeler(i.id)}>🗑️</button>
              <button onClick={()=>editHandeler(i.id)}>Edit</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>NO Contact yet</p>
      )}
    </>
  );
}

export default ContactsList;
