import React, { useState } from "react"

import { useUserContext } from "@/context/AuthContext"
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutation"
import { checkIsLiked } from "@/lib/utils"
import { Models } from "appwrite"

type PostStatsProps = {
  post: Models.Document,
  userId: string,
}

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id)

  const [ likes, setLikes] = useState(likesList);
  const [ isSaved, setIsSaved] = useState(false);


  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavedPost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes]
    const hasLiked = newLikes.includes(userId)

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId)
    } else {
      newLikes.push(userId)
    }

    setLikes(newLikes)
    likePost({postId: post.$id, likesArray: newLikes})
  }

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    const savedPostRecord = currentUser?.save.find((record: Models.Document) => 
    {record.$id === post.id})

    if (!savedPostRecord) {
      setIsSaved(true)
      savePost({postId: post.$id, userId: userId})
    } else {
      setIsSaved(false);
      deleteSavedPost(post.$id)
    }
  }

  return (
    <div className='flex flex-between'>
      <div className='flex gap-2'>
        <img 
          src={checkIsLiked(likesList, userId) ? '/assets/icons/liked.svg'            
          : '/assets/icons/like.svg'}
          alt='like'
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleLikePost}
        />
        <p className="small-medium lg:base-medium">{likesList.length}</p>
      </div>

      <img 
        src={isSaved ? "/assets/icons/saved.svg"
        : "/assets/icons/save.svg"}
        alt="save" 
        width={20}
        height={20}
        className="cursor-pointer"
        onClick={handleSavePost}
      />
    </div>
  )
}

export default PostStats