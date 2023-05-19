import { useSelector } from "react-redux";
import WithAdmin from "../../../hoc/withAdmin";
import AdminLayout from "../../../layout/AdminLayout";

function HomeAdmin() {
  const { token, id, username, roles } = useSelector(
    (state: any) => state.auth
  );
  return (
    <AdminLayout selectMenu="home">
      <p>Home admin</p>
      <p>{token}</p>
    </AdminLayout>
  );
}
export default WithAdmin(HomeAdmin);
