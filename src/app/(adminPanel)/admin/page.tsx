export default function Home() {
  return (
    <div className="min-h-screen bg-red-100">
      <div className="flex bg-white flex-col gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4 ...">
        <img
          className="mx-auto block h-24 rounded-full my-100px sm:mx-0 sm:shrink-0"
          src="/img/erin-lindford.jpg"
          alt="123"
        />
        <div className="space-y-2 text-center sm:text-left">
          <div className="space-y-0.5">
            <p className="text-lg font-semibold text-black">Erin Lindford</p>
            <p className="font-medium text-gray-500">Product Engineer</p>
          </div>
          <button className="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 ...">
            Message
          </button>
        </div>
      </div>
    </div>
  );
}
