import React from 'react';

const News = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // You can add logic here (e.g., API call)
  };

  return (
    <div className="text-center bg-yellow-50 py-10 px-6 rounded-xl mt-10 shadow-sm">
      <p className="text-2xl font-semibold text-gray-800">
        🛍️ Order now & get the best deal!
      </p>
      <p className="text-gray-500 mt-2 mb-6">Subscribe to our newsletter for exclusive offers & updates.</p>

      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md mx-auto flex flex-col sm:flex-row items-center gap-4"
      >
        <input
          className="flex-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition placeholder:text-sm"
          type="email"
          placeholder="Enter your email address"
          required
        />
        <button
          type="submit"
          className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg text-sm font-medium transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default News;
