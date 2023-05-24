import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import { ComponentType } from "react";
import { useAppSelector } from "../redux/store";
import Navigate from "../Component/Navigate";
import AdminLayout from "../layout/AdminLayout";

type IntrinsicAttributes = EmotionJSX.IntrinsicAttributes;

function WithUser<T extends IntrinsicAttributes>(
  WrappedComponent: ComponentType<T>
) {
  return function ComponentWithUser(props: T) {
    const { token, roles } = useAppSelector((s) => ({
      token: s.auth.token,
      roles: s.auth.roles,
    }));

    if (!!token && roles?.includes("ROLE_USER")) {
      return <WrappedComponent {...props} />;
    }
    return <Navigate to="/login" />;
  };
}

export default WithUser;
