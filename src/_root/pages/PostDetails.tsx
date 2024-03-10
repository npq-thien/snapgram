import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useDeletePost, useGetPostById } from "@/lib/react-query/queriesAndMutation"
import { formatDate } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useParams, Link } from "react-router-dom"

const PostDetails = () => {
  const { id } = useParams()
  const { data: post, isPending } = useGetPostById(id || ''); 
  const { user } = useUserContext()

  const handleDeletePost = () => {
    useDeletePost(post.$id, post.imageId);
  }

  return (
    <div className="post_details-container">
      <div className="post_details-card">
        <img 
          src={post?.imageUrl}
          alt='creator'
          className="post_details-img"
        />

        {isPending ? <Loader /> : (
            <div className="post_details-info">
              <div className='flex-between w-full'>
                <div className="flex items-center gap-4">
                  <Link to={`/profile/${post?.creator.$id}`}>
                    <img 
                      src={`${post?.creator?.imageUrl} `||'public/assets/icons/profile-placeholder.svg'}
                      alt='creator'
                      className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
                    />
                  </Link>
                  <div className="flex flex-col justify-center">
                    <p className="base-semibold text-light-1">
                      {post?.creator.name}
                    </p>
                    <p className="subtle-semibold text-light-3">
                      {formatDate(post?.$createdAt)} - {post?.location}
                    </p>
                  </div>
                </div>  

                <div className="flex items-center gap-4">
                  <Link to={`/update-post/${post?.$id}`}
                    className={`${user.id !== post?.creator.$id && 'hidden'}`}
                  >
                    <img 
                      src='/assets/icons/edit.svg'
                      alt='edit'
                      width={24}
                      height={24}
                    />
                  </Link>

                  <Button
                    variant='ghost'
                    className={`post_details-delete_btn 
                    ${user.id !== post?.creator.$id && 'hidden'}`}
                    onClick={handleDeletePost}
                  >
                    <img 
                      src='/assets/icons/delete.svg'
                      alt='delete'
                      width={24}
                      height={24}
                    />
                  </Button>
                </div>
              </div>

              {/* a horizontal to separate */}
              <hr className="border-1 w-full border-primary-600" />

              <div className="flex flex-col gap-2 w-full small-regular lg:base-medium">
                <p>{post?.caption}</p>

                <ul className="flex gap-2">
                  {post?.tags.map((tag: string) => (
                    <li key={tag} className="text-light-3">
                      #{tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full">
                <PostStats post={post} userId={user.id} />
              </div>
              
            </div>
        )}
      </div>
    </div>
  )
}

export default PostDetails