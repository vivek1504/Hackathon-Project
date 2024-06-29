
export const HomePage = () =>{
    return <form className="max-w-sm mx-auto">
      <label htmlFor="countries" className="block mb-4 mt-20 text-lg font-medium text-gray-900 dark:text-white">Select a Time Frame</label>
      <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected>Choose a Time Frame</option>
        <option value="Day">Day</option>
        <option value="Week">Week</option>
      </select>
    </form>
    
    
}