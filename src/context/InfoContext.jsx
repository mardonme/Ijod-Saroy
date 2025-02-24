import { getAll } from "../api/getRequests";

const { createContext, useContext, useState, useEffect } = require("react");

const InfoContext = createContext()

export const useInfoContext = () => useContext(InfoContext)

export const InfoProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("profile")) || null)
    const [cars, setCars] = useState(JSON.parse(localStorage.getItem("users")) || [])
    const [categorys, setCategorys] = useState(JSON.parse(localStorage.getItem("categorys")) || [])
    const [load, setLoad] = useState(false)

    const serverUrl = process.env.REACT_APP_SERVER_URL

    const toggle = () => setLoad(!load)

    useEffect(() => {
        const getAllRes = async () => {
            try {
                const resUser = await getAll('user')
                const resCategory = await getAll('category')    
                localStorage.setItem('users', JSON.stringify(resUser.data.getAll))            
                localStorage.setItem('categorys', JSON.stringify(resCategory.data.getAll))            
                setCars(resUser.data.getAll)
                setCategorys(resCategory.data.getAll)
            } catch (error) {
                console.log(error);
            }
        }
        getAllRes()
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