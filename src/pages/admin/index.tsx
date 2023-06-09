import { useDispatch, useSelector } from "react-redux";
import WithAdmin from "../../../hoc/withAdmin";
import AdminLayout from "../../../layout/AdminLayout";
import NextNprogress from "nextjs-progressbar";
import { clearAuth } from "../../../redux/authReducer";
import { DatePicker } from "antd";

function HomeAdmin() {
  const { token, id, username, roles } = useSelector(
    (state: any) => state.auth
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatching the clearAuth action
    dispatch(clearAuth());
  };
  return (
    <AdminLayout selectMenu="home">
      <button onClick={handleLogout}>Logout</button>
      <DatePicker />
      <p>Home admin</p>
      <p>{token}</p>
    </AdminLayout>
  );
}
export default WithAdmin(HomeAdmin);
