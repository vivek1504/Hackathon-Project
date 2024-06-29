import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserProfile = ()=> {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");  
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [dietaryPreferences, setDietaryPreferences] = useState(""); 
    const [allergies, setAllergies] = useState("");
    const navigate = useNavigate();

    return <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
            Add Your Profile
        </div>
        <form className="py-4 px-6" action="" method="POST">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="first name">
                    First Name
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="first name" type="text" placeholder="Enter your name"
                    value={firstName} onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="last name">
                    Last Name
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="last name" type="text" placeholder="Enter your last name"
                    value={lastName} onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="Gender">
                    Gender
                </label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="gender" name="gender"
                    value={gender} onChange={(e) => setGender(e.target.value)}
                >
                    <option value="">Choose a Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
                    Date of Birth
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="date" type="date" placeholder="Select a date"
                    value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="height">
                    Height
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="height" type="text" placeholder="Enter your height"
                    value={height} onChange={(e) => setHeight(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="weight">
                    Weight
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="weight" type="text" placeholder="Enter your weight"
                    value={weight} onChange={(e) => setWeight(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="diet">
                    Dietary Preferences
                </label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="diet" name="dietary preferences"
                    value={dietaryPreferences} onChange={(e) => setDietaryPreferences(e.target.value)}
                >
                    <option value="">Choose dietary preferences</option>
                    <option value="Ketogenic">Ketogenic</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Pescetarian">Pescetarian</option>
                    <option value="Paleo">Paleo</option>
                    <option value="Primal">Primal</option>
                    <option value="Whole30">Non Veg</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
                    Allergies
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="message" rows={4} placeholder="Separate allergies with a comma"
                    value={allergies} onChange={(e) => setAllergies(e.target.value)}
                ></textarea>
            </div>
            <div className="flex items-center justify-center mb-4">
                <button
                    onClick={() => {navigate('/')}}
                    className="bg-gray-900 text-white py-2 px-8 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                    type="submit">
                    Create Profile
                </button>
            </div>
        </form>
    </div>
}