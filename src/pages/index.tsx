import Image from "next/image";
import { Inter } from "next/font/google";
import { useAppSelector } from "../../redux/store";
import { useSelector } from "react-redux";
import WithAdmin from "../../hoc/withAdmin";
import WithoutAuth from "../../hoc/withoutAuth";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  const { token, id, username, roles } = useSelector(
    (state: any) => state.auth
  );
  // const username = useSelector(state => state.auth.username)
  // const roles = useSelector(state => state.auth.roles)
  return (
    // <MyLayout selectMenu="1">
    <main>
      <p>Username: {username}</p>
    </main>
    // {/* </MyLayout> */}
  );
}
export default WithAdmin(Home);
