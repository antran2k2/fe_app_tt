import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import { ComponentType } from "react";
import { useAppSelector } from "../redux/store";
import Navigate from "../Component/Navigate";

type IntrinsicAttributes = EmotionJSX.IntrinsicAttributes;

function WithoutAuth<T extends IntrinsicAttributes>(
  WrappedComponent: ComponentType<T>
) {
  return function ComponentWithoutAuth(props: T) {
    const { token, roles } = useAppSelector((s) => ({
      token: s.auth.token,
      roles: s.auth.roles,
    }));

    if (token && roles?.includes("ROLE_ADMIN")) {
      return <Navigate to="/admin" />;
    }
    if (token && roles?.includes("ROLE_USER")) return <Navigate to="/user" />;

    if (token) return <Navigate to="/"></Navigate>;
    return <WrappedComponent {...props} />;
  };
}

export default WithoutAuth;
