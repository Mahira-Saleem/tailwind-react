import { useState } from "react";
import furBg from "./assets/fur-bg.jpg";
import girl from "./assets/student-girl.png";
import fox from "./assets/fox.png";
import star from "./assets/star.png";
import cupcake from "./assets/cupcake.png";
import flower from "./assets/flower.png";
import book from "./assets/book.png";
import pencil from "./assets/pencil.png";
import "./student-form.css";

const empty = {
  name: "",
  fatherName: "",
  rollNo: "",
  className: "",
  dob: "",
  gender: "",
  email: "",
  phone: "",
  address: "",
};

function validate(d) {
  const e = {};

  const checkName = (v, label) => {
    const t = v.trim();
    if (t.length < 3) ;
    if (t.length > 20) ;
    if (!/^[A-Za-z\s.'-]+$/.test(t)) return `${label} only letters allowed`;
    return "";
  };
  e.name = checkName(d.name, "Naam");
  e.fatherName = checkName(d.fatherName, "Father's Name");

  if (!/^\d{3}$/.test(d.rollNo.trim())) e.rollNo = "Roll No 3 digits ";
  if (!/^03\d{9}$/.test(d.phone.trim()))
    e.phone = "Write correct phone number";

  if (!d.className) e.className = "Select class";
  if (!d.gender) e.gender = "Select gender";

  if (!d.dob) {
    e.dob = "Select date of birth";
  } else {
    const born = new Date(`${d.dob}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(born.getTime())) {
      e.dob = "Write correct Date of Birth";
    } else if (born.getTime() > today.getTime()) {
      e.dob = "not eligible, future date";
    } else {
      const age = (today.getTime() - born.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
      if (age < 3) e.dob = "not eligible, age less than 3";
      else if (age > 70) e.dob = "not eligible, age more than 70";
    }
  }

  const email = d.email.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    e.email = "Write correct Email (e.g., ayesha@mail.com)";

  if (d.address.trim().length > 80) e.address = "To long address, max 80 chars";

  Object.keys(e).forEach((k) => {
    if (!e[k]) delete e[k];
  });
  return e;
}

function Field({ icon, label, error, children }) {
  return (
    <label className="plush flex items-start gap-3 rounded-3xl px-3 py-2">
      <img src={icon} alt="" width={48} height={48} className="mt-1 h-11 w-11 shrink-0 object-contain drop-shadow" />
      <div className="flex w-full flex-col">
        <span className="cozy-label">{label}</span>
        {children}
        {error && <span className="cozy-error">{error}</span>}
      </div>
    </label>
  );
}

const input = "w-full bg-transparent text-base outline-none";

export default function App() {
  const [data, setData] = useState(empty);
  const [errors, setErrors] = useState({});
  const [students, setStudents] = useState([]);

  const set = (k) => (ev) => {
    setData({ ...data, [k]: ev.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: undefined });
  };

  const submit = (ev) => {
    ev.preventDefault();
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setStudents([data, ...students]);
    setData(empty);
  };

  return (
    <main className="min-h-screen bg-cover bg-center px-4 py-10" style={{ backgroundImage: `url(${furBg})` }}>
      <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-[1fr_1.3fr]">
        <div className="text-center">
          <h1 className="cozy-title">Hello, Student!</h1>
          <p className="mt-2 text-lg">Fill in your details, it's a cozy form 💜</p>
          <img src={girl} alt="Smiling student holding books" width={1024} height={1024} className="mx-auto mt-4 w-72 md:w-96" />
        </div>

        <form onSubmit={submit} noValidate className="plush-card space-y-4 rounded-[2.5rem] p-6 md:p-8">
          <Field icon={fox} label="Student Name" error={errors.name}>
            <input className={input} placeholder="Ayesha Khan" value={data.name} onChange={set("name")} />
          </Field>
          <Field icon={star} label="Father's Name" error={errors.fatherName}>
            <input className={input} placeholder="Imran Khan" value={data.fatherName} onChange={set("fatherName")} />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field icon={pencil} label="Roll No (3 digits)" error={errors.rollNo}>
              <input inputMode="numeric" maxLength={3} className={input} placeholder="101" value={data.rollNo} onChange={set("rollNo")} />
            </Field>
            <Field icon={book} label="Class" error={errors.className}>
              <select className={input} value={data.className} onChange={set("className")}>
                <option value="">Select</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i}>Class {i + 1}</option>
                ))}
              </select>
            </Field>
            <Field icon={cupcake} label="Date of Birth" error={errors.dob}>
              <input type="date" className={input} value={data.dob} onChange={set("dob")} />
            </Field>
            <Field icon={flower} label="Gender" error={errors.gender}>
              <select className={input} value={data.gender} onChange={set("gender")}>
                <option value="">Select</option>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </Field>
            <Field icon={star} label="Email (optional)" error={errors.email}>
              <input type="email" className={input} placeholder="ayesha@mail.com" value={data.email} onChange={set("email")} />
            </Field>
            <Field icon={fox} label="Phone (11 digits)" error={errors.phone}>
              <input inputMode="numeric" maxLength={11} className={input} placeholder="03001234567" value={data.phone} onChange={set("phone")} />
            </Field>
          </div>

          <Field icon={flower} label="Address (optional)" error={errors.address}>
            <input className={input} placeholder="Karachi, Pakistan" value={data.address} onChange={set("address")} />
          </Field>

          <button type="submit" className="cozy-btn">Submit ✨</button>
        </form>
      </div>

      {students.length > 0 && (
        <section className="plush-card mx-auto mt-10 max-w-5xl rounded-[2rem] p-6">
          <h2 className="cozy-title text-2xl">Saved Students ({students.length})</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {students.map((s, i) => (
              <div key={i} className="plush rounded-3xl p-4 text-sm">
                <p className="cozy-card-name">{s.name}</p>
                <p>Roll #{s.rollNo} · {s.className}</p>
                <p className="cozy-muted">{s.phone}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
