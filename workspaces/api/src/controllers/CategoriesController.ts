import { injectable } from 'tsyringe'

@injectable()
class CategoriesController {
  getCategories() {
    return categories
  }
}

export const categories: { [key: string]: CategoryDescription } = {
  'food-non-alc': {
    id: 'food-non-alc',
    name: 'food-non-alc',
    icon: 'food-non-alc',
  },
  education: {
    id: 'education',
    name: 'education',
    icon: 'education',
  },
  'alc-tobaco': {
    id: 'alc-tobaco',
    name: 'alc-tobaco',
    icon: 'alc-tobaco',
  },
  'util-bills': {
    id: 'util-bills',
    name: 'util-bills',
    icon: 'util-bills',
  },
  health: {
    id: 'health',
    name: 'health',
    icon: 'health',
  },
  clothing: {
    id: 'clothing',
    name: 'clothing',
    icon: 'clothing',
  },
  'it-tech': {
    id: 'it-tech',
    name: 'it-tech',
    icon: 'it-tech',
  },
  leisure: {
    id: 'leisure',
    name: 'leisure',
    icon: 'leisure',
  },
  transport: {
    id: 'transport',
    name: 'transport',
    icon: 'transport',
  },
}

interface CategoryDescription {
  id: string
  name: string
  icon: string
}
