import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { getUserAccounts as getUserAcc, logIn } from "@/http/api";

export interface UserAndAccountInfo {
  userId: string;
  accountId: string;
  assignedAt: string;
  assigneeId: string;
  active: boolean;
}

export const useUserAndAccountStore = defineStore("user_and_account", () => {
  const auth_token = ref("");

  const account_info = ref<UserAndAccountInfo[]>([]);

  const current_account = computed(() =>
    account_info.value.find((e) => e.active)
  );

  async function logInUser(data: { email: string; password: string }) {
    const res = await logIn(data);

    auth_token.value = res.data.access_token;
    localStorage.setItem("access_token", res.data.access_token);

    await getUserAccounts();
  }

  async function getUserAccounts() {
    account_info.value = (await getUserAcc()).data as UserAndAccountInfo[];
  }

  return {
    auth_token,
    account_info,
    current_account,
    logInUser,
    getUserAccounts,
  };
});
