import React, { SetStateAction } from 'react';

export interface AuthenticationProp {
  token: string;
  setToken: React.Dispatch<SetStateAction<string>>;
}

export const AuthenticationContext = React.createContext<AuthenticationProp>({
  token: '',
  setToken: () => {},
});
