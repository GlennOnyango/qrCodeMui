import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  children: JSX.Element;
};

type CompanyData = {
  Name: string;
  KRA: string;
  Validity: number;
  date: number;
  expiry: number;
};
type QRType = {
    companyArray: CompanyData[];
    setCompanyArray: React.Dispatch<React.SetStateAction<CompanyData[]>>
    ;
    
}

const QR:QRType = {
  companyArray: [],
  setCompanyArray: () => {},
};

const QrContext = React.createContext(QR);

export const AuthContextProvider = ({ children }: Props) => {
  const router = useRouter();
  const [user, setUser] = useState<CompanyData[]>([]);

  return (
    <QrContext.Provider
      value={{
        companyArray: user,
        setCompanyArray: setUser,
      }}
    >
      {children}
    </QrContext.Provider>
  );
};

export default QrContext;
