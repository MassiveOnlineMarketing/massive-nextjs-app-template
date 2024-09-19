import { Account } from "@prisma/client"
import { create } from "zustand"

export type UserAccount = {
  setAccountDetails: (accountDetails: Account | null) => void;
  // Testing
  hasAccess: (scope: ScopeOption) => boolean;
}

export type UserAccountState = {
  accountDetails: Account | null;
}

export type UserAccountStore = UserAccount & UserAccountState

export const useUserAccountStore = create<UserAccountStore>((set, get) => ({
  accountDetails: null,
  setAccountDetails: (accountDetails) => set({ accountDetails }),

  // Testing
  hasAccess: (scope: ScopeOption) => {
    const accountDetails = get().accountDetails
    
    if (!accountDetails?.scope) return false

    return accountDetails.scope.includes(SCOPE_URLS[scope]) ?? false
  }
}))

type ScopeOption = "search-console" | "ads";

const SCOPE_URLS: Record<ScopeOption, string> = {
  "search-console": "https://www.googleapis.com/auth/webmasters.readonly",
  'ads': "https://www.googleapis.com/auth/adwords",
};
