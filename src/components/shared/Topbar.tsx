import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { Button } from '../ui/button';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutation';
import { useUserContext } from '@/context/AuthContext';

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate('/sign-in');
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between px-5 py-4">
        <Link to="/" className="flex gap-3 items-center">
          <img src="/assets/images/logo.svg" alt="logo" width={130} height={325} />
        </Link>

        <div className="flex">
          <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>

          <Link to={`/profile/${user.id}`} className="flex-center">
            <img src={user.imageUrl || 'assets/icons/profile-placeholder.svg'} 
            alt="avatar" 
            className='h-8 w-8 rounded-full' />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
