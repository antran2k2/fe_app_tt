import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import { ComponentType } from "react";
import { useAppSelector } from "../redux/store";
import Navigate from "../Component/Navigate";
import AdminLayout from "../layout/AdminLayout";

type IntrinsicAttributes = EmotionJSX.IntrinsicAttributes;

function WithAdmin<T extends IntrinsicAttributes>(
  WrappedComponent: ComponentType<T>
) {
  return function ComponentWithAdmin(props: T) {
    const { token, roles } = useAppSelector((s) => ({
      token: s.auth.token,
      roles: s.auth.roles,
    }));

    if (!!token && roles?.includes("ROLE_ADMIN")) {
      return (
        // <AdminLayout>
        <WrappedComponent {...props} />
        // </AdminLayout>
      );
    }
    return <Navigate to="/login" />;
  };
}

export default WithAdmin;
