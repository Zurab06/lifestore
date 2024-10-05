import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutatuions";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
type PostStatsProps = {
  post: Models.Document;
  userId: string;
};
const PostStats = ({ post, userId }: PostStatsProps) => {
  const { mutate: likePost, isPending: isSavingPost } = useLikePost();
  const { mutate: savePost, isPending: isDeletingSaved } = useSavePost();
  const { mutate: deleteSavedPost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );
  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);
  const likesList = post.likes.map((user: Models.Document) => user.$id);
  const [likes, setlikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const handleLikePosts = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);
    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }
    setlikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  };
  const handleSavePosts = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      savePost({ postId: post.$id, userId });
      setIsSaved(true);
    }
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt=""
          className="cursor-pointer"
          height={20}
          width={20}
          onClick={handleLikePosts}
        />
        <p className="small-medium mg:base:medium">{likes.length}</p>
      </div>
      <div className="flex gap-2">
        {isDeletingSaved || isSavingPost ? (
          <Loader />
        ) : (
          <img
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt=""
            className="cursor-pointer"
            height={20}
            width={20}
            onClick={handleSavePosts}
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
