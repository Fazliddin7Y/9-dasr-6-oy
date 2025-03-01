import React from "react";
import useApi from "../hooks/useApi";

const Users = () => {
  const { data: users, loading, error, createData, updateData, deleteData } = useApi("users");

  if (loading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Foydalanuvchilar</h2>
      <button 
        onClick={() => createData({ name: "Yangi Foydalanuvchi" })} 
        style={{ marginBottom: "10px" }}
      >
        + Yangi qo‘shish
      </button>
      <ul>
        {users?.map((user) => (
          <li key={user.id} style={{ marginBottom: "5px" }}>
            {user.name} 
            <button onClick={() => updateData(user.id, { name: "Yangilangan Ism" })}>
               Tahrirlash
            </button>
            <button onClick={() => deleteData(user.id)}>O‘chirish</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
