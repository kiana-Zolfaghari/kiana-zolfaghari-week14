function Login() {
  const submitHandeler = () => {
    console.log("test");
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "",
          alignItems: "center",
          flexDirection: "column",
          color: "black",
        }}
      >
        <h1>Login with UserName and Password</h1>
        <input
          type="text"
          placeholder="userName"
          style={{
            width: "25rem",
            height: "2rem",
            backgroundColor: "#ffe713",
            color:"black",
            border: "2px solid gray",
            borderRadius: "20px",
          }}
        />
        <input type="password" placeholder="Password"
          style={{
            width: "25rem",
            height: "2rem",
            color:"black",
            backgroundColor: "#ffe713",
            border: "2px solid gray",
            borderRadius: "20px",
            marginTop:"1rem"
          }}/>
        <button type="submit" onClick={submitHandeler}  style={{
            width: "8rem",
            color:"black",
            height: "2rem",
            backgroundColor: "green",
            border: "none",
            borderRadius: "20px",
            marginTop:"1rem",
            cursor:"pointer"
          }}>Submit</button>
      </div>
    </>
  );
}
export default Login;
