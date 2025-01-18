import { getAllCars } from "../api/getRequests";

const { createContext, useContext, useState, useEffect } = require("react");

const InfoContext = createContext()

export const useInfoContext = () => useContext(InfoContext)

export const InfoProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("profile")) || null)
    const [cars, setCars] = useState([])
    const [categorys, setCategorys] = useState([])
    const [load, setLoad] = useState(false)

    const serverUrl = process.env.REACT_APP_SERVER_URL

    const toggle = () => setLoad(!load)

    useEffect(() => {
        const getAll = async () => {
            try {
                const resCar = await getAllCars('car')
                const resCategory = await getAllCars('category')
                setCars(resCar.data.cars)
                setCategorys(resCategory.data.categorys)
            } catch (error) {
                
            }
        }
        getAll()
    },[currentUser, load])
    
    const exit = () => {
        localStorage.clear()
        setCurrentUser(null)
    
    }

     const value = {
        exit, currentUser, setCurrentUser,
        serverUrl, cars, setCars,
        categorys, setCategorys, toggle
    }
 
    return (
        <InfoContext.Provider value={value}>
            {children}
        </InfoContext.Provider>
    )
}