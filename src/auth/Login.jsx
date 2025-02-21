import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
      <div className="p-4  w-1/4 mx-auto bg-white/25  rounded-xl mt-24">
        <h1 className="text-4xl font-bold text-center">Login</h1>
        <form className="mt-4 w-3/4 mx-auto">
        <div className="flex flex-col gap-4">
        <div className="flex items-center bg-white/35 p-2 rounded-lg  justify-center gap-2">
        <p><FontAwesomeIcon icon={faEnvelope} /></p>
        <input type="email" placeholder="Email" className="block w-full p-1  border outline-0 focus:ring-2 ring-red-500 rounded" />
        </div>
      <div className="flex items-center  bg-white/35  p-2 rounded-lg justify-center gap-2">
      <p><FontAwesomeIcon icon={faLock} /></p>
      <input type="password" placeholder="Password" className="block w-full p-1   border outline-0 focus:ring-2 ring-red-500 rounded" />
      </div>
         <Link to="/forget-password " className="text-right">Forget Passowrd ?</Link>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
          <div className="text-center">

          <span>Create an account ?</span><Link to="/register" className="text-yellow-600"> Create Now</Link>
          </div>
        </div>
        </form>
      </div>
    );
  };
  
  export default Login;