import { BiSolidLogOut } from 'react-icons/bi';
export default function LogoutWorker() {
  function handleLogout() {
    localStorage.removeItem('outletWorker');
    localStorage.removeItem('outletAdmin');
    window.location.reload();
  }

  return (
    <div>
      <button
        onClick={handleLogout}
        className="mt-3 w-fit px-4 py-2 bg-red-600 text-white font-semibold rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 focus:ring-offset-white transform transition-all duration-200"
      >
        Logout
      </button>
    </div>
  );
}
