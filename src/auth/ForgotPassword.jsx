import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    return (
      <div className="p-4 w-1/4 mx-auto bg-white/25 rounded-xl mt-24">
        <h1 className="text-4xl font-bold text-center">Forgot Password</h1>
        <form className="mt-4 w-3/4 mx-auto">
          <div className="flex flex-col gap-4">
            <div className="flex items-center bg-white/35 p-2 rounded-lg justify-center gap-2">
              <p><FontAwesomeIcon icon={faEnvelope} /></p>
              <input type="email" placeholder="Email" className="block w-full p-1 border outline-0 focus:ring-2 ring-red-500 rounded" />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Reset Password</button>
            <div className="text-center">
              <span>Remember your password?</span><Link to="/login" className="text-yellow-600"> Login Now</Link>
            </div>
          </div>
        </form>
      </div>
    );
  };
  
  export default ForgotPassword;