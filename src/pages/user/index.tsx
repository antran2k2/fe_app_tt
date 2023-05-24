import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../../layout/AdminLayout";
import { clearAuth } from "../../../redux/authReducer";
import { DatePicker } from "antd";
import WithUser from "../../../hoc/withUser";
import UserLayout from "../../../layout/UserLayout";

function HomeUser() {
  const { token, id, username, roles } = useSelector(
    (state: any) => state.auth
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatching the clearAuth action
    dispatch(clearAuth());
  };
  return (
    <UserLayout selectMenu="home">
      <p>Home user</p>
      <p>{token}</p>
    </UserLayout>
  );
}
export default WithUser(HomeUser);
