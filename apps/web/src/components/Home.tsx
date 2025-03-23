import { trpc } from "../utils/trpc";

const Home = () => {
  const { data: users, status, error } = trpc.hello.users.useQuery();
  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      {users.map((user) => (
        <pre key={user.id}>{JSON.stringify(user, null, 2)}</pre>
      ))}
    </div>
  );
};

export default Home;
