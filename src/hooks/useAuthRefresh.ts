import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/libraries/auth";
import { getRefresh } from "@/libraries/api";

export function useAuthRefresh() {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = getCookie("accessToken");
      const refreshToken = getCookie("refreshToken");

      // ✅ 1. kalau gak ada dua-duanya, langsung logout
      if (!accessToken && !refreshToken) {
        router.push("/auth");
        return;
      }

      // ✅ 2. kalau access token kosong tapi masih ada refresh token
      if (!accessToken && refreshToken) {
        const newToken = await getRefresh(refreshToken);
        if (!newToken) {
          router.push("/auth"); // gagal refresh → logout
          return;
        }
      }
    };

    checkToken();

    // router.back()

    // ✅ 3. Jalankan ulang tiap beberapa menit (opsional)
    const interval = setInterval(checkToken, 5 * 60 * 1000); // tiap 5 menit
    return () => clearInterval(interval);
  }, []);
}
