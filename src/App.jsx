import useAuth from "./hooks/useAuth";


function App() {
const {user, setUser, loading, setLoading, loginWithGoogle} = useAuth();
console.log(user, setUser, loading, setLoading, loginWithGoogle);

  return (
    <>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
    </>
  );
}

export default App
