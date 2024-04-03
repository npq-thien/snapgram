import { useUserContext } from '@/context/AuthContext'
import { Models } from 'appwrite'
import { Link } from 'react-router-dom'
import PostStats from './PostStats'

type GridPostListProps = {
  posts: Models.Document[],
  showUser?: boolean,
  showStats?: boolean
}

const GridPostList = ({ posts, showUser = true, showStats = true } : GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <ul className='grid-container'>
      {posts.map((post) => (
        <li key={post.$id} className='relative min-80 h-80'>
        <Link className='grid-post_link'>
          <img src={post.imageUrl} alt="post" className='w-full h-full object-cover'/>
        </Link>

        <div className='grid-post_user'>
          {showUser && (
            <div className='flex flex-center gap-2'> 
              <img src={post.creator.imageUrl} alt='creator' className='w-8 h-8 rounded-full' />
              <p>{post.creator.name}</p>
            </div>
          )}

          {showStats && (
            <PostStats post={post} userId={user.id} />
          )}
        </div>
        </li>
      ))}


    </ul>
    
  )
}

export default GridPostList