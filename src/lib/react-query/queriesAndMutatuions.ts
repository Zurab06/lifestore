import { INewPost, INewUser } from "@/types";
import {
  useQuery,
  useMutation,
  useQueryClient,
 
} from "@tanstack/react-query";
import {
  createPost,
  createUserAccount,
  signInAccount,
  signOutAccount,
} from "../appwrite/api";
import { QUERY_KEYS } from "./queryKeys";
export const useCreateAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};
export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({ mutationFn: signOutAccount });
};
export const useCreatePost= ()=>{
  const queryCLient = useQueryClient()
  return useMutation({
    mutationFn: (post:INewPost)=> createPost(post),
    onSuccess: ()=>{
      queryCLient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      })
    }

  })
}