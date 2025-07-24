'use client';

export default function Logo({ size = 'default' }: { size?: 'default' | 'large' }) {
  const isLarge = size === 'large';
  
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className={`${isLarge ? 'w-12 h-12' : 'w-8 h-8'} bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform transition-transform hover:scale-105`}>
          <svg
            className={`${isLarge ? 'w-7 h-7' : 'w-5 h-5'} text-white`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </div>
      
      <div className="flex items-baseline">
        <span className={`${isLarge ? 'text-3xl' : 'text-xl'} font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent`}>
          link
        </span>
        <span className={`${isLarge ? 'text-2xl' : 'text-lg'} font-medium text-gray-700 dark:text-gray-300`}>
          .ryosh.in
        </span>
      </div>
    </div>
  );
}