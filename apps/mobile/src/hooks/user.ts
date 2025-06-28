import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authClient } from "~/utils/auth";

export const sessionQueryKey = ["getSessionUserQuery"];
export const signInMutationKey = ["userLoginMutationKey"];
export const signUpMutationKey = ["userSignupMutationKey"];
export const signOutMutationKey = ["userSignupMutationKey"];
export const signInWithAppleMutationKey = ["userSignInWithAppleMutationKey"];

export function useSession() {
  const query = useQuery({
    queryKey: sessionQueryKey,
    queryFn: async () => {
      const { data, error } = await authClient.getSession();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });

  return query;
}

export function useSignInMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: signInMutationKey,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: sessionQueryKey });
    },
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
  return mutation;
}

export function useSignUpMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: signUpMutationKey,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: sessionQueryKey });
    },
    mutationFn: async ({
      email,
      password,
      name,
    }: {
      email: string;
      password: string;
      name: string;
    }) => {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
  return mutation;
}

export function useSignInWithAppleMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: signInWithAppleMutationKey,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: sessionQueryKey });
    },
    mutationFn: async ({
      idToken,
      callbackURL,
      firstName,
      lastName,
    }: {
      idToken: string;
      callbackURL: string;
      firstName?: string | null;
      lastName?: string | null;
    }) => {
      const { data, error } = await authClient.signIn.social({
        provider: "apple",
        idToken: {
          token: idToken,
        },
        callbackURL,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (firstName?.length || lastName?.length) {
        await authClient.updateUser({
          name: `${firstName ?? ""} ${lastName ?? ""}`,
        });
      }

      return data;
    },
  });
  return mutation;
}

export function useSignOutMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: signOutMutationKey,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: sessionQueryKey });
      queryClient.invalidateQueries();
    },
    mutationFn: async () => {
      const { data, error } = await authClient.signOut();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
  return mutation;
}
