import { _DataBase } from "src/database"


export const getListCars = async () => {
    try {
        
        return await _DataBase.instance.Cars.findAll()

    } catch (error) {
        console.error(error)
    }
}

export const getListTypesCars = async () => {
    try {
        return await _DataBase.instance.TypeCar.findAll();
        
    } catch (error) {
        console.error(error)
    }
}

export const getListSucursals = async () => {
    try {
        return await _DataBase.instance.Sucursal.findAll();
        
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