import { useEffect, useState } from "react";
import Link from "next/link";

export default function Index() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ query: "{ users { id name color } }" }),
      });
      const { data } = await response.json();
      console.log(data);
      setUsers(data.users);
    })();
  }, []);

  return (
    <div className="users-page">
      <ul>
        {users.map((user) => {
          const { id, name, color } = user;
          return (
            <Link key={id} href={`/users/${id}`}>
              <li style={{ color }}>{`${id}. ${name}(${color})`}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
