import { _DataBase } from "src/database"



export const getListTemplatesService = async () => {
    try {

        return await _DataBase.instance.template.findAll({
            attributes:{
                exclude: [
                    "is_active",
                    "created_at",
                    "created_by",
                    "updated_at",
                    "updated_by",
                ]
            }
        })
        
    } catch (error: any) {
        console.error(error)
    }
}