import { useState } from "react";

function App() {
  // const formFileds = {
  // username: "",
  // email: "",
  // password: "",
  // number: "",
  // };
  // const [form, setForm] = useState(formFileds);
  const [form, setForm] = useState({});

  let handleForm = (e) => setForm({ ...form, [e.target.type]: e.target.value });
  return (
    <>
      <form>
        <input
          onChange={handleForm}
          value={form.text || ""}
          type="text"
          // name="text" // username
        />
        <input
          onChange={handleForm}
          value={form.email || ""}
          type="email"
          // name="email"
        />
        <input
          onChange={handleForm}
          value={form.date || ""}
          type="date"
          // name="date"
        />
      </form>
      <p>{form.text}</p>
      <p>{form.email}</p>
      <p>{form.date}</p>
    </>
  );
}

export default App;
