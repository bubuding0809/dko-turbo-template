import { trpc } from "../utils/trpc";

const Home = () => {
  const { data: users } = trpc.hello.users.useQuery();
  return (
    <div>
      {users?.map((user) => (
        <pre key={user.id}>{JSON.stringify(user, null, 2)}</pre>
      ))}
    </div>
  );
};

export default Home;
