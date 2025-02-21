import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faVenusMars, faCalendar, faPhone, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
      <div className="p-4 w-1/4 mx-auto bg-white/25 rounded-xl mt-24">
        <h1 className="text-4xl font-bold text-center">Register</h1>
        <form className="mt-4 w-3/4 mx-auto">
          <div className="flex flex-col gap-4">
            <div className="flex items-center bg-white/35 p-2 rounded-lg justify-center gap-2">
              <p><FontAwesomeIcon icon={faUser} /></p>
              <input type="text" placeholder="Name" className="block w-full p-1 border outline-0 focus:ring-2 ring-red-500 rounded" />
            </div>
            <div className="flex items-center bg-white/35 p-2 rounded-lg justify-center gap-2">
              <p><FontAwesomeIcon icon={faVenusMars} /></p>
              <select className="block w-full p-1 border outline-0 focus:ring-2 ring-red-500 rounded">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex items-center bg-white/35 p-2 rounded-lg justify-center gap-2">
              <p><FontAwesomeIcon icon={faCalendar} /></p>
              <input type="date" placeholder="Date of Birth" className="block w-full p-1 border outline-0 focus:ring-2 ring-red-500 rounded" />
            </div>
            <div className="flex items-center bg-white/35 p-2 rounded-lg justify-center gap-2">
              <p><FontAwesomeIcon icon={faEnvelope} /></p>
              <input type="email" placeholder="Email" className="block w-full p-1 border outline-0 focus:ring-2 ring-red-500 rounded" />
            </div>
            <div className="flex items-center bg-white/35 p-2 rounded-lg justify-center gap-2">
              <p><FontAwesomeIcon icon={faPhone} /></p>
              <input type="tel" placeholder="Phone Number" className="block w-full p-1 border outline-0 focus:ring-2 ring-red-500 rounded" />
            </div>
            <div className="flex items-center bg-white/35 p-2 rounded-lg justify-center gap-2">
              <p><FontAwesomeIcon icon={faMapMarker} /></p>
              <input type="text" placeholder="Address" className="block w-full p-1 border outline-0 focus:ring-2 ring-red-500 rounded" />
            </div>
            <div className="flex items-center bg-white/35 p-2 rounded-lg justify-center gap-2">
              <p><FontAwesomeIcon icon={faLock} /></p>
              <input type="password" placeholder="New Password" className="block w-full p-1 border outline-0 focus:ring-2 ring-red-500 rounded" />
            </div>
            <div className="flex items-center bg-white/35 p-2 rounded-lg justify-center gap-2">
              <p><FontAwesomeIcon icon={faLock} /></p>
              <input type="password" placeholder="Confirm New Password" className="block w-full p-1 border outline-0 focus:ring-2 ring-red-500 rounded" />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
            <div className="text-center">
              <span>Already have an account?</span><Link to="/login" className="text-yellow-600"> Login Now</Link>
            </div>
          </div>
        </form>
      </div>
    );
  };
  
  export default Register;