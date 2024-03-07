import { useUserContext } from "@/context/AuthContext"
import { formatDate } from "@/lib/utils"
import { Models } from "appwrite"
import { Link } from "react-router-dom"

type PostCardProps = {
  post: Models.Document
}

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex gap-4">
          <Link to={`/profile/${post.creator.$id}`}>
            <img 
              src={`${post?.creator?.imageUrl} `||'public/assets/icons/profile-placeholder.svg'}
              alt='creator'
              className="rounded-full w-12 lg:h-12"
            />
          </Link>
          <div className="flex flex-col justify-center">
            <p className="base-semibold text-light-1">
              {post.creator.name}
            </p>
            <p className="subtle-semibold text-light-3">
              {formatDate(post.$createdAt)} - {post.location}
            </p>
          </div>
        </div>

        <div className="">
          <Link to={`/update-post/${post.$id}`}>
            <img 
              src='/assets/icons/edit.svg'
              alt="edit"
              className={`${user.id !== post.creator.$id && "hidden"} w-6 h-6`}
            />
          </Link>
        </div>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className="small-regular my-4">
          <p>{post.caption}</p>

          <ul className="flex gap-2">
            {post.tags.map((tag: string) => (
              <li key={tag} className="text-light-3">
                #{tag}
              </li>
            ))}
          </ul>
        </div>
      </Link>

      <img 
        src={post.imageUrl || '/public/assets/icons/profile-placeholder.svg'}
        alt='post image'
        className='post-card_img'
      />
              
    </div>
  )
}

export default PostCard