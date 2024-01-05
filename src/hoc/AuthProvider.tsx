"use client";
import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { User } from "@supabase/gotrue-js";
import { supabase } from "@/utils/Supabase.init";

export type TUser = User;
// & { error?: string; loading: boolean };

const defaultValues: TUser = {
  id: "",
  app_metadata: {},
  user_metadata: {},
  aud: "",
  created_at: "",
  // loading: true,
};

export const AuthContext = createContext<TUser>(defaultValues);

const AuthProvider: FC<{ children: ReactNode; value: TUser }> = ({
  children,
  value,
}) => {
  // const [User, setUser] = useState<TUser>(defaultValues);

  // useEffect(() => {
  //   supabase.auth
  //     .getUser()
  //     .then((response) => {
  //       setUser((prevState) => Object.assign(prevState, response.data.user));
  //     })
  //     .catch((e) =>
  //       setUser((prevState) => Object.assign(prevState, { error: e.message })),
  //     );
  // }, []);

  // supabase.auth.onAuthStateChange(async () => {
  //   const {
  //     data: { user: UserData },
  //     error,
  //   } = await supabase.auth.getUser();
  //
  //   if (error) {
  //     setUser((prevState) =>
  //       Object.assign(prevState, { error: error.message, loading: false }),
  //     );
  //   } else {
  //     setUser((prevState) =>
  //       Object.assign(prevState, UserData, { loading: false }),
  //     );
  //   }
  // });

  // if (User.error) return;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
