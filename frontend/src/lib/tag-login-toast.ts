import { toast } from "sonner";

/** Toast when a signed-out user taps “Rate with tags”. */
export function promptLoginForRestaurantTags(goLogin: () => void) {
  toast.message("Sign in to rate with tags", {
    description: "Log in or create an account to add crowd tags for restaurants.",
    action: {
      label: "Log in",
      onClick: goLogin,
    },
  });
}
