import { useState, useCallback } from "react";

import { main_url } from "../constants";

type Extra = {
  method: string;
  headers: {
    "Content-Type"?: string;
    Authorization?: string;
  };
  body: string;
};

export const usePatch = (token?: string, file?: boolean) => {
  const [data, setData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const callApi = useCallback((formData: any, url: string) => {
    setIsLoading(true);
    const url_send = formData ? `${main_url}${url}` : `${url}`;
    const extra: Extra = {
      method: "PATCH",
      headers: token
        ? !file
          ? {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          : { Authorization: `Bearer ${token}` }
        : { "Content-Type": "application/json" },
      body: file ? formData : JSON.stringify(formData),
    };

    fetch(url_send, extra)
      .then((res) => {
        if (!res.ok) {
          const error = new Error(res.statusText);
          throw error;
        }

        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setData(data);
      })
      .catch(function (error) {
        setIsLoading(false);
        setData({ error: error.message });
      });
  }, []);

  return [data, callApi, isLoading] as const;
};
