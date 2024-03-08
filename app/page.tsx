import Picture from './components/picture';

export default function Page() {
  return (
    <>
      <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="flex items-center space-x-4">
        <Picture src="https://cdn-images-1.medium.com/v2/resize:fit:1200/1*LBTvcOrIuqX07aJbQV0tFQ.png" alt="Description of Image" />
        <a href="/api/auth/login" className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">
            Enter to Exto Chat
          </a>
      </div>
    </div>
    </>
    )
}