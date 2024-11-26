const Loader = () => {
  return (
    <div
      className='flex justify-center items-center'
      role='status'
      data-testid='loader'
    >
      <div className='w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export default Loader;
