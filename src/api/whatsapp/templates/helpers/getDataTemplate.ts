import { _DataBase } from "src/database"


export const getListCars = async () => {
    try {
        
        const data = await _DataBase.instance.Cars.findAll()

        return data


    } catch (error) {
        console.error(error)
    }
}

export const getListTypesCars = async () => {
    try {
        const data = await _DataBase.instance.TypeCar.findAll();

        return data
        
    } catch (error) {
        console.error(error)
    }
}

export const getListSucursals = async () => {
    try {
        const data = await _DataBase.instance.Sucursal.findAll();

        return data
        
    } catch (error) {
        console.error(error)
    }
}

export const getDataFrecuentuestions = async () => {
    try {

        const dataResponse = []

        const res = await _DataBase.instance.FrequenTQuestions.findAll();


        return res
        
    } catch (error) {
        console.error(error)
    }
}