import { makeVar } from '@apollo/client'

// Define the TypeScript interface
interface PlantOffer {
  plantName: string
  pictures: string[]
  description: string
  price: number
  latitude: number
  longitude: number
  location: string
  health: string
  category: string
  city: string
  postcode: string
  region: string
  pot: boolean
  plantHeight: number
  maintenanceDifficultyLevel: string
}

// Default form data
const defaultPlantOffer: PlantOffer = {
  plantName: '',
  pictures: [],
  description: '',
  price: 0,
  latitude: 0,
  longitude: 0,
  location: '',
  health: '',
  category: '',
  city: '',
  postcode: '',
  region: '',
  pot: false,
  plantHeight: 0,
  maintenanceDifficultyLevel: '',
}

export const plantOfferVar = makeVar<PlantOffer>(defaultPlantOffer)

export const updatePlantOffer = <K extends keyof PlantOffer>(field: K, value: PlantOffer[K]) => {
  const currentData = plantOfferVar()
  const updatedData = {
    ...currentData,
    [field]: value,
  }
  plantOfferVar(updatedData)
}

export { PlantOffer }
