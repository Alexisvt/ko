import ko from 'knockout';

/**
 * @typedef AvailableMeal
 * @property {string} mealName
 * @property {number} price
 */

export class SeatReservation {
  /**
   * Initial a seat reservation object
   * @param {string} name 
   * @param {AvailableMeal} initialMeal 
   */
  constructor(name, initialMeal) {
    this.name = name;
    this.meal = ko.observable(initialMeal);
    this.formattedPrice = ko.computed(() => {
      let price = this.meal().price;
      return price ? `$ ${price.toFixed(2)}` : 'None';
    });
  }
}
