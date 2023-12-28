import { fetcher } from "api";
import { AxiosError } from "axios";
import { useModalStore } from "store/client";
import useSWR from "swr";

const useTestApi = (): {
  res: any;
  loading?: boolean;
  error?: Error | undefined;
} => {
  const { openModal } = useModalStore();
  const {
    data,
    // error
  } = useSWR(
    { url: `https://jsonplaceholder.typicode.com/posts`, method: "get" },
    fetcher,
    {
      onError: (e: AxiosError & { response: any }) => {
        openModal(e.response?.data?.message || e.message);
      },
      // suspense: true,
    }
  );

  return {
    res: data,
    // loading: !error && !data,
    // error,
  };
};

export default useTestApi;
