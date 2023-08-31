
import { randomUUID } from "node:crypto"
import { readJSON } from "../../utils.js"


const Tours = readJSON("./Tours.json")

export class TourModel {
    static async getAll ({location}) {
    if (location) {
    return Tours.filter(
        tour => Tours.filter(tour => tour.location === location)
    )}
    return Tours
    }

    static async getById ({id}) {
        const Tour = Tours.find(Tour => Tour.id === id)
        return Tour
    }
    static async create  ({input}) {
        const newTours ={
            id: randomUUID(),
            ...input
        }
        Tours.push(newTours)
        return newTours
    }

    static async delete({id}){
        const ToursIndex = Tours.findIndex(Tours => Tours.id === id)
        if (Tours === -1) return false

        Tours.splice(ToursIndex, 1)
        return true;
    }
    static async update({id, input }) {
        const ToursIndex = Tours.findIndex(Tours => Tours.id === id)
        if (ToursIndex === -1) return false 

        Tours[ToursIndex] = {
            ...Tours[ToursIndex],
            ...input
        }

        return Tours[ToursIndex]
    }
}

