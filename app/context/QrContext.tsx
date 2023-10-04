'use client';
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

export const QrContextProvider = ({ children }: Props) => {
  const router = useRouter();
  const [user, setUser] = useState<CompanyData[]>([]);

  useEffect(() => {
    if (user.length > 0) {
      router.push("/qr/qrcodes");
    }
  }, [user]);

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
