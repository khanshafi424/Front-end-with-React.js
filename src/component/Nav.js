import { Link, useNavigate } from 'react-router-dom'

function Nav() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const logOut = () => {
    localStorage.clear();
    navigate('/login');
  }
  return (
    <div>
      <img src="https://img.freepik.com/premium-vector/letter-s-logo-white-red-shape-letter-cutout-style-usable-business-branding-logos_252051-4736.jpg"
        alt="Logo" className='logo ' />
      {
        auth ?
          <ul className='nav-ul'>
            <li><Link to="/">Products</Link></li>
            <li><Link to="/add">Add Product</Link></li>
            <li><Link to="/update">Update Product</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link onClick={logOut} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
          </ul>
          :
          <ul className='nav-ul text-right' >
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
      }
    </div>
  )
}

export default Nav