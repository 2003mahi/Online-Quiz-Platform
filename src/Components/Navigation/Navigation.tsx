import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { RootState } from '../../store';

export default function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleHome = () => {
    navigate('/');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <button className="btn btn-primary me-2" onClick={handleHome}>
          Home
        </button>
        {isAuthenticated && (
          <>
            <button className="btn btn-secondary me-2" onClick={() => navigate('/quiz')}>
              Take Quiz
            </button>
            <button className="btn btn-secondary me-2" onClick={() => navigate('/manage')}>
              Manage Questions
            </button>
            <button className="btn btn-danger ms-auto" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
} 